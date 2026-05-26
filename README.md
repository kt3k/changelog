# Changelog

A daily, impact-weighted digest of the open-source repositories you care about.

Each day a GitHub Action clones every watched repo, reads the previous day's
commits, and uses an LLM to write a short summary per repo — high-impact changes
get individual write-ups, everything trivial is bundled under *"Other misc
changes."* The summaries are published as a [Lume](https://lume.land) site in an
Edition-style reading layout.

## How it works

```
repos.yml ──▶ scripts/digest.ts ──▶ src/posts/<date>_<owner>-<repo>.md ──▶ Lume site ──▶ GitHub Pages
              (git clone + git log + LLM)
```

## Configure which repos to watch

Edit `repos.yml`:

```yaml
repos:
  - denoland/deno
  - repo: lumeland/lume
    branch: main      # optional, defaults to the default branch
```

## Run the digest locally

```sh
export OPENAI_API_KEY=sk-...
deno task digest                  # yesterday (UTC)
deno task digest --date 2026-05-20
deno task digest --repo denoland/deno
deno task digest --dry-run        # print the LLM prompt, no API call
```

Model is configurable via `OPENAI_MODEL` (default `gpt-5.4-mini`) and the API
endpoint via `OPENAI_BASE_URL`.

## Preview the site

```sh
deno task serve   # http://localhost:3000
deno task build   # outputs to _site/
```

## Deploy (GitHub Pages)

The `Daily digest` workflow runs at 06:00 UTC, commits any new posts, builds the
site, and deploys to Pages. To enable it:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add an `OPENAI_API_KEY` repository **secret**.
3. (Optional) set an `OPENAI_MODEL` repository **variable**.

Trigger a manual run from the Actions tab (`workflow_dispatch`) to test.
