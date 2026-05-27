#!/usr/bin/env -S deno run -A
/**
 * Changelog — daily digest generator.
 *
 * Daily:   clones each watched repo into `.cache/repos/` (reused & fetched on
 *          later runs), extracts the previous day's commits, and asks an LLM for
 *          an impact-weighted summary (one article per repo/day).
 * Weekly / monthly: aggregates the existing daily summaries for the most recent
 *          completed ISO week / calendar month into a higher-level summary.
 *
 * Usage:
 *   deno task digest                       # daily, yesterday (UTC)
 *   deno task digest --date 2026-05-20
 *   deno task digest --repo denoland/deno
 *   deno task digest --period weekly       # last completed ISO week
 *   deno task digest --period monthly      # last completed calendar month
 *   deno task digest --dry-run             # print the prompt, don't call the API
 *
 * Env:
 *   OPENAI_API_KEY   required (unless --dry-run)
 *   OPENAI_MODEL     model id (default: gpt-5.4-mini)
 *   OPENAI_BASE_URL  API base (default: https://api.openai.com/v1)
 */
import { parse as parseYaml } from "@std/yaml";
import { join } from "@std/path";
import { ensureDir } from "@std/fs";

const POSTS_DIR = "src/posts";
const CACHE_DIR = ".cache/repos"; // project-local clones (git-ignored)
const MAX_COMMITS = 300; // cap to keep token cost bounded
const MAX_FILES_PER_COMMIT = 25;

interface RepoEntry {
  repo: string;
  branch?: string;
}

interface FileStat {
  added: number;
  deleted: number;
  path: string;
}

interface Commit {
  hash: string;
  author: string;
  date: string;
  subject: string;
  body: string;
  files: FileStat[];
}

type Size = "L" | "M" | "S" | "N";
type Period = "daily" | "weekly" | "monthly";

interface Summary {
  headline: string;
  excerpt: string;
  size: Size;
  body: string;
}

// ---------------------------------------------------------------- args ----

function parseArgs(args: string[]) {
  const out: { date?: string; repo?: string; dryRun: boolean; period: Period } =
    {
      dryRun: false,
      period: "daily",
    };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--date") out.date = args[++i];
    else if (a === "--repo") out.repo = args[++i];
    else if (a === "--period") out.period = args[++i] as Period;
  }
  return out;
}

const ymd = (d: Date): string => d.toISOString().slice(0, 10);

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return ymd(d);
}

function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ----------------------------------------------------------------- git ----

const decoder = new TextDecoder();

async function git(cwd: string, ...args: string[]): Promise<string> {
  const cmd = new Deno.Command("git", {
    args,
    cwd,
    stdout: "piped",
    stderr: "piped",
  });
  const { code, stdout, stderr } = await cmd.output();
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed:\n${decoder.decode(stderr)}`);
  }
  return decoder.decode(stdout);
}

const US = "\x1f"; // unit separator (between fields)
const RS = "\x1e"; // record separator (between commits)

/**
 * Ensure a project-local clone of `entry.repo` exists under CACHE_DIR and is
 * up to date, then return its path. First run clones (blobless, to stay small);
 * later runs just `git fetch`.
 */
async function ensureRepo(entry: RepoEntry): Promise<string> {
  const dir = join(CACHE_DIR, slug(entry.repo));
  const url = `https://github.com/${entry.repo}.git`;
  try {
    await Deno.stat(join(dir, ".git"));
    await git(dir, "fetch", "--quiet", "--prune", "origin");
  } catch {
    await ensureDir(CACHE_DIR);
    // blobless partial clone: full history, blobs fetched on demand.
    await git(".", "clone", "--quiet", "--filter=blob:none", url, dir);
  }
  return dir;
}

async function collectCommits(
  entry: RepoEntry,
  date: string,
): Promise<Commit[]> {
  const dir = await ensureRepo(entry);
  const rev = entry.branch ? `origin/${entry.branch}` : "origin/HEAD";
  const since = `${date}T00:00:00Z`;
  const until = `${nextDay(date)}T00:00:00Z`;
  const fmt = ["%H", "%an", "%aI", "%s", "%b"].join(US) + RS;
  const log = await git(
    dir,
    "log",
    rev,
    `--since=${since}`,
    `--until=${until}`,
    `--date=iso-strict`,
    `--pretty=format:${fmt}`,
  );

  const commits: Commit[] = [];
  for (const record of log.split(RS)) {
    const r = record.trim();
    if (!r) continue;
    const [hash, author, cdate, subject, body = ""] = r.split(US);
    if (!hash) continue;
    const files = await fileStats(dir, hash);
    commits.push({
      hash,
      author,
      date: cdate,
      subject,
      body: body.trim(),
      files,
    });
    if (commits.length >= MAX_COMMITS) break;
  }
  return commits;
}

