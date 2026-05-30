---
date: 2026-03-11
repo: nodejs/node
size: M
title: "WebCrypto refactor, release prep, tz update"
excerpt: "Crypto AEAD handling was refactored, WebCrypto normalization got a once-only name read fix, and 25.8.1 release/tz data landed."
commits: 7
authors: [panva, nodejs-github-bot, thisalihassan, JakobJingleheimer, aduh95]
commit_authors: {"e57d5bb": JakobJingleheimer, "aaa9151": panva, "e1ca754": panva}
---

### **WebCrypto AEAD handling refactor tightens crypto internals** (aaa9151)
Node’s WebCrypto AEAD paths were reworked to move tag handling into the lower-level cipher jobs instead of slicing input data in JS. The change also adds/updates coverage for detached-buffer decrypt behavior and tag-size edge cases, which should make GCM/OCB handling more consistent and less error-prone.

### **Algorithm normalization now reads `name` only once** (e1ca754)
`normalizeAlgorithm()` now passes the extracted algorithm name into the WebIDL converter up front, avoiding a second property access during normalization. That fixes getter side effects and aligns the implementation with Web Platform Tests expectations.

### **`mock.module` docs now warn about customization hooks** (e57d5bb)
The test docs now note that synchronous module customization hooks affect `mock.module()` resolution, while asynchronous hooks are ignored in the current loader model. This clarifies a subtle limitation that can otherwise trip up module-mocking users.

### **Other misc changes**
- Release 25.8.1 changelog entry and index update
- Timezone data updated to 2026a
- Writable stream callback arrow-function cleanup
- merve updater now preserves GN build files
