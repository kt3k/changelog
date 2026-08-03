---
date: 2026-08-02
repo: nodejs/node
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Node ships experimental ZIP APIs and tightens core safety"
excerpt: "New ZIP archive support lands alongside FFI, crypto, QUIC, HTTP, and permissions hardening across the week."
commits: 95
---

### **Experimental ZIP archive support lands in zlib**
Node now exposes `ZipEntry`, `ZipFile`, and `ZipBuffer` APIs for reading and editing ZIP archives with lazy/random-access access and in-memory views. The new surface comes with broad error coverage and test additions, making this the week’s biggest feature.

### **FFI gets a major round of safety and correctness fixes**
Fast API calls now validate 32-bit integer inputs, keep optimized buffer/ArrayBuffer conversions on the native fast path, and refuse to call into a `DynamicLibrary` after it has been closed. Callback ref/unref handling was also hardened to avoid crashes when GC collects a callback earlier than expected.

### **Crypto and DTLS behavior becomes stricter and more flexible**
Private key loading now accepts WHATWG URL objects and OpenSSL STORE loaders, expanding where keys can come from. DTLS verification logic was tightened around SNI, IP literals, and handshake failure handling, while several other crypto APIs got validation and error-reporting fixes.

### **Networking and HTTP saw important reliability and security work**
Node added experimental `node:net/promises` helpers plus async-iterator server consumption, and deprecated `Server.prototype._listen2` at runtime. On the hardening side, security releases fixed multiple CVEs across HTTP/2, permissions, HTTPS, zlib, parsing, and SQLite; HTTP also now enforces header limits, sanitizes timeout values, and makes `IncomingMessage.signal` reflect real socket teardown.

### **QUIC, streams, and coverage improved**
QUIC avoided a crash on fragmented ClientHello handshakes and cleaned up stream reset serialization. Streams got a BYOB ring-buffer optimization and stronger AbortSignal-aware writer shutdown, while the test runner gained `--test-coverage-include-all` for zero-coverage source reporting.

### **SQLite, filesystem, and permissions fixes round out core behavior**
SQLite now rejects closed-database calls for extension loading and authorizer setup, the tag store invalidates iterators correctly, and VFS fixed symlink ownership handling. Permissions checks were tightened for report output and trace file creation, and glob caching was corrected to respect platform-specific path semantics.

### Other misc changes
- Rust floor raised to 1.86 with refreshed vendored crates
- URLPattern result property order aligned with WebIDL
- `Blob.prototype.slice()` now clamps indices per Web IDL
- Root certificates updated to NSS 3.125
- SQLite, llhttp, ada, and undici dependency bumps
- Docs, WPT fixtures, benchmarks, and test cleanup
