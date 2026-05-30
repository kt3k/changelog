#!/usr/bin/env -S deno run -A
/**
 * Changelog — daily digest generator.
 *
 * Daily:   clones each watched repo into `.cache/repos/` (reused & fetched on
 *          later runs), extracts the previous day's commits, and asks an LLM for
 *          an impact-weighted summary (one article per repo/day). This is a
 *          two-pass process: a cheap "triage" model first picks the high-impact
 *          commits, whose real diffs are then attached for the "write" model.
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
 *   deno task digest --triage-model gpt-5.4-nano --write-model gpt-5.4-mini
 *   deno task digest --backfill-authors    # add authors to existing posts only
 *                                          # (no API/summary regeneration)
 *
 * Env:
 *   OPENAI_API_KEY      required (unless --dry-run)
 *   OPENAI_TRIAGE_MODEL triage model id (default: gpt-5.4-nano)
 *   OPENAI_WRITE_MODEL  write/summary model id (default: gpt-5.4-mini)
 *   OPENAI_BASE_URL     API base (default: https://api.openai.com/v1)
 *   GH_TOKEN            GitHub token (or GITHUB_TOKEN) for resolving commit
 *                       authors to GitHub logins via the API. Optional: without
 *                       it, only `@users.noreply.github.com` authors resolve.
 *
 * CLI flags --triage-model / --write-model override the env vars.
 */
import { parse as parseYaml } from "@std/yaml";
import { dirname, join } from "@std/path";
import { ensureDir } from "@std/fs";
import { Spinner } from "@std/cli/unstable-spinner";
import { retry } from "@std/async/retry";

const POSTS_DIR = "src/posts";
const CACHE_DIR = ".cache/repos"; // project-local clones (git-ignored)
const MAX_COMMITS = 300; // cap to keep token cost bounded
const MAX_FILES_PER_COMMIT = 25;

const DEFAULT_TRIAGE_MODEL = "gpt-5.4-nano";
const DEFAULT_WRITE_MODEL = "gpt-5.4-mini";

// Two-pass diff tuning. Small days skip triage entirely and just diff every
// commit (still capped by MAX_DIFF_COMMITS). Diffs are the main token cost, so
// they are bounded per commit and in count.
const TRIAGE_BYPASS_THRESHOLD = 10; // <= this many commits: skip the triage call
const MAX_DIFF_COMMITS = 8; // attach a diff to at most this many commits/day
const MAX_DIFF_LINES = 120; // truncate each commit's diff to this many lines
const MAX_DIFF_LINE_CHARS = 500; // truncate any single diff line to this many chars

// Noisy/low-signal paths whose diffs are dropped to save tokens.
const DIFF_EXCLUDE: RegExp[] = [
  /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|deno\.lock|Cargo\.lock|go\.sum)$/,
  /\.min\.(js|css)$/,
  /\.map$/,
  /(^|\/)(vendor|third_party|node_modules)\//,
  /(^|\/)__snapshots__\//,
];

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
  email: string;
  date: string;
  subject: string;
  body: string;
  files: FileStat[];
}

type Size = "L" | "M" | "S" | "N";
type Period = "daily" | "weekly" | "monthly";

interface Models {
  triage: string;
  write: string;
}

interface Summary {
  headline: string;
  excerpt: string;
  size: Size;
  body: string;
}

// ---------------------------------------------------------------- args ----

function parseArgs(args: string[]) {
  const out: {
    date?: string;
    repo?: string;
    dryRun: boolean;
    period: Period;
    triageModel?: string;
    writeModel?: string;
    backfillAuthors: boolean;
  } = {
    dryRun: false,
    period: "daily",
    backfillAuthors: false,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--date") out.date = args[++i];
    else if (a === "--repo") out.repo = args[++i];
    else if (a === "--period") out.period = args[++i] as Period;
    else if (a === "--triage-model") out.triageModel = args[++i];
    else if (a === "--write-model") out.writeModel = args[++i];
    else if (a === "--backfill-authors") out.backfillAuthors = true;
  }
  return out;
}

