---
date: 2026-11-16
repo: nodejs/node
size: L
title: "QUIC, crypto, and HTTP/2 fixes land"
excerpt: "Notable bug fixes plus a new heap warning, crypto backend cleanup, and QUIC/HTTP2 correctness improvements."
commits: 22
authors: [LiviaMedeiros, mcollina, pimterry, panva, nodejs-github-bot, joyeecheung, martenrichter, jasnell, AlexCannonball, vedchaudhari, Han5991, rozzilla, ziyao233, aduh95, Ultroncn]
commit_authors: {"cb4cba6": mcollina, "d5af389": mcollina, "f9c1859": pimterry, "95b3edd": panva, "ca54b1f": pimterry, "428dd86": jasnell, "924250d": vedchaudhari, "2feb5c8": mcollina}
---

### **Crypto backend requirements made explicit**
The crypto layer now names OpenSSL and BoringSSL paths more explicitly and raises hard errors for unsupported backends, which should catch incomplete backports earlier. It also tightens capability detection around Argon2 and related APIs/constants across ncrypto and the C++ crypto bindings (95b3edd).

### **Heap warning added for builds without pointer compression**
Node now warns when a large heap on non-pointer-compression builds is likely to exceed V8’s 4 GiB pointer-compression cage, or will certainly exceed it at even larger sizes. The warning is documented, surfaced as `HEAP_EXCEEDS_POINTER_COMPRESSION_LIMIT`, and covered by a new regression test (428dd86).

### **HTTP/2 compat requests no longer emit `end` after abort**
The HTTP/2 compat layer now tracks incomplete streams so truncated request bodies are destroyed instead of being ended. That prevents applications from treating a reset/aborted body as complete and aligns the compatibility behavior more closely with HTTP/1 semantics (cb4cba6).

### **Buffer search offsets now honor safe integers**
`Buffer.indexOf()`, `includes()`, and `lastIndexOf()` no longer clamp large offsets to int32 bounds, fixing incorrect matches on buffers larger than 2 GiB. Offsets are now clamped to the safe integer range instead, with new coverage for very large searches (924250d).

### **TLS session reuse accepts typed-array views**
Client TLS sessions supplied as ArrayBuffer views are now normalized before reuse checks, so tagged sessions stored in typed arrays can still resume correctly. This hardens session handling and adds regression coverage for multiple view types and offsets (2feb5c8).

### **QUIC stream FIN handling and SSL lifetime fixed**
QUIC now reschedules streams when a FIN or data frame doesn’t fit in a packet, preventing end-of-stream signals from being lost under congestion or packet packing pressure. A separate QUIC TLS change also keeps the SSL object owned by the context and clears session references on reset, reducing leak risk and lifetime hazards (f9c1859, ca54b1f).

### **Webstreams brand checks optimized for better performance**
Brand checks in the webstreams implementation were split into distinct functions so they no longer share feedback vectors and go megamorphic. This is a targeted performance cleanup for stream brand validation paths (d5af389).

### **Other misc changes**
- Build fixes: GCC warnings with V8 under gnu++20; shared-simdutf packaging tweak; notarize darwin tarballs; backport script update.
- Test runner: JUnit XML cleanup and suite context tag/workerId exposure.
- Docs: TextDecoder/TextEncoder migration/deprecation updates, release typo fix, and process warning docs.
- Smaller internal/test cleanups: util inspection optimization, http2/quic test additions, crypto build guard checks.
