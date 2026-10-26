---
date: 2026-10-25
repo: vitejs/vite
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: M
title: "Vite tightens dev URL/HMR handling and fixes edge cases"
excerpt: "This week improved bundled-dev HMR, SSR/webworker resolution, sourcemap handling, and several alias/import edge cases."
commits: 39
---

### Core dev/runtime correctness
**Bundled-dev HMR got smarter and more deterministic** — Vite fixed several HMR edge cases in bundled dev: orphaned modules no longer keep bubbling updates, and entries that can’t be rerun now trigger a full reload sooner and more reliably.

**Dev URL handling was centralized** — URL conversion and import resolution were refactored around shared ModuleURL/BrowserURL helpers, reducing duplicated logic across client, HTML, SSR, optimizer, and middleware paths.

**Subpath imports and aliasing handle tricky specifiers better** — Package imports now resolve correctly when keys include `#` or `?`, and static alias replacement no longer mangles literal `$` sequences like `$$` or `$&`.

### Build and SSR fixes
**Build hashes now reflect import-map preload changes** — Chunk hash calculation now includes preload dependency membership, preventing stale cache hits when import-map contents change.

**SSR/webworker output is more compatible** — Webworker SSR builds now convert external builtin `require()` calls into ESM imports, avoiding output that can’t run in that environment.

**Sourcemap behavior respects the active environment** — `build.sourcemap` is now read from the current environment config in legacy, CSS, asset URL, and worker URL transforms, fixing mismatches in non-default environments.

### Performance and compatibility
**Inline source map extraction is faster** — SSR now uses a simpler string search instead of regex when extracting inline source maps from generated code.

**Bundled-dev fallback output is safer** — The fallback HTML explicitly declares UTF-8, preventing charset-related corruption in some browsers.

### create-vite/template updates
**TanStack scaffolds and TypeScript templates were adjusted** — create-vite now explicitly selects Vite for TanStack Start/Router presets, and template TypeScript versions were revised several times this week to better match current compatibility expectations.

### Other misc changes
- create-vite 9.3.0 and 9.3.1 releases.
- Dependency bumps across rolldown, eslint/tooling, and assorted playground/test fixture updates.
- Test coverage and flake fixes across bundled-dev, dynamic imports, CSS code-splitting, watch rebuilds, and e2e helpers.
