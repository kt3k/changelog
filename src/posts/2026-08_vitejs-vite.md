---
date: 2026-08-31
repo: vitejs/vite
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Bundled dev matures, asset pipeline shifts, and create-vite adds nub"
excerpt: "August brought bundled-dev stabilization, a major asset URL refactor, new plugin lifecycle hooks, SSR/HMR fixes, and create-vite nub support."
commits: 120
---

### Bundled dev moves from experiments to solid footing
Bundled dev saw the biggest month of work: runtime injection was cleaned up so server values are no longer baked into bundles, HTML now loads the dev client earlier, and the old lazy-stub workaround was removed. Coverage was also expanded across CSS, assets, sourcemaps, HMR, workers, and other edge cases, which should make the mode much more reliable in real apps.

### Asset URLs, workers, and HMR got a major internal refresh
Vite reworked asset URL handling to route file references through Rolldown’s `resolveFileUrl` flow, with separate treatment for JS, CSS, HTML, wasm, and workers. In the same area, worker URLs now preserve custom query params and drop stale bundles, HMR URL handling was simplified, and the asset pipeline changes lay groundwork for more consistent bundled output.

### New lifecycle hooks and better plugin cleanup
Plugins now get `closeServer` and `closePreviewServer` hooks, with restart-vs-shutdown context for dev cleanup. The month also tightened resource management in optimizer and bundler paths by ensuring temporary Rolldown bundles are closed after generation.

### User-facing fixes and build behavior improvements
Several important fixes landed across core: `port: 0` now resolves to a stable reused port, `define` replacements work for `$`-prefixed keys, `parseSrcset` preserves newline-separated candidates, timestamp query stripping no longer mangles similar params, and Windows short-name detection was narrowed to avoid false positives. CSS minification also stopped re-running Lightning CSS visitors, and `chunkImportMap` now behaves correctly with shared plugins.

### SSR, module runner, and symlinked projects were hardened
SSR got a fix for computed keys in destructured params, the module runner stopped misclassifying completed imports as circular HMR dependencies, and config root resolution now respects `preserveSymlinks`. Sourcemap handling for nested config files was also corrected, improving debugging for real-world setups.

### create-vite and docs kept pace
create-vite 9.2.0 added first-class nub package manager support, including command resolution updates. Docs were refreshed throughout the month for Baseline terminology, Rolldown wording, plugin cleanup hooks, CSS target precedence, deployment policy, and various API clarifications.

### Other misc changes
Dependency refreshes landed repeatedly across Vite, Rolldown, docs tooling, templates, and playgrounds; release/version bumps and CI/workflow cleanup continued; and a few small refactors and test adjustments trimmed dead code and stabilized flaky coverage.
