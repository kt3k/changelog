---
date: 2026-08-17
repo: vitejs/vite
size: S
title: "Dependency bumps and config regex cleanup"
excerpt: "Rolldown-related deps were refreshed, docs tooling updated, and a small config regex refactor landed."
commits: 4
authors: [btea, sapphi-red]
---

### Other misc changes
- Updated rolldown-related dependencies across the repo, including `rolldown`, `rolldown-plugin-dts`, `oxc-parser`, and `oxc-minify`.
- Updated docs tooling to VitePress 2.0.0-alpha.19 and `@voidzero-dev/vitepress-theme` 5.0.6, plus a lockfile/workspace policy tweak.
- Replaced inline regex literals with shared constants in Vite's config/native-compat code for maintainability.
