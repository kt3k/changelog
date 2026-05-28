---
date: 2026-04-08
repo: denoland/deno
size: L
title: "Deno tightens Node compat and fixes leaks"
excerpt: "Memory leak, TLS refactor, DNS API addition, crypto bounds check, and several security/path fixes landed alongside watcher and OTEL improvements."
commits: 15
authors: [bartlomieju, KnorpelSenf, ofalvai, petamoriken]
commit_authors: {"928e944": bartlomieju, "d4024f6": bartlomieju, "7cd968c": bartlomieju, "5085a59": bartlomieju, "8295a2c": bartlomieju, "3ec37cc": bartlomieju, "b8ec861": KnorpelSenf, "9df8007": bartlomieju, "2c4f99e": bartlomieju}
---

### **Node TLS gets a native `TLSWrap` backend** (3ec37cc)
Deno’s Node compatibility layer now wires JS TLS sockets to a native `TLSWrap` object backed by rustls instead of the older stream-swap approach. This is a major internal refactor that should improve correctness and better match Node’s TLS plumbing.

### **Fix package `main` path traversal in Node resolution** (8295a2c)
`package.json` `main` resolution now rejects targets that escape the package directory, closing a path traversal hole for both CJS `require()` and resolver paths. The new regression test proves malicious packages can no longer point `main` at files outside the package.

### **Add `dns.getDefaultResultOrder()` to Node compat** (9df8007)
Deno now exposes Node’s `getDefaultResultOrder()` on `dns`, `dns.promises`, and `dns/promises`, matching the existing `setDefaultResultOrder()` behavior. This fills a missing public API and makes DNS result-order introspection work as expected.

### **Fix worker RSS leak by freeing `uv_loop_t` state** (7cd968c)
A `Drop` implementation now releases the heap-allocated `UvLoopInner` when `uv_loop_t` is dropped, preventing memory from accumulating on worker teardown. This addresses a linear RSS leak in worker-heavy workloads.

### **OTEL HTTP exporter now times out instead of hanging** (2c4f99e)
Telemetry export requests are now wrapped in a timeout, defaulting to 10 seconds and honoring `OTEL_EXPORTER_OTLP_TIMEOUT`. This prevents `deno run` with OTEL enabled from hanging indefinitely when no collector is available.

### **Crypto `update()` now rejects oversized input** (5085a59)
`Cipheriv.prototype.update()` and `Decipheriv.prototype.update()` now throw for inputs at or above `2^31 - 1` bytes, matching Node/OpenSSL behavior. That closes a compatibility gap and avoids undefined behavior on huge payloads.

### **WebGPU `writeBuffer()` accepts `ArrayBuffer`** (b8ec861)
`GPUQueue.writeBuffer()` now accepts raw `ArrayBuffer` sources in addition to views. This widens the API to match developer expectations and fixes a previously unsupported input type.

### **Filesystem watcher paths are cached and canonicalized once** (928e944)
Watcher registration now caches canonicalized watched paths instead of re-canonicalizing on every event, which should cut syscall overhead under load. The change also fixes spurious filesystem events and adds unit coverage for the new matching logic.

### **Permission suite gets missing unit coverage** (d4024f6)
The permission system test suite gains 10 new unit tests covering previously untested state transitions and edge cases. This is validation-only work, but it meaningfully hardens the existing permission logic.

### Other misc changes
- Reverted temporary `--prod` install behavior
- Reverted default Node timers behavior
- Reverted default npm-registry resolution for unprefixed packages
- Reverted default disablement of `no-process-global` / `no-node-globals` lint rules
- Fixed schema metadata for `publish: false`
- Minor core build/test compatibility fix (`c_char` cast)
- Minor TLS/read callback re-entrancy safety fixes
- Added path-validation tests for `main` resolution
