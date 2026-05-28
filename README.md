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
deno task digest                  # yesterday (UTC)
deno task digest --date 2026-05-20
deno task digest --repo denoland/deno
deno task digest --dry-run        # print the LLM prompt, no API call
deno task digest --triage-model gpt-5.4-nano --write-model gpt-5.4-mini
```

Models are configurable via `OPENAI_TRIAGE_MODEL` (default `gpt-5.4-nano`) and
`OPENAI_WRITE_MODEL` (default `gpt-5.4-mini`), the CLI flags above, and the API
endpoint via `OPENAI_BASE_URL`.

## Preview the site

```sh
deno task serve   # http://localhost:3000
deno task build   # outputs to _site/
```

## Deploy (GitHub Pages)

The `Digest` workflow runs at 06:00 UTC: it generates the daily digest (plus a
weekly rollup on Mondays and a monthly one on the 1st), commits any new posts,
builds the site, and deploys to Pages. To enable it:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add an `OPENAI_API_KEY` repository **secret**.
3. (Optional) set `OPENAI_TRIAGE_MODEL` / `OPENAI_WRITE_MODEL` repository
   **variables**.

Trigger a manual run from the Actions tab (`workflow_dispatch`) to test.
