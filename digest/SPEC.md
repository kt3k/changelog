# Digest script — specification

`digest/main.ts` turns the recent commit activity of a set of watched
repositories into impact-weighted Markdown articles under `src/posts/`, which
the Lume site then renders. This document specifies its behaviour.

## Modes

The script runs in one of three modes, selected by `--period` (default `daily`):

| Mode      | Input                                    | Output (one article per repo) |
| --------- | ---------------------------------------- | ----------------------------- |
| `daily`   | a single day's commits per repo          | `<date>_<slug>.md`            |
| `weekly`  | the daily summaries of the last ISO week | `<YYYY>-W<WW>_<slug>.md`      |
| `monthly` | the daily summaries of the last month    | `<YYYY>-<MM>_<slug>.md`       |

`slug` is the repo `owner/name` lowercased with non-alphanumerics collapsed to
`-` (e.g. `denoland/deno` → `denoland-deno`).

Weekly/monthly modes anchor on the **most recent completed** ISO week / calendar
month relative to today (or to `--date` if given) and synthesize the existing
daily articles in that window. They never re-read git.

## CLI

```
deno task digest [flags]
```

| Flag                  | Meaning                                                        |
| --------------------- | -------------------------------------------------------------- |
| `--date <YYYY-MM-DD>` | Target day (daily) or anchor (period). Default: yesterday UTC. |
| `--repo <owner/name>` | Restrict to one repo from `repos.yml`.                         |
| `--period <p>`        | `daily` \| `weekly` \| `monthly`. Default `daily`.             |
| `--dry-run`           | Print the assembled prompt(s); make no API call.               |
| `--triage-model <id>` | Override the triage model.                                     |
| `--write-model <id>`  | Override the write model.                                      |

## Environment

| Var                   | Default                         | Purpose                                        |
| --------------------- | ------------------------------- | ---------------------------------------------- |
| `OPENAI_API_KEY`      | — (required unless `--dry-run`) | Auth for the chat-completions endpoint.        |
| `OPENAI_TRIAGE_MODEL` | `gpt-5.4-nano`                  | Pass-1 (triage) model.                         |
| `OPENAI_WRITE_MODEL`  | `gpt-5.4-mini`                  | Pass-2 (write) model.                          |
| `OPENAI_BASE_URL`     | `https://api.openai.com/v1`     | API base. OpenAI-compatible (e.g. OpenRouter). |

Model resolution order: CLI flag → env var → built-in default.

The API is called via `POST {base}/chat/completions` with
`response_format: { type: "json_object" }`; every model response must be a JSON
object.

## Repository source

`repos.yml` at the project root:

```yaml
repos:
  - denoland/deno # default branch
  - repo: lumeland/lume
    branch: main # optional branch pin
```

Each entry is either a string `owner/name` or a mapping `{ repo, branch? }`.

## Local clone cache

Repos are cloned under `.cache/repos/<slug>` (git-ignored):

- First run: **blobless** partial clone (`--filter=blob:none`) — full history,
  file contents fetched on demand.
- Later runs: `git fetch --prune origin` to update.

Commits are read from `origin/<branch>` (or `origin/HEAD` when no branch is
pinned).

## Daily pipeline (per repo)

1. **Collect commits** for the UTC day `[date T00:00:00Z, nextDay T00:00:00Z)`.
   For each commit, capture hash, author, ISO date, subject, body, and per-file
   `(added, deleted, path)` from `git show --numstat`. Caps: `MAX_COMMITS = 300`
   commits/day, `MAX_FILES_PER_COMMIT = 25` files/commit. Empty days are skipped
   (no article written).