async function fileStats(repoDir: string, hash: string): Promise<FileStat[]> {
  const out = await git(
    repoDir,
    "show",
    "--numstat",
    "--format=",
    hash,
  );
  const files: FileStat[] = [];
  for (const line of out.split("\n")) {
    const m = line.trim().match(/^(\d+|-)\t(\d+|-)\t(.+)$/);
    if (!m) continue;
    files.push({
      added: m[1] === "-" ? 0 : Number(m[1]),
      deleted: m[2] === "-" ? 0 : Number(m[2]),
      path: m[3],
    });
    if (files.length >= MAX_FILES_PER_COMMIT) break;
  }
  return files;
}

// ----------------------------------------------------------------- llm ----

function buildPrompt(repo: string, date: string, commits: Commit[]): string {
  const lines: string[] = [];
  for (const c of commits) {
    const stat = c.files
      .map((f) => `${f.path} (+${f.added}/-${f.deleted})`)
      .join(", ");
    lines.push(
      `- [${c.hash.slice(0, 7)}] ${c.subject}` +
        (c.body
          ? `\n  body: ${c.body.replace(/\n+/g, " ").slice(0, 500)}`
          : "") +
        (stat ? `\n  files: ${stat}` : ""),
    );
  }
  return [
    `Repository: ${repo}`,
    `Date (UTC): ${date}`,
    `Commits (${commits.length}):`,
    "",
    lines.join("\n"),
  ].join("\n");
}

const SYSTEM_PROMPT =
  `You are the editor of "Changelog", a daily digest of open-source repository activity for developers.
You are given one repository's commits for a single day. Write an IMPACT-WEIGHTED summary.

Rules:
- Judge each commit's impact. HIGH impact = new features, breaking changes, security fixes, performance work, notable bug fixes, public API changes, or major refactors. LOW impact = typos, formatting, dependency bumps, CI/build tweaks, comment/test-only changes, trivial internal refactors.
- Give each HIGH-impact change its own entry: a bold one-line title, then 1-2 sentences on what changed and why it matters. Reference the short commit hash like (abc1234).
- Bundle ALL low-impact changes under a final "### Other misc changes" section as terse bullets. Aggregate aggressively (e.g. "Dependency bumps (3 commits)"). Do NOT give them equal weight.
- Coverage must be PROPORTIONAL to impact. A day of only trivial commits should be short.
- Markdown body: use "### " for section headers and "**" for entry titles. No top-level # or ## heading, no preamble, no sign-off.

Also classify the overall magnitude of the day for this repo as a single "size":
- "L" = significant: breaking changes, major new features, security fixes, or otherwise high-impact work.
- "M" = medium: notable features or bug fixes that matter but aren't major.
- "S" = small: only minor/trivial changes (dependency bumps, docs, formatting, small internal fixes).
You are ALWAYS given a day that has at least one commit, so the size MUST be "L", "M", or "S" — never "N". Even a single trivial commit counts as at least "S". "N" (no change) is reserved for days with zero commits, which are never sent to you.

Return ONLY a JSON object with keys:
  "headline": a punchy <=60 char headline for the day (no repo name, no date),
  "excerpt": a <=160 char one-line summary,
  "size": one of "L", "M", or "S" per the rubric above (never "N"),
  "body": the markdown body described above.`;

async function callLLM(system: string, user: string): Promise<Summary> {
  const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-5.4-mini";
  const base = Deno.env.get("OPENAI_BASE_URL") ?? "https://api.openai.com/v1";
  const key = Deno.env.get("OPENAI_API_KEY");
  if (!key) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`OpenAI API ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned no content");
  const parsed = JSON.parse(content) as Summary;
  // Guard against an unexpected value from the model.
  const valid: Size[] = ["L", "M", "S", "N"];
  if (!valid.includes(parsed.size)) parsed.size = "M";
  // We only ever summarize windows that have activity, so never emit "N".
  if (parsed.size === "N") parsed.size = "S";
  return parsed;
}

function summarize(
  repo: string,
  date: string,
  commits: Commit[],
): Promise<Summary> {
  return callLLM(SYSTEM_PROMPT, buildPrompt(repo, date, commits));
}

// --------------------------------------------------------------- output ----

function slug(repo: string): string {
  return repo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Quote and escape a frontmatter string value.
const q = (s: string): string => `"${s.replace(/"/g, '\\"')}"`;

/** Write `<fileSlug>.md` with the given ordered frontmatter fields and body. */
async function writeArticle(
  fileSlug: string,
  fields: Record<string, string | number>,
  body: string,
): Promise<string> {
  await ensureDir(POSTS_DIR);
  const path = join(POSTS_DIR, `${fileSlug}.md`);
  const lines = ["---"];
  for (const [k, v] of Object.entries(fields)) lines.push(`${k}: ${v}`);
  lines.push("---", "", body.trim(), "");
  await Deno.writeTextFile(path, lines.join("\n"));
  return path;
}

