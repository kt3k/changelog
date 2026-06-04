---
date: 2026-06-03
repo: nodejs/node
size: M
title: "Crypto hardens, fs watch race fixed"
excerpt: "Node.js patches a crypto allocation failure path and fixes recursive fs watch ENOENT races; docs and tooling also updated."
commits: 6
authors: [aduh95, trivikr, watilde, Herrtian]
commit_authors: {"8346181": aduh95, "af2e68b": watilde, "f47f941": Herrtian, "b345a17": aduh95, "3dfd512": trivikr, "4d7996f": trivikr}
---

### **Crypto now fails gracefully on cipher context allocation errors** (f47f941)
WebCrypto AES and ChaCha20-Poly1305 now return a failure status if cipher context allocation fails instead of hard-checking and aborting. The lower-level cipher init path also surfaces a proper `ERR_CRYPTO_OPERATION_FAILED` error, making these OOM-style failures handleable rather than fatal.

### **Recursive fs watch ignores deleted directories during scan** (4d7996f)
The non-native recursive watcher now suppresses `ENOENT` when a directory disappears between discovery and scan, avoiding an unhandled watcher error in a real deletion race. A regression test was added to lock in the behavior.

### **Other misc changes**
- zlib updater script fixed to be more portable/robust (8346181)
- Node.js 25 marked End-of-Life in the changelog index (b345a17)
- async-hooks abort tests updated to accept platform-specific abort signals (3dfd512)
- http2 docs typo fix: “used to sent” → “used to send” (af2e68b)
