---
date: 2026-10-30
repo: nodejs/node
size: M
title: "QUIC, crypto, and FFI fixes land"
excerpt: "QUIC error handling, crypto safety, and FFI validation saw the biggest changes, plus a few build and test cleanups."
commits: 13
authors: [efekrskl, LiviaMedeiros, trivikr, aduh95, christianaurichzm, UlisesGascon, panva, dsanders11, GeoffreyBooth]
commit_authors: {"2500371": panva, "cfea992": efekrskl, "ddb0559": trivikr, "5c1dcf6": trivikr, "97aed16": LiviaMedeiros, "a7d819a": UlisesGascon}
---

### **QUIC: fix error classification and names** (cfea992)
QUIC now treats crypto error codes more precisely, only decoding TLS alerts within the transport error namespace and exposing the error code as a bigint. The JS-facing session close callback and error-name logic were updated accordingly, with new coverage for h3 error naming.

### **TLS blocklist test now uses a real fixture key** (a7d819a)
Node’s SPKI blocklist test path was reworked to use a permanently blocked fixture CA instead of test-only hooks and a process-wide mutable list. This removes the extra handshake mutex and exercises the production blocklist logic through real TLS handshakes.

### **Crypto random fill rejects immutable buffers** (2500371)
`randomFillSync()`, `randomFill()`, and `getRandomValues()` now refuse ArrayBuffers backed by immutable memory, preventing writes to immutable views. The new test covers full and partial fills across Buffer and typed-array views, while still allowing shared backing stores.

### **FFI callback registration now rejects trailing signature args** (ddb0559)
`registerCallback()` now throws if the callback is not the last argument, fixing a silent misparse that previously produced a `void ()` callback and lost arguments/return values. The added test locks in the new validation.

### **FFI int32/uint32 arguments accept -0** (5c1dcf6)
FFI argument validation now uses the same signed/unsigned integer checks as the other integer widths, so `-0` is accepted consistently for 32-bit integer arguments. This removes JIT-tier-dependent behavior and is covered by updated call tests.

### **util.inspect no longer depends on Buffer.prototype.hexSlice** (97aed16)
`util.inspect()` now imports `hexSlice` from internal buffer helpers directly instead of calling `Buffer.prototype.hexSlice`, avoiding prototype-pollution surprises. A regression test confirms userland mutation of `Buffer.prototype.hexSlice` no longer affects output.

### Other misc changes
- OpenSSL first-use race regression test added for concurrent RSA-PSS decoding.
- QUIC internal error conversion fixed in session/stream close paths.
- Build/config tweaks for DTLS flags, GN `node_path`, and nix requisites.
- Test cleanup: removed duplicate `common` imports and migrated several loader tests to `registerHooks()`.
