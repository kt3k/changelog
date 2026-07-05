---
date: 2026-07-04
repo: nodejs/node
size: L
title: "Streams aborts, ESM errors, and VFS fixes"
excerpt: "Abort-aware stream consumers and merge got prompt cancellation, ERR_REQUIRE_ASYNC_MODULE got richer metadata, and VFS now honors current-position sentinels."
commits: 9
authors: [trivikr, aduh95, joyeecheung, vassudanagunta, mcollina]
commit_authors: {"b59def5": trivikr, "b09d07d": trivikr, "a006c5d": joyeecheung, "387332f": trivikr, "cc05d1c": mcollina}
---

### **Stream iter consumers now reject promptly on abort** (b59def5)
Async stream consumers like `bytes()`, `text()`, `arrayBuffer()`, and `array()` now observe abort signals while waiting on a pending read, so they reject with the abort reason instead of stalling until the next batch arrives. The abort-aware iterator wrapper was also moved into shared stream/iter utils so pull paths and consumers use the same behavior.

### **`merge()` wakes and cleans up correctly on abort** (b09d07d)
The multi-source merge consumer now wakes immediately when its abort signal fires, so pending reads reject instead of waiting for another source to settle. It also avoids awaiting `iterator.return()` cleanup when the primary failure is the abort reason, which matters for sources that may already be stuck in `next()`.

### **`ERR_REQUIRE_ASYNC_MODULE` now carries better diagnostics** (a006c5d)
Node.js restored and expanded metadata for async-module `require()` failures: the error now includes non-enumerable `requireStack` and `topLevelAwaitLocations` properties, and the message can name the required module explicitly. The docs were updated too, and the TLA-printing path now reports locations more clearly for users debugging `require()` of ESM with top-level await.

### **VFS memory files now treat `-1` as current position** (387332f)
`MemoryFileHandle` now recognizes `-1` as the current-position sentinel for reads and writes, matching how `fs.readSync()` normalizes `null` positions. This fixes position handling across the VFS APIs and aligns the in-memory implementation with Node’s file-position semantics.

### **WHATWG streams got a hot-path performance pass** (cc05d1c)
Readable and writable stream internals were refactored to cut per-chunk predicate overhead by collapsing several spec-state checks into single passes and caching state already known to be readable. The TransformStream backpressure promise is now created lazily, reducing allocation work when nobody is waiting.

### Other misc changes
- Task runner shell-escaping fix for single quotes, with tests.
- Removed `envinfo` from CI/workflow jobs.
- Stream/webstreams refactor away from unnecessary optional chaining.
- Doc typo fix in CLI examples.
