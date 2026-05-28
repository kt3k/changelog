---
date: 2026-05-17
repo: nodejs/node
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Streams, QUIC, and WebCrypto get a busy week"
excerpt: "Node added new test-tagging and HTTP 1xx APIs, tightened streams/QUIC correctness, and expanded BoringSSL-backed crypto support."
commits: 66
---

### **Major runtime and API additions**
- **Test runner tags and filtering** landed on `test()`, `it()`, `suite()`, and `describe()`, with `--experimental-test-tag-filter` and reporter/context exposure for metadata-based selection.
- **HTTP informational responses** gained `response.writeInformation()` for arbitrary 1xx status codes, including HTTP/2 compat support.
- **`stream.compose` is now stable**, marking it ready for general use.
- **N-API typed arrays** now accept `SharedArrayBuffer`, widening addon compatibility.

### **Streams and stream/iter got a substantial correctness and performance pass**
- `pipeTo()` and `fromWritable()` were fixed to respect backpressure correctly and avoid duplicate writes or bad cache behavior.
- `toReadableSync()`, `PushQueue`, and `BroadcastWriter` received smaller correctness and allocation fixes.
- Sync-iterable normalization in `from()`/`fromSync()` was capped and optimized, while broadcast fan-out trimming was sped up by avoiding repeated minimum-cursor scans.
- A new sync-iterable fast path in `pipeTo()` improves throughput when normalization is unnecessary.

### **Crypto, QUIC, and platform behavior tightened**
- **WebCrypto gained more BoringSSL parity**, including ML-DSA, ML-KEM, ChaCha20-Poly1305, and AES-KW support in BoringSSL builds.
- **QUIC was brought in line with the permission model** and got fixes for backpressure handling and ALPN failure signaling.
- **macOS certificate trust handling** was corrected so missing trust-result metadata falls back to `TrustRoot` as Apple intends.
- `fs.Stats` date fields are now enumerable, which changes object iteration/inspection behavior.

### **Debugger, wasm, and release maintenance**
- Debugger inspect/probe behavior was improved with better help handling and more accurate reported hit locations.
- WebAssembly.Exception JS API support was updated to match V8/spec behavior more closely.
- Node 22.22.3 LTS was cut during the week, pulling in the backported fixes and dependency updates.

### Other misc changes
- libffi static-linking coverage was expanded to more target combinations.
- BoringSSL cipher enumeration now falls back safely when `libdecrepit` is absent.
- Temporal build flags were documented, and V8 build scripts were adjusted for toolchain-specific flag handling.
- Vendored SQLite and simdjson were refreshed, docs were cleaned up, and several flaky tests/scripts were stabilized.
