# Changelog

A daily, impact-weighted digest of the open-source repositories you care about.

Each day a GitHub Action clones every watched repo, reads the previous day's
commits, and uses an LLM to write a short summary per repo — high-impact changes
get individual write-ups, everything trivial is bundled under _"Other misc
changes."_ A cheap triage model first picks the high-impact commits whose real
diffs are then fed to the write model, so the summaries are grounded in the
actual code change. The summaries are published as a [Lume](https://lume.land)
site in an Edition-style reading layout.

See [`digest/SPEC.md`](digest/SPEC.md) for the full digest-script spec.

## How it works

```
repos.yml ──▶ digest/main.ts ──▶ src/posts/<date>_<owner>-<repo>.md ──▶ Lume site ──▶ GitHub Pages
              (git clone + git log + 2-pass LLM)
```

## Configure which repos to watch

Edit `repos.yml`:

```yaml
repos:
  - denoland/deno
  - repo: lumeland/lume
    branch: main # optional, defaults to the default branch
```

## Run the digest locally

```sh
export OPENAI_API_KEY=sk-...
export GH_TOKEN=$(gh auth token)  # or GITHUB_TOKEN; needed to resolve authors
deno task digest                  # yesterday (UTC)
deno task digest --date 2026-05-20
deno task digest --repo denoland/deno
deno task digest --period weekly  # weekly/monthly rollup of existing dailies
deno task digest --dry-run        # print the LLM prompt, no API call (no token needed)
deno task digest --triage-model gpt-5.4-nano --write-model gpt-5.4-mini
```

`GH_TOKEN` (or `GITHUB_TOKEN`) is required for real runs — it resolves commit
authors to GitHub logins for avatars, and the run errors early if neither is
set. Only `--dry-run` skips this.

Models are configurable via `OPENAI_TRIAGE_MODEL` (default `gpt-5.4-nano`) and
`OPENAI_WRITE_MODEL` (default `gpt-5.4-mini`), the CLI flags above, and the API
endpoint via `OPENAI_BASE_URL`.

## Preview the site

```sh
deno task serve   # http://localhost:3000
deno task build   # outputs to _site/
```

## Deploy (GitHub Pages)

The `Digest` workflow (`.github/workflows/digest.yml`) runs at 00:10 UTC: it
generates the daily digest (plus a weekly rollup on Mondays and a monthly one on
the 1st) and commits any new posts. It then calls the separate `Deploy` workflow
(`.github/workflows/deploy.yml`), which builds the Lume site and publishes it to
Pages. To enable it:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add an `OPENAI_API_KEY` repository **secret**. (The workflow already passes
   the built-in `GITHUB_TOKEN` for author resolution — no extra setup needed.)
3. (Optional) set `OPENAI_TRIAGE_MODEL` / `OPENAI_WRITE_MODEL` repository
   **variables**.

Trigger a manual run from the Actions tab (`workflow_dispatch`) to test.
