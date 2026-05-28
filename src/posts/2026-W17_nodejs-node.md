---
date: 2026-04-26
repo: nodejs/node
period: weekly
slug: 2026-W17
period_label: "Apr 20–26, 2026"
size: L
title: "Node raises HTTP keep-alive, bumps V8, and hardens APIs"
excerpt: "This week brought a V8 14.6 upgrade, a longer default HTTP keep-alive, plus fixes and hardening across crypto, streams, FFI, and builds."
commits: 110
---

### **Major runtime and platform changes**
- **V8 14.6 landed, with NODE_MODULE_VERSION 147 and broad embedder fallout fixes**: the engine upgrade brought API compatibility work across Node’s C++ embedding layer, platform code, and build files.
- **HTTP keep-alive default increased to 65 seconds**: `http.Server.keepAliveTimeout` now defaults to 65s instead of 5s, changing connection reuse behavior for servers.
- **Windows build now supports PGO and Thin LTO**: new build/config flags wire profile-guided optimization and Thin LTO into the MSVC toolchain.
- **Added `--enable-all-experimentals`**: packagers can now flip on all experimental runtime features via a single build-time default.

### **Security, correctness, and hardening**
- **HTTP headers/trailers and proxy matching were tightened**: `IncomingMessage.headers`/`trailers` now use null-prototype objects, `addTrailers()` rejects writes after finish, and `NO_PROXY` matching for leading-dot domains was fixed.
- **Crypto validation was hardened**: key generation now checks own properties only, WebCrypto key usages are canonicalized/deduplicated, and internal crypto lookups were moved to safer null-prototype paths.
- **Argon2 and WebCrypto behavior was aligned**: Argon2 now defers invalid-parameter reporting to the native layer, and ML-KEM/SLH-DSA JWK support plus `key_ops` validation were expanded.
- **Structured clone and stream teardown got stricter**: duplicate nested transferables now throw `DataCloneError`, and duplex/readable error propagation was improved.

### **Developer-facing API and tooling improvements**
- **V8 CPU profiling now accepts options**: `startCpuProfile()` and `worker.startCpuProfile()` can now tune `sampleInterval` and `maxBufferSize`.
- **`fs.glob` can follow symlinks safely**: new `followSymlinks` support expands recursive globbing through directory links while guarding against cycles.
- **MockTimers and test runner coverage expanded**: mocked timers now support `AbortSignal.timeout()` and match `Timeout.close()`/`[Symbol.dispose]()` behavior; rerun bookkeeping and probe handling were also tightened.
- **FFI internals were hardened and clarified**: the implementation was refactored toward standard `Maybe` flows, array-buffer access was unified, and docs now warn about read-only native memory.
- **WebIDL and Buffer fixes**: buffer-source checks were optimized, and `Buffer#indexOf`/`lastIndexOf` edge cases around bounds handling were corrected.

### **Performance and cleanup**
- **`URLSearchParams.set()`/`.delete()` were optimized** to avoid repeated splices on large parameter lists.
- **`processTicksAndRejections()` skips unnecessary rejection work** when there is nothing pending.
- **HTTP request cleanup no longer leaks listeners** on reused sockets.
- **Inspector, DNS, and various internal docs/tooling got polish** across the week.

### Other misc changes
- TLS/OpenSSL 4.0 compatibility test updates and OCSP/DH behavior adjustments.
- Misc docs clarifications, typo fixes, dependency bumps, workflow updates, and small build/CI cleanups.
- Minor platform fixes and compatibility follow-ups for streams, fs, and V8 integration.
