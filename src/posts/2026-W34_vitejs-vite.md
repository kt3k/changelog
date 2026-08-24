---
date: 2026-08-23
repo: vitejs/vite
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Vite lands lifecycle hooks, asset URL refactor, and HMR fixes"
excerpt: "A busy week with new plugin teardown hooks, a major asset URL rewrite, and multiple HMR/SSR correctness fixes."
commits: 56
---

### **Plugin lifecycle gets proper teardown hooks**
Vite now exposes `closeServer` and `closePreviewServer` so plugins can clean up after dev/preview servers shut down. `closeServer` also reports whether the stop was a restart or a full shutdown, and the new hooks are documented and tested.

### **Asset URL handling gets a major internal overhaul**
The asset pipeline was reworked to emit and resolve file URLs through Rolldown's `resolveFileUrl` path, with distinct handling for JS, CSS, HTML, wasm, and worker consumers. This is a substantial internal refactor that should make bundled output and URL rewriting more consistent.

### **HMR and SSR correctness improved across cycle-heavy code paths**
Several fixes tightened hot update and module runner behavior: bundled-dev HMR now handles circular imports more safely, SSR module evaluation no longer misclassifies completed imports as cycles, and dynamic worker/HMR URL normalization was simplified. Together, these changes reduce unnecessary reloads and make update propagation more reliable.

### **User-facing runtime fixes and enhancements**
Vite also picked up a handful of notable improvements: computed keys in SSR destructured params are now rewritten correctly, worker URLs preserve custom query params, dead worker bundles can be dropped, and dynamic import support was expanded to cover subpath imports. On the CLI, `--profile [name]` now names CPU profiles, and `server.watch` can accept Rolldown watch options.

### **Other misc changes**
- Lazy bundling now returns clean 500s on trigger failures.
- Windows short-name detection was narrowed to avoid false positives.
- Config root resolution now respects `preserveSymlinks`.
- Config sourcemaps now resolve relative to the sourcemap location.
- Added CSS style-tag minification and expanded regression coverage.
- Updated dependencies, docs, templates, CI/release automation, and assorted cleanup.
