---
date: 2026-07-13
repo: nodejs/node
size: M
title: "Node adds probe conditions and EventEmitter fixes"
excerpt: "Inspector probes can now be conditional, while EventEmitter and streams got performance and memory fixes; docs and tests were updated too."
commits: 11
authors: [mcollina, efekrskl, spkapust, panva, joyeecheung, aduh95, sjungwon03, trivikr, pimterry]
commit_authors: {"35115c0": mcollina, "ace91de": mcollina, "8c6cbb8": joyeecheung, "384d7a4": mcollina}
---

### **Inspector probe mode gains per-probe conditions** (8c6cbb8)
`node inspect` now accepts `--cond <expr>` alongside each probe/expression pair, letting you suppress hits unless the condition is truthy at the probe location. That makes probe mode much more usable on hot paths, and the new rules clarify how conditions interact when multiple probes share the same location.

### **EventEmitter stops retaining removed event names** (35115c0)
Removed listener names are no longer kept around as forever-undefined properties on ordinary emitters, avoiding unbounded growth when event names are unstructured. Preallocated emitters still preserve shape mode, so this keeps the performance win without the memory leak.

### **WHATWG stream request queues switch to a ring buffer** (ace91de)
Readable and writable stream request queues now use the shared `Queue` structure instead of plain arrays with repeated `shift()` calls. This removes O(n) queue draining behavior and cuts overhead in common stream reader/writer paths.

### **EventEmitter once/removeListener get faster** (384d7a4)
`once()` now uses a closure instead of a bound state object, and listener removal keeps object shape stable while also outlining a few cold paths for V8 inlining. The change is a broad performance refactor for one of Node's most frequently used subsystems.

### Other misc changes
- Added `net.Socket.server` docs.
- Fixed an MSan warning by zero-initializing credential cap data.
- Updated an Undici doc link.
- Disabled tarball zipping in GitHub Actions.
- Clarified docs guidance for `fixes`/`refs` trailers.
- Fixed a flaky HTTP/2 maxOriginSetSize test.
- Fixed assorted documentation typos.
