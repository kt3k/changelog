---
date: 2026-06-14
repo: nodejs/node
size: M
title: "Crypto, QUIC, and immediates get fixes"
excerpt: "A mix of correctness fixes landed across crypto, QUIC exports, and the native-immediate fast path, plus new util tests."
commits: 4
authors: [haramj, pimterry, gurgunday, watilde]
commit_authors: {"120c2a4": haramj, "2b75078": pimterry, "4fb667e": gurgunday}
---

### **Fix Hash stream errors when native update fails** (120c2a4)
`Hash._transform()` now checks the return value from the native `update()` call and forwards `ERR_CRYPTO_HASH_UPDATE_FAILED` instead of silently continuing. This fixes an unhandled error path in hash streams and adds a regression test covering the failure case.

### **Fast-path empty native-immediate drains** (4fb667e)
Node now skips the native-immediate drain work when there is nothing queued, and avoids entering the immediate check path when both JS immediates and native immediates are empty. That reduces needless work in the event loop and comes with a C++ test proving empty scopes are ignored while queued native immediates still run.

### **Export QUIC listEndpoints correctly** (2b75078)
`listEndpoints` is now re-exported from `lib/quic.js`, restoring the public QUIC API entry point. The same change also adjusts QUIC internals and callback coverage so the internal set-callbacks test matches the current session callback surface.

### **Other misc changes**
- Added util tests for `_exceptionWithHostPort()` and `getCallSites()` source-map behavior.
- QUIC include/export cleanup and callback test updates.
- New source-map fixtures for util call-site tests.
