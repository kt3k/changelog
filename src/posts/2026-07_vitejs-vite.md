---
date: 2026-07-31
repo: vitejs/vite
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Vite 8.1–8.2 sharpen HMR, config, and SSR behavior"
excerpt: "July focused on correctness: top-level input, bundled-dev HMR, SSR stack traces, native config warnings, and a string of CSS/import fixes."
commits: 119
---

### Major runtime and build correctness improvements
**Top-level `input` support** — Vite added a top-level `input` option that now feeds build, SSR, library mode, and dep scanning, simplifying non-HTML apps and later fixing plugin-resolved inputs so they aren’t forced to absolute paths too early.

**Bundled-dev gets a big HMR overhaul** — The new bundled-dev path gained a separate HMR client entry, safer reload/rebuild sequencing, better failure reporting to the terminal, and guards against duplicate `buildEnd`/reload behavior and stale updates across restarts.

**CSS and chunk output fixes** — Several build regressions were fixed around CSS chunk import maps, preload helper rewriting, `chunkImportMap` handling, CSS URL rebasing after late PostCSS injection, and preserving the correct preload target for nested dynamic imports.

**Native config compatibility checks improved** — Vite now warns more precisely about native-loader incompatibilities, skips checks for virtual modules and when warnings are explicitly ignored, and reports file:line:column locations to make fixes easier.

### SSR and dev-server reliability
**SSR stack traces are more accurate** — Multiple fixes tightened SSR sourcemap handling so first-line columns, wrapped calls, and `switch`-case scoping now match expected runtime behavior, while also surviving Buffer-less realms and frozen `Object.prototype`.

**Dev server startup and filesystem handling** — The optimizer no longer races ahead of server init, config inputs are added to `server.fs.allow`, and root paths are realpathed to avoid symlink-related cache/output mismatches.

**Watcher and platform fixes** — Windows root unwatching was fixed, shebang handling was hardened for injected CSS and unusual line terminators, and StackBlitz got a targeted preload-helper workaround.

### Dependency, ecosystem, and toolchain updates
**Legacy and CSS ecosystem updates** — plugin-legacy was refactored around shared polyfill loaders, now prefers Oxc minification where possible, and keeps legacy syntax conservative during minification. Vite also updated to postcss-modules v9 and exported typed PostCSS config support.

**Optimizer and module interop improvements** — The dep optimizer learned more lockfile layouts, prefers common lockfiles first, and fixed dynamic import interop for CJS/ESM edge cases and plugin-injected imports inside optimized deps.

**Release and template churn** — The month included 8.1.3, 8.1.4, 8.1.5, 8.2.0 beta, and 8.2.0 releases, plus create-vite template updates, new React Compiler templates, and assorted dependency bumps across the repo.

### Other misc changes
**Docs and tests** — Numerous docs clarifications landed for `server.cors`, `build.lib.formats`, `cacheDir`, config debugging, static deploy links, and team/about pages, alongside new regression coverage for HMR, SSR, CSS, asset resolution, and `assetsInclude` edge cases.
