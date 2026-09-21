---
date: 2026-09-20
repo: nodejs/node
size: L
title: "Crypto refactor lands, perf fixes follow"
excerpt: "Major crypto provider plumbing changes, plus fixes for HTTPS proxy errors, performance hooks, streams, and cleanup hooks."
commits: 22
authors: [panva, jasnell, codebytere, aduh95, richardlau, araujogui, christianaurichzm, mcollina]
commit_authors: {"1055987": jasnell, "8929166": codebytere, "bfb84d3": araujogui, "ada8c5c": christianaurichzm, "a293ec7": jasnell, "4290a2d": jasnell, "32d23ec": codebytere, "59b5ac8": panva, "6adf7c1": panva, "d20c978": panva, "36e326b": panva, "2b68fcd": panva, "28a1343": panva, "25e6c15": codebytere, "f466c0c": mcollina}
---

### **Crypto provider plumbing refactor broadens key handling** (28a1343, 59b5ac8, 6adf7c1, d20c978, 36e326b, 2b68fcd)
Node’s crypto internals were reworked to lean more heavily on provider-backed APIs for KDFs, RSA key details, PKCS#1 public-key import, EC group naming, and private-key encoding. This reduces legacy OpenSSL-specific parsing paths and makes key metadata and generation behavior more consistent under provider and FIPS modes.

### **structuredClone gets a primitive fast path** (bfb84d3)
`structuredClone()` now returns primitive values directly when called without options, skipping the serialize/deserialize round-trip. That trims overhead for the common case and adds coverage for primitives, `-0`, and symbol rejection.

### **HTTPS proxy requests now surface invalid TLS option errors** (ada8c5c)
Proxied HTTPS requests now catch synchronous `tls.connect()` validation failures after the CONNECT tunnel is established, close the tunnel socket, and route the error back to the request instead of crashing the process. This fixes an uncaught-exception path for bad TLS options.

### **perf_hooks fixes GC observer tracking across snapshots and disconnects** (1055987, a293ec7, 4290a2d)
GC observer bookkeeping now lives in native state, can be reconciled safely, and is restored after snapshot deserialization when `'gc'` observers are active. The observer count logic also avoids double-counting duplicate entry types, preventing GC tracking leaks and stale performance entry generation.

### **Web streams remove per-instance setup overhead** (f466c0c)
Internal `ReadableStream`/`WritableStream` construction paths were simplified to avoid per-instance prototype swapping and extra wrapper objects. The pipe finalization path also drops unused promise records earlier, cutting fixed costs for short-lived streams.

### **Cleanup hooks can be shared across Environments on one isolate** (8929166)
Environment cleanup hooks are now keyed to allow the same hook to be registered in multiple Environments that share an isolate, matching Node-API expectations. The removal logic now prefers the current Environment when possible and tolerates running hooks removing themselves.

### **Linked bindings can be exempted from addon permission checks** (25e6c15)
Embedders can now opt out of the addon permission gate for `process._linkedBinding()` via a new environment flag. Worker threads inherit the setting, and tests cover both denied and allowed behavior.

### **Task queue draining no longer deadlocks under C++23** (32d23ec)
The platform task drain loops were adjusted so C++23’s longer temporary lifetime in range-for initializers no longer keeps the queue mutex held while executing tasks. This fixes a deadlock path when tasks post back onto the same queue.

### Other misc changes
- Python 3.13 compatibility updates for `tools/v8`.
- Revert of the `depot_tools` version override.
- ESLint plugin and codecov action dependency bumps.
- Minor crypto test consolidation and a small fs test tweak.
