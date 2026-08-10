---
date: 2026-08-09
repo: nodejs/node
size: L
title: "Security fixes and FFI wins land"
excerpt: "Node tightens crypto, URL, SQLite, and WebIDL safety while adding FFI callable caching and faster trampoline placement."
commits: 26
authors: [Archkon, trivikr, panva, greenheadHQ, aduh95, adamjmcgrath, pimterry, bmuenzenmeyer, kyungrae2002, ndossche, luanmuniz, trivenay, hallss93]
commit_authors: {"4758184": panva, "b2b7405": trivikr, "bf2f995": trivikr, "51a55d4": trivikr, "11423b1": adamjmcgrath, "f6db7bc": Archkon, "e79c6b3": pimterry, "8c8190f": panva, "2b7766e": aduh95, "8f51878": Archkon, "bc6db3e": Archkon, "ab9afa9": Archkon, "e04663a": panva, "abbf086": Archkon, "ee5a070": Archkon, "e6fa5bf": greenheadHQ, "d846ffd": greenheadHQ, "21b2880": aduh95, "45ecaad": bmuenzenmeyer, "65a0265": kyungrae2002, "84b76c8": greenheadHQ, "330f7b5": ndossche, "3458dea": luanmuniz, "0700e74": trivenay, "cbe18d8": hallss93}
---

### **FFI now reuses function wrappers and trims trampoline probing** (bf2f995, 51a55d4)
`DynamicLibrary.getFunction()` now caches and reuses the callable created for a symbol instead of rebuilding a new wrapper on every access, fixing identity churn and a serious leak under repeated accessor use. The native trampoline placement search window was also shrunk from 1024 to 16 pages per direction, cutting failed probe syscalls and reducing symbol-resolution latency.

### **RSA-OAEP gains separate MGF1 hashing support** (11423b1)
Node now accepts `mgf1Hash` alongside `oaepHash`, letting OAEP and MGF1 use different digests when needed. This updates the JS API, native crypto plumbing, typings, and adds dedicated coverage for the new behavior.

### **WebCrypto and Web IDL hardening against prototype pollution** (e04663a, 4758184)
WebCrypto internals now read BufferSource inputs and lookup tables through primordials/safe helpers, closing prototype-pollution paths in key import and related crypto flows. The WebIDL dictionary converter was also hardened to copy member descriptors once and avoid inherited property lookups.

### **HTTP request reuse now preserves backpressure semantics** (0700e74)
When the HTTP agent reuses a pooled socket for a request with a different `highWaterMark`, it now synchronizes the socket's writable HWM to match the new request. `_flush()` also emits `drain` correctly after handing buffered data to a socket that never actually backpressured, fixing stalled write loops.

### **TLS, DTLS, and QUIC certificate handling is consolidated** (e79c6b3)
Certificate-store and private-key handling were refactored into shared helpers used across TLS, DTLS, and QUIC. This reduces duplicated logic and makes CA/CRL/private-key behavior consistent across the three stacks.

### **Several security and correctness fixes** (b2b7405, 8f51878, bc6db3e, abbf086, ee5a070, 330f7b5, f6db7bc, ab9afa9)
This batch includes SQLite callback-state protection, safer SEA argv/asset/config parsing, a Windows file-URL bounds check, NULL-return handling in SQLite value extraction, a task-runner ComSpec fix, and a guard on process resource-stat array offsets. Together they close edge-case crashes, misparses, and memory-safety hazards.

### Other misc changes
- SQLite serialize/deserialize docs and tests updated (b2b7405)
- WebCrypto prototype-pollution test adjusted for [EnforceRange] (8c8190f)
- Commit-queue workflow/token handling tweaks (2b7766e, 21b2880)
- Benchmarks added for `node:test` hooks/options and FFI getFunction resolution (3458dea, 51a55d4)
- Documentation fixes for URLs, permissions, crypto randomFill, and internal links (45ecaad, 65a0265, 84b76c8, d846ffd)
- Minor stream/TLS helper cleanup via `validateArray` (e6fa5bf)
- QUIC status/header typing and related test updates (cbe18d8)
- SQLite and URL regression tests added for the fixes above (330f7b5, ee5a070)
