---
date: 2026-06-28
repo: oven-sh/bun
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Bun lands major safety, HTTP, and Node-parity fixes"
excerpt: "A heavy week of security hardening, stream/HTTP correctness fixes, and broader Node/Web API parity work."
commits: 145
---

### **Security and memory-safety hardening across core runtimes**
Bun spent much of the week closing crash, UAF, and type-confusion bugs across FFI/N-API, streams, fetch, shell, TLS, and structured clone. The biggest fix canonicalizes native NaNs before NaN-boxing, removing a potential arbitrary-read path in `bun:ffi` and addon interfaces. Several other lifetime bugs were fixed in stream teardown, proxy tunnels, fetch finalizers, S3 cancelation, and `ReadableStream` internals, with new stress and ASAN coverage added around the riskiest paths.

### **HTTP, fetch, and WebSocket behavior got stricter and more correct**
`fetch()` gained automatic request-body compression via a new `compress` option, while response backpressure now tracks JS consumption more closely to avoid eager buffering. Bun.serve also picked up important correctness fixes for streamed responses, null-body statuses, `HEAD`, and error propagation so server code is less likely to truncate bodies or crash on stream failures. On the WebSocket side, close-frame validation, masking checks, RSV1 handling, permessage-deflate interop, and `publish()` backpressure reporting were all tightened to better match protocol expectations.

### **Broader Node parity work hit fs, buffer, vm, and cloning**
The week included several user-visible compatibility improvements: `node:vm` moved much closer to Node v26 parity, `node:buffer` and `node:fs` picked up behavior fixes, `DataCloneError` is now thrown for detached ArrayBuffers, and `structuredClone()` got multiple reference-pool and prototype-handling corrections. Bun also added `process.on('memoryPressure')`, exposed `Bun.isStandaloneExecutable`, and improved N-API behavior such as `napi_is_arraybuffer()` matching Node for `SharedArrayBuffer`.

### **Build, parser, and tooling correctness improved**
Bundling and source maps saw several meaningful fixes, including JSX auto-import collision avoidance, React compiler output ref binding fixes, source-map column correctness after non-ASCII text, and a SIMD-backed source-map VLQ decoder fast path. Bun also hardened patch application against malformed input, fixed router/query parsing crashes, and improved CLI error messages so common mistakes now surface the bad value and better hints.

### **Performance and platform-specific wins**
`fs.cp` regained a macOS `clonefile()` fast path for safe recursive copies, and source-map parsing got a faster decoder for large maps. On Windows, Bun fixed `.bunx` environment block limits and several path/encoding edge cases, while DNS and connection error handling became more precise across fetch and `Bun.connect()`.

### Other misc changes
- Refreshed bundled root certificates
- Shell, Postgres, and crypto cleanup/correctness fixes
- Test, benchmark, type, and docs updates across HTTP, streams, SQL, and parser code
