---
date: 2026-10-24
repo: nodejs/node
size: L
title: "BoringSSL support grows across crypto and TLS"
excerpt: "SHA-3, TLS 1.3 ciphers, and several BoringSSL compatibility fixes landed alongside an AbortSignal speedup, HTTP/2 cleanup, and FFI callback draining."
commits: 9
authors: [panva, mcollina, ronag, trivikr]
commit_authors: {"9b5d938": panva, "a0b4170": panva, "7e58295": panva, "a2ce2c6": panva, "41b1e68": mcollina, "6dea43a": ronag, "1eb734d": trivikr}
---

### **SHA-3 now works with BoringSSL crypto APIs** (7e58295)
Node’s crypto layer now recognizes SHA3-256/384/512 on BoringSSL, even though BoringSSL doesn’t register those digest names in its own lookup tables. WebCrypto support is intentionally narrower here: SHA-3 is allowed for digest operations, but not for other algorithm uses.

### **TLS 1.3 cipher configuration is wired up for BoringSSL** (a0b4170)
BoringSSL builds can now translate Node/OpenSSL cipher names into TLS 1.3 suite IDs, reject invalid nonempty lists, and preserve client/server preference semantics via BoringSSL’s cipher flags. This makes `setCiphers()`, defaults, and CLI overrides behave much closer to OpenSSL instead of silently no-oping.

### **AbortSignal creation and abort paths are much faster** (6dea43a)
This refactor cuts allocation and bookkeeping work in `AbortController`, `AbortSignal.any()`, `AbortSignal.timeout()`, and event listener handling, while also avoiding the default abort reason retaining the caller. It should reduce overhead in code that creates or aborts signals frequently.

### **HTTP/2 now tears down sessions abandoned by nghttp2** (41b1e68)
Node now detects cases where nghttp2 has effectively abandoned a session by stopping reads and writes while streams are still open, even after a prior GOAWAY. That closes a gap where streams could otherwise hang after a protocol error.

### **FFI callbacks now drain nextTicks and microtasks when invoked from libuv** (1eb734d)
Native callbacks invoked from the event loop now run inside an `InternalCallbackScope`, so `process.nextTick()` and microtasks scheduled by the callback are drained immediately on return. Synchronous native-to-JS calls keep their existing behavior.

### **BoringSSL compatibility and TLS behavior were tightened up** (9b5d938)
A broad test update removes obsolete BoringSSL skips and aligns expectations with current BoringSSL behavior for DH, ECDH, TLS, PSK, and X.509 cases. It also narrows a few exclusions and updates assertions where BoringSSL’s errors or supported formats differ from OpenSSL.

### **BoringSSL pin and certificate error handling were updated** (a2ce2c6)
The repo’s BoringSSL dependency was bumped, and TLS error handling was adjusted to expect BoringSSL’s missing-issuer code in place of OpenSSL’s leaf-signature failure for certain chains. Tests and helper code were updated accordingly, including a cleanup of a now-unneeded temp-key fallback.

### Other misc changes
- Fixed builds against older OpenSSL 3.0 headers by defining `EVP_PKEY_PRIVATE_KEY` when missing.
- Granted GitHub Actions read permission to CI workflows.
- Updated HTTPS/TLS tests and helpers to account for BoringSSL’s issuer error code.
- Removed an obsolete BoringSSL legacy-protocol test helper.
