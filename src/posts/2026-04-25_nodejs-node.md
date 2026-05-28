---
date: 2026-04-25
repo: nodejs/node
size: L
title: "Node tightens webcrypto, HTTP, and Argon2"
excerpt: "Security-minded HTTP header changes, stricter WebCrypto/streams validation, and Argon2 error handling improvements landed today."
commits: 8
authors: [panva, watilde, daeyeon, mcollina, skooch]
commit_authors: {"34adeeb": watilde, "42a154b": daeyeon, "21436f0": mcollina, "10ae641": watilde, "ce21c87": panva, "da7f2c8": skooch, "8f348bc": panva, "fe7ebcc": panva}
---

### **HTTP request headers now use a null prototype** (21436f0)
IncomingMessage `headers` and `trailers` now come from objects with a null prototype, aligning them with the distinct variants and reducing prototype pollution risk from attacker-controlled header names like `__proto__`. The change is documented and covered by expanded HTTP/http2 tests.

### **WebCrypto now canonicalizes and deduplicates key usages** (fe7ebcc)
CryptoKey usages are now normalized so duplicates are removed and the set is canonicalized before keys are created or imported. This fixes inconsistent JWK `key_ops` handling across algorithms and tightens validation for WebCrypto keys.

### **Argon2 job setup no longer pre-validates native params** (ce21c87)
Node removed an extra Argon2 parameter check during job setup and now lets the KDF itself report invalid parameters. That shifts error handling to the native layer and avoids a separate `ERR_CRYPTO_INVALID_ARGON2_PARAMS` path.

### **ReadableStream.from() now rejects non-object iterators** (42a154b)
`ReadableStream.from()` now validates that `@@iterator`/`@@asyncIterator` actually return an object, throwing a TypeError when they do not. This closes a spec compliance gap and prevents malformed iterator return values from slipping through.

### Other misc changes
- ML-KEM JWK `key_ops` duplicate detection added to WebCrypto validation/tests (8f348bc)
- FFI type aliases extended to accept `float32`/`float64` (10ae641)
- libuv copyfile timestamp preservation now ignores `futimens()` failures as best-effort (da7f2c8)
- `ReadableStream.from()` WPT status updated after the iterator validation fix (42a154b)
- Doc typo fix in `stream_iter.md` (34adeeb)
