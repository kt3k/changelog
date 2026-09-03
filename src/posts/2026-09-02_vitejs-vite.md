---
date: 2026-09-02
repo: vitejs/vite
size: M
title: "Vite adds top-level tsconfig support"
excerpt: "Vite beta release ships a new top-level tsconfig option alongside docs, tests, and a workspace release-age tweak."
commits: 4
authors: [btea, sapphi-red]
commit_authors: {"b120589": btea, "db45bb1": btea, "93164c3": sapphi-red}
---

### **Top-level `tsconfig` option lands** (93164c3)
Vite now supports configuring a project-wide `tsconfig` path, overriding per-file discovery when needed. The change is wired through config resolution and build/Rolldown integration, with docs warning that automatic discovery is still the preferred default.

### Other misc changes
- Release `v8.3.0-beta.0` and update package version/changelog (1c46db5)
- CONTRIBUTING.md clarification for Playwright debugging (b120589)
- Enable `minimumReleaseAgeExcludePrune` in pnpm workspace (db45bb1)
