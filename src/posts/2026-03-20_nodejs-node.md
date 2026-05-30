---
date: 2026-03-20
repo: nodejs/node
size: M
title: "ICU bump plus crypto deprecations"
excerpt: "Node updates ICU to 78.3 and adds WebCrypto/crypto docs and API tweaks, including new deprecations and an enumerable SubtleCrypto.supports."
commits: 4
authors: [panva, nodejs-github-bot]
commit_authors: {"7547e79": nodejs-github-bot, "b2c5235": panva, "052aec7": panva, "69fdff9": panva}
---

### **Update ICU to 78.3** (7547e79)
Node vendors ICU 78.3, refreshing the bundled Unicode data and bumping the tracked version metadata. This keeps core string/locale behavior aligned with the latest ICU release and includes an internal fix in ICU’s number formatting code.

### **Deprecate passing CryptoKey into node:crypto** (052aec7)
The docs now mark passing `CryptoKey` objects into several `node:crypto` APIs as deprecated, and also deprecate `KeyObject.from()` with a non-extractable `CryptoKey`. This is an API contract change that warns users before these cases become hard errors in a future release.

### **Make `SubtleCrypto.supports` enumerable** (69fdff9)
`SubtleCrypto.supports` is now defined as an enumerable property in WebCrypto. That makes the property show up in normal object enumeration and better matches expected JS property behavior.

### Other misc changes
- Fixed a stray carriage return in `doc/api/packages.md` (b2c5235).
