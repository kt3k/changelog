---
date: 2026-03-29
repo: nodejs/node
period: weekly
slug: 2026-W13
period_label: "Mar 23–29, 2026"
size: L
title: "Node tightens security, expands crypto, and speeds core APIs"
excerpt: "Security fixes landed across HTTP, TLS, permissions, and crypto, alongside new stream iter APIs, faster buffers, and broader crypto support."
commits: 47
---

### Security and crash-hardening sweep
**Multiple release-blocking fixes**: The week opened with a broad security release covering HTTP, TLS, permissions, crypto, and HTTP/2. Highlights included timing-safe WebCrypto HMAC/KMAC comparison, contained SNI callback exceptions, prototype-safe header maps, stricter permission checks, safer HTTP/2 flow-control handling, and a fix for `url.format()` crash cases.

### Crypto keeps expanding
**Broader WebCrypto and KeyObject support**: Node added TurboSHAKE128/256 and KangarooTwelve/KT128/KT256 support, plus raw public/private/seed import and export paths for KeyObject-based workflows. The crypto stack also gained OpenSSL 4.0 compatibility and improved async error reporting, while a new official `SSL_CTX` addon API gives native modules a supported way to reach TLS context internals.

### New async and stream primitives
**Experimental `node:stream/iter` lands**: A new experimental stream-iteration module arrived with `FileHandle.pull()`/`pullSync()` and `zlib/iter` integration, giving users a more async-iterable-friendly pipeline for file and compression workflows.

**AsyncLocalStorage gets disposable scopes**: `AsyncLocalStorage.withScope()` now supports explicit resource management patterns, making synchronous scope setup/teardown cleaner for `using`-based code.

### Performance work in hot paths
**Buffers and events get faster**: Buffer operations were optimized across copy, hex encoding, fill, search, and swap paths, and `EventEmitter.emit()` now avoids cloning listener arrays unless a mutation actually occurs during dispatch. EC JWK public-key import also picked up a faster path for cofactor-1 curves.

### Compatibility and tooling updates
**Public API and build adjustments**: QUIC now accepts only `KeyObject` for session keys, the doc toolchain switched to the npm-published `@node-core/doc-kit`, and Node was adjusted to build against OpenSSL 4.0.

### Other misc changes
- `test_runner` module mocks now prefer an `exports` option, with legacy aliases deprecated.
- Debugger restart timing was stabilized.
- zlib `reset()` now throws when writes are in flight to avoid use-after-free.
- Several ESM/WASM cache and big-endian SIMD fixes landed.
- Misc doc, dependency, benchmark, and test updates.
