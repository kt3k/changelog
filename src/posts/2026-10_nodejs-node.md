---
date: 2026-10-31
repo: nodejs/node
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Node hardens crypto and upgrades core runtimes"
excerpt: "October brought OpenSSL 4.1, multiple V8 bumps, security fixes, new fs/vfs APIs, and broad stream, FFI, and SQLite work."
commits: 505
---

### Security, crypto, and trust-store hardening
**OpenSSL and c-ares updates**: Node refreshed bundled OpenSSL multiple times, ending the month on OpenSSL 4.1.0, and updated c-ares to 1.34.9. These pulls brought in upstream security fixes across TLS, QUIC, DNS, and memory-safety paths.

**Certificate and trust validation tightened**: TLS/X.509 handling gained SPKI blocklisting for compromised keys, stricter SAN/IP normalization, better issuer-error preservation, and safer X.509 cloning across isolates. Root certificates were also refreshed to newer NSS releases.

**Crypto backend cleanup**: Legacy OpenSSL ENGINE support was removed, FIPS handling was simplified around provider-based builds, and Node now requires OpenSSL 3+ in-tree. BoringSSL compatibility also expanded, including SHA-3 and TLS 1.3 cipher mapping.

### Runtime and ABI churn from major V8 rolls
**V8 upgraded several times**: The tree moved through V8 15.2, 15.5, and 15.6 during the month, with corresponding `NODE_MODULE_VERSION` bumps to 151, 152, and 153. This is a significant compatibility boundary for native addons and a broad source of engine-side fixes.

**Engine/API cleanup**: Node removed older V8 callback/prototype usage, dropped `--jitless`/`--lite`, and aligned internal embedder code with newer V8 APIs. There were also build and portability fixes across Windows, AIX, Solaris, illumos, musl, and GCC/Clang combinations.

### Streams, async context, and test runner improvements
**WebStreams and stream/iter got major attention**: Work across `pipeTo()`, `tee()`, `TransformStream`, and stream iterators reduced promise churn, allocations, and backpressure edge cases while fixing several correctness bugs. New draining helpers and better async-context preservation also landed.

**Async context is more consistent**: `AsyncLocalStorage` was simplified onto `AsyncContextFrame`, `AsyncResource` callback handling was fixed to retain stores, and `MakeCallback`/watcher paths were trimmed for less overhead and fewer context leaks.

**Test runner grew more capable**: The runner gained mock assertion helpers, `--test-forbid-only`, better load-error reporting, improved stdout parsing, and more robust worker/rejection handling. Several flaky timing and shutdown cases were also cleaned up.

### Filesystem, VFS, and platform APIs
**New filesystem APIs and fixes**: Node added `fs.mkstemp()`/`mkstempSync()`/`fsPromises.mkstemp()`, tightened permission checks around `realpathSync()`, and fixed a number of edge cases in `cpSync()`, `readFileSync()`, `watch()`, and config-file propagation.

**VFS matured quickly**: `node:vfs` was unflagged and the virtual filesystem grew layered mounts, better encoding behavior, audit-mode support, and SEA archive mounting fixes. Worker/main-thread mounting behavior was an active area of iteration.

**HTTP, HTTP/2, and QUIC updates**: HTTP got faster header handling, new websocket masking helpers, and better keep-alive docs. QUIC validation was tightened for close codes, error handling, and session lifecycle bugs, while HTTP/2 fixed idle timer and memory-accounting issues.

### SQLite, FFI, and buffer correctness
**SQLite moved forward**: Node bundled SQLite 3.54.0/3.54.1 and fixed constructor validation, backup handling, statement tracking, binding behavior, and connection reopening semantics. Several hot paths were also optimized with better row shapes and template caching.

**FFI became safer and more ergonomic**: The fast FFI path gained stronger validation for pointer and integer arguments, safer callback lifetime handling, better OOM/error behavior, and fixes for worker shutdown and handle leaks. `int64`/`uint64` inputs can now accept safe JS numbers too.

**Buffer/blob and crypto edge cases**: Blob sizing was corrected for large files, `randomFill*` stopped accepting immutable buffers, `randomInt()` cache handling was fixed, and native array-buffer copy paths were optimized.

### Other misc changes
- `node:http` got WebSocket mask/unmask helpers and HTTP docs were expanded around keep-alive and retry behavior.
- `zlib` added `crc32c()` and raw ZipEntry read APIs, plus several compression/decoder fixes.
- `process.finalization` now returns unregister functions.
- Build/release tooling, dependency bumps, CI workflows, WPT fixtures, docs, and benchmarks were updated throughout the month.
