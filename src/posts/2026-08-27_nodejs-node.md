---
date: 2026-08-27
repo: nodejs/node
size: L
title: "QUIC, crypto, and permissions tightened"
excerpt: "QUIC flow control and teardown fixes headline a day of crypto correctness, permission hardening, and API docs updates."
commits: 17
authors: [panva, jasnell, trivikr, Renegade334, RafaelGSS, StefanStojanovic, Han5991, kyungrae2002, codebytere, Yeaseen, lazerg]
commit_authors: {"3615979": panva, "4788fb7": panva, "1a6ab3c": panva, "05a8e91": jasnell, "d6e67a5": RafaelGSS, "abb365a": trivikr, "a2bbe4e": codebytere, "c66ae4f": jasnell, "9f37c77": trivikr, "37aeecc": Yeaseen}
---

### **QUIC flow control and teardown were hardened** (05a8e91, 9f37c77)
Node’s QUIC stack now bounds reader batching by bytes as well as chunk count, and the data queue notification path was made re-entrant-safe so listeners can’t be invalidated mid-callback. A second fix releases stream arena slots earlier and guards against post-callback access after JavaScript destroys a stream, preventing teardown-time crashes.

### **WebCrypto now validates JWK usage and SPKI exports more precisely** (4788fb7, 3615979, 1a6ab3c)
JWK import checks now validate requested usages before key type-specific `key_ops` handling, preserving the expected `SyntaxError`/`DataError` precedence across RSA, EC, CFRG, ML-DSA, and ML-KEM imports. Separate fixes reject SPKI export of private keys with the right `InvalidAccessError`, and make oversized RSA-PSS salt lengths fail safely instead of being silently mishandled.

### **Filesystem path and permission handling got stricter** (37aeecc, d6e67a5)
`rmSync()` now formats errors safely for non-ASCII paths, avoiding duplicated or corrupted path text, and permission-model docs were expanded to explain which file-descriptor-based operations are blocked. `fsync` and `fdatasync` are now explicitly denied under the permission model, including the matching `FileHandle` methods.

### **Private-key receiver checks and ELF segment layout were fixed** (abb365a, a2bbe4e)
`ffi` getter templates now reject incompatible receivers before native callbacks run, preventing crashes from invalid `DynamicLibrary` access. `--build-sea` output also keeps ELF segments on separate pages in the non-PIE case, avoiding segment-boundary issues introduced by the header placement logic.

### **Security policy was narrowed for experimental features** (c66ae4f)
The security policy now distinguishes compile-time gated features, runtime-gated experimental features, and QUIC/HTTP/3 explicitly. Experimental 1.0/1.1 runtime features are no longer automatically treated as valid vulnerability targets unless they affect stable behavior.

### Other misc changes
- Commit-queue PR labeling automation (1 commit)
- `inspect()` namespaced tag canonicalization
- `node:test` reporter lifecycle docs
- First-time contributor onboarding workflow
- QUIC flow-control and teardown regression tests
- Misc crypto, QUIC, build, and EventTarget test fixes
