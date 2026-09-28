---
date: 2026-09-27
repo: denoland/std
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: M
title: "HTTP, async, and data-structure fixes land across std"
excerpt: "Robustness and correctness updates span HTTP caching/serving, circuit breakers, CBOR, UUID v7, and tree traversal."
commits: 11
---

### **HTTP serving and cache validation get more correct and forgiving**
`parseCacheControl()` now skips malformed directive values instead of throwing, making unstable cache parsing more resilient. `serveFile()` also applies validators before the HEAD fast path, so conditional HEAD requests can correctly return 304. In the same area, `serveDir()` now accepts filesystem root paths, widening the set of directory inputs it can serve.

### **Async circuit breaker accounting is fixed**
The circuit breaker now counts requests when they complete rather than when they start, keeping failure rates aligned with the correct time window. A generation counter also prevents stale half-open requests from affecting a newer breaker cycle after reopening.

### **Serialization, UUID, and test-time correctness improvements**
The CBOR encoder now sizes object-key buffers using UTF-8 byte length, avoiding under-allocation for non-ASCII keys. `v7.generate()` now rejects timestamps that exceed the 48-bit UUID v7 field instead of producing invalid output. `FakeTime` was updated to preserve `Date` subclass prototype chains through its proxy.

### **Data-structure traversal performance improved**
`BinarySearchTree.prototype.lvlValues()` switched from an array queue using `shift()` to `Deque`, removing the hidden O(n²) behavior in breadth-first traversal. Related docs were updated to reflect the better complexity.

### Other misc changes
- Crypto WASM dependency bump (`keccak` 0.1.5 -> 0.1.6) and rebuilt generated artifacts
- Release metadata/version bumps across std packages
- Added tests plus small docs/comment updates for the above fixes
