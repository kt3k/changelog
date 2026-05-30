---
date: 2026-03-14
repo: denoland/deno
size: L
title: "Deno lands CPU flamegraphs and Node fixes"
excerpt: "New interactive CPU flamegraphs, faster base64, and several Node compatibility fixes for child_process, crypto, N-API, and TCP permissions."
commits: 13
authors: [bartlomieju, littledivy, dsherret]
commit_authors: {"b177ff6": littledivy, "f00f798": bartlomieju, "2c3b295": bartlomieju, "7ab15ad": bartlomieju, "bfd9685": dsherret, "e88d18a": bartlomieju, "081e2e8": bartlomieju}
---

### **Interactive CPU flamegraphs added via `--cpu-prof-flamegraph`** (e88d18a)
Deno can now generate self-contained SVG flamegraphs alongside CPU profiles, making it much easier to inspect hot paths without external tooling. The change also updates profiling plumbing across CLI and runtime to carry the new flag through process startup and worker creation.

### **Base64 buffer ops are significantly faster** (081e2e8)
`node:buffer` base64 encode/decode/write paths were optimized to avoid unnecessary copies and dispatch overhead, including a direct decode-into-buffer fast path. This should narrow the performance gap with Node.js for common Buffer base64 workloads.

### **Child process abort signals now honor `killSignal` and abort reasons** (368c99d)
Abort-triggered spawns now send the configured `killSignal` instead of hardcoded `SIGKILL`, and emitted `AbortError`s preserve `signal.reason` as the cause. That brings `child_process.spawn()` behavior closer to Node.js and fixes abort-related compatibility tests.

### **`spawnSync` input accepts all TypedArrays** (7cc2464)
The `input` option for `spawnSync` now treats any `ArrayBufferView` as valid, rather than rejecting TypedArray variants beyond `Uint8Array` and `DataView`. This matches Node.js and avoids surprising type errors for otherwise valid binary inputs.

### **Failed `spawn()` calls now expose stdio streams like Node** (4d45fe5)
When `child_process.spawn()` fails, Deno now still creates `stdin`/`stdout`/`stderr` stream objects before reporting the error, then tears them down on the next tick. That prevents crashes in code that expects these handles to exist even on ENOENT-style failures.

### **Prototype-inherited env vars are now included in `spawn()`** (749270f)
The child process env collection logic no longer filters out prototype-chain properties, aligning with Node.js behavior. This fixes cases where `for...in`-style env objects were missing variables during process launch.

### **TCPWrap permission checks are tightened** (b177ff6)
TCP bind/connect paths were moved off the fast path so they can consult `PermissionsContainer` before touching sockets. This is a security/reliability fix for `node:net` operations and includes related libuv stream and HTTP/2 test updates.

### **PEM key export gains encrypted output support** (2c3b295)
`KeyObject.export()` now supports encrypted PEM output with legacy OpenSSL headers and several common ciphers, and `generateKeyPair()` for `rsa-pss` falls back to the deprecated `hash` option when needed. This closes a real Node compatibility gap for crypto key generation and key export.

### **`uv_async_t` now keeps the event loop alive in N-API** (7ab15ad)
Active async handles now ref/unref the event loop to match libuv semantics, preventing premature shutdown while async callbacks are still pending. The update also adds dedicated N-API coverage and a `test-napi` developer CLI command.

### **More Node resolution errors are surfaced as TypeScript diagnostics** (bfd9685)
Some module-resolution failures are now reported through TypeScript diagnostics instead of being handled separately. This should make `deno check`/`deno compile` feedback more consistent for missing or invalid Node imports.

### **SVG flamegraph XML output is now parser-friendly** (f00f798)
The flamegraph template swaps an HTML-only entity for a valid XML numeric entity, fixing standalone SVG parsing errors. This matters because the new profiling output is intended to be opened directly as SVG.

### Other misc changes
- Enabled additional passing `child_process` node_compat tests.
- Updated WPT expectation files to match current runner output.
- Added coverage for a few already-passing Node compatibility cases.
