---
date: 2026-06-04
repo: nodejs/node
size: M
title: "Watch mode fix, TS inspector URL cleanup"
excerpt: "Shutdown-safe watch mode, inspector-friendly type stripping, and a stream flush fast path landed alongside docs and API cleanup."
commits: 6
authors: [trivikr, Anshikakalpana, joyeecheung, dsanders11, addaleax]
commit_authors: {"4219808": joyeecheung, "cb8eebf": trivikr, "e8cc66e": Anshikakalpana, "09c603f": dsanders11, "5f727fd": trivikr, "2d0c926": addaleax}
---

### **Watch mode now cancels pending restarts on shutdown** (cb8eebf)
Node’s watch mode no longer lets a queued file-change debounce timer restart the process after shutdown has begun. It also keeps the child exit listener in place through the whole lifecycle so restart and teardown paths don’t race to remove each other’s handlers.

### **Type-stripped CommonJS now reports file: URLs to the inspector** (4219808)
The CommonJS loader now passes a module’s file URL through type stripping, so `//# sourceURL` is consistent with ESM and doesn’t get misparsed when paths contain whitespace. This fixes inspector metadata for type-stripped TypeScript across CommonJS and ESM loading paths.

### **Stream transform flushing gets a faster common path** (5f727fd)
Stateless fused transform flushing now short-circuits common normalized outputs like `Uint8Array`, strings, and buffers instead of always going through generator-based normalization. That reduces overhead in hot stream pipelines while preserving flush ordering.

### **Environment creation overloads were merged** (2d0c926)
The C++ `CreateEnvironment()` overloads were consolidated into a single signature with an optional `thread_name`. This is API-compatible but ABI-breaking, so it was intentionally separated from the original change.

### Other misc changes
- WebCrypto doc example fixed AES-OCB IV length (e8cc66e)
- `stream/promises.pipeline` docs updated to include WebStreams (09c603f)
