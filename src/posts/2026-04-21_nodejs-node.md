---
date: 2026-04-21
repo: nodejs/node
size: M
title: "Crypto and streams get notable fixes"
excerpt: "JWK support lands for post-quantum keys, while streams and HTTP gain targeted bug fixes and internal cleanup."
commits: 11
authors: [panva, aduh95, islandryu, daeyeon, watilde, nodejs-github-bot, kovan, Flarna]
commit_authors: {"c29a34c": panva, "b2248fd": islandryu, "a6e8368": daeyeon, "dd85293": watilde, "53b8d3c": Flarna}
---

### **Crypto adds JWK support for ML-KEM and SLH-DSA** (c29a34c)
Node now accepts JWK format for ML-KEM and SLH-DSA key types, with docs and key fixtures updated accordingly. This expands interoperability for the newer post-quantum algorithms and aligns the API tables with actual support.

### **HTTP now rejects trailers after a response is finished** (b2248fd)
`OutgoingMessage.addTrailers()` now throws `ERR_HTTP_HEADERS_SENT` once the message is finished, instead of silently accepting invalid trailer writes. That closes a correctness gap and makes the failure mode explicit for users relying on trailer timing.

### **Duplicate nested transferables are now rejected** (a6e8368)
Structured cloning now treats duplicate nested transferables as an invalid transfer list and raises a `DataCloneError` instead of proceeding. This tightens Web Streams transfer handling and prevents ambiguous or unsafe clone behavior.

### **Duplex stream teardown now propagates readable errors to writable side** (dd85293)
`Duplex.from()` now destroys the writable side when the readable side errors, which helps ensure cross-destruction and avoids leaking half-open stream pairs. The added regression test covers the error propagation path.

### **AsyncWrap switches a runtime warning to a DCHECK** (53b8d3c)
The debug-only warning in `AsyncWrap::MakeCallback()` was replaced with a `DCHECK`, reflecting that the underlying use-after-free issue is now fixed. This is an internal safety assertion change rather than a user-facing API change.

### Other misc changes
- Module loader cleanup: removed duplicate `_resolveFilename` checks.
- Crypto docs clarified and typo/inconsistency fixes in `crypto.md` and `webcrypto.md`.
- Dependabot bumps in `tools/eslint` and `tools/clang-format`.
- `nixpkgs-unstable` updated in `tools/nix`.
- Minor stream-related test/status file updates.
