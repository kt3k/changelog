---
date: 2026-08-30
repo: nodejs/node
size: M
title: "Node tightens sqlite, crypto, and zlib behavior"
excerpt: "Several user-facing fixes land across sqlite safety, WebCrypto errors, and zlib/zip iterator handling, plus a zlib upgrade."
commits: 8
authors: [nodejs-github-bot, aduh95, TrevorBurnham, panva, codebytere, trivikr, trivenay, koreahghg]
commit_authors: {"12e8e0b": nodejs-github-bot, "bb5cffc": aduh95, "01c1300": TrevorBurnham, "f7e2c14": panva, "df1aa93": codebytere, "884f9cd": trivikr, "f63bffd": trivenay, "e7a6370": koreahghg}
---

### **SQLite session close is now rejected inside callbacks** (01c1300)
Closing or disposing a session from an SQLite callback now throws `ERR_INVALID_STATE` instead of risking a use-after-free. The docs and tests were updated to cover authorizer callbacks, user-defined functions, and `sqlite.db.query` subscribers.

### **Async N-API callbacks enter the right V8 context** (df1aa93)
Node-API async completions and thread-safe function callbacks now enter the environment’s V8 context before invoking JS. This fixes a multi-environment crash mode where async work could abort if another context was current on the isolate.

### **WebCrypto now reports the right error for bad PKCS8 exports** (e7a6370)
`exportKeyPkcs8()` now mirrors `exportKeySpki()` by rejecting public keys with `InvalidAccessError` instead of falling through to a generic `NotSupportedError`. The fix also cleans up `exportKeySync('pkcs8')` so the type check happens in one place.

### **Paused ZIP iterators no longer block close()** (884f9cd)
File-backed ZIP entry iteration now only counts reads while I/O is actually in flight, not while an iterator is paused at a yield. That lets `ZipFile.close()` complete promptly while still rejecting further iteration after closure.

### **Zlib is updated and gains 64-bit compare optimizations** (12e8e0b)
Node vendored zlib was bumped to `1.3.2.1-motley-5eb4d7e`, and the build now wires in a new `compare256.h` path for 64-bit little-endian deflate matching. The update also adjusts SIMD compiler settings and expands support for the SSSE3 adler32 target attribute on Clang.

### Other misc changes
- DEP0207 docs clarified for `node:http2` scope (bb5cffc)
- Missing vector include added in `ncrypto` (f7e2c14)
- Removed an unused QUIC/blob wakeup fin flag (f63bffd)
