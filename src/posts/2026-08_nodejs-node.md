---
date: 2026-08-31
repo: nodejs/node
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Node ships new crypto, ZIP, workers, and perf upgrades"
excerpt: "August brought major experimental APIs, stronger security fixes, faster IO/streams, and deeper TLS/SQLite hardening across core."
commits: 555
---

### **Major new APIs and platform expansion**
Node added several notable public surfaces this month: experimental ZIP archive support in `node:zlib`, a mostly browser-compatible experimental Web Worker API, a generic MAC API (`crypto.createMac()` / `getMacs()`), and new perf_hooks histogram analysis/export features. FFI also became enabled by default in supported builds, and the permissions API was broadened to accept URLs and raw byte references.

### **Security, correctness, and hardening across core**
A large share of the month focused on fixing crashers, memory-safety bugs, and subtle validation holes. Highlights include DNS `resolveAny()` buffer sizing fixes for CVE-2026-58042, a heap overflow fix in `fs.mkdtemp()`, an odd-length UCS2 out-of-bounds write fix, safer ALPN validation, stronger URL setter failure handling, and multiple protections against prototype pollution, reentrancy, and stale state in crypto, SQLite, streams, and the inspector.

### **Crypto and TLS were heavily refactored and tightened**
Crypto got broad provider-aware discovery for ciphers and hashes, separate `mgf1Hash` support for RSA-OAEP, SIV mode support, FIPS-aware behavior changes, better error reporting, and several API validation fixes. TLS/DTLS/QUIC certificate handling was consolidated, SNI and session-resumption edge cases were corrected, handshake callbacks were deferred off the OpenSSL stack, and peer-certificate handling was fixed so repeated reads no longer consume the chain.

### **SQLite saw major API growth and lifetime fixes**
The SQLite module gained richer diagnostics, statement statistics, explicit `close()`/`dispose()` support, improved bindings for ArrayBuffer/SharedArrayBuffer, and stronger input validation for backup/tag-store/session APIs. A recurring theme was lifetime safety: sessions, statements, authorizers, and changesets were hardened against reentry, stale bindings, GC-related crashes, and use-after-free scenarios.

### **Performance wins in HTTP, streams, fs, URL, and buffers**
Node landed several meaningful throughput improvements: larger HTTP/2 flow-control defaults, faster `Readable` async iteration, lower-allocation webstreams piping, faster URL parsing/serialization, better `fs.readFile`/`readFileSync` fast paths, optimized recursive readdir, and Buffer/StringDecoder UTF-8 hot-path speedups. There were also targeted wins in FFI call caching, HTTP response completion, and module compile-cache behavior.

### **QUIC, HTTP, fs, and permissions continued to mature**
QUIC gained clearer stop-sending and request-rejection handling, plus multiple teardown and flow-control fixes. HTTP backpressure, corking, keylog attachment, and connection teardown were corrected. Filesystem work included recursive watch improvements, Windows HANDLE support for streams, realpath fixes, glob depth limiting, abortable stat calls, and better path handling on Windows. The permissions subsystem was refactored and extended to cover more adoption and binding scenarios.

### **Other misc changes**
- Release/build/tooling work: FIPS test infrastructure, deprecated `--enable-static`/`--use-largepages`, improved binary upload naming, alpha prerelease support, snapshot and build fixes.
- Diagnostics/testing: `TracingChannel` stabilized, WPT coverage expanded for workers and web platform behavior, and the test runner gained stronger tag filtering and reporter fixes.
- Documentation and typings: many API docs were clarified or expanded across crypto, SQLite, TLS, streams, permissions, and CLI behavior.
