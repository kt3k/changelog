---
date: 2026-07-15
repo: oven-sh/bun
size: L
title: "Bun fixes TS parsing, NAPI, and socket bugs"
excerpt: "Major parser correctness fixes, new Node v26 N-API exports, and several crash/hang fixes landed across Bun’s runtime and tests."
commits: 25
authors: [robobun, sosukesuzuki]
commit_authors: {"0bffb47": robobun, "8395f15": robobun, "871c5ee": robobun, "ff654be": robobun, "6b2c888": robobun, "c066a93": robobun}
---

### **TypeScript parser stops misreading newline-separated keywords** (0bffb47)
Bun now applies ASI correctly when `declare`, `abstract`, `interface`, or `accessor` are followed by a newline, instead of treating them as modifiers and deleting the next declaration. This fixes silent miscompiles to match `tsc` and esbuild.

### **Expression simplifier preserves side effects for `!` and `typeof`** (8395f15)
The optimizer no longer folds `!`/`typeof` on array, object, or class literals in cases where their contents may run code. That prevents side effects from being dropped during transpilation.

### **Resolver avoids an in-place cache rewrite race** (871c5ee)
Directory entry cache updates now hold `entries_mutex` across the in-place replacement, with a new locked accessor for callers that already own the mutex. This fixes a segfault seen when cache reloads overlap with directory resolution.

### **`stdin` throws now surface as `uncaughtException` without killing the stream** (6b2c888)
A throw from `process.stdin` listeners is now rethrown on the next tick instead of being turned into a stream destroy path. That restores Node-like `uncaughtException` behavior and keeps stdin readable after the handler throws.

### **Bun.Socket keep-alive now matches documented millisecond semantics** (ff654be)
`setKeepAlive(true, delay)` now interprets `delay` as milliseconds end-to-end, and `setKeepAlive(true)` no longer reports failure just because the delay is zero. This aligns the public socket API with its docs and fixes incorrect TCP keepalive values.

### **N-API grows five Node v26 experimental exports** (c066a93)
Bun now implements `node_api_set_prototype`, `node_api_create_object_with_properties`, `node_api_create_sharedarraybuffer`, `node_api_create_external_sharedarraybuffer`, and `node_api_is_sharedarraybuffer`. That closes the remaining export gap for those Node v26 N-API symbols.

### **Other misc changes**
- TypeScript parser fixes for enum/namespace bodies, tuple labels, and invalid `yield`/`await` leakage into lowered enums.
- Crash/correctness fixes for `napi_*` null handling, `napi_new_instance` status codes, `v8::Value::IsArray`, and `bun:sqlite` NUL-byte hangs.
- `Bun.gzipSync`/`deflateSync` now reject out-of-range libdeflate levels with a real invalid-argument error.
- `Bun.Socket` typing/docs updates and associated keep-alive test expectation changes.
- Several test hardening/deflake changes across init, bake, TLS, filesystem routing, child process stdio, and node-http-connect.
- Additional N-API and VM/Worker/blob correctness fixes, plus related test coverage.
