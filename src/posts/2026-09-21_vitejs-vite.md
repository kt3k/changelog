---
date: 2026-09-21
repo: vitejs/vite
size: S
title: "Vite trims duplicate build config wiring"
excerpt: "A small refactor removes duplicated Rolldown build options from Vite’s internal build path."
commits: 1
authors: [btea]
commit_authors: {"9abd99b": btea}
---

### Other misc changes
- Refactor: removed duplicate `output` and `external` wiring from `resolveRolldownOptions` in `build.ts` (9abd99b).
