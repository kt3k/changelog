---
date: 2026-03-26
repo: nodejs/node
size: L
title: "Crypto expands; security and zlib fix land"
excerpt: "Node adds modern WebCrypto hash algorithms and raw key formats, while fixing a zlib UAF and an ESM cache bug."
commits: 8
authors: [panva, mcollina, guybedford, RafaelGSS, nodejs-github-bot, legendecas]
commit_authors: {"53bcd11": mcollina, "dbc7405": guybedford, "e0cab9d": panva, "329c8e7": RafaelGSS, "38647b3": panva, "1baafcc": nodejs-github-bot, "d4fa60c": panva, "1ea93c7": legendecas}
---

### **WebCrypto gains TurboSHAKE and KangarooTwelve** (e0cab9d)
Node now supports the modern digest algorithms KT128/KT256 and TurboSHAKE128/256 in WebCrypto, with docs, Web IDL, C++ bindings, and conformance tests updated accordingly. This broadens Node’s cryptography surface for users following the latest WICG/RFC algorithms.

### **KeyObject APIs add raw public/private/seed export and import support** (d4fa60c)
The crypto KeyObject APIs now understand raw key formats like `raw-public`, `raw-private`, and `raw-seed` for applicable asymmetric keys, and the WebCrypto layer is wired up to use them. The implementation also removes an unnecessary export job layer, simplifying key serialization paths and expanding interoperability for EC, CFRG curves, ML-* keys, and SLH-DSA.

### **zlib reset() is blocked during in-flight writes** (53bcd11)
Calling `reset()` while an async compression write is running could free stream state still being used by a worker thread, creating a use-after-free. Node now throws instead, matching the existing safety checks on related zlib operations.

### **ESM load cache eviction preserves source/eval phase identity** (dbc7405)
A fix in module job caching prevents a source-phase WASM import from being evicted incorrectly when the same module is later resolved in evaluation phase. That avoids returning mismatched module identities and closes a subtle regression in mixed-phase imports.

### **Node enables compilation against OpenSSL 4.0** (38647b3)
The internal OpenSSL compatibility layer was adjusted so Node can build and link against OpenSSL 4.0. The changes also update certificate-name handling to use safer accessor APIs and keep the TLS test suite aligned.

### Other misc changes
- REPL now uses `vm.constants.DONT_CONTEXTIFY` for its execution context (1ea93c7)
- Security release steward list updated in docs (329c8e7)
- WPT/WebCrypto fixture updates and test refreshes (1baafcc)