2. **Pass 1 — triage** (`selectHighCommits`): send the lightweight commit list
   (messages + numstat, no diffs) to the triage model, which returns
   `{"high": ["<short hash>", ...]}` — the high-impact commits judged by the
   _meaning_ of the change, **not** by commit-message conventions (target repos
   may not use conventional commits). Recall is favoured over precision.
   - Days with `<= TRIAGE_BYPASS_THRESHOLD` (10) commits skip this call and
     treat every commit as a candidate.
   - Returned hashes are validated against the actual commit set (matched by
     7-char prefix); unknown hashes are dropped.
   - On any error (network, malformed JSON), fall back to the largest commits by
     churn.

3. **Fetch diffs** (`collectDiffs` / `commitDiff`): for the high-impact commits,
   take the `MAX_DIFF_COMMITS` (8) largest by churn (added+deleted) and fetch
   their patches. Each diff is:
   - filtered to drop noisy files — lockfiles, `*.min.js`/`*.min.css`, `*.map`,
     `vendor/`, `third_party/`, `node_modules/`, `__snapshots__/`;
   - truncated to `MAX_DIFF_LINES` (120) lines with a truncation marker, and any
     single line longer than `MAX_DIFF_LINE_CHARS` (500) is clamped (so a bundled
     or minified dist line can't blow the token budget). Commits whose diff is
     empty after filtering are omitted.

4. **Pass 2 — write** (`callLLM`): send the full commit list plus the attached
   diffs to the write model, which returns the article `Summary`. The system
   prompt instructs it to describe diff-backed commits precisely and not to
   invent details for commits without a shown diff.

`--dry-run` skips both API calls: it attaches diffs for the top commits by churn
(triage cannot run without the API) and prints the resulting prompt.

## Weekly / monthly pipeline (per repo)

Read the existing daily articles for the window, concatenate their bodies into a
period prompt, and ask the **write** model to synthesize one higher-level
`Summary` (merging themes across days, not concatenating). No git, no triage, no
diffs.

## LLM contract

### Daily / period summary — response object

```json
{
  "headline": "<= 60 chars (daily) / 70 chars (period); no repo name, no date",
  "excerpt": "<= 160 char one-line summary",
  "size": "L | M | S",
  "body": "Markdown: '### ' section headers, '**' entry titles, no top-level heading/preamble/sign-off"
}
```

- **Impact weighting**: each high-impact change gets its own entry (bold title +
  1–2 sentences + short hash like `(abc1234)`); all trivial changes are bundled
  under a final `### Other misc changes` section, aggregated aggressively.
  Coverage is proportional to impact.
- **`size`**: `L` significant (breaking/major feature/security), `M` notable,
  `S` only minor/trivial. The model is only ever sent windows with activity, so
  it never returns `N`; an out-of-range value is coerced to `M`, and a stray `N`
  to `S`.

### Triage — response object

```json
{ "high": ["abc1234", "def5678"] }
```

Short hashes of the high-impact commits (possibly empty).

## Output article format

`writeArticle` emits YAML frontmatter followed by the Markdown body. Daily
fields: `date`, `repo`, `size`, `title`, `excerpt`, `commits`. Period articles
additionally carry `period`, `slug` (URL id), and `period_label`. String values
are quoted and `"`-escaped.

## Tuning constants (`digest/main.ts`)

| Constant                  | Value | Effect                                            |
| ------------------------- | ----- | ------------------------------------------------- |
| `MAX_COMMITS`             | 300   | Max commits read per repo/day.                    |
| `MAX_FILES_PER_COMMIT`    | 25    | Max file stats captured per commit.               |
| `TRIAGE_BYPASS_THRESHOLD` | 10    | At/below this commit count, skip the triage call. |
| `MAX_DIFF_COMMITS`        | 8     | Max commits that get a diff attached per day.     |
| `MAX_DIFF_LINES`          | 120   | Per-commit diff line cap.                         |
| `MAX_DIFF_LINE_CHARS`     | 500   | Per-line char cap (clamps bundled/minified lines).|
| `DIFF_EXCLUDE`            | —     | Path patterns whose diffs are dropped.            |

Diffs dominate token cost, so they are bounded by both count and per-commit
size; the triage call itself is comparatively cheap.
