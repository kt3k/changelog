---
date: 2026-06-21
repo: microsoft/typescript-go
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Declaration emit, native preview API, and watch mode get major polish"
excerpt: "This week tightened `.d.ts` generation, expanded the native-preview API, overhauled watch builds, and fixed crashes in tsconfig and auto-imports."
commits: 16
---

### Declaration emit got several correctness fixes
**`.d.ts` output is now more faithful in tricky export and method cases** — The emitter fixed class-expression naming for CJS exports, preserved modifier order for private JS methods, removed duplicate `| undefined` wrapping, re-allowed nested CommonJS export assignments, and deduplicated `this`-assigned methods. Together these changes close a cluster of declaration-generation regressions around anonymous classes, expando patterns, and synthesized members.

### Native preview API and tooling were expanded
**The preview API now carries more type information with less churn** — Signature objects are exposed end-to-end, client-side caching now covers symbols, types, signatures, and type lists, and cached `SourceFile`s keep API node tables across snapshots. Empty-string literal values are also serialized correctly, making API responses more reliable for literal types.

**Editor and packaging support improved** — The native preview gained Sort Imports and Remove Unused Imports commands, and package generation now includes `NOTICE.txt` in the main native preview artifacts.

### Build watching was substantially reworked
**Build mode now rides on the new `fswatch`/watchmanager plumbing** — Watching was refactored away from timestamp tracking, changing how file/config updates and watcher races are handled. The week also included broad baseline updates to lock in the new behavior.

### Stability fixes across core workflows
**Several crashy edge cases were removed** — Auto-import no longer crashes in the alias resolver, and `tsconfig` parsing no longer panics when extending an empty config file.

**Filesystem and Unicode-related behavior is more predictable** — Auto-import cleanup now drops stale `node_modules` buckets when folders disappear, and JS casing tables are pinned to generated Unicode data so casing behavior stays aligned with the repo’s Unicode version.

### Other misc changes
- Added documentation note for `tsc` on TypeScript 7.0 RC and later
- Expanded tests and refreshed baselines for snapshot caching, auto-imports, declaration emit, watch mode, Unicode casing, and config parsing
