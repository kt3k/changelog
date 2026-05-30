---
date: 2026-03-15
repo: nodejs/node
period: weekly
slug: 2026-W11
period_label: "Mar 9–15, 2026"
size: L
title: "Node adds SEA ESM caches, proxy support, and crypto hardening"
excerpt: "Weekly release prep brought SEA ESM caching, SOCKS5 support in Undici, WebCrypto hardening, and several runtime fixes and dependency updates."
commits: 40
---

### **Single-executable apps and networking got notable upgrades**
SEA now supports code cache for ESM entrypoints, closing a long-standing parity gap with the CJS flow and improving startup for single-file executables. On the networking side, Undici 7.24.3 landed with SOCKS5 proxy support plus related docs and dispatcher plumbing.

### **WebCrypto was refactored and hardened**
This week tightened WebCrypto internals in multiple ways: AEAD tag handling moved deeper into cipher jobs, algorithm normalization now avoids repeated `name` lookups, and PKCS#8 import/export behavior for ML-KEM/ML-DSA was made stricter and more consistent. The crypto stack also gained protection against Promise prototype pollution, with updated WPT coverage to keep the implementation aligned with upstream expectations.

### **Core APIs picked up important fixes and observability**
`cpSync()` was fixed for non-ASCII destination paths, restoring reliable recursive copy behavior on Unicode paths. REPL behavior was improved in two steps: it now keeps handling uncaught exceptions after input closes, and embedders can customize error handling via a new `handleError` option. Web Locks also gained `diagnostics_channel` events for request lifecycle tracing.

### **Performance and platform/runtime updates**
Node updated to libuv 1.52.1 and SQLite 3.52.0, and Ada URL parsing is now built with SIMDUTF enabled for a faster text path. WebAssembly ESM also gained support for importing static string constants, and worker heap profile serialization was tuned to reduce profiling overhead.

### **Other misc changes**
Addon docs were substantially rewritten for modern Node-API usage, `mock.module()` docs now clarify customization-hook behavior, built-in module path handling was corrected, TypedArray typings were rationalized, Web Platform Test fixtures were refreshed, timezone data was updated, and several vendored dependencies (`merve`, `amaro`, `googletest`, `resb`) were bumped or patched.
