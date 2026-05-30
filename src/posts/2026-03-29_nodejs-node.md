---
date: 2026-03-29
repo: nodejs/node
size: M
title: "Crypto deprecations and EventEmitter speed up"
excerpt: "Node.js tightened crypto deprecations, fixed a null-backed ArrayBufferView crash, and sped up EventEmitter emits and EC JWK imports."
commits: 4
authors: [panva, gurgunday, mertcanaltin]
commit_authors: {"f3633ef": panva, "7ffbb76": gurgunday, "adac077": panva, "bdf75a6": mertcanaltin}
---

### **EventEmitter emits no longer clone listener arrays on every call** (7ffbb76)
`emit()` now tracks when a listener array is actively being iterated and only clones it if a mutation happens mid-emit. That should cut per-emit overhead in the common case while preserving the existing semantics for add/remove during dispatch.

### **EC JWK import gets a faster public-key path** (f3633ef)
EC public-key import now avoids a more expensive validation path for curves with cofactor 1 by constructing an uncompressed point and setting it directly. This should reduce overhead for a common elliptic-curve import case without changing the returned key material.

### **CryptoKey-related deprecations are now runtime-enforced** (adac077)
Passing a `CryptoKey` to `node:crypto` APIs, and passing a non-extractable `CryptoKey` to `KeyObject.from()`, are upgraded from documentation-only notes to runtime deprecations. The docs and internal key handling were updated accordingly, so users will now get active deprecation signaling ahead of a future hard error.

### **Null ArrayBuffer backing stores are handled safely** (bdf75a6)
`ArrayBufferViewContents::Read` now guards against a null `Buffer()->Data()` pointer and falls back safely instead of dereferencing it. This fixes a crash path exposed by authenticated crypto tests involving empty `DataView` inputs.

### Other misc changes
- Added/updated crypto deprecation docs and tests
- Added coverage for EventEmitter mutation-during-emit behavior
- Expanded crypto regression tests for the ArrayBufferView fix
