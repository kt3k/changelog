---
date: 2026-03-27
repo: nodejs/node
size: M
title: "Buffer speeds up, test mocks evolve"
excerpt: "Buffer gets several performance wins, while test runner module mocks gain a new exports option and deprecate older shapes."
commits: 3
authors: [thisalihassan, Han5991]
commit_authors: {"9e0dc8b": thisalihassan, "7d1f1b4": Han5991}
---

### **Buffer operations get faster across the board** (9e0dc8b)
Node’s Buffer implementation was optimized in several hot paths: `copyBytesFrom()` now computes offsets directly, `toString('hex')` uses V8’s `Uint8Array.prototype.toHex()` builtin, `fill()` adds a single-character ASCII fast path, `indexOf()` avoids extra work for ASCII, and `swap16/32/64` gain V8 Fast API support. This should reduce overhead in common Buffer-heavy code and improve throughput for string/byte manipulation.

### **test_runner module mocks add a new exports API** (7d1f1b4)
`mock.module()` now accepts an `exports` option, which becomes the preferred way to define default and named exports for mocked modules. The old `defaultExport` and `namedExports` options are kept as aliases but now emit runtime deprecation warnings, tightening the API while preserving compatibility.

### Other misc changes
- Dependency bump in `tools/doc` for picomatch (1 commit)
