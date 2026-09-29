---
date: 2026-09-28
repo: nodejs/node
size: L
title: "Node gains Buffer.isLatin1 and hot-path wins"
excerpt: "New Buffer Latin1 validation and module/webstreams performance fixes land alongside a notable Buffer index bug fix and an HTTP/2 HEAD close fix."
commits: 13
authors: [panva, jasnell, MarshallOfSound, maksim-romanov, Dansatch, ronag, mcollina]
commit_authors: {"471fe81": MarshallOfSound, "ae9c25a": maksim-romanov, "58821ee": panva, "e6d4720": Dansatch, "c570b67": panva, "c12d483": panva, "1a15692": panva, "cbf3566": panva, "e0a3c37": panva, "191a3b2": ronag, "cff7b12": mcollina, "8f43e88": jasnell}
---

### **buffer: add `isLatin1`**
Adds `buffer.isLatin1()` for fast validation of strings that can be losslessly encoded as Node.js `'latin1'`/WebIDL ByteString. This gives users a direct API for a common check and comes with docs, benchmarks, and tests. (8f43e88)

### **module: remove per-require cache key allocation**
`require()` no longer builds a concatenated cache-key string on every load; the relative resolve cache is now organized by parent directory first, with per-directory request lookups. That reduces allocation pressure on the hot path and improves both throughput and memory use. (471fe81)

### **buffer: fix negative index results for large buffers**
`Buffer#indexOf()` and `lastIndexOf()` now return correct positions for matches beyond 2 GiB instead of truncating large offsets. The fix updates the C++ index return types and adds coverage for number, Buffer, and string searches on very large buffers. (e6d4720)

### **http2: emit `close` for aborted HEAD compat responses**
HTTP/2 compat responses for HEAD requests now distinguish between a headers-only response and a response that was aborted before headers were sent. That restores expected `close`/`finish` behavior so aborts are observable and HEAD responses still behave like HTTP/1 compat. (191a3b2)

### Other misc changes
- Stream/webstreams hot-path optimization and related benchmark scaffolding (cff7b12)
- Deflake fast FFI buffer tests (58821ee)
- Pipe/socket test path portability fix on macOS (ae9c25a)
- Several flaky-status cleanup commits across loader, exit timeout, CPU profiler, SEA, and renamed tests (c570b67, c12d483, 1a15692, cbf3566, e0a3c37)
