---
date: 2026-08-06
repo: vitejs/vite
size: M
title: "Vite fixes porting, sourcemaps, and build chunks"
excerpt: "Notable fixes for server port reuse, CSS minification, and chunk import maps; plus a bundled-dev sourcemap test expansion."
commits: 8
authors: [sapphi-red, h-a-n-a, BlankParticle, lazerg, dfedoryshchev]
commit_authors: {"fddf4ea": BlankParticle, "de041a7": lazerg, "15f0307": sapphi-red, "c2155fe": h-a-n-a}
---

### **Server now picks a stable random port for `port: 0`** (fddf4ea)
When Vite is started with an ephemeral port, it now selects one concrete port and reuses it across all wildcard interfaces and on restart. This avoids inconsistent host binding behavior and makes port 0 startup/restart semantics reliable.

### **CSS minify no longer reruns Lightning CSS visitors** (de041a7)
The minifier now explicitly clears Lightning CSS `visitor`/`customAtRules` hooks during the minify pass so transforms only run once, not again while minifying. That prevents duplicate side effects and fixes incorrect visitor behavior in builds.

### **`chunkImportMap` works correctly with shared plugins** (15f0307)
The build pipeline now reads `chunkImportMap` from the client environment instead of the top-level build config, which fixes shared-plugin builds where client and SSR settings diverge. The legacy plugin was updated to match, and new tests cover per-environment emission and asset-less builds.

### **Bundled-dev sourcemaps are now exercised in tests** (c2155fe)
The bundled-dev test suite was expanded to cover sourcemap playgrounds, including CSS, JS, Lightning CSS, workers, and plugin container mapping behavior. This mainly hardens a previously fragile area and verifies source maps are preserved in the bundled-dev path.

### Other misc changes
- Release/version bumps for `vite` and `@vitejs/plugin-legacy`.
- Playground test polling adjustments for HMR/CSS race conditions.
- Docs tweak for `build.minify` default wording.
