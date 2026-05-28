---
date: 2026-05-24
repo: nodejs/node
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "Node adds DTLS and VFS, while QUIC and WebCrypto harden"
excerpt: "This week brings experimental DTLS and VFS, big QUIC improvements, WebCrypto hardening, plus several API cleanup and bug-fix rounds."
commits: 97
---

### **New experimental subsystems land: DTLS and VFS**
Node added two notable experimental builtins: `node:dtls` for UDP-based secure transports, and `node:vfs` for an in-memory virtual filesystem. Both are gated behind experimental flags, expanding Node’s surface for embedded, test, and networking use cases.

### **QUIC got faster, more observable, and safer**
QUIC saw the week’s largest internal push: allocation reductions, packet batching, coalescing improvements, and shared arenas should improve throughput and memory use. At the API level, sessions now expose application options and transport parameters, stream stats are richer, and several crash/use-after-free bugs were fixed in bindings, sessions, streams, and handshake failure paths.

### **WebCrypto and crypto APIs were broadened and hardened**
WebCrypto was reworked to move more work into native job flows, reduce secret-material copying, and harden promise resolution against prototype-pollution and thenable/species abuse. Separately, `verifyOneShot()` now accepts ArrayBuffer-backed inputs more broadly, and WPT coverage was refreshed for ML-KEM and key serialization.

### **Streams and Web Streams adapters were corrected**
Multiple stream fixes landed across Node and Web Streams interop: writable writes now reject invalid string chunks with `encoding: 'buffer'`, `Readable.toWeb()` termination is aligned with `eos()`, and `Writable.toWeb()` no longer hangs when `drain` is emitted synchronously. Experimental iterator/broadcast helpers also got backpressure, cancellation, and flush fixes.

### **Public APIs saw several notable updates and cleanups**
`fs.Stats` and `fs.BigIntStats` now expose Temporal-backed `*Instant` fields, extending timestamp support for Temporal adopters. `SourceMap.payload` now returns a frozen shared object instead of cloning, and FFI signature objects switched from `result`/`parameters` to `return`/`arguments`, which is a breaking API cleanup.

### **Test runner, debugging, and build pipeline improved**
Probe-mode debugger failures now surface clearly with terminal error events, test rerun reporting no longer misattributes retry failures, and process-isolated test events bypass declaration-order buffering for more accurate reporting. On the build side, Windows release builds moved from LTCG to Thin LTO with configurable jobs, and release docs/package tooling were refreshed around Node 26.2.0.

### Other misc changes
Docs and test churn continued across watch mode, proxy/TLS/HTTP docs, npm/corepack/eslint/undici bumps, Rust toolchain guidance, and assorted deflakes and CI fixes.
