---
date: 2026-05-21
repo: vitejs/vite
size: M
title: "Vite 8.0.14 lands with HTML and glob fixes"
excerpt: "Vite ships 8.0.14, fixes trailing-slash HTML processing and glob imports outside root, plus dependency updates including a rolldown bump."
commits: 7
authors: [shulaoda, sapphi-red, Caltsic]
commit_authors: {"c917f1e": sapphi-red, "ec64896": shulaoda, "5d94d1b": Caltsic, "96efc88": shulaoda}
---

### **Vite 8.0.14 released with targeted bug fixes** (c917f1e)
The repo bumped `vite` to 8.0.14 and rolled in fixes for `transformIndexHtml` on trailing-slash URLs and `import.meta.glob` with an absolute base pointing outside the project root. These are correctness fixes that unblock real-world routing and asset-loading edge cases.

### **Rolldown updated to 1.0.2 across the repo** (96efc88)
Core package manifests were updated to `rolldown` 1.0.2, and the change also refreshed sourcemap-related test expectations. This keeps Vite aligned with the latest bundler/runtime behavior and may affect build output fidelity.

### **HTML transform now respects trailing-slash directory paths** (5d94d1b)
`transformIndexHtml` now distinguishes a directory URL ending in `/` from a file path when resolving relative URLs, avoiding bad pre-transform paths. The added SSR playground coverage verifies both pre-transform behavior and actual loading from a trailing-slash directory.

### **Glob import handles absolute bases outside root** (ec64896)
A new playground test covers `import.meta.glob(..., { base: '/' })` resolving files outside the app root, confirming the imported module map stays correct. This protects a niche but important path where globbed modules live outside the served root.

### Other misc changes
- Security dependency bump: `ws` to 8.20.1.
- Dependency and tooling updates: `lint-staged`, `@types/node`, `oxfmt`, `playwright-chromium`, `tsx`, `@shikijs/vitepress-twoslash`, `vue-tsc`, and related lockfile/workflow refreshes.
- CI workflow action version bumps for pnpm and zizmor.
