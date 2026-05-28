---
date: 2026-05-17
repo: nodejs/node
size: L
title: "Crypto WebCrypto gains BoringSSL parity"
excerpt: "Node added BoringSSL-backed WebCrypto for ML-DSA, ML-KEM, ChaCha20-Poly1305, and AES-KW, plus stream iter fast paths and fixes."
commits: 11
authors: [trivikr, panva, marcopiraccini, aduh95, LiviaMedeiros]
commit_authors: {"1f371fc": trivikr, "bc90667": trivikr, "d6be715": marcopiraccini, "550f195": panva, "be9f78f": panva, "0743198": panva, "0ed1d94": panva, "5a8882a": aduh95, "a9b0a83": LiviaMedeiros, "265679b": trivikr, "f8e8eb8": trivikr}
---

### **WebCrypto now supports more BoringSSL-backed algorithms** (550f195, be9f78f, 0743198)
Node wired ML-DSA and ML-KEM into the crypto stack when built against BoringSSL, and added WebCrypto support for ChaCha20-Poly1305 and AES-KW in that configuration. This closes important feature gaps for BoringSSL builds and makes the behavior line up better with Chromium/Electron expectations.

### **stream/iter got a sync-iterable pipeTo fast path** (1f371fc)
`pipeTo()` can now skip `from()` normalization for compatible sync iterables when there are no transforms or abort signal and the writer can accept sync writes. That keeps writes incremental instead of batching everything up front, improving throughput for this common case.

### **stream/iter from() batching was tightened** (265679b)
Sync-iterable normalization in `from()` and `fromSync()` is now capped to `FROM_BATCH_SIZE`, preventing unbounded batches from fallback paths. The change also improves `writev` coalescing for plain `Uint8Array` sources and adds benchmark/test coverage for the new batching behavior.

### **stream broadcast trimming avoids extra min-cursor scans** (f8e8eb8)
Broadcast fan-out now tracks how many consumers share the cached minimum cursor, so buffer trimming can skip repeated `getMinCursor()` work until that last consumer moves. This is a focused performance/refactor change for stream broadcasting under load.

### **Stats date fields are now enumerable** (a9b0a83)
`fs.Stats` date properties were made enumerable, changing how they show up in property iteration and object inspection. That’s a small but observable API-shape tweak for code that serializes or reflects over `Stats` objects.

### **Other misc changes**
- `merge()` now correctly accepts object-like inputs such as `ArrayBuffer`, `ArrayBufferView`, and streamable protocol objects instead of mistaking them for options (bc90667).
- OpenSSL feature gates were simplified behind new macros for maintainability (0ed1d94).
- A performance test assertion was relaxed, a triagers list entry was removed, and stream/iter coverage tests were updated (d6be715, 5a8882a).
