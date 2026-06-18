---
date: 2026-06-17
repo: nodejs/node
size: L
title: "Node adds sync UDP connect, crypto tightening"
excerpt: "A synchronous dgram connect lands, crypto deprecations turn end-of-life, and Web Crypto/DH behavior gets stricter."
commits: 8
authors: [panva, guybedford, anonrig, jasnell, emmayusufu]
commit_authors: {"eea8d72": guybedford, "4d09c04": panva, "3fd0e11": anonrig, "b03e6e0": jasnell, "9d50432": panva, "5402b5e": panva, "63907e1": panva, "ef42d32": emmayusufu}
---

### **dgram: add synchronous `Socket.connectSync()` (eea8d72)**
Node now exposes a synchronous UDP connect path that binds if needed, validates numeric IP literals, and throws immediately for local setup errors. It also guarantees `remoteAddress()` is available right after the call, with the `'connect'` event deferred to the next tick.

### **crypto: move CryptoKey support to End-of-Life and tighten Web Crypto inputs (4d09c04, 9d50432, 63907e1, 5402b5e)**
Several crypto surfaces were hardened: passing `CryptoKey` into many `node:crypto` APIs is now End-of-Life, resizable ArrayBuffer-backed Web Crypto inputs are rejected, and Diffie-Hellman `computeSecret()` now throws when the instance has no private key instead of returning an empty buffer. The same crypto docs also mark Argon2 and encapsulation/decapsulation APIs as stable.

### **stream iter backpressure semantics refined (b03e6e0)**
The stream/iter bridge now treats sync write paths more strictly: `writeSync`/`writevSync` only succeed when data is accepted immediately, and thrown sync errors are no longer treated as a silent fallback into async handling. This clarifies backpressure behavior across classic, pull, push, and consumer helpers.

### **New child_process benchmarks added (3fd0e11)**
Three microbenchmarks were added for spawn option marshalling, IPC round-trips, and `execFile()` maxBuffer behavior. These give the child_process work a clearer performance baseline for JS-to-C++ hot paths.

### Other misc changes
- Docs fix for test runner mock examples (ef42d32)
- Crypto docs marked Argon2 and encap/decap stable (5402b5e)
