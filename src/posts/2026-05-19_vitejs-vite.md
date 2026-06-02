---
date: 2026-05-19
repo: vitejs/vite
size: S
title: "Fix Sass package root resolution"
excerpt: "Adds a regression test showing Sass should ignore package.json main and resolve index.scss at the package root."
commits: 1
authors: [sapphi-red]
commit_authors: {"ebf39a0": sapphi-red}
---

### Other misc changes
- Regression test for Sass package resolution around `main` vs `index.scss` (ebf39a0)
- Exported CSS resolver helpers for test coverage/internal reuse (ebf39a0)
- Added Sass fixture package and ignore rules for the new test (ebf39a0)
