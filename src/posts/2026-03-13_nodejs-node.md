---
date: 2026-03-13
repo: nodejs/node
size: M
title: "PQC key handling tightened, exports adjusted"
excerpt: "Node now rejects seedless ML-KEM/ML-DSA PKCS#8 imports and defaults exports to seed-only when possible, plus a few doc cleanups."
commits: 5
authors: [panva, kovan, nodejs-github-bot]
commit_authors: {"8ccbe8e": panva, "da5843b": panva}
---

### **Reject seedless ML-KEM/ML-DSA PKCS#8 imports in WebCrypto** (8ccbe8e)
SubtleCrypto now throws `NotSupportedError` when importing ML-KEM or ML-DSA PKCS#8 private keys that omit the seed. This closes a gap where seedless private-only encodings were previously accepted, and the new tests also cover mismatched expanded-key cases.

### **Default ML-KEM/ML-DSA PKCS#8 exports to seed-only when available** (da5843b)
OpenSSL provider parameters are now configured so PKCS#8 exports prefer the seed-only format for ML-KEM and ML-DSA private keys, falling back to private-only only when no seed exists. That makes exported keys more consistent with the seed-bearing form users expect, and the tests were updated accordingly.

### Other misc changes
- Updated bundled `merve` to 1.2.2
- Removed outdated Chrome 66 / `ndb` debugger docs
- Added missing `throwIfNoEntry` history entries for `fs.stat` APIs
