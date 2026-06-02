---
date: 2026-05-13
repo: vitejs/vite
size: S
title: "CI switches pnpm script-blocking setting"
excerpt: "Vite updates release workflows to use pnpm's `allowBuilds` flag when disabling install scripts before publishing."
commits: 1
authors: [sapphi-red]
commit_authors: {"84b05b5": sapphi-red}
---

### Other misc changes
- CI/workflow tweak: replaced `onlyBuiltDependencies = []` with `allowBuilds[]=false` in preview-release and publish jobs (84b05b5).
