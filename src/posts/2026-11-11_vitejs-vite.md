---
date: 2026-11-11
repo: vitejs/vite
size: L
title: "Wasm, CSS, and dev runtime gains"
excerpt: "Vite adds source-phase wasm imports, CSS URL subpath imports, worker manifest entries, and fixes bundled dev/runtime edge cases."
commits: 17
authors: [sapphi-red, h-a-n-a, hyfdev, hybrist, btea, guybedford]
commit_authors: {"39d63b8": sapphi-red, "76cb51b": sapphi-red, "d5c79c7": h-a-n-a, "69df8ad": h-a-n-a, "bc6e03c": sapphi-red, "c110663": sapphi-red, "2155e12": sapphi-red, "e719122": sapphi-red, "97bb00f": guybedford}
---

### **Wasm source-phase imports land** (97bb00f)
Vite now supports `import source` and `import.source(...)` for `.wasm` files, returning a `WebAssembly.Module` instead of instantiating it automatically. The implementation also enables the relevant JS string builtins/imported string constants proposals and updates SSR guidance accordingly.

### **CSS `url()` can resolve subpath imports** (c110663)
CSS asset resolution now understands package subpath imports inside `url()` and related forms, including nested Sass cases. That closes a real ergonomics gap for CSS modules/packages and adds broad test coverage for fragment handling and resolver failures.

### **Build manifests now include worker chunks** (bc6e03c)
Worker chunks are now emitted into the build manifest, which matters for backend integrations that need to discover all generated assets. The change updates worker handling and docs so server-side consumers can correctly reference worker outputs.

### **Dev sourcemaps move to `dev.sourcemap`** (76cb51b)
The deprecated `css.devSourcemap` option is replaced by `dev.sourcemap.css`, with a new unified `dev.sourcemap` shape for JS and CSS. This is a config migration with compatibility handling and warnings, but it changes how dev sourcemaps are configured across the board.

### **Bundled dev now loads wasm/compressed assets more correctly** (39d63b8, d5c79c7, 69df8ad)
Bundled preview/dev behavior was tightened around asset serving: wasm can now be served compressed, lazy chunks respect `base`, and the Rolldown dev runtime is simplified to a single served file. Together these fixes reduce 404s and path mismatches in bundled-dev workflows.

### **CSS preload retries after failure** (2155e12)
Failed CSS preloads are now tracked so later preload attempts can retry instead of being permanently skipped. That fixes a subtle but user-visible failure mode when CSS preloading races or transiently fails.

### **`--configLoader` is now a stable two-mode option** (e719122)
The CLI drops the experimental `runner` mode from the public `--configLoader` docs and API surface, leaving `bundle` and `native`. This is a meaningful interface cleanup and signals the option’s stabilization.

### **Other misc changes**
- Rolldown/tsdown/rolldown-plugin-dts dependency bumps and related lockfile updates
- Removed `optimizeDeps.rollupOptions` support and updated merge/compat logic
- Rolldown dev runtime/dts generation refactors
- `preview` profiling filename tweak
- `release: v8.3.8`
- Revert of a recent transform meta change
