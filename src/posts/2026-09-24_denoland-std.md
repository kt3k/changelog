---
date: 2026-09-24
repo: denoland/std
size: M
title: "HTTP and async fixes lead a broad std release"
excerpt: "Lenient Cache-Control parsing, circuit breaker correctness fixes, and a BFS traversal speedup headline today's std update."
commits: 10
authors: [tomas-zijdemans, denobot, cymian, sanjibani, dennisimoo]
commit_authors: {"a9a20de": tomas-zijdemans, "4f1be49": tomas-zijdemans, "3f923fb": cymian, "6a6ed3e": tomas-zijdemans, "d3e7e12": tomas-zijdemans, "4ee5bee": tomas-zijdemans, "c53f62f": sanjibani, "3639e4d": tomas-zijdemans, "4776c9d": dennisimoo}
---

### **Cache-Control parsing is now lenient** (a9a20de)
`parseCacheControl()` no longer throws on malformed or missing values for known directives; instead it ignores those directives and keeps parsing. That makes the unstable HTTP API more robust and aligns it with RFC 9111's guidance for handling bad cache directives.

### **Circuit breaker request counting now matches completion** (6a6ed3e)
The async circuit breaker now records requests when they finish, not when they start, so failures and requests stay in the same time window segment. This fixes skewed failure-rate accounting for in-flight work that crosses segment boundaries.

### **Stale half-open circuit breaker requests are now ignored** (d3e7e12)
A generation counter was added so requests admitted in an earlier half-open period can't affect a later one after the breaker reopens. This closes a correctness hole where stale successes or capacity releases could interfere with the current half-open state.

### **HEAD requests now get full conditional handling** (4776c9d)
`serveFile()` now evaluates validators before the HEAD shortcut, so conditional HEAD requests can return 304 instead of always behaving like an unconditional fetch. That brings `serveDir()`/`serveFile()` more in line with HTTP semantics for cache validation.

### **Binary tree level-order traversal is now linear** (3639e4d)
`BinarySearchTree.prototype.lvlValues()` switched from an array queue with `shift()` to `Deque`, removing the hidden O(n²) behavior in breadth-first traversal. The RedBlackTree docs were updated to reflect the improved complexity.

### **UUID v7 generation now rejects oversized timestamps** (4f1be49)
`v7.generate()` now validates that the timestamp fits within 48 bits before encoding. This prevents silently producing invalid UUIDs when the input time exceeds the format's range.

### **Filesystem roots are allowed in `serveDir()`** (3f923fb)
`serveDir()` now accepts filesystem root paths instead of rejecting them. This widens the API's usable inputs for serving directories directly from mounted roots.

### **CBOR object keys are sized correctly for UTF-8** (c53f62f)
The CBOR encoder now accounts for multi-byte object keys when precomputing buffer size, matching the UTF-8 encoding used at write time. This fixes buffer under-allocation crashes for non-ASCII keys.

### **FakeTime now preserves Date subclass prototypes** (4ee5bee)
The test clock's `Date` proxy now forwards `newTarget`, so subclasses of `Date` keep their prototype chain under `FakeTime`. That prevents subtle breakage in code that extends `Date`.

### Other misc changes
- Release metadata/version bumps across std packages (1 commit)
- Test coverage added for the above fixes
- Documentation/comment updates in data structures and UUID modules
