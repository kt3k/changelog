---
date: 2026-08-21
repo: vitejs/vite
size: L
title: "Vite adds lifecycle hooks, asset URL overhaul"
excerpt: "Big day for Vite: new plugin/server teardown hooks, worker and asset URL refactors, plus several HMR and build fixes."
commits: 23
authors: [sapphi-red, shulaoda, btea, bluwy, jurerotar, jamesopstad, Rich-Harris, teamleaderleo, NgoQuocViet2001]
commit_authors: {"8156684": sapphi-red, "92bd2a7": sapphi-red, "e38f29e": sapphi-red, "4366ac4": sapphi-red, "a6c08e1": sapphi-red, "517b97f": jurerotar, "1b5cfe3": shulaoda, "e17d2d5": jamesopstad, "924997a": sapphi-red, "b78e2f1": Rich-Harris, "a500dee": shulaoda, "67a6807": sapphi-red, "8cb872e": teamleaderleo, "6bacc95": NgoQuocViet2001}
---

### **New plugin teardown hooks for dev and preview servers** (e17d2d5)
Vite now exposes `closeServer` and `closePreviewServer` plugin hooks so plugins can clean up resources after the server has already torn down. The new hooks are documented and covered by tests, and `closeServer` distinguishes restart vs. shutdown with a `reason` payload.

### **Workers preserve custom query params and drop dead bundles** (924997a)
Worker handling got smarter: Vite now keeps extra search params attached to worker URLs and adds logic to remove worker chunks when they’re no longer referenced. This reduces stale output and makes worker URL transformations more predictable in real projects.

### **Asset URL handling moved onto `import.meta.ROLLDOWN_FILE_URL_*`** (4366ac4, e38f29e, 92bd2a7, a6c08e1)
Vite’s asset pipeline was reworked to emit and resolve file URLs through Rolldown’s `resolveFileUrl` path, with separate handling for JS, CSS, HTML, wasm, and worker consumers. This is a substantial internal refactor that changes how asset references are represented and rewritten, laying groundwork for more consistent bundled output.

### **Dynamic worker/HMR URL normalization was simplified and fixed** (67a6807, 517b97f)
The HMR and worker URL code paths were cleaned up to remove the old `HmrUrl` concept and better preserve/normalize IDs across client, runner, and import analysis. That includes new coverage for splitting worker requests and a fix for preserving custom search params in worker import URLs.

### **CSS, dynamic import, and CLI gain notable user-facing improvements** (8156684, b78e2f1, a500dee, 1b5cfe3, 6bacc95, 8cb872e)
This batch adds CSS style-tag minification, support for subpath imports in dynamic import statements, and `--profile [name]` for naming CPU profiles. It also improves config/build/dev shutdown behavior and expands `server.watch` to accept Rolldown watch options.

### **Other misc changes**
- CI/release automation updates and bot workflow setup (3 commits)
- Test-only updates and new regression coverage (5 commits)
- Documentation updates for plugins, CLI, server options, and release flow
- Small refactors and internal cleanup, including preload/prettier/ESLint-related chores