/** Resolve triage/write model ids from CLI flags, then env, then defaults. */
function resolveModels(
  flags: { triageModel?: string; writeModel?: string },
): Models {
  return {
    triage: flags.triageModel ?? Deno.env.get("OPENAI_TRIAGE_MODEL") ??
      DEFAULT_TRIAGE_MODEL,
    write: flags.writeModel ?? Deno.env.get("OPENAI_WRITE_MODEL") ??
      DEFAULT_WRITE_MODEL,
  };
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
  // Retry transient failures — chiefly the on-demand blob fetches a blobless
  // clone makes for `show`/`--numstat`, which flake under load (GitHub
  // throttling, resets). Initial attempt + 2 retries; if all fail, the error
  // propagates and the run aborts.
  return await retry(async () => {
    const cmd = new Deno.Command("git", {
      args,
      cwd,
      stdout: "piped",
      stderr: "piped",
    });
    const { code, stdout, stderr } = await cmd.output();
    if (code !== 0) {
      throw new Error(
        `git ${args.join(" ")} failed:\n${decoder.decode(stderr)}`,
      );
    }
    return decoder.decode(stdout);
  }, { maxAttempts: 3 });
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
  const spinner = new Spinner({
    message: `fetching ${entry.repo}`,
    color: "yellow",
    output: Deno.stderr,
  });
  spinner.start();
  try {
    await Deno.stat(join(dir, ".git"));
    await git(dir, "fetch", "--quiet", "--prune", "origin");
  } catch {
    await ensureDir(CACHE_DIR);
    // blobless partial clone: full history, blobs fetched on demand.
    await git(".", "clone", "--quiet", "--filter=blob:none", url, dir);
  } finally {
    spinner.stop();
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
  const fmt = ["%H", "%an", "%ae", "%aI", "%s", "%b"].join(US) + RS;
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
    const [hash, author, email, cdate, subject, body = ""] = r.split(US);
    if (!hash) continue;
    const files = await fileStats(dir, hash);
    commits.push({
      hash,
      author,
      email,
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

const churn = (c: Commit): number =>
  c.files.reduce((n, f) => n + f.added + f.deleted, 0);

const isExcludedPath = (p: string): boolean =>
  DIFF_EXCLUDE.some((re) => re.test(p));

/**
 * Fetch the patch for `hash`, drop noisy files (lockfiles, generated, vendored)
 * and truncate to MAX_DIFF_LINES. Blobs are fetched on demand (blobless clone).
 * Returns "" when nothing meaningful is left.
 */
async function commitDiff(dir: string, hash: string): Promise<string> {
  const raw = await git(
    dir,
    "show",
    hash,
    "--unified=3",
    "--format=",
    "--no-color",
  ).catch(() => "");
  if (!raw.trim()) return "";

  // Split into per-file sections and drop excluded paths.
  const sections = raw.split(/^(?=diff --git )/m).filter((s) => s.trim());
  const kept = sections.filter((s) => {
    const m = s.match(/^diff --git a\/(.+?) b\//);
    return !m || !isExcludedPath(m[1]);
  });
  if (kept.length === 0) return "";

  let lines = kept.join("").split("\n");
  if (lines.length > MAX_DIFF_LINES) {
    lines = lines.slice(0, MAX_DIFF_LINES);
    lines.push(`… (diff truncated at ${MAX_DIFF_LINES} lines)`);
  }
  // Clamp pathologically long lines (e.g. minified/bundled dist files), which
  // can blow the token budget even within the line-count cap.
  lines = lines.map((l) =>
    l.length > MAX_DIFF_LINE_CHARS
      ? `${l.slice(0, MAX_DIFF_LINE_CHARS)}… (line truncated at ${MAX_DIFF_LINE_CHARS} chars)`
      : l
  );
  return lines.join("\n").trim();
}

/**
 * For the commits flagged high-impact, fetch diffs for the MAX_DIFF_COMMITS
 * largest (by churn). Returns a hash → diff map (commits with empty diffs are
 * omitted).
 */
async function collectDiffs(
  dir: string,
  commits: Commit[],
  high: Set<string>,
): Promise<Map<string, string>> {
  const selected = commits
    .filter((c) => high.has(c.hash))
    .sort((a, b) => churn(b) - churn(a))
    .slice(0, MAX_DIFF_COMMITS);
  const diffs = new Map<string, string>();
  for (const c of selected) {
    const d = await commitDiff(dir, c.hash);
    if (d) diffs.set(c.hash, d);
  }
  return diffs;
}

// ------------------------------------------------------------- authors ----

// Cache of commit-email → GitHub login, persisted across runs (git-ignored).
// "" is a remembered miss (only stored when we actually queried the API).
const AUTHOR_CACHE = ".cache/authors.json";

async function loadAuthorCache(): Promise<Map<string, string>> {
  try {
    const obj = JSON.parse(await Deno.readTextFile(AUTHOR_CACHE)) as Record<
      string,
      string
    >;
    return new Map(Object.entries(obj));
  } catch {
    return new Map();
  }
}

async function saveAuthorCache(cache: Map<string, string>): Promise<void> {
  await ensureDir(dirname(AUTHOR_CACHE));
  const obj = Object.fromEntries([...cache].sort());
  await Deno.writeTextFile(AUTHOR_CACHE, JSON.stringify(obj, null, 2) + "\n");
}

/** GitHub login embedded in a `…@users.noreply.github.com` email, else "". */
function loginFromEmail(email: string): string {
  const m = email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/i);
  return m ? m[1] : "";
}

/** Look up the GitHub login that authored `sha` via the API ("" on failure). */
async function loginFromApi(
  repo: string,
  sha: string,
  token: string,
): Promise<string> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits/${sha}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "changelog-digest",
        },
      },
    );
    if (!res.ok) {
      console.error(`  author lookup ${sha.slice(0, 7)} → ${res.status}`);
      return "";
    }
    const data = await res.json();
    return typeof data.author?.login === "string" ? data.author.login : "";
  } catch (e) {
    console.error(`  author lookup ${sha.slice(0, 7)} failed (${e})`);
    return "";
  }
}

