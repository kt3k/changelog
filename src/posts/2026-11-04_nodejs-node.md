---
date: 2026-11-04
repo: nodejs/node
size: L
title: "FFI callables and X.509 APIs land"
excerpt: "New FFI pointer callables, richer X.509 inspection/serialization, and an HTTP/2 session-memory fix headline the day."
commits: 8
authors: [panva, inoway46, codebytere, dmazzella, fatihguzeldev]
commit_authors: {"9365fff": codebytere, "bea4d26": dmazzella, "7fbe29d": inoway46, "20daf9a": inoway46, "3b209b2": panva, "e86ce8b": panva, "d36e9ba": panva, "c085224": fatihguzeldev}
---

### **FFI can now wrap raw function pointers** (bea4d26)
`DynamicLibrary.toFunction(pointer, signature)` adds first-class support for turning native addresses into callable JS functions. The wrapper keeps the library alive and is invalidated on close, but the docs stress that pointer validity and lifetime remain the caller’s responsibility.

### **X.509 certificates get deep inspection getters** (e86ce8b)
`X509Certificate` now exposes structured getters for version, subject, issuer, extensions, TBSCertificate bytes, and signature details instead of forcing callers to parse display strings or DER themselves. The new API preserves ordering and raw values where needed, which makes certificate inspection much more precise for tooling and debugging.

### **X.509 certificates become serializable in v8** (d36e9ba)
`v8.serialize()`/`deserialize()` now support `X509Certificate` host objects by snapshotting the certificate DER, including issuer chains, and reconstructing fresh instances on decode. This avoids relying on mutable cached buffers and makes certificate objects portable through V8 serialization.

### **HTTP/2 no longer counts queued upload data against response memory in local streams** (20daf9a)
The session-memory limit now excludes queued outbound data when a client is receiving responses on locally initiated streams, while still enforcing header limits and preserving the full check for push streams. This fixes cases where queued request bodies could incorrectly block response delivery.

### **DH checks skip expensive validation for recognized named groups** (3b209b2)
Diffie-Hellman parameter validation now recognizes OpenSSL-imported standard groups and skips unnecessary primality checks, restoring the fast path that `DH_check()` historically used. That avoids multi-second stalls on common MODP groups while keeping non-standard or invalid parameters checked.

### Other misc changes
- ICU source lists are now sorted for deterministic build outputs (9365fff).
- Contributor docs now call out running the C/C++ formatter separately from `make lint` (7fbe29d).
- Additional HTTP/2 cancellation coverage was added, including a new session-memory regression test (c085224).
