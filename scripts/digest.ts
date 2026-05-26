#!/usr/bin/env -S deno run -A
/**
 * Changelog — daily digest generator.
 *
 * Reads `repos.yml`, clones each watched repo, extracts the previous day's
 * commits, and asks an LLM to write an impact-weighted summary. One Markdown
 * article is written per repo per day to `src/posts/`.
 *
 * Usage:
 *   deno task digest                 # summarize yesterday (UTC)
 *   deno task digest --date 2026-05-20
 *   deno task digest --repo denoland/deno
 *   deno task digest --dry-run       # print the prompt, don't call the API
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

interface Summary {
  headline: string;
  excerpt: string;
  size: Size;
  body: string;
}

// ---------------------------------------------------------------- args ----

function parseArgs(args: string[]) {
  const out: { date?: string; repo?: string; dryRun: boolean } = {
    dryRun: false,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--date") out.date = args[++i];
    else if (a === "--repo") out.repo = args[++i];
  }
  return out;
}

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ----------------------------------------------------------------- git ----

async function git(cwd: string, ...args: string[]): Promise<string> {
  const cmd = new Deno.Command("git", {
    args,
    cwd,
    stdout: "piped",
    stderr: "piped",
  });
  const { code, stdout, stderr } = await cmd.output();
  if (code !== 0) {
    throw new Error(`git ${args.join(" ")} failed:\n${new TextDecoder().decode(stderr)}`);
  }
  return new TextDecoder().decode(stdout);
}

const US = "\x1f"; // unit separator (between fields)
const RS = "\x1e"; // record separator (between commits)

async function collectCommits(
  entry: RepoEntry,
  date: string,
): Promise<Commit[]> {
  const next = nextDay(date);
  const tmp = await Deno.makeTempDir({ prefix: "oss-watch-" });
  try {
    const url = `https://github.com/${entry.repo}.git`;
    const cloneArgs = [
      "clone",
      "--quiet",
      `--shallow-since=${date}T00:00:00Z`,
    ];
    if (entry.branch) cloneArgs.push("--branch", entry.branch);
    cloneArgs.push(url, tmp);
    try {
      await git(".", ...cloneArgs);
    } catch {
      // shallow-since can fail when the repo had no commits in the window.
      return [];
    }

    const since = `${date}T00:00:00Z`;
    const until = `${next}T00:00:00Z`;
    const fmt = ["%H", "%an", "%aI", "%s", "%b"].join(US) + RS;
    const log = await git(
      tmp,
      "log",
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
      const files = await fileStats(tmp, hash);
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
  } finally {
    await Deno.remove(tmp, { recursive: true }).catch(() => {});
  }
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
        (c.body ? `\n  body: ${c.body.replace(/\n+/g, " ").slice(0, 500)}` : "") +
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
- "N" = no change: no meaningful, user-relevant changes at all.

Return ONLY a JSON object with keys:
  "headline": a punchy <=60 char headline for the day (no repo name, no date),
  "excerpt": a <=160 char one-line summary,
  "size": one of "L", "M", "S", or "N" per the rubric above,
  "body": the markdown body described above.`;

async function summarize(
  repo: string,
  date: string,
  commits: Commit[],
): Promise<Summary> {
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
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(repo, date, commits) },
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
  return parsed;
}

// --------------------------------------------------------------- output ----

function slug(repo: string): string {
  return repo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function frontmatterEscape(s: string): string {
  return s.replace(/"/g, '\\"');
}

async function writeArticle(
  repo: string,
  date: string,
  commitCount: number,
  s: Summary,
): Promise<string> {
  await ensureDir(POSTS_DIR);
  const path = join(POSTS_DIR, `${date}_${slug(repo)}.md`);
  const md = [
    "---",
    `date: ${date}`,
    `repo: ${repo}`,
    `size: ${s.size}`,
    `title: "${frontmatterEscape(s.headline)}"`,
    `excerpt: "${frontmatterEscape(s.excerpt)}"`,
    `commit_count: ${commitCount}`,
    "---",
    "",
    s.body.trim(),
    "",
  ].join("\n");
  await Deno.writeTextFile(path, md);
  return path;
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
  const { date = yesterdayUTC(), repo, dryRun } = parseArgs(Deno.args);
  const repos = await loadRepos(repo);
  if (repos.length === 0) {
    console.error("No repositories to watch (check repos.yml / --repo).");
    Deno.exit(1);
  }
  console.error(`Changelog — digest for ${date} (${repos.length} repo(s))`);

  for (const entry of repos) {
    console.error(`\n▶ ${entry.repo}`);
    const commits = await collectCommits(entry, date);
    if (commits.length === 0) {
      console.error(`  no commits on ${date}, skipping`);
      continue;
    }
    console.error(`  ${commits.length} commit(s)`);

    if (dryRun) {
      console.log("=".repeat(60));
      console.log(`PROMPT for ${entry.repo}`);
      console.log("=".repeat(60));
      console.log(buildPrompt(entry.repo, date, commits));
      continue;
    }

    const summary = await summarize(entry.repo, date, commits);
    const path = await writeArticle(entry.repo, date, commits.length, summary);
    console.error(`  ✓ wrote ${path}`);
  }
}

if (import.meta.main) {
  await main();
}
