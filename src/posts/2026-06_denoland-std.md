---
date: 2026-06-30
repo: denoland/std
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Std adds new stable APIs and broadens runtime compatibility"
excerpt: "June shipped new stable collection, async, XML, and HTTP APIs plus nightly CI and cross-runtime path/test fixes."
commits: 18
---

### **Major API additions and stability upgrades**
June was focused on expanding std’s surface area while stabilizing existing modules. Collections gained a new stable `zip` helper for any iterables, `distinctBy` now receives the element index, and several iterable helpers had their index arguments standardized before removing unstable aliases. The async package also promoted `Channel` to stable and moved it out of `async/unstable_channel.ts`.

### **XML and HTTP modules got more powerful and explicit**
The XML package added `parseXmlRecords`, a higher-level streaming API for turning callback-based XML parsing into async record generation. In HTTP, problem-details handling was split into clearer entry points: `parseProblemDetails` for plain objects and `parseProblemDetailsResponse` for `Response` bodies. `createProblemDetailsResponse` also now supports `statusText` and stricter status validation.

### **Data structures were extended for richer use cases**
`IndexedHeap` was significantly reworked to support generic priority types with a comparator, plus `set()` upsert behavior. This turns it from a numeric min-heap into a more flexible priority structure suitable for max-heaps and tuple-ordered priorities.

### **Compatibility work widened std beyond Deno**
Path tests and helpers were updated for Node.js and Bun compatibility, including UNC path handling improvements and `process.cwd()`-based test adjustments. The test suite was also refreshed for newer Deno v2.9 behavior, keeping snapshots and crypto-related assertions in sync with runtime changes.

### **CI and maintenance improved baseline stability**
A new nightly workflow now runs the full test/lint/format suite every day against stable v2.x and canary Deno, opening or updating an issue when regressions appear. This should catch runtime breakage earlier even when the repo is otherwise quiet.

### Other misc changes
- YAML stringification now preserves astral Unicode characters like emoji literally.
- ProgressBarStream tests were sped up by removing randomized delays.
- Release and CI workflows were refreshed, including `actions/checkout` v7 and version-bump workflow updates.
- Small matcher, Codecov, and labeler polish landed across the repo.
