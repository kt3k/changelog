---
date: 2026-06-15
repo: vitejs/vite
size: L
title: "Vite beta ships chunk import maps"
excerpt: "Vite 8.1.0-beta.0 lands chunk import maps and create-vite now defaults React templates to Oxlint."
commits: 7
authors: [sapphi-red]
commit_authors: {"dc39110": sapphi-red, "5deed20": sapphi-red, "456901b": sapphi-red, "e180312": sapphi-red}
---

### **Chunk import maps arrive for faster cache reuse** (e180312)
Vite adds an experimental `build.chunkImportMap` option that emits an import map and switches generated chunk imports to stable chunk IDs. That reduces cascading cache invalidation for JS chunks and is documented across build, plugin, and backend integration guides.

### **create-vite now uses Oxlint by default for React templates** (456901b)
React templates were reworked to scaffold with Oxlint by default, with a new `--eslint` opt-in for users who want ESLint instead. The CLI, templates, help text, and tests were updated accordingly, changing the default linting stack for new React projects.

### **Vite and plugin-legacy are cut for 8.1.0-beta.0** (5deed20, dc39110)
Both packages were version-bumped and their changelogs updated for the beta release. This packages the day’s feature work into prerelease artifacts for adoption and testing.

### Other misc changes
- Renovate/pnpm workspace policy updates (1 commit)
- Non-major dependency bumps (2 commits)
- create-vite dependency version refreshes