// -------------------------------------------------------------- periods ----

interface PeriodTarget {
  start: Date; // inclusive
  end: Date; // inclusive
  slug: string; // URL id, e.g. "2026-W21" or "2026-05"
  label: string; // human label, e.g. "May 18–24, 2026" or "May 2026"
}

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_SHORT = MONTHS_LONG.map((m) => m.slice(0, 3));

/** ISO week (Mon–Sun) containing `d`, as {year, week}. */
function isoWeek(d: Date): { year: number; week: number } {
  const t = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
  const day = (t.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
  t.setUTCDate(t.getUTCDate() - day + 3); // Thursday of this week
  const firstThu = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const fday = (firstThu.getUTCDay() + 6) % 7;
  firstThu.setUTCDate(firstThu.getUTCDate() - fday + 3);
  const week = 1 +
    Math.round((t.getTime() - firstThu.getTime()) / (7 * 86400000));
  return { year: t.getUTCFullYear(), week };
}

/** Monday (start) of the ISO week containing `d`. */
function weekStart(d: Date): Date {
  const day = (d.getUTCDay() + 6) % 7;
  const s = new Date(d);
  s.setUTCDate(d.getUTCDate() - day);
  s.setUTCHours(0, 0, 0, 0);
  return s;
}

/** The most recently completed ISO week relative to `anchor`. */
function lastCompletedWeek(anchor: Date): PeriodTarget {
  const thisMon = weekStart(anchor);
  const end = new Date(thisMon);
  end.setUTCDate(thisMon.getUTCDate() - 1); // last Sunday
  const start = weekStart(end); // its Monday
  const { year, week } = isoWeek(start);
  const slug = `${year}-W${String(week).padStart(2, "0")}`;
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  const label = sameMonth
    ? `${
      MONTHS_SHORT[start.getUTCMonth()]
    } ${start.getUTCDate()}–${end.getUTCDate()}, ${end.getUTCFullYear()}`
    : `${MONTHS_SHORT[start.getUTCMonth()]} ${start.getUTCDate()} – ${
      MONTHS_SHORT[end.getUTCMonth()]
    } ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  return { start, end, slug, label };
}

/** The most recently completed calendar month relative to `anchor`. */
function lastCompletedMonth(anchor: Date): PeriodTarget {
  const firstThis = new Date(
    Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1),
  );
  const end = new Date(firstThis);
  end.setUTCDate(0); // last day of previous month
  const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 1));
  const slug = `${end.getUTCFullYear()}-${
    String(end.getUTCMonth() + 1).padStart(2, "0")
  }`;
  const label = `${MONTHS_LONG[end.getUTCMonth()]} ${end.getUTCFullYear()}`;
  return { start, end, slug, label };
}

interface DailyArticle {
  date: string;
  headline: string;
  body: string;
  commits: number;
}

/** Read the existing daily summary articles for `repo` within [startKey, endKey]. */
async function collectDailyArticles(
  repo: string,
  startKey: string,
  endKey: string,
): Promise<DailyArticle[]> {
  const out: DailyArticle[] = [];
  for await (const e of Deno.readDir(POSTS_DIR)) {
    if (!e.isFile || !e.name.endsWith(".md")) continue;
    const text = await Deno.readTextFile(join(POSTS_DIR, e.name));
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    const data = parseYaml(m[1]) as Record<string, unknown>;
    if (data.repo !== repo) continue;
    if ((data.period ?? "daily") !== "daily") continue;
    const dkey = ymd(new Date(data.date as string));
    if (dkey < startKey || dkey > endKey) continue;
    out.push({
      date: dkey,
      headline: String(data.title ?? ""),
      body: m[2].trim(),
      commits: Number(data.commits ?? 0),
    });
  }
  out.sort((a, b) => a.date.localeCompare(b.date));
  return out;
}

function periodSystemPrompt(period: Period): string {
  return `You are the editor of "Changelog". You are given the DAILY summaries for one open-source repository over a single calendar ${
    period === "weekly" ? "week" : "month"
  }. Synthesize them into ONE concise ${period} summary for developers.

Rules:
- Do NOT just concatenate the days. Identify the ${period}'s most important themes and changes, merge related work across days, and tell the story of the ${period}.
- Impact-weight: lead with the significant changes (features, breaking changes, security, performance, major fixes). Bundle the trivial stuff under a final "### Other misc changes".
- Markdown body: use "### " for section headers and "**" for entry titles. No top-level # or ## heading, no preamble, no sign-off.
- Classify the overall magnitude as "size": "L" (significant), "M" (medium), or "S" (small). Never "N".

Return ONLY a JSON object with keys:
  "headline": a punchy <=70 char headline for the ${period} (no repo name, no date),
  "excerpt": a <=160 char one-line summary,
  "size": one of "L", "M", or "S",
  "body": the markdown body described above.`;
}

function buildPeriodPrompt(
  repo: string,
  period: Period,
  label: string,
  articles: DailyArticle[],
): string {
  const parts = articles.map((a) =>
    `## ${a.date} — ${a.headline} (${a.commits} commits)\n${a.body}`
  );
  return [
    `Repository: ${repo}`,
    `Period: ${period} (${label})`,
    `Daily summaries (${articles.length} day(s)):`,
    "",
    parts.join("\n\n"),
  ].join("\n");
}

