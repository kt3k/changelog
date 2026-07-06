---
date: 2026-07-05
repo: denoland/std
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Std adds stable primitives and broad runtime compatibility"
excerpt: "New stable async/channel and zip APIs, richer IndexedHeap and XML record streaming, plus path/problem-details compatibility improvements."
commits: 20
---

### Major API growth and stabilization
**Collections and async APIs got sharper**
`zip` is now a stable helper for any iterables, `distinctBy` now receives the element index, and several iterable helpers standardized index arguments while dropping unstable aliases. `Channel` also graduated to a stable home in `async/channel.ts`.

**IndexedHeap became a more general priority structure**
`IndexedHeap` now accepts generic priority types with a comparator and adds `set()` upsert behavior, letting it model max-heaps and tuple-ordered heaps instead of only numeric min-heaps.

**XML gained record-oriented streaming**
A new `parseXmlRecords` API turns callback-driven XML parsing into an async-generator workflow for assembling higher-level records, extending the package beyond tree parsing and low-level callbacks.

**HTTP problem-details parsing was split and hardened**
The problem-details module now separates object parsing from `Response` parsing, and `createProblemDetailsResponse` gained `statusText` support with stricter status validation. This is the week’s clearest public API reshaping.

### Compatibility and reliability improvements
**Path utilities are behaving better across runtimes**
`path` coverage expanded under Node and Bun, with fixes for `process.cwd()` test usage and `toFileUrl` handling of UNC-style paths. That should reduce cross-runtime surprises for downstream users.

**Nightly CI now watches stable and canary Deno**
A new scheduled workflow runs the full suite daily against both stable v2.x and canary, opening or updating an issue on failure so regressions are caught sooner.

**YAML output preserves emoji and astral characters**
The YAML dumper now iterates by Unicode code point, so astral characters like emoji are emitted literally instead of being escaped as surrogate halves.

### Other misc changes
- `promptSelect()` now guarantees at least one visible item on tiny terminals.
- Tests were updated for Deno v2.9 behavior and newer snapshot/assert APIs.
- CI/release tooling received maintenance updates, including `actions/checkout` v7 and version-bump workflow changes.
