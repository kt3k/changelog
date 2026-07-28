---
date: 2026-07-27
repo: denoland/deno
size: L
title: "Startup faster, WebGPU safer, Node gaps closed"
excerpt: "Deno cut eager startup work, fixed a WebGPU lifetime bug, and landed several Node/runtime compatibility fixes."
commits: 21
authors: [bartlomieju, nathanwhit, dojyorin, tredondo, crowlbot, Hixie, yibe, denobot]
commit_authors: {"e041cb3": nathanwhit, "d35000d": nathanwhit, "094e471": nathanwhit, "b05ad48": bartlomieju, "861c8c9": bartlomieju, "9b71df7": Hixie, "985d218": nathanwhit, "00ea8f1": nathanwhit}
---

### **Cut eager Node module evaluation at startup** (d35000d)
Deno now avoids compiling a large set of Node builtin shims until they’re actually required, instead of loading them all when `node:module` initializes. This reduces snapshot/startup work substantially for CommonJS entry points without changing `deno run empty.js` behavior.

### **Fix WebGPU mapped ranges to own their backing stores** (094e471)
Mapped `GPUBuffer` ranges are now backed by V8-owned `ArrayBuffer`s, with writable ranges copied back before unmapping. That closes a lifetime hazard where JS could hold onto memory tied to a native mapping after unmap/destroy.

### **Release completed QUIC stream resources correctly** (e041cb3)
QUIC stream resources now track active stream IDs per connection and clean them up when streams close, error, abort, or are finalized. This prevents completed streams from staying attached to the connection-close path and ensures teardown closes anything still active.

### **Add `v8.promiseHooks` support in the Node polyfill** (861c8c9)
Deno now implements Node’s `v8.promiseHooks` API, including registration, removal, and dispatch for init/before/after/resolve hooks. That unlocks compatibility for code that depends on promise lifecycle instrumentation.

### **Fix internal module resolution under user import maps** (985d218)
Internal `ext:`, `node:`, and `checkin:` imports from runtime-owned modules now bypass the user’s import map and resolve to themselves. This prevents lazy-loaded internal modules from being remapped into invalid targets during instantiation.

### **Fix `deno eval`/stdin in `node_modules` directories** (00ea8f1)
Synthetic eval/stdin modules are no longer misclassified as npm package files when the current working directory lives under `node_modules` or the npm cache. That removes a path-dependent failure mode for `deno eval` and `deno run -`.

### **Harden WebSocket over HTTP/2 against server push** (b05ad48)
The WSS-over-H2 client now disables HTTP/2 server push during handshake, avoiding an h2 state-machine assertion that a malicious server could use to abort the process. A regression test now verifies the push is rejected.

### **Fix HTTP/2 `respondWithFD` read error handling** (9b71df7)
File-backed HTTP/2 responses now stop reading cleanly and close owned descriptors even when `fs.read` throws. Read failures are mapped to the expected stream reset behavior instead of leaking lower-level fs errors.

### Other misc changes
- Node compat fixes: clean up Web Stream finished listeners, support fs `flush`, stop HTTP/2 file reads after stream close, and fix X509 ECDSA verification.
- Rust/runtime fixes: map Windows missing-path notify errors to `NotFound`, polyfill `uv_handle_size`/`uv_strerror`, and speed up the common-path tick drain.
- Web/API fixes: own WebCrypto `raw-secret` typing, fix QUIC resource cleanup, and avoid eager module evaluation.
- Build/deps/chore: release forward, V8 crate bump, quinn-proto bump, CI/version metadata updates, and test deflakes.
