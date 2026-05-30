---
date: 2026-03-31
repo: nodejs/node
period: monthly
slug: 2026-03
period_label: "March 2026"
size: L
title: "Node March 2026: major crypto, streams, and security hardening"
excerpt: "March brought new stream/iter APIs, broad crypto expansion, a security release, and major fixes across HTTP, QUIC, REPL, and test runner."
commits: 219
---

### **Security and protocol hardening took center stage**
March included a security-focused LTS release and several follow-up fixes across core networking and crypto. Highlights included timing-safe HMAC/KMAC comparisons, tighter permission checks, HTTP header and path validation, TLS SNI exception containment, HTTP/2 overflow teardown, and prototype-safe request header maps. Node also enabled V8’s seeded array-index hashing and hardened URL formatting and source-map handling to reduce crash and injection risk.

### **Crypto and WebCrypto saw the biggest functional expansion**
WebCrypto gained new algorithms and stricter semantics: TurboSHAKE/KangarooTwelve support, Ed25519 context parameters, improved AEAD handling, explicit `outputLength` parameters for cSHAKE/KMAC, and stronger key-import/export rules for ML-KEM/ML-DSA. The traditional `node:crypto` surface also expanded with raw key formats, unified asymmetric key import paths, safer async error reporting, and runtime deprecations around passing `CryptoKey` into `node:crypto`. A related security pass switched internal comparisons to timing-safe primitives and hardened against Promise prototype pollution.

### **Streams, REPL, and diagnostics got meaningful new capabilities**
Node landed experimental `node:stream/iter` with file-handle and zlib integration, while compression/decompression streams were brought closer to spec on error handling and input compatibility. `AsyncLocalStorage` gained `withScope()` for explicit resource management, `diagnostics_channel` added bounded channels and Web Locks events, and `tracePromise()` behavior was tightened for non-thenables. The REPL dropped its `domain` dependency, gained customizable error handling, and fixed several closed-input and uncaught-exception edge cases.

### **Performance and runtime behavior improved in hot paths**
Buffer operations were optimized substantially, including faster hex encoding, fill, indexOf, and copy paths. URL parsing and Ada were tuned with SIMDUTF, `Buffer.indexOf` and worker heap profile serialization saw targeted improvements, and `EventEmitter.emit()` now avoids unnecessary listener-array cloning. Node also updated key runtime deps like Undici, libuv, ICU, SQLite, simdjson, and ngtcp2, bringing fetch, I/O, locale, database, and QUIC maintenance updates along with them.

### **Platform, build, and API surface updates**
The month added `--max-heap-size`, official SSL_CTX access for native addons, `fs.statfs().frsize`, per-environment system CA handling, and SEA code-cache support for ESM entrypoints. QUIC received a sizable HTTP/3 and stream-behavior refresh, inspector target enumeration was exposed, and built-in module path/build handling was cleaned up for custom builds and external V8 configurations.

### **Other misc changes**
Docs and tests were refreshed broadly: addon guidance was rewritten, deprecation notes were clarified, WPT fixtures were updated, several CLI/test-runner edge cases were fixed, and multiple small CI/build/tooling updates landed throughout the month.