interface AuthorInfo {
  /** Distinct logins, most commits first (first-seen order breaks ties). */
  authors: string[];
  /** Short hash (7 chars, as shown in the body) → login, resolved only. */
  byCommit: Record<string, string>;
}

/**
 * Resolve the GitHub authors of `commits`. Each commit email is matched against
 * its noreply form first (no network), then the GitHub API (needs GH_TOKEN/
 * GITHUB_TOKEN). Resolutions are cached by email across runs; unresolved emails
 * are left uncached when no token was available so a later run can retry.
 * Commits whose author can't be resolved are dropped from both outputs.
 */
async function resolveAuthors(
  repo: string,
  commits: Commit[],
  cache: Map<string, string>,
): Promise<AuthorInfo> {
  const token = Deno.env.get("GH_TOKEN") ?? Deno.env.get("GITHUB_TOKEN") ?? "";
  const byCommit: Record<string, string> = {};
  const counts = new Map<string, number>();
  const order: string[] = []; // first-seen order, for stable tie-breaking
  for (const c of commits) {
    const key = c.email.toLowerCase();
    let login = cache.get(key);
    if (login === undefined) {
      login = loginFromEmail(c.email);
      if (login) {
        cache.set(key, login);
      } else if (token) {
        login = await loginFromApi(repo, c.hash, token);
        cache.set(key, login); // remember the miss too, to avoid re-querying
      }
    }
    // Skip GitHub App bots (e.g. "dependabot[bot]"): no usable avatar, and the
    // brackets would break the YAML flow collections we emit. Resolution is
    // still cached above, so we don't re-query them.
    if (!login || login.endsWith("[bot]")) continue;
    byCommit[c.hash.slice(0, 7)] = login;
    if (!counts.has(login)) order.push(login);
    counts.set(login, (counts.get(login) ?? 0) + 1);
  }
  // Stable sort by commit count desc keeps first-seen order within equal counts.
  const authors = [...order].sort((a, b) => counts.get(b)! - counts.get(a)!);
  return { authors, byCommit };
}

// ----------------------------------------------------------------- llm ----

