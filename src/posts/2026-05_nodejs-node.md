---
date: 2026-05-31
repo: nodejs/node
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Node 26 ships QUIC, VFS, DTLS, and major hardening"
excerpt: "May brought new networking and filesystem APIs, a permission revamp, and broad crypto/streams correctness and performance work."
commits: 327
---

### **New APIs and runtime capabilities**
Node added several notable surfaces this month: experimental **DTLS** (`node:dtls`) for UDP-based secure transports, experimental **VFS** support with mount-backed `fs`/`fs/promises` routing, and **QUIC** endpoint/session APIs that now include endpoint listing, richer introspection, and better stats. `process.permission.drop()` also landed, giving the permission model irreversible runtime revocation. On the web-platform side, `fs.Stats` gained `Temporal.Instant` fields, and the test runner picked up first-class **tags** plus tag filtering.

### **Security, correctness, and compatibility hardening**
A large chunk of the month focused on tightening semantics and closing edge cases across core. HTTP got stricter backpressure and header handling, including correct `'drain'` timing, prototype-pollution-safe option parsing, configurable header-value validation, and new arbitrary 1xx informational responses. Crypto saw major hardening and cleanup: `CryptoKey`/`KeyObject` internals were refactored, BoringSSL compatibility paths were expanded, raw key validation was tightened, SAB/ArrayBuffer handling was broadened where appropriate, and WebCrypto was reworked toward safer native job flows. Other fixes addressed TOCTOU issues in SAB-backed Buffer encoding, sqlite backup lifetime bugs, promise leak paths, negative-zero numeric edge cases, and several FFI lifetime/typing problems.

### **Streams, QUIC, and WebCrypto performance work**
Stream iterators and adapters received sustained correctness and throughput improvements: better backpressure handling in `pipeTo()`, `fromWritable()`, `toWeb()`, `compose()`, `share()`, and broadcast/push iterators; fewer allocations in normalization and broadcast trimming; and a few new stable/safer behaviors. QUIC also got a major performance and robustness pass with reduced allocations, better batching/coalescing, stronger error reporting, stricter permission enforcement, and fixes for crashes and use-after-free paths. On the crypto side, hot-path normalization and validation were optimized, and WebCrypto coverage was refreshed with newer WPTs.

### **Release and dependency updates**
The month included the Node.js 26.0.0 current-line cut, plus 26.1.0, 26.2.0, and the 22.22.3 LTS release. Vendored dependencies were refreshed too, including llhttp 9.4.1, Undici 8.2.0/8.3.0, npm 11.15.0/11.16.0, SQLite, simdjson, ngtcp2, and updated NSS root certificates. Build tooling also saw improvements such as Thin LTO on Windows release builds, new Rust/Temporal build guidance, and assorted CI/test-runner cleanups.

### **Other misc changes**
- Debugger/probe UX improved with better help text, clearer probe locations, and more reliable failure reporting.
- Internal refactors split out profiling and debugger helper code, and modernized shared WebIDL conversion logic.
- Docs and changelogs were refreshed broadly across HTTP, QUIC, crypto, sqlite, and build/release guidance.
- Smaller fixes landed in REPL history, source maps, wasm/js API support, `fs`/`net`/`dns` edge cases, and test flake reductions.
