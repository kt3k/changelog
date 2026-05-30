---
date: 2026-04-05
repo: nodejs/node
period: weekly
slug: 2026-W14
period_label: "Mar 30 – Apr 5, 2026"
size: L
title: "Node adds UUIDv7, test randomization, and broader API polish"
excerpt: "This week brought crypto and test runner additions, HTTP abort/cancellation improvements, plus QUIC, WebAssembly, and platform fixes."
commits: 61
---

### **Crypto and core APIs got several notable additions**
Node added `crypto.randomUUIDv7()` for RFC 9562 time-sortable UUIDs, expanded raw key generation/import support, and unified asymmetric key import paths. Ed25519 context parameters are now supported too, and `statfs()` now exposes `frsize` for accurate filesystem accounting.

### **Test runner and diagnostics became more capable**
The test runner gained `--test-randomize` / `--test-random-seed` to shake out order-dependent failures, plus `getTestContext()` and richer `SuiteContext` helpers. `diagnostics_channel` also picked up `boundedChannel()` and AsyncLocalStorage scope helpers for more controlled instrumentation.

### **HTTP, streams, and abort handling were tightened up**
`IncomingMessage` now exposes `req.signal` so request cancellation can flow into downstream async work, and pipelined HTTP responses are cleaned up properly when sockets close. On the Web Streams side, `TransformStream` cancellation docs were filled in, while `AbortSignal.any()` was adjusted to reduce long-lived retention.

### **Platform and protocol maintenance moved forward**
QUIC received HTTP/3 priority, GOAWAY, wakeup, and cleanup fixes; the bundled root certificates were refreshed to NSS 3.121; and simdjson/ngtcp2/libuv all saw dependency work. Node also added debug tracing for contextify interceptors and fixed Windows long-path subpath imports and a libuv Windows version-probing bug.

### **Other misc changes**
- `module.register()` is now a runtime deprecation in favor of `module.registerHooks()`
- Temporal builds now respect the `CARGO` environment variable
- Security policy guidance for DoS reports was clarified
- Minimum GCC requirement raised to 13.2
- Misc CI, docs, and test maintenance across the tree
