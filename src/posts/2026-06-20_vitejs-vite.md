---
date: 2026-06-20
repo: vitejs/vite
size: S
title: "Vite drops an unused URL helper"
excerpt: "A single cleanup removed the dead `removeRawQuery` utility from Vite's internal URL helpers."
commits: 1
authors: [shulaoda]
commit_authors: {"403cc60": shulaoda}
---

### Other misc changes
- Removed an unused internal URL helper, `removeRawQuery`, from `packages/vite/src/node/utils.ts` (403cc60).
