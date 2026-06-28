---
date: 2026-06-27
repo: nodejs/node
size: M
title: "Zlib gains stricter decompression checks"
excerpt: "Node adds a new zlib option to reject trailing garbage, fixes VFS reads on open fds, and updates WebCrypto typing support."
commits: 6
authors: [panva, avivkeller, aduh95, trivikr]
commit_authors: {"ed33ae7": avivkeller, "09fee77": aduh95, "2902b2b": panva, "7c43441": panva, "47d2d62": panva, "8cb8312": trivikr}
---

### **zlib now exposes `rejectGarbageAfterEnd`** (2902b2b)
Node documents and validates a new public decompression option that fails when trailing input follows the compressed stream. The change adds coverage across async, sync, and stream APIs for gzip, Brotli, and Zstd-backed decompression.

### **zlib can reject trailing gzip members in web streams** (7c43441)
The decompression pipeline now threads `rejectGarbageAfterEnd` down into native zlib and makes both sync and GUNZIP paths honor it. That closes a gap where concatenated gzip members or leftover input could slip through when callers asked for strict end-of-stream behavior.

### **WebCrypto crypto typings are added** (47d2d62)
This expands the internal crypto typing surface substantially, including a large `internalBinding/crypto` definition and updates to crypto utility helpers. It improves type coverage for WebCrypto-related internals and reduces gaps in the generated typings.

### **VFS real provider reads from the already-open fd** (8cb8312)
`RealFileHandle` now reads file contents from its open descriptor instead of reopening the original path, so handles keep working after the backing file is renamed. It also preserves the current offset for `readFile()`/`readFileSync()`, fixing a real VFS correctness bug.

### Other misc changes
- Stale bot workflow speedup and cache permissions tweak (ed33ae7)
- Docs link and stability-label cleanup across API pages (09fee77)
