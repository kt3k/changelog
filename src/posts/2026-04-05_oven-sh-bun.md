---
date: 2026-04-05
repo: oven-sh/bun
size: M
title: "Bun swaps CI scraping for bk-powered helpers"
excerpt: "Replaced the old Buildkite scraping script with thin bk-backed CI commands for finding builds, checking status, logs, and errors."
commits: 1
authors: [dylan-conway]
commit_authors: {"6ecf467": dylan-conway}
---

### **CI tooling modernized around Buildkite CLI** (6ecf467)
Bun replaced the 1,078-line `scripts/buildkite-failures.ts` scraper with a new `scripts/find-build.ts` that shells out to the Buildkite CLI. The new helpers cover finding builds, status, errors, logs, and watch mode, making CI debugging less brittle and easier to maintain.

### Other misc changes
- Added `.bk.yaml` so `bk` defaults to the `bun` org/pipeline.
- Updated CONTRIBUTING docs and CLAUDE guidance for the new CI workflow.
- Rewired `package.json` scripts from `ci` to `ci:find`, `ci:status`, `ci:errors`, `ci:logs`, and `ci:watch`.
