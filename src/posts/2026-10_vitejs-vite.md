---
date: 2026-10-31
repo: vitejs/vite
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Vite hardens dev/build pipelines and modernizes scaffolding"
excerpt: "October brought URL, HMR, SSR, and fs-serve fixes, plus TS 7 adoption work and create-vite template updates."
commits: 128
---

### Dev server, HMR, and bundled-dev got sturdier
Vite spent much of the month tightening development-time behavior: restart races were fixed, watcher and upgrade-socket crashes were removed, and bundled-dev HMR became far more capable. Support expanded for partial export acceptance, orphaned-module handling, better CSS updates, and deterministic reloads when a boundary can’t be rerun. Bundled-dev also got safer client serving, correct asset URL handling, improved source-map-based error stacks, and closer parity with normal dev for CSS and env behavior.

### URL, alias, and base-path handling was refactored and corrected
A broad pass over request and module URL logic reduced duplicated path handling and fixed a long list of edge cases. Vite now handles subpath imports with `#` and `?`, applies base-path stripping more precisely, respects `server.origin` for emitted URLs, normalizes HTML filename/proxy generation, and centralizes dev URL conversion through shared helpers. Alias resolution and static serving were also tightened to preserve literal `$` sequences, avoid partial path matches, and prevent incorrect prefix collisions.

### Build, SSR, and preload output became more correct
Build output saw several correctness fixes around import maps, preloads, sourcemaps, and CSS. Vite now keeps chunk import maps aligned with `base`, tracks preload dependency changes in hashes, avoids duplicate or incomplete CSS preload data, and preserves CSS dependencies when dynamic imports carry query/hash suffixes. SSR work included top-level `input` inheritance, webworker external builtin handling, faster inline sourcemap extraction, and environment-correct sourcemap selection across transforms.

### Filesystem and optimizer checks were tightened
The dev server and optimizer got a series of security and correctness fixes: fs-serve now blocks more sensitive query flags including WASM instance access, safe-module tracking stores resolved ids instead of URLs, and dependency scanning better discovers deep imports in custom extensions and JSX inject paths. Cache and lockfile detection were also improved, including more reliable Yarn lockfile hashing and more accurate optimized-dependency cache-dir matching.

### Tooling and scaffolding moved forward
The repo modernized its toolchain with TypeScript 7 adoption work, Oxlint migration, and multiple dependency refreshes, while keeping compatibility guardrails for templates and editor tooling. create-vite was updated to print its version, better scaffold TanStack presets, refresh templates, and juggle TS 6/7 defaults depending on ecosystem constraints. Several patch releases for both Vite and create-vite were shipped throughout the month.

### Other misc changes
- Dev-server logging and cleanup improvements, including watcher error reporting and memory retention fixes
- CSS fixes for `url()` parsing, adopted-style HMR, preload listener cleanup, and scope lookup performance
- Release/bookkeeping updates, docs cleanup, workflow bumps, and expanded test coverage across playgrounds and CI
