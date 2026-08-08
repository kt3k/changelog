---
date: 2026-08-07
repo: vitejs/vite
size: S
title: "Docs refresh for Baseline and deployment rules"
excerpt: "Vite's docs were updated for the new Baseline wording, plus a couple of guide clarifications and a new static deploy rule."
commits: 4
authors: [dogledogle, bluwy, sapphi-red]
commit_authors: {"57fea00": bluwy, "6a33398": dogledogle, "e2d4749": dogledogle, "7e221fc": sapphi-red}
---

### Other misc changes
- Docs updated to use the new Baseline website/terminology across build, browser-support, and migration guidance (1 commit, 7e221fc).
- Added a new static-deploy platform requirement: hosts must have been in operation for at least one year, with proof requested in PRs (57fea00).
- Fixed an API docs typo and clarified `waitForRequestsIdle` wording (6a33398).
- Added an `@rollup/plugin-swc` import to the migration workaround example (e2d4749).
