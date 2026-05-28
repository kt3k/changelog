---
date: 2026-05-10
repo: oven-sh/bun
size: S
title: "Forks blocked from auto-update PRs"
excerpt: "Bun’s dependency update workflows now only run in the upstream repo, preventing noisy automation on forks."
commits: 1
authors: [190n]
commit_authors: {"03ebdf8": 190n}
---

### Other misc changes
- Guarded 11 auto-update GitHub Actions workflows so they only run in `oven-sh/bun` (03ebdf8), stopping forked repos from spawning their own update PRs.
