---
date: 2026-11-22
repo: vitejs/vite
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: M
title: "Vite beta sharpens build performance and plugin reliability"
excerpt: "Build pipeline fixes, faster preload handling, sturdier optimizer behavior, and better error/Windows path handling landed this week."
commits: 23
---

### Build pipeline got faster and leaner
**Preload rewrite sourcemaps were optimized** — Vite now shifts sourcemaps during preload URL rewrites instead of retracing them, cutting build overhead.
**Import analysis skips unnecessary work** — Build-time import-analysis now avoids extra processing for chunks that don’t need preload hashing.
**Terser is loaded only when needed** — The terser plugin no longer initializes unless minification actually requires it, reducing build setup cost.

### Build correctness fixes landed across CSS and rollup integration
**Rolldown internals are preserved in transform metadata** — Vite now copies transform hook descriptors so rolldown’s lazy build-only getters survive SSR injection, and the typings expose those meta fields.
**CSS empty-chunk replacement now matches the right file** — Pure CSS chunk post-processing resolves relative paths correctly, avoiding false matches on similarly named chunks.
**Rolldown dependencies were updated** — Workspace packages were bumped to newer rolldown and dts-plugin versions.

### Dev server and optimizer behavior became more robust
**Plugin errors now carry plugin context** — Hook failures are wrapped with plugin name and hook information, making failures easier to trace.
**Server startup cleans up after failure** — If startup hooks fail, Vite now closes the dev server instead of leaving a half-initialized instance behind.
**Overlapping loads no longer discard valid results** — The load pipeline now preserves successful work even when a concurrent load fails, fixing a subtle request race.
**Optimizer respects the top-level tsconfig** — Dependency scanning and optimization now honor the project-level config instead of accidentally using nested tsconfigs.
**Patch edits invalidate optimizer caches correctly** — In-place changes to patch files are now reflected in lockfile hashing.

### Template and platform updates
**Solid templates moved to Solid 2** — `create-vite` now scaffolds Solid 2 packages and the newer plugin stack.
**Windows path casing is preserved** — `safeRealpathSync` keeps drive-letter case intact, preventing path mismatches on Windows.

### Other misc changes
- Fixed HTML entry side-effect tracking when modules are loaded indirectly.
- Added regression tests and playground stabilization for build-watch, HMR, startup cleanup, and load-race cases.
- Misc cleanup in CSS/HTML build conditions, license-plugin gating, and CI/dependency updates.
