---
date: 2026-10-07
repo: nodejs/node
size: L
title: "Node 26.11.1 lands with V8 15.5 and new stream draining"
excerpt: "Big V8 upgrade, new stream dump APIs, and several crypto/sqlite fixes and refactors highlight the day."
commits: 47
authors: [joyeecheung, panva, RafaelGSS, codebytere, aduh95, Ethan-Arrowood, StefanStojanovic, IlyasShabi, trivikr, inoway46, richardlau, targos, srl295, eliau2005, Renegade334, nodejs-github-bot, fcostaoliveira, theSnackOverflow]
commit_authors: {"9899b39": aduh95, "9e6dd49": Ethan-Arrowood, "26cc118": joyeecheung, "6b28cb0": joyeecheung, "a7e9f3b": Renegade334, "554dd55": panva, "d2a27ee": panva, "3dbbdd0": panva, "4775f2b": panva, "bacbcdc": panva, "0750039": codebytere, "71a657a": codebytere, "4dfcf1d": trivikr, "aa1bf2c": trivikr}
---

### **Node 26.11.1 release fixes docs** (9899b39)
A small out-of-band release updated the changelog docs for 26.11.1.

### **Major V8 15.5 upgrade and Node ABI bump** (6b28cb0, 26cc118)
Node picked up V8 15.5.35.20, along with the matching `NODE_MODULE_VERSION` update to 152. This is the kind of runtime upgrade that can affect native addons and platform support, so it’s a meaningful compatibility boundary.

### **`stream/iter` gets `dump()` / `dumpSync()`** (9e6dd49)
A new pair of consumers drains iterable streams without retaining chunks in memory. That gives QUIC and other backpressure-sensitive code a purpose-built way to consume data to completion without paying the allocation cost of `bytes()`.

### **Crypto key-sharing races were hardened** (554dd55, d2a27ee, 3dbbdd0, 4775f2b, 71a657a, bacbcdc)
Several crypto paths removed mutexes or moved state to the right ownership boundary: EC PKCS8 encoding, verify setup, KEM, RSA-OAEP, secret-key initialization, and the root CA store. Together these changes reduce unnecessary locking and fix cross-Environment/thread-sharing bugs that could corrupt state or make concurrent operations flaky.

### **SQLite now fails safely on oversized text** (aa1bf2c, 4dfcf1d)
SQLite string conversion paths now reject inputs that would exceed V8’s string limits instead of aborting the process, and `enableDefensive()` now survives reopen cycles. These are practical reliability fixes for both error handling and connection lifecycle behavior.

### **QUIC allocator state is no longer thread-local** (0750039)
Each QUIC `BindingData` now owns its allocator state instead of sharing a per-thread singleton. This fixes mis-accounting and CHECK failures when multiple Environments share a thread.

### **Native `ArrayBuffer` copy path switched to V8 fast-copy** (a7e9f3b)
`copyArrayBuffer()` now uses V8’s native copy primitive and is exposed as a fast method. That should make buffer copying simpler and faster, especially on hot paths.

### Other misc changes
- Build fixes for V8 metadata, headers, flags, and illumos/Windows portability (10 commits)
- Benchmark CLI/runtime behavior updates (2 commits)
- Documentation and contributor-guide tweaks (4 commits)
- Test-only/supporting changes, lint rule updates, and dependency/vendor bumps (16 commits)
