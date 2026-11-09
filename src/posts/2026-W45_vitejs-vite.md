---
date: 2026-11-08
repo: vitejs/vite
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: M
title: "Vite tightens build correctness and ships patch releases"
excerpt: "This week focused on optimizer/build fixes, safer dev-server HTML output, and patch releases across Vite, create-vite, and plugin-legacy."
commits: 16
---

### Build and optimizer correctness
**Subpath imports now resolve in the dep optimizer** — Vite’s optimizer recognizes `#` package import specifiers and routes them through the normal resolver, improving support for `package.json` `imports` maps.

**Chunk import hashes are now stable across temp directories** — Build output now uses stable module IDs instead of path-sensitive build-folder data, reducing flaky hashes and avoiding unnecessary cache misses when projects move between folders.

**pnpm install metadata no longer invalidates task caching** — `.modules.yaml` is ignored as a task input, so pnpm’s own metadata churn won’t force rebuilds.

### Runtime and HTML fixes
**Nested worker assets are preserved during bundling** — Worker emission now keeps assets reachable from the root bundle even if an intermediate importer gets tree-shaken, fixing a subtle nested-worker build regression.

**HTML tag cleanup handles first-line edge cases** — The HTML plugin now avoids miscalculating empty leading content, which prevented adjacent tags at the top of a document from being left behind incorrectly.

**Dev-server HTML output is safer** — Redirected base URLs and injected proxy script URLs are now escaped before being emitted, hardening middleware output against malformed characters.

### Releases and docs
**Patch releases shipped for the core toolchain** — Vite was released as 8.3.6, `create-vite` as 9.3.4, and `@vitejs/plugin-legacy` as 8.2.4, keeping the ecosystem aligned with the latest maintenance fixes.

**Docs clarified `server.fs.deny` behavior** — The config docs now spell out that setting `server.fs.deny` replaces the default deny list instead of merging with it.

### Other misc changes
- Dependency refreshes across core, docs, playgrounds, and starter templates
- Rolldown ecosystem and lockfile updates, plus CI/container maintenance
- Test teardown refactor to use shared `onTestFinished` helpers across multiple suites
- Minor docs/UI polish and release-note maintenance
