---
date: 2026-03-23
repo: denoland/deno
size: L
title: "Node compat gets inspector, child_process, and buffer fixes"
excerpt: "Big Deno/Node compatibility work landed across inspector, child_process, TLS, Buffer, and web APIs, plus npm resolution cleanup."
commits: 15
authors: [bartlomieju, dsherret, r3wretrhy]
commit_authors: {"70268d6": bartlomieju, "b75e2b8": bartlomieju, "d0e3cfb": bartlomieju, "e8ba184": bartlomieju, "80121ae": bartlomieju, "c99c8ac": bartlomieju, "af67058": r3wretrhy, "f5014bb": bartlomieju, "fd73dff": bartlomieju}
---

### **Node inspector now handles break-on-start correctly** (70268d6)
Deno’s CDP inspector gained the `NodeRuntime` domain and a proper `--inspect-brk` flow. The runtime now blocks until `Runtime.runIfWaitingForDebugger` arrives, then pauses on the next statement like Node.js.

### **AbortSignal.any no longer leaks with long-lived parents** (d0e3cfb)
`AbortSignal.any()` used to accumulate dead weak references forever when repeatedly combined with a persistent parent signal. The new `FinalizationRegistry` cleanup removes stale dependents, fixing a memory leak in common shutdown-signal patterns.

### **child_process IPC and argv0 compatibility improved** (f5014bb, e8ba184)
Node-style child process behavior got several fixes: internal `NODE_` IPC messages now emit `internalMessage`, `argv0` is plumbed through spawn/spawnSync, duplicate IPC stdio entries now throw the right error, and IPC works in non-default stdio positions without panicking.

### **Node Buffer stops truncating huge lengths** (c99c8ac)
Buffer size calculations now use `MathTrunc()` instead of 32-bit coercion, preventing silent truncation above 4GB in APIs like `Buffer.allocUnsafe()` and `Buffer.concat()`. That closes a correctness hole for very large buffers.

### **TLS reconnects preserve upgrade state** (af67058)
TLS post-connect handling now runs against the active handle, not a stale captured one, and reconnect fallback rebuilds the upgrade metadata properly. This fixes cases where `net.Socket` reinitialization could drop TLS upgrade state during reconnects.

### **node:domain works across async boundaries again** (b75e2b8)
Domain context is now preserved through timers and I/O error paths, and uncaught-exception capture callbacks were added to support it. This brings `node:domain` behavior much closer to Node.js for legacy code that still depends on it.

### **Buffer/base64 encoding is faster with simdutf** (80121ae)
Base64 encode/decode paths moved off `base64-simd` and onto V8’s bundled `simdutf`, with large outputs using external one-byte strings to avoid copying. This is a performance and memory-use win for Buffer-heavy workloads.

### **Console formatting now tolerates throwing toStringTag getters** (fd73dff)
`console.log()` no longer fails with an internal formatting error when an object’s `Symbol.toStringTag` getter throws. It now matches Node.js by handling that case gracefully and still printing the object.

### Other misc changes
- npm registry parsing now skips `file:`/`link:` dependencies in published packages instead of erroring.
- `deno_npmrc` was split into its own crate.
- Fixed IPC stdio panic handling and TTY `fd` exposure.
- Enabled more `node:fs` compat tests and fixed `promises.lchmod` rejection behavior.
- VM context property enumeration now returns all own keys, including symbols/non-enumerables.
- Minor inspector and HTTP/2 libnghttp2 binding updates.
