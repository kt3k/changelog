---
date: 2026-04-09
repo: nodejs/node
size: L
title: "QUIC gets SNI, ALPN, and TLS context upgrades"
excerpt: "Big QUIC API expansion plus crypto fixes, a new v8 heap profile API, perfetto tooling, and a string encoding speedup."
commits: 17
authors: [jasnell, legendecas, panva, mertcanaltin, araujogui, BridgeAR, aduh95, IlyasShabi, thisalihassan]
commit_authors: {"41afe9b": panva, "8db9d43": BridgeAR, "f8b79a1": IlyasShabi, "79671cf": jasnell, "90e12f2": jasnell, "6724cc6": jasnell, "b5c4277": jasnell, "e6ef477": panva, "1b5dc9b": panva, "70c1d6b": thisalihassan, "9ec4a61": mertcanaltin}
---

### **QUIC gains multi-ALPN, SNI context management, and token fixes** (6724cc6, 90e12f2, 79671cf, b5c4277)
Node’s QUIC stack now supports multiple server-side ALPN choices, per-identity TLS context updates via `endpoint.setSNIContexts()`, and better token/early-data handling. The changes also add a new rapidhash-based hashing path to improve QUIC-related hashing performance and tighten session behavior around zero-expiration tokens.

### **v8 adds a synchronous heap profile API** (f8b79a1)
A new `v8.startHeapProfile()` API lands alongside `SyncHeapProfileHandle`, enabling synchronous heap profiling with optional GC and sampling controls. This expands the public diagnostics surface for both `node:v8` and worker threads.

### **crypto accepts key data in `diffieHellman()` and fixes overflow/32-bit edge cases** (1b5dc9b, 41afe9b, 9ec4a61, e6ef477)
`crypto.diffieHellman()` now accepts key material in more forms than `KeyObject` alone, and the docs/errors were aligned to reflect the broader inputs. Separately, crypto got a 32-bit KangarooTwelve overflow guard and secure-context memory tracking, plus some API message cleanup around key argument names.

### **String encoding gets cheaper for small outputs** (70c1d6b)
`StringBytes::Encode()` now uses stack-backed buffers for small encodings instead of heap allocations. This should reduce overhead on common short-string paths like hex, base64, and UTF-8 conversions.

### **Assert/util deep equality fixes stale nested cycle state** (8db9d43)
Deep comparison now clears temporary nested cycle entries after successful comparisons, preventing later sibling comparisons from incorrectly failing. This fixes a subtle `deepStrictEqual` correctness bug for some equivalent nested structures.

### Other misc changes
- Updated perfetto to 54.0 and added updater/build wiring (2 commits)
- `fs.stat()` now accepts a `signal` option
- Misc QUIC, crypto, stream, and internal refactors/test updates
