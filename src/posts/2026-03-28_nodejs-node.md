---
date: 2026-03-28
repo: nodejs/node
size: L
title: "Stream/iter lands, async scopes expand"
excerpt: "Node adds experimental stream/iter and AsyncLocalStorage using scopes, with crypto error detail improvements and a few ecosystem updates."
commits: 10
authors: [jasnell, panva, richardlau, npm-cli-bot, Qard, jakecastelli, anonrig]
commit_authors: {"cc96741": richardlau, "5b6091c": Qard, "cf2b05c": panva, "74509b1": panva, "ae7c6a7": jasnell}
---

### **Experimental `node:stream/iter` lands** (ae7c6a7)
Node now ships an experimental `node:stream/iter` module, plus `FileHandle.pull()`/`pullSync()` integration and matching `zlib/iter` APIs. This opens a new async-iterable, transform-friendly pipeline for file I/O and stream processing, with docs, implementation, benchmarks, and broad test coverage.

### **AsyncLocalStorage gets `withScope()` for `using`** (5b6091c)
`AsyncLocalStorage` now supports disposable scopes via `withScope(store)`, letting code use JavaScript explicit resource management instead of closure-based `run()` wrappers. That makes synchronous context setup/teardown cleaner, while the new docs spell out the async caveats and the added `RunScope` helper type.

### **Async crypto job failures now surface OpenSSL details** (74509b1)
Crypto derivation paths were refactored to thread an error store through async job code, so failures can carry specific OpenSSL-backed error information instead of returning generic errors. This improves diagnosability across multiple primitives, including DH, ECDH, hash/KDF, random, signature, and KEM flows.

### **QUIC session keys no longer accept `CryptoKey`** (cf2b05c)
The QUIC `keys` option was narrowed from `KeyObject|CryptoKey` to `KeyObject` only, removing `CryptoKey` handling from the internal option parser and updating the public docs accordingly. This is a public API restriction, so code passing WebCrypto keys will need to migrate.

### **V8 wasm big-endian SIMD constant fix** (cc96741)
A V8 cherry-pick fixes `S128Const` handling so wasm globals use native byte order on big-endian platforms instead of assuming little-endian layout. That addresses upstream failures on big-endian Node builds.

### Other misc changes
- npm upgraded to 11.12.1.
- V8 cherry-pick: optimize UTF-16 `utf8length`.
- ESM worker loader comment typo fix.
- Benchmarks added for experimental stream/iter paths.
- npm docs updates for audit signatures, publish, trust, and config behavior.
