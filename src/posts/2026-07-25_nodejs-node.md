---
date: 2026-07-25
repo: nodejs/node
size: L
title: "Node tightens crypto, net, and debugger behavior"
excerpt: "Key fixes: safer crypto encoding errors, Windows TCP handle transfer support, odd-hex write crash fix, and GC profiling gets minor mark-sweep naming."
commits: 7
authors: [Archkon, RajeshKumar11, JakobJingleheimer, AugustinMauroy, trivikr, mcollina]
commit_authors: {"9024119": trivikr, "9274903": AugustinMauroy, "6af3dda": Archkon, "3e06d53": RajeshKumar11, "0618e9f": Archkon, "b02ef4c": JakobJingleheimer, "fdcb1de": mcollina}
---

### **TCP socket transfer now works on Windows** (fdcb1de)
Node now allows `net.Socket` and `net.Server` handle transfer on Windows instead of rejecting it outright. The implementation updates the TCP wrap transfer path and removes the platform-specific error/docs guard, which broadens worker-thread socket handoff support.

### **Odd-length hex writes no longer crash** (3e06d53)
A fatal `CHECK` in `StringBytes::StorageSize` was removed so odd-length hex strings written through `Writev` are handled the same way as single-write hex decoding. This fixes a crash path seen with corked streams such as HTTP requests, where the trailing incomplete nibble is now safely dropped.

### **Crypto now throws a user-facing encoding error** (6af3dda)
Changing `outputEncoding` mid-stream in `Cipher`/`Decipher` calls now throws `ERR_INVALID_ARG_VALUE` instead of hitting an internal assertion. The docs and tests were updated to make the encoding contract explicit and to surface a clearer API-level failure.

### **GCProfiler reports minor mark-sweep explicitly** (0618e9f)
V8 GC profiling now maps `kGCTypeMinorMarkSweep` to the string `MinorMarkSweep`. That makes GC profiles more accurate when running with `--minor-ms` and avoids mislabeling those collections as an unknown type.

### **Other misc changes**
- Debugger probe session preserves overlapping CDP request state (9024119)
- Docs: add codemod links for several deprecations (9274903)
- Docs: update technical priorities and last review date (b02ef4c)