function buildPrompt(
  repo: string,
  date: string,
  commits: Commit[],
  diffs?: Map<string, string>,
): string {
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
  const parts = [
    `Repository: ${repo}`,
    `Date (UTC): ${date}`,
    `Commits (${commits.length}):`,
    "",
    lines.join("\n"),
  ];
  if (diffs && diffs.size > 0) {
    const blocks = [...diffs].map(([hash, d]) =>
      `### [${hash.slice(0, 7)}]\n\`\`\`diff\n${d}\n\`\`\``
    );
    parts.push(
      "",
      "Diffs for the high-impact commits (other commits' diffs omitted):",
      "",
      blocks.join("\n\n"),
    );
  }
  return parts.join("\n");
}

const SYSTEM_PROMPT =
  `You are the editor of "Changelog", a daily digest of open-source repository activity for developers.
You are given one repository's commits for a single day. Write an IMPACT-WEIGHTED summary.

Rules:
- Judge each commit's impact. HIGH impact = new features, breaking changes, security fixes, performance work, notable bug fixes, public API changes, or major refactors. LOW impact = typos, formatting, dependency bumps, CI/build tweaks, comment/test-only changes, trivial internal refactors.
- Give each HIGH-impact change its own entry: a bold one-line title, then 1-2 sentences on what changed and why it matters. Reference the short commit hash like (abc1234).
- Bundle ALL low-impact changes under a final "### Other misc changes" section as terse bullets. Aggregate aggressively (e.g. "Dependency bumps (3 commits)"). Do NOT give them equal weight.
- Coverage must be PROPORTIONAL to impact. A day of only trivial commits should be short.
- Some high-impact commits include their actual diff under a "Diffs for the high-impact commits" section. Use those diffs to describe precisely what changed; do not invent details for commits whose diff is not shown.
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

/** Low-level chat completion returning the raw JSON-object content string. */
async function chat(
  model: string,
  system: string,
  user: string,
): Promise<string> {
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
  return content;
}

async function callLLM(
  model: string,
  system: string,
  user: string,
): Promise<Summary> {
  const parsed = JSON.parse(await chat(model, system, user)) as Summary;
  // Guard against an unexpected value from the model.
  const valid: Size[] = ["L", "M", "S", "N"];
  if (!valid.includes(parsed.size)) parsed.size = "M";
  // We only ever summarize windows that have activity, so never emit "N".
  if (parsed.size === "N") parsed.size = "S";
  return parsed;
}

const TRIAGE_SYSTEM_PROMPT =
  `You are triaging one repository's commits for a single day for "Changelog", a developer digest.
You are given the commit list (subject, body, changed files with line counts). Identify which commits are HIGH impact.

HIGH impact = new features, breaking changes, security fixes, performance work, notable bug fixes, public API changes, or major refactors.
LOW impact = typos, formatting, dependency bumps, CI/build tweaks, comment/test-only changes, trivial internal refactors.

Judge by the MEANING of the change, not by commit-message conventions — many repos do not use conventional-commit prefixes. When unsure, lean towards including a commit (recall matters more than precision here).

