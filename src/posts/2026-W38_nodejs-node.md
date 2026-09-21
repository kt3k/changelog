---
date: 2026-09-20
repo: nodejs/node
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "Node lands new core APIs and a week of stability fixes"
excerpt: "New throttle/debounce, DTLS, VFS startup, and sea/crypto updates shipped alongside many fixes for HTTP, streams, QUIC, TLS, and perf_hooks."
commits: 121
---

### **New built-ins expand utility and runtime control**
Node added first-party `util.throttle()` and `util.debounce()` with promise-based return values, cancellation, abort support, and richer queue/overflow semantics. The runtime also gained `Buffer.stringLength()` and synchronous `fs.openAsBlobSync()`, while `structuredClone()` got a primitive fast path for cheaper common-case cloning.

### **VFS and SEA became much more capable**
Virtual filesystem support was broadened in two directions: mounted paths now work more consistently across `node:fs` and native library loading, and new startup flags let Node mount or boot directly from a VFS before user code runs. Single-executable apps also gained direct ZIP-backed archives (`vfsArchive`), plus a smaller snapshot-loading improvement that avoids copying embedded startup data when possible.

### **Crypto, TLS, and DTLS saw major plumbing work**
Crypto internals were refactored toward provider-backed algorithm metadata and key handling, improving consistency for asymmetric keys, KDFs, PKCS#1 import, and related paths. TLS fixed a secure-context lifetime bug and preserved hostname name-constraint behavior on OpenSSL 4.1, while DTLS received a broad API refresh and moved further out of experimental territory.

### **HTTP, HTTP/2, QUIC, and sockets got a cluster of correctness fixes**
HTTP now rejects over-limit response headers instead of silently truncating them, and proxied HTTPS requests report invalid TLS option errors instead of crashing. HTTP/2 fixed racey session teardown and in-flight write cleanup, QUIC gained truncated-read controls plus several shutdown/stream fixes, and async iteration on half-open sockets/streams was corrected to restore default destruction behavior and prevent leaks.

### **perf_hooks and tracing were extended and hardened**
`perf_hooks` gained a new sliding-window histogram API, plus bigint UV metrics and multiple fixes around histogram and GC observer bookkeeping. Trace events now fail cleanly when no V8 platform agent is available, and the tracing path was cleaned up to avoid undefined behavior in value storage.

### **Other misc changes**
- `AbortSignal.any()` now preserves abort state more reliably across GC edge cases.
- Inspector startup and unavailability handling were hardened for multi-environment and worker cases.
- `sqlite`, `spawn()`, `cpSync()`, `FileHandle.read()`, and `Duplex.from()` all picked up bug fixes for invalid inputs and teardown behavior.
- Stream iterator/broadcast internals were tightened around backpressure, late joiners, and cancellation.
- Build, docs, CI, and test coverage updates landed across the week.
