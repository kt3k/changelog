---
date: 2026-05-08
repo: nodejs/node
size: L
title: "TLS, crypto hardening, and QUIC docs"
excerpt: "Node.js tightened crypto internals and TLS renegotiation handling, while also refreshing QUIC docs and a few release notes."
commits: 12
authors: [panva, Renegade334, nodejs-github-bot, jasnell, RafaelGSS, geeksilva97, aduh95]
commit_authors: {"34e62e9": panva, "64cf9a1": jasnell, "9adddc5": panva, "f7c2628": panva, "b3ae59d": panva}
---

**Crypto internals hardened against accessor and slot abuse** (b3ae59d, f7c2628, 9adddc5)
Node.js now stores KeyObject and CryptoKey internals behind private/native-backed accessors, adds lint rules to keep lib code from reading user-replaceable properties, and clones algorithm data more defensively. This reduces the risk of prototype pollution, forged accessors, or stale/mutable state leaking into internal crypto flows and structured clone/export paths.

**TLS renegotiation now maps BoringSSL failures to a Node error** (34e62e9)
Calling `TLSSocket#renegotiate()` on BoringSSL-backed builds now yields `ERR_TLS_RENEGOTIATION_UNSUPPORTED` instead of an implementation-specific SSL error. The new error is documented and the affected renegotiation test was updated to expect the backend-specific behavior.

**QUIC docs were substantially expanded** (64cf9a1)
`doc/api/quic.md` received a large documentation refresh, adding detail and clarifications around the QUIC API. This should make the still-evolving interface easier to understand and use correctly.

### Other misc changes
- Bumped ngtcp2 to 1.22.1.
- Updated release procedure docs for post-release failure handling.
- Documented the `entryPoint` argument for `sqlite.loadExtension()`.
- Adjusted sqlite test cleanup to use ERM.
- Fixed a deprecation list entry in the v26 changelog.
- Updated TLS/crypto tests for BoringSSL behavior changes.
