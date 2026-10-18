---
date: 2026-10-17
repo: nodejs/node
size: L
title: "QUIC validation, loader fix, and perf wins"
excerpt: "Security and correctness fixes land alongside a TransformStream allocation trim and a small VFS permission update."
commits: 9
authors: [mcollina, panva, RafaelGSS, efekrskl, aduh95]
commit_authors: {"f88a1d2": efekrskl, "c526694": mcollina, "269cab6": mcollina, "4e75b71": mcollina, "62ca1ba": RafaelGSS}
---

### **QUIC stream error codes are now validated** (f88a1d2)
Node now rejects invalid QUIC application error codes up front, enforcing a non-negative 62-bit unsigned range for stream reset/stop-sending codes. The change tightens both the API docs and native validation, preventing malformed codes from reaching the wire.

### **`require(esm)` works again on the `module.register()` hooks thread** (c526694)
The ESM loader now resolves `kImportInRequiredESM` synchronously even on the async loader hooks worker, using `ModuleJobSync` where required. This fixes an internal assertion when `require()`ing an ES module with imports while the hooks module is still loading.

### **BlockList now fails closed if peer address lookup fails** (269cab6)
`net.Server` access control no longer silently skips `blockList` checks when the peer address cannot be retrieved. If the address is unavailable, the connection is now closed instead of reaching the application's `connection` handler.

### **TransformStream construction gets cheaper** (4e75b71)
Web Streams construction was refactored to share sink/source algorithms and defer some transfer state allocation, cutting per-stream setup overhead and GC churn. This is a performance-focused internal rewrite that should matter most for workloads creating many streams.

### **VFS mounting is allowed in permission audit mode** (62ca1ba)
`vfs.mount()` is now permitted under `--permission-audit` and no longer blocked by the permission gate in that mode. The docs and tests were updated to reflect that audit mode observes rather than refuses the mount.

### **Other misc changes**
- OpenSSL 4 compatibility test updates and X509 expectation adjustments
- Crypto loops switched to `OPENSSL_SIZE_T` for OpenSSL 4.x compatibility
- `FileHandle.close()` test deflaked to avoid fd reuse races
- QUIC and VFS doc wording updates
- Minor benchmark tweak for perf_hooks usertiming
