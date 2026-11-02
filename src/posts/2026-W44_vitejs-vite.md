---
date: 2026-11-01
repo: vitejs/vite
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: M
title: "Vite tightens dev/build correctness across assets, SSR, and CSS"
excerpt: "This week fixed URL and CSS edge cases, hardened dev-server restrictions, improved SSR entry handling, and added build/runtime cleanup and sourcemaps."
commits: 19
---

### Asset handling and CSS correctness
**URL watching now covers query/hash asset refs** — `new URL(..., import.meta.url)` references with `?query` or `#hash` are now watched correctly in dev, preventing stale updates.

**Build keeps CSS deps for dynamic imports with query/fragments** — import analysis now preserves CSS dependencies even when chunk URLs gain search/hash suffixes, avoiding dropped CSS in library and lazy-loaded builds.

**Preload listeners are cleaned up after settle** — stylesheet preload handlers are removed once loading finishes, preventing lingering `load`/`error` listeners.

### Dev server and filesystem hardening
**WASM imports respect `server.fs` restrictions** — `.wasm` imports now follow the same access rules as other restricted assets and return 403 when outside the allowed filesystem scope.

**Console forwarding escapes unsafe terminal sequences** — browser logs sent through `server.forwardConsole` are now sanitized against BEL/C1 controls and unsupported escapes while keeping normal styling intact.

### Build, SSR, and plugin lifecycle fixes
**SSR builds now inherit the top-level input** — `build.ssr: true` now applies the configured entry input to the SSR environment, closing a gap between build config and SSR output.

**Rolldown import-meta transforms now emit sourcemaps** — `import-meta-current-dirname` transforms and chunk rewrites now carry source maps for better debugging.

**Plugin container shutdown is now race-safe** — concurrent `pluginContainer.close()` calls share the same in-flight promise, avoiding double cleanup and overlapping teardown issues.

### Tooling and performance improvements
**Optimized dep cache detection is more precise** — cache-file/url detection now keys off the real cache dir and handles trailing slashes correctly, avoiding false positives from similarly named folders.

**CSS scope lookup is faster during chunk rendering** — repeated rendered-module scans were replaced with cached lookups, reducing build-time overhead on larger outputs.

**create-vite moves forward on TypeScript templates** — new templates prefer TS 7 where possible, while preserving TS 6 for `--eslint` compatibility and related scaffolding constraints.

### Other misc changes
**Maintenance and release updates** — create-vite patch releases, template packaging fixes, dependency bumps, CI/workflow updates, and small docs/test cleanup.
