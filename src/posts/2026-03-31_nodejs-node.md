---
date: 2026-03-31
repo: nodejs/node
size: L
title: "Crypto, QUIC, and diagnostics_channel move"
excerpt: "Major crypto refactors and new APIs land alongside QUIC, inspector, fs.statfs, and diagnostics_channel upgrades."
commits: 20
authors: [nodejs-github-bot, jasnell, panva, verycosy, Qard, guybedford, GeoffreyBooth, aduh95, lilianakatrina684-a11y, cola119, Renegade334]
commit_authors: {"f8ee196": verycosy, "1ccae7c": panva, "cb78a7f": Qard, "cd391b5": guybedford, "1a88acb": jasnell, "79b960a": jasnell, "57186e5": jasnell, "e9b5214": GeoffreyBooth, "f92c61f": aduh95, "60f19bc": lilianakatrina684-a11y, "7e3c244": nodejs-github-bot, "9df9b66": panva, "bf452bb": cola119, "404c3f9": nodejs-github-bot, "d587695": Renegade334}
---

### **Crypto key import paths are unified** (1ccae7c)
Node now routes asymmetric key imports through a single `KeyObjectHandle::Init()` entry point, covering DER/PEM, JWK, and raw formats. That removes a lot of duplicated JS/C++ glue and makes key-handling behavior more consistent across `createPublicKey()`, `createPrivateKey()`, `sign()`, `verify()`, and WebCrypto.

### **diagnostics_channel gains bounded channels and scope helpers** (cb78a7f)
A new `boundedChannel()` API and store-scope helpers were added for synchronous tracing flows. This expands the module beyond full tracing channels and gives users cleaner lifecycle management for AsyncLocalStorage-bound instrumentation.

### **QUIC gets a sizable HTTP/3 and stream behavior update** (57186e5, 79b960a)
The QUIC stack picked up bug fixes and missing functionality, including blob wakeup handling, session/stream cleanup, and more complete HTTP/3 priority/shutdown behavior. The HTTP/3 implementation also now explicitly maps stream priorities and handles graceful GOAWAY processing.

### **Inspector Target now exposes target enumeration** (bf452bb)
The inspector protocol adds `Target.getTargets`, alongside a refactor that extracts a dedicated target manager. This makes worker/target tracking more structured and exposes target discovery to clients.

### **fs.statfs now exposes `frsize`** (f8ee196)
`statfs()` results now include the filesystem fundamental block size (`frsize`) in both numeric and bigint forms. This matters because `blocks`, `bfree`, and `bavail` are defined in `frsize` units, so disk-usage calculations can now be accurate on filesystems where `bsize` differs.

### **Ed25519 context parameters are supported** (9df9b66)
Signing and verification now accept a context for Ed25519 as well as Ed448/ML-DSA/SLH-DSA, aligning Node with OpenSSL’s Ed25519ctx support. The docs and tests were updated to reflect the expanded API surface.

### **Root certificates updated to NSS 3.121** (7e3c244)
Node’s bundled CA set was refreshed with the latest NSS trust store data, adding and removing roots to match upstream. This keeps TLS validation current with browser ecosystem changes.

### **Wasm JS API WPT coverage expanded** (cd391b5, 404c3f9)
Web platform tests were updated for Wasm JS API and WebCrypto changes, including new ESM integration coverage. This helps keep Node aligned with upstream browser behavior for standards-based APIs.

### Other misc changes
- Documented deprecation of `module.register()` (e9b5214)
- Clarified collaborator guide language around experimental vs. deprecated features (f92c61f)
- Fixed a typo in QUIC docs (60f19bc)
- Updated docs layout for sqlite type conversion (d587695)
- Bumped ada to 3.4.4, googletest, nixpkgs, picomatch, and yaml (4 commits)
- QUIC lint/format cleanup (1a88acb)
- Minor doc/test upkeep across crypto, inspector, fs, and tooling