function writePeriodArticle(
  repo: string,
  period: Period,
  target: PeriodTarget,
  commits: number,
  s: Summary,
): Promise<string> {
  return writeArticle(`${target.slug}_${slug(repo)}`, {
    date: ymd(target.end),
    repo,
    period,
    slug: target.slug,
    period_label: q(target.label),
    size: s.size,
    title: q(s.headline),
    excerpt: q(s.excerpt),
    commits,
  }, s.body);
}

async function runPeriod(
  period: Period,
  repos: RepoEntry[],
  anchor: Date,
  dryRun: boolean,
) {
  const target = period === "weekly"
    ? lastCompletedWeek(anchor)
    : lastCompletedMonth(anchor);
  console.error(
    `Changelog — ${period} digest for ${target.label} ` +
      `(${ymd(target.start)}…${ymd(target.end)}, ${repos.length} repo(s))`,
  );

  for (const entry of repos) {
    console.error(`\n▶ ${entry.repo}`);
    const articles = await collectDailyArticles(
      entry.repo,
      ymd(target.start),
      ymd(target.end),
    );
    if (articles.length === 0) {
      console.error(`  no daily summaries in range, skipping`);
      continue;
    }
    const commits = articles.reduce((n, a) => n + a.commits, 0);
    console.error(
      `  ${articles.length} daily summary(ies), ${commits} commits`,
    );

    if (dryRun) {
      console.log("=".repeat(60));
      console.log(`${period.toUpperCase()} PROMPT for ${entry.repo}`);
      console.log("=".repeat(60));
      console.log(
        buildPeriodPrompt(entry.repo, period, target.label, articles),
      );
      continue;
    }

    const summary = await callLLM(
      periodSystemPrompt(period),
      buildPeriodPrompt(entry.repo, period, target.label, articles),
    );
    const path = await writePeriodArticle(
      entry.repo,
      period,
      target,
      commits,
      summary,
    );
    console.error(`  ✓ wrote ${path}`);
  }
}

// ----------------------------------------------------------------- main ----

async function loadRepos(filter?: string): Promise<RepoEntry[]> {
  const raw = await Deno.readTextFile("repos.yml");
  const doc = parseYaml(raw) as { repos?: unknown[] };
  const entries: RepoEntry[] = (doc.repos ?? []).map((r) =>
    typeof r === "string" ? { repo: r } : (r as RepoEntry)
  );
  return filter ? entries.filter((e) => e.repo === filter) : entries;
}

async function main() {
  const { date, repo, dryRun, period } = parseArgs(Deno.args);
  const repos = await loadRepos(repo);
  if (repos.length === 0) {
    console.error("No repositories to watch (check repos.yml / --repo).");
    Deno.exit(1);
  }

  if (period !== "daily") {
    const anchor = date ? new Date(`${date}T00:00:00Z`) : new Date();
    await runPeriod(period, repos, anchor, dryRun);
    return;
  }

  const day = date ?? yesterdayUTC();
  console.error(
    `Changelog — daily digest for ${day} (${repos.length} repo(s))`,
  );

  for (const entry of repos) {
    console.error(`\n▶ ${entry.repo}`);
    const commits = await collectCommits(entry, day);
    if (commits.length === 0) {
      console.error(`  no commits on ${day}, skipping`);
      continue;
    }
    console.error(`  ${commits.length} commit(s)`);

    if (dryRun) {
      console.log("=".repeat(60));
      console.log(`PROMPT for ${entry.repo}`);
      console.log("=".repeat(60));
      console.log(buildPrompt(entry.repo, day, commits));
      continue;
    }

    const summary = await summarize(entry.repo, day, commits);
    const path = await writeArticle(`${day}_${slug(entry.repo)}`, {
      date: day,
      repo: entry.repo,
      size: summary.size,
      title: q(summary.headline),
      excerpt: q(summary.excerpt),
      commits: commits.length,
    }, summary.body);
    console.error(`  ✓ wrote ${path}`);
  }
}

if (import.meta.main) {
  await main();
}
