---
date: 2026-06-19
repo: nodejs/node
size: L
title: "TLS adds certificate compression, crypto deprecation"
excerpt: "Node now supports RFC 8879 certificate compression and runtime-deprecates OpenSSL engine APIs, plus crypto fixes and a QUIC CI job."
commits: 8
authors: [pimterry, panva, tniessen, aduh95, joyeecheung]
commit_authors: {"da51692": panva, "e52ec44": pimterry, "39964a0": pimterry, "21310cb": tniessen, "2315bd3": pimterry, "a4f9858": aduh95, "61e70cc": joyeecheung, "8fa5954": panva}
---

**TLS certificate compression lands with a new context option** (e52ec44)
Node adds `certificateCompression` to TLS context APIs, enabling RFC 8879 handshake certificate compression with `zlib`, `brotli`, or `zstd` while keeping record compression off. The change also exposes `tls.getCertificateCompressionAlgorithms()` so apps can discover what the current OpenSSL build supports, and includes OpenSSL build plumbing plus new coverage.

**OpenSSL engine-based crypto/TLS APIs are now runtime-deprecated** (da51692)
`engine`, `clientCertEngine`, `privateKeyEngine`, and `privateKeyIdentifier` are marked as runtime deprecated with DEP0183 updates across crypto, HTTPS, and TLS docs. Node also added warning emission and test coverage so users get explicit deprecation signals when relying on OpenSSL engine-based paths.

**HMAC now uses EVP_MAC on OpenSSL 3** (8fa5954)
The crypto stack switches HMAC implementation details for OpenSSL >=3, aligning with the newer MAC API instead of the older path. This is a meaningful compatibility and maintenance update, backed by new benchmarks and HMAC test coverage.

**X.509/RSA exponent handling stops hiding BN_get_word failures** (21310cb)
`BignumPointer::GetWord` now returns an optional instead of silently converting OpenSSL failures into a numeric value. That fixes downstream consumers, including X.509 exponent formatting and AES-CTR sizing, so they can avoid acting on bogus big-number results.

### Other misc changes
- Added a PR-triggered QUIC Linux ARM CI workflow for QUIC- and stream/iter-related paths (2315bd3)
- Updated the llhttp updater script to use a simpler release flow and npm-based build steps (a4f9858)
- Added a debugger probe test fixture for type-stripped TypeScript (61e70cc)
- Updated OpenSSL build config to support certificate compression dependencies and toggles (39964a0)
