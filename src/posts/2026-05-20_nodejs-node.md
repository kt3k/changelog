---
date: 2026-05-20
repo: nodejs/node
size: M
title: "Node 26.2 lands with Thin LTO and WebCrypto updates"
excerpt: "Release 26.2.0 ships, Windows builds switch to Thin LTO, and WebCrypto WPT coverage expands for ML-KEM serialization/imports."
commits: 8
---

### **Node 26.2.0 release notes published** (d955896)
Node.js 26.2.0 was cut and documented, pulling in the current changelog entry plus API docs for recent additions like `stream.compose`, `Temporal.Instant` stats support, and `writeInformation()`.

### **Windows release builds move from LTCG to Thin LTO** (614050b)
The Windows build pipeline now uses Thin LTO for release builds and adds an `--lto-jobs` option to control parallel link-time codegen. This should reduce peak memory usage during release linking while keeping LTO performance benefits.

### **WebCrypto WPT coverage updated for ML-KEM and serialization** (b5659d1)
Node’s embedded Web Platform Tests were bumped to a newer WebCryptoAPI revision, including new ML-KEM JWK import/export coverage and a larger set of CryptoKey serialization tests. That helps keep Node’s WebCrypto behavior aligned with upstream browser-standard tests.

### Other misc changes
- Documentation wording/version tag updates across API docs and changelog.
- Proxy refusal tests deflaked by using a fixed refused port and clearing proxy-bypass env vars.
- Worker near-heap-limit test now disables Maglev to preserve the intended OOM path.
- Collaborator emeritus list reshuffle in README.
