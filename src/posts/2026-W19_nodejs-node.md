---
date: 2026-05-10
repo: nodejs/node
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "Node 26 ships, QUIC lands, and core hardening continues"
excerpt: "A release-heavy week with Node 26/26.1.0, completed QUIC, crypto/TLS hardening, and fixes for HTTP, sqlite, and memory safety."
commits: 63
---

### **Release train advances: Node 26 is current, 26.1.0 ships**
The week opened with Node.js 26 becoming the current line, then closed with the 26.1.0 release. Along the way, version metadata, changelogs, and API docs were updated, and the project bumped the next major development version to 27.

### **QUIC reached completion and got its docs filled out**
The internal QUIC stack was completed, the bundled ngtcp2 dependency was refreshed, and `doc/api/quic.md` received a substantial expansion. This is the biggest feature story of the week and gives the protocol a much more complete implementation and clearer documentation.

### **Crypto, WebCrypto, and TLS were hardened and refined**
Several changes tightened key import validation, improved `SubtleCrypto.supports()` accuracy, and optimized WebCrypto/Web IDL hot paths. Internal crypto state was moved behind private accessors and guarded with additional linting to reduce accessor abuse and prototype-pollution risk, while BoringSSL-backed TLS renegotiation now maps to a dedicated Node error.

### **HTTP and stream backpressure semantics were corrected**
`OutgoingMessage` and `ServerResponse` now only emit `'drain'` once buffered data is actually gone, restoring the expected backpressure contract. The HTTP client also now uses a null-prototype options object to avoid inherited-property surprises during option parsing.

### **Memory-safety and correctness fixes landed in core subsystems**
`Promise.race()` no-op callback handling was moved into C++ to avoid an OOM-prone leak in tight loops, sqlite backups now keep the source database alive to prevent use-after-free crashes, and Blob construction was aligned with the web spec by rejecting `SharedArrayBuffer`-backed parts.

### **Loader, test runner, and module behavior were smoothed out**
The test runner now keeps todo suites green even if a hook fails, and synchronous hook short-circuiting for imported CommonJS modules was fixed to avoid redundant reload paths. There were also smaller cleanup and validation updates around sync stream piping and raw key import handling.

### **Other misc changes**
- Internal WebIDL converters were heavily refactored into a shared, documented module.
- `node:ffi` is no longer listed in builtin modules unless enabled.
- CLI config docs gained version-targeted `node.config.json` support.
- QUIC/session internals were cleaned up with dead-state removals.
- Multiple doc, changelog, CI, and release-process cleanup updates.