Return ONLY a JSON object: {"high": ["<short hash>", ...]} listing the short hashes (as shown in brackets) of the high-impact commits. Return an empty array if none qualify.`;

/**
 * Pass 1. Ask the triage model which commits are high-impact and return their
 * full hashes. Days with few commits skip the call (everything is a candidate).
 * On any error, fall back to the largest commits by churn.
 */
async function selectHighCommits(
  model: string,
  repo: string,
  date: string,
  commits: Commit[],
): Promise<Set<string>> {
  if (commits.length <= TRIAGE_BYPASS_THRESHOLD) {
    return new Set(commits.map((c) => c.hash));
  }
  const byShort = new Map(commits.map((c) => [c.hash.slice(0, 7), c.hash]));
  try {
    const content = await chat(
      model,
      TRIAGE_SYSTEM_PROMPT,
      buildPrompt(repo, date, commits),
    );
    const obj = JSON.parse(content) as { high?: unknown };
    const high = new Set<string>();
    if (Array.isArray(obj.high)) {
      for (const h of obj.high) {
        const full = typeof h === "string" && byShort.get(h.slice(0, 7));
        if (full) high.add(full);
      }
    }
    return high;
  } catch (e) {
    console.error(
      `  triage [${model}] failed (${e}); falling back to top-churn diffs`,
    );
    const top = [...commits].sort((a, b) => churn(b) - churn(a))
      .slice(0, MAX_DIFF_COMMITS);
    return new Set(top.map((c) => c.hash));
  }
}

/**
 * Two-pass daily summary: triage picks the high-impact commits, their diffs are
 * fetched, then the write model produces the article.
 */
async function summarize(
  entry: RepoEntry,
  date: string,
  commits: Commit[],
  models: Models,
): Promise<Summary> {
  const dir = join(CACHE_DIR, slug(entry.repo));
  const high = await selectHighCommits(
    models.triage,
    entry.repo,
    date,
    commits,
  );
  const diffs = await collectDiffs(dir, commits, high);
  console.error(
    `  triage [${models.triage}]: ${high.size} high-impact, ${diffs.size} diff(s) attached`,
  );

  // Dump every commit's impact classification (hash + title).
  const line = (c: Commit) => `  ${c.hash.slice(0, 7)} ${c.subject}`;
  const highCommits = commits.filter((c) => high.has(c.hash));
  const lowCommits = commits.filter((c) => !high.has(c.hash));
  console.error(
    `HIGH-IMPACT (${highCommits.length}) [triage: ${models.triage}]:`,
  );
  for (const c of highCommits) console.error(line(c));
  console.error(`LOW-IMPACT (${lowCommits.length}):`);
  for (const c of lowCommits) console.error(line(c));

  // Dump the full write-stage prompt (model + system + user).
  const writePrompt = buildPrompt(entry.repo, date, commits, diffs);
  console.error("=".repeat(60));
  console.error(`WRITE PROMPT [model: ${models.write}]`);
  console.error("=".repeat(60));
  console.error("--- system ---");
  console.error(SYSTEM_PROMPT);
  console.error("--- user ---");
  console.error(writePrompt);

  return callLLM(models.write, SYSTEM_PROMPT, writePrompt);
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
  models: Models,
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

    if (commits === 0) {
      // No activity across the whole period: emit a metadata-only size N
      // article (excluded from listings), mirroring the daily no-change path.
      // No LLM call.
      if (dryRun) {
        console.error(`  no commits in range (would write size N)`);
        continue;
      }
      const path = await writePeriodArticle(entry.repo, period, target, 0, {
        headline: "No changes",
        excerpt: "",
        size: "N",
        body: "",
      });
      console.error(`  no commits in range; ✓ wrote ${path} (size N)`);
      continue;
    }

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
      models.write,
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

// -------------------------------------------------------------- backfill ----

/**
 * Add `authors`/`commit_authors` to existing daily posts WITHOUT regenerating
 * their summaries. Re-collects each post's commits from git, resolves authors,
 * and rewrites only the front matter (the body is left byte-for-byte intact).
 * Idempotent: any prior author fields are replaced. Respects --repo / --date.
 */
async function backfillAuthors(repos: RepoEntry[], filterDate?: string) {
  const entryByRepo = new Map(repos.map((e) => [e.repo, e]));
  const cache = await loadAuthorCache();
  let updated = 0;
  for await (const e of Deno.readDir(POSTS_DIR)) {
    if (!e.isFile || !e.name.endsWith(".md")) continue;
    const path = join(POSTS_DIR, e.name);
    const text = await Deno.readTextFile(path);
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;
    // Drop any prior author fields BEFORE parsing, so a previously-written
    // (possibly malformed) value can't break the YAML parse or re-appear.
    const fmLines = m[1].split("\n").filter((l) =>
      !/^(authors|commit_authors):/.test(l)
    );
    const data = parseYaml(fmLines.join("\n")) as Record<string, unknown>;
    if ((data.period ?? "daily") !== "daily") continue; // daily posts only
    const repo = data.repo as string | undefined;
    const entry = repo && entryByRepo.get(repo);
    if (!entry) continue; // not a watched repo (or filtered out by --repo)
    const date = ymd(new Date(data.date as string));
    if (filterDate && date !== filterDate) continue;
    if (Number(data.commits ?? 0) === 0) continue; // no-change post: nothing to do

    console.error(`▶ ${repo} ${date}`);
    const commits = await collectCommits(entry, date);
    const { authors, byCommit } = await resolveAuthors(repo, commits, cache);
    const body = m[2];
    const cited = Object.entries(byCommit).filter(([h]) => body.includes(h));

    // Re-emit: existing lines (already minus author fields) + fresh ones, with
    // the original body byte-for-byte unchanged.
    if (authors.length) fmLines.push(`authors: [${authors.join(", ")}]`);
    if (cited.length) {
      fmLines.push(
        `commit_authors: {${cited.map(([h, l]) => `"${h}": ${l}`).join(", ")}}`,
      );
    }
    await Deno.writeTextFile(path, `---\n${fmLines.join("\n")}\n---\n${body}`);
    console.error(`  ${authors.length} author(s); ✓ ${path}`);
    updated++;
  }
  await saveAuthorCache(cache);
  console.error(`\nBackfilled ${updated} post(s).`);
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
  const args = parseArgs(Deno.args);
  const { date, repo, dryRun, period } = args;
  const models = resolveModels(args);
  const repos = await loadRepos(repo);
  if (repos.length === 0) {
    console.error("No repositories to watch (check repos.yml / --repo).");
    Deno.exit(1);
  }

  if (args.backfillAuthors) {
    await backfillAuthors(repos, date);
    return;
  }

  if (period !== "daily") {
    const anchor = date ? new Date(`${date}T00:00:00Z`) : new Date();
    await runPeriod(period, repos, anchor, dryRun, models);
    return;
  }

  const day = date ?? yesterdayUTC();
  console.error(
    `Changelog — daily digest for ${day} (${repos.length} repo(s)); ` +
      `triage=${models.triage} write=${models.write}`,
  );

  const authorCache = await loadAuthorCache();

  for (const entry of repos) {
    console.error(`\n▶ ${entry.repo}`);
    const commits = await collectCommits(entry, day);
    if (commits.length === 0) {
      // No activity: still emit a metadata-only "no change" (size N) article so
      // the day shows up (as empty) in the activity strip. No body, no LLM call.
      const path = await writeArticle(`${day}_${slug(entry.repo)}`, {
        date: day,
        repo: entry.repo,
        size: "N",
        title: q("No changes"),
        excerpt: q(""),
        commits: 0,
      }, "");
      console.error(`  no commits on ${day}; ✓ wrote ${path} (size N)`);
      continue;
    }
    console.error(`  ${commits.length} commit(s)`);

    if (dryRun) {
      // No API call: preview with diffs for the largest commits by churn
      // (real triage would refine this selection).
      const dir = join(CACHE_DIR, slug(entry.repo));
      const top = [...commits].sort((a, b) => churn(b) - churn(a))
        .slice(0, MAX_DIFF_COMMITS);
      const diffs = await collectDiffs(
        dir,
        commits,
        new Set(top.map((c) => c.hash)),
      );
      console.log("=".repeat(60));
      console.log(`PROMPT for ${entry.repo} (diffs by churn, triage skipped)`);
      console.log("=".repeat(60));
      console.log(buildPrompt(entry.repo, day, commits, diffs));
      continue;
    }

    const summary = await summarize(entry, day, commits, models);
    const { authors, byCommit } = await resolveAuthors(
      entry.repo,
      commits,
      authorCache,
    );
    console.error(`  ${authors.length} author(s) resolved`);
    const fields: Record<string, string | number> = {
      date: day,
      repo: entry.repo,
      size: summary.size,
      title: q(summary.headline),
      excerpt: q(summary.excerpt),
      commits: commits.length,
    };
    // YAML flow collections. Logins are safe unquoted (alnum + hyphen); hash
    // keys are quoted so all-digit short hashes aren't parsed as numbers.
    if (authors.length) fields.authors = `[${authors.join(", ")}]`;
    // Only commits the summary actually cites get an inline avatar; drop the rest.
    const ca = Object.entries(byCommit).filter(([h]) =>
      summary.body.includes(h)
    );
    if (ca.length) {
      fields.commit_authors = `{${
        ca.map(([h, l]) => `"${h}": ${l}`).join(", ")
      }}`;
    }
    const path = await writeArticle(
      `${day}_${slug(entry.repo)}`,
      fields,
      summary.body,
    );
    console.error(`  ✓ wrote ${path}`);
  }

  await saveAuthorCache(authorCache);
}

if (import.meta.main) {
  await main();
}
