---
date: 2026-10-11
repo: vitejs/vite
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: M
title: "Vite tightens bundled dev, HMR, and server path handling"
excerpt: "Patch releases 8.3.3/8.3.4 landed with bundled-dev, HMR, base-path, and asset URL fixes."
commits: 35
---

### **Bundled dev got most of the attention**
Vite spent the week hardening bundled-dev mode: it now serves the client entry correctly, stubs `@vite/env`, fixes CSS HMR to use public `/@vite/client` helpers, supports `acceptExports`, and aligns emitted asset URLs with `server.origin`.

### **Server, base, and filesystem handling were tightened**
Several path-handling bugs were fixed across the dev server and HTML pipeline. Vite now normalizes watched paths before root checks, preserves restart requests during back-to-back server restarts, handles static aliases and base-path stripping more precisely, and normalizes HTML filenames/protocol-relative URLs during `transformIndexHtml`.

### **Build and optimizer correctness improved**
The build pipeline gained fixes for preload deduping and CSS dependency cycles, while `chunkImportMap` now respects non-root bases. On the optimizer side, dependency scanning now catches deep imports in custom extensions like `.svelte`, and lockfile hashing falls back to `yarn.lock` when needed.

### **Security/access-control and SSR safety fixes**
The week also closed a few correctness and access gaps: `?vite-wasm-instance` is now blocked from `fs.serve`, safe-module tracking stores resolved ids instead of URL-derived paths, and bundled-dev output normalization was cleaned up to avoid serving incorrect paths.

### Other misc changes
- Patch releases 8.3.3 and 8.3.4
- CSS adopted-style HMR and other small HMR defaults fixes
- Lightning CSS preprocessor import resolution fix
- Module runner sourcemap cloning perf tweak
- Documentation, CI/playground, and dependency updates
