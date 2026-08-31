---
date: 2026-08-30
repo: nodejs/node
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "Node adds MAC API, tightens crypto/FS/HTTP, and fixes crashes"
excerpt: "A busy week of new crypto APIs plus security, correctness, and performance fixes across fs, HTTP/2, QUIC, workers, sqlite, and more."
commits: 110
---

### **Major crypto expansion and hardening**
Node added a new generic MAC API via `crypto.getMacs()` and `crypto.createMac()`, built on OpenSSL EVP_MAC with provider validation, streaming support, and new docs/benchmarks. In parallel, crypto got a broad round of correctness and safety fixes: provider-aware cipher/hash discovery, faster brand checks and key-slot caching, hardened X509Certificate internals, safer JWK/SPKI/PKCS8 handling, and an HMAC bug fix that prevents reading freed state after finalization.

### **Filesystem, permissions, and platform behavior tightened**
File APIs picked up both performance and safety work. Large UTF-8 `fs.readFileSync()` reads now switch to a faster sized-buffer path, recursive `readdir()` avoids unnecessary stats, and `glob()` gained `maxDepth`. On the correctness side, Windows `realpath()` path handling was fixed, `rmSync()` now formats non-ASCII errors safely, and the permission model was tightened to explicitly block more file-descriptor operations plus UDP handle adoption and linked binding paths.

### **HTTP, HTTP/2, QUIC, and zlib got important fixes**
HTTP response finishing and chunked corking were optimized for better throughput and safer buffering, while HTTP/2 fixed AsyncLocalStorage context loss on end-of-stream and removed a deadlock condition under larger flow-control windows. QUIC teardown and flow-control paths were hardened against callback reentrancy and post-destroy access, and vendored zlib was updated with 64-bit compare optimizations and build adjustments.

### **Runtime and embedding changes**
Web Workers now implement the Refable protocol, so `process.ref()` and `process.unref()` can control event-loop liveness. Node also disabled V8’s external-memory abort check by default to avoid crashes on large allocations, and snapshotting can now start from a V8 startup blob for embedders that only ship deserializer data. FFI is now enabled by default in supported builds, with the old experimental flag kept as a compatibility no-op.

### **SQLite, WebCrypto, and N-API correctness fixes**
SQLite session lifecycle handling was tightened to prevent use-after-free and invalid close/dispose operations from callbacks. WebCrypto received several error-precedence and access-control fixes for JWK, SPKI, and PKCS8 flows, while Node-API async callbacks now enter the correct V8 context before invoking JS. ZIP iteration, EventTarget weak listeners, and `builtinModules` reporting also saw bug fixes.

### Other misc changes
- `--run` now lists available scripts when no target is given.
- `util.inspect()` and VT stripping behavior were improved.
- Bench tooling got better comparison/scatter analysis.
- Bundled CA certificates were refreshed to NSS 3.126.
- Various docs, tests, release bumps, and contributor workflow updates landed throughout the week.
