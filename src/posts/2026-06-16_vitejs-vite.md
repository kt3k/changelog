---
date: 2026-06-16
repo: vitejs/vite
size: S
title: "Rolldown chunk import map option renamed"
excerpt: "Vite now reads `chunkImportMap` from `rolldownOptions` instead of `rollupOptions` in build resolution."
commits: 1
authors: [sapphi-red]
commit_authors: {"8e8816c": sapphi-red}
---

### Other misc changes
- Refactor build option plumbing to use `options.rolldownOptions.experimental.chunkImportMap` instead of the Rollup-side field (8e8816c).
