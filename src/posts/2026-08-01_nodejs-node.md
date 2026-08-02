---
date: 2026-08-01
repo: nodejs/node
size: L
title: "Node adds ZIP API, DTLS hardening"
excerpt: "A big day for node:zlib ZIP support, plus DTLS verification improvements and a runtime deprecation for http constructors."
commits: 17
authors: [panva, sjungwon03, anonrig, trivikr, mcollina, leah-1ee, pipobscure, Rawal27, jasnell, HoonDongKang]
commit_authors: {"25c0c8e": anonrig, "5ba72ae": pipobscure, "a7d16a8": jasnell}
---

### **node:zlib gains experimental ZIP archive support** (5ba72ae)
Node now exposes `ZipEntry`, `ZipFile`, and `ZipBuffer` APIs for working with ZIP archives, including lazy/random-access reads, in-memory zero-copy views, and archive editing. The change also adds a large set of ZIP-specific errors and extensive coverage, marking a substantial new experimental surface for `node:zlib`.

### **DTLS certificate verification is tightened up** (a7d16a8)
DTLS client verification now explicitly binds SNI/identity handling, treats IP literals specially, and ensures handshake failures reject the `opened` promise while avoiding unhandled rejections for unobserved session lifecycle promises. The API docs were updated to spell out `rejectUnauthorized` and `servername` behavior more clearly, which should make verification semantics much easier to reason about.

### **Calling `node:http` classes without `new` is now deprecated at runtime** (25c0c8e)
DEP0195 was upgraded from documentation-only to a runtime deprecation for `Agent`, `Server`, `OutgoingMessage`, `IncomingMessage`, `ServerResponse`, and `ClientRequest`. This makes legacy constructor-style usage noisy at runtime and nudges users toward the supported `new`-based instantiation path.

### **Crypto error handling and validation get several fixes**
A cluster of crypto changes improves correctness and diagnostics: missing-cipher messaging is clearer, X509 issuer reads avoid an extra native call, key generation now rejects `null` options, Argon2 reports the right invalid parameter names, TurboShake/KangarooTwelve handle allocation failure cleanly, and DH operations now surface errors instead of aborting or returning bogus results. Together, these are mostly bug fixes and robustness work, but they touch user-facing behavior in several crypto APIs.

### **Other misc changes**
- Flaky HTTP/2 reset test fixed to wait for all write callbacks before shutting down.
- DTLS test suite lint/runtime cleanup across many files.
- FFI tests reuse `ffi.suffix` and cover platform-specific values.
- Stream iterator consumer encoding validation tightened.
- Typings added for `heap_utils` internal binding.
- Minor docs typo fixes, QUIC comment cleanup, and small test/doc adjustments.
