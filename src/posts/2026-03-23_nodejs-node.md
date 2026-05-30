---
date: 2026-03-23
repo: nodejs/node
size: M
title: "Node adds official SSL_CTX addon API"
excerpt: "A new native addon API exposes OpenSSL contexts, alongside doc fixes and safer Windows child_process guidance."
commits: 3
authors: [pimterry, kovan]
commit_authors: {"2263b4d": pimterry, "22fc52b": kovan}
---

### **Official SSL_CTX access for native addons** (2263b4d)
Node now exports `node::crypto::GetSSLCtx()`, giving addons an official way to retrieve an `SSL_CTX*` from a `tls.createSecureContext()` object instead of relying on unsupported internal fields. The new API is documented in `node.h` and comes with addon tests to validate both successful extraction and failure cases.

### **Safer Windows .bat/.cmd guidance** (22fc52b)
The child_process docs were updated to stop recommending `spawn()` with `shell: true` for `.bat` and `.cmd` files, and now explicitly call out the deprecation and injection risk. The examples were simplified to favor `exec()` or direct `cmd.exe` spawning.

### Other misc changes
- Doc typo fix in CLI/manual: “guranteed” -> “guaranteed” (7f8019e)
- Add addon test skip for ibmi (2263b4d)
