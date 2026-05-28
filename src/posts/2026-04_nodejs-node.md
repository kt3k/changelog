---
date: 2026-04-30
repo: nodejs/node
period: monthly
slug: 2026-04
period_label: "April 2026"
size: L
title: "Node 25.9, ffi module, and big runtime hardening"
excerpt: "April brought a new core ffi module, Temporal on by default, major QUIC/HTTP/streams work, and a V8 bump with many fixes."
commits: 297
---

### Major platform additions
**node:ffi lands as a new core module** — Node now ships a bundled libffi-backed `node:ffi` module, adding first-class C interop with build/CI wiring and follow-up API work through the month.

**Temporal is enabled by default** — Build/configure now auto-detect Rust tooling and turn Temporal on unless explicitly disabled, with Windows build fixes and better fallback behavior when the toolchain or ICU setup is insufficient.

**Test runner keeps expanding** — The test runner gained randomized execution order, stable `testId` event metadata, `getTestContext()`/richer suite context, tracing-channel events for OTel, improved mock timers, and more WPT harness control.

### Networking, streams, and HTTP got a lot of attention
**HTTP lifecycle and backpressure fixes** — `IncomingMessage` now exposes `req.signal`, pipelined responses clean up correctly on socket close, `addTrailers()` rejects after finish, keep-alive defaults moved to 65s, and compat responses expose more writable state.

**QUIC saw a major refresh** — Arena allocation replaced per-packet wrapping, stream destruction and listening state were added, and later updates brought SNI context management, multi-ALPN support, token fixes, and ngtcp2 refreshes.

**Streams and Web Streams were hardened** — Node fixed several destruction/cancellation bugs, improved `ReadableStream.from()` validation, added `stream/iter` classic stream interop, expanded adapter support, and tightened duplicate transferable handling.

### Crypto, diagnostics, and data APIs matured
**Crypto and WebCrypto expanded** — Node added `randomUUIDv7()`, broader `diffieHellman()` inputs, JWK support for ML-KEM/SLH-DSA, stricter key-usage canonicalization, and multiple hardening fixes around validation and prototype safety.

**Diagnostics got better and cheaper** — `v8.startHeapProfile()` and CPU profile options landed, inspector probe mode was added, and `contextify`/inspector tracing and debug logging improved runtime observability.

**SQLite and buffers gained useful capabilities** — `DatabaseSync` can now serialize/deserialize in-memory databases, SQLite result handling was optimized, and Buffer search APIs gained `end` bounds plus correctness fixes.

### Performance, stability, and build-system work
**V8 14.6 landed** — The engine bump brought a new NODE_MODULE_VERSION and a wide set of embedder compatibility updates, plus profiling and allocation-tracking improvements.

**FFI keeps maturing** — Beyond the new module, FFI gained safer internal validation, explicit disposal support, a shared-buffer fast path, and clearer docs around memory protection.

**Platform/build support broadened** — There were fixes for Windows long paths, AIX, macOS/Rust cross-compiles, GCC baseline requirements, Temporal/CI plumbing, and a number of dependency refreshes.

### Other misc changes
- `process.execve()` now throws on failure instead of aborting
- `pathToFileURL()` now rejects malformed UNC hosts instead of crashing
- `watch()`/watch mode and `--experimental-config-file` behavior were tightened
- `module.register()` became a runtime deprecation in favor of `module.registerHooks()`
- Numerous docs, tests, CI/workflow, and dependency updates across the tree
