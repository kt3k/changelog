---
date: 2026-05-03
repo: nodejs/node
size: L
title: "Crypto, FFI, and inspector fixes land"
excerpt: "Major crypto internals refactor, BoringSSL compatibility hardening, FFI memory-safety cleanup, and an inspector URL fix."
commits: 8
authors: [panva, addaleax, GrinZero]
commit_authors: {"25f80fb": panva, "10dd87b": addaleax, "f64b968": addaleax, "01a096c": panva, "b2f6aa3": GrinZero}
---

### **Crypto: decouple KeyObject and CryptoKey, moving CryptoKey into src** (25f80fb)
This is a substantial internal crypto refactor that separates `KeyObject` from `CryptoKey` and relocates `CryptoKey` implementation into `src`. It touches core crypto primitives, WebCrypto plumbing, benchmarks, and docs, so it likely lays groundwork for cleaner ownership and API maintenance.

### **Crypto: harden OpenSSL/BoringSSL compatibility paths** (01a096c)
The crypto layer adds guards and adjusts behavior where BoringSSL differs from OpenSSL, including secure allocation provenance, cipher/tag handling, DH validation, and RSA keygen edge cases. The updated tests suggest this is meant to prevent subtle runtime mismatches and avoid misleading or unsupported behavior on BoringSSL builds.

### **FFI: make FFIFunctionInfo a BaseObject and tighten memory management** (10dd87b, f64b968)
`FFIFunctionInfo` is now a `BaseObject` subclass instead of being managed through V8 weak callbacks and raw `External` pointers, which improves lifecycle tracking and reduces memory-management footguns. A follow-up change converts callback ownership to `unique_ptr`, further lowering leak/double-free risk in the ffi path.

### **Inspector: fix duplicated absolute URLs in HTTP network events** (b2f6aa3)
HTTP inspector events now detect absolute `options.path` values and preserve them instead of blindly prefixing host/protocol again. This fixes malformed request/response URLs in `Network.requestWillBeSent` and `Network.responseReceived` while expanding tests for both GET and POST cases.

### Other misc changes
- CI dependency bumps: `github/codeql-action` (2 commits), `Mozilla-Actions/sccache-action`, `actions/upload-artifact`
