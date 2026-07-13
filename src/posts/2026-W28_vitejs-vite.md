---
date: 2026-07-12
repo: vitejs/vite
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: M
title: "Vite tightens startup, legacy, and SSR behavior"
excerpt: "This week brought legacy polyfill and minifier updates, SSR stack trace fixes, a dep optimizer race fix, and several build/tooling cleanups."
commits: 25
---

### Core runtime and SSR correctness
**Dep optimizer startup race fixed** — Vite now avoids kicking off transform-triggered optimization before `init()` completes, preventing a crash during server startup and keeping optimizer metadata stable.

**SSR stack traces now align better with Node** — Source map column handling for wrapped imported calls was adjusted so SSR errors point at the callee start instead of the parenthesized call-site column, improving debuggability.

**Windows watcher cleanup fixed** — A chokidar patch normalizes paths when adding/removing file closers, fixing unwatch behavior for deleted root directories on Windows.

### Legacy plugin and CSS pipeline updates
**Legacy polyfill loading was refactored** — `plugin-legacy` now uses a shared loader for `babel-plugin-polyfill-corejs3` and `babel-plugin-polyfill-regenerator`, making polyfill injection/detection clearer and easier to maintain.

**Legacy plugin prefers Oxc minification when available** — The plugin now uses Vite’s Oxc minifier on supported Vite versions and falls back to Terser for older/explicit compatibility cases.

**postcss-modules upgraded to v9** — Vite updated its CSS modules dependency and adjusted typings to match the new release.

### Build, CLI, and test tooling cleanup
**CLI and build resolution shed dynamic imports** — Core startup paths now import `createBuilder` and `resolveBuildPlugins` directly, reducing indirection in the CLI and plugin resolution flow.

**Rolldown logging config was simplified and updated** — The build setup dropped an extra custom log hook while switching to the newer `onLog` API to keep circular-dependency filtering working.

**Test harness avoids noisy dependency scans** — Node test fixtures now disable dependency discovery when starting the dev server, preventing `server.listen()` from scanning all HTML fixtures and speeding up test startup.

### Docs and site updates
**Server CORS docs were corrected** — `server.cors` now documents the real localhost-matching default instead of `false`.

**Team page gained an Advisors section** — The site now includes an Advisors section with three members and updated team data/imports.

### Other misc changes
- Release/version bumps, changelog updates, and dependency maintenance
- Minor docs fixes for proxy/static deploy examples and Rolldown guidance
- StackBlitz-specific build workaround for preload helper output
- Removed an obsolete pnpm workspace exclusion
