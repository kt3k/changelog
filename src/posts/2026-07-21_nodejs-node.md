---
date: 2026-07-21
repo: nodejs/node
size: L
title: "Crypto, zlib, and permission audit fixes land"
excerpt: "Node.js tightened crypto key handling, fixed zstd edge cases, and corrected permission-audit behavior; plus a VFS stack-safety refactor."
commits: 18
authors: [panva, nodejs-github-bot, islandryu, Muhtasim-Munif-Fahim, zeeshan56656, styfle, AkshatOP, saint-james-fr, Archkon, edsadr, legendecas, trivikr]
commit_authors: {"db3a8d8": panva, "0938489": panva, "81145bf": panva, "3cfb063": panva, "ad1a0f3": panva, "cecfdce": islandryu, "4bec191": AkshatOP, "8c1d128": Archkon, "51c09ea": edsadr}
---

### **Crypto KEM encapsulation skips extra copies** (db3a8d8)
Node’s KEM encapsulation path now keeps both outputs across the worker boundary instead of packing them into an intermediate buffer and copying them back out. That removes an allocation and a full copy round-trip, improving crypto throughput and memory behavior.

### **RSA-PSS legacy public-key DER is preserved** (0938489)
The ncrypto layer now reconstructs the historical `rsaEncryption` `AlgorithmIdentifier` used by legacy X509 public-key output for RSA-PSS keys. This keeps legacy DER exports stable without relying on deprecated RSA APIs.

### **Provider private-key material is cleansed before free** (81145bf)
OpenSSL-provider-backed private key copies are now wiped before release, including RSA/EC/DH BIGNUMs and temporary parameter/DER buffers. This reduces the chance of sensitive key material lingering in memory after export or encoding.

### **Incomplete RSA private keys now fail cleanly** (3cfb063)
RSA export now treats missing private parameters as an export failure instead of passing null values into JWK encoding. The related RSA path also stops constructing a usable key view if reading an optional parameter fails, preventing malformed private-key exports.

### **Legacy DH validation behavior is retained** (ad1a0f3)
The provider backend’s `g >= p` rejection is now limited to OpenSSL 3 so legacy DiffieHellman objects keep their previous validation semantics. That preserves `verifyError` behavior for older paths while keeping the newer provider check in place.

### **Zstd accepts ArrayBuffer dictionaries** (cecfdce)
Zstd compression/decompression now accepts `ArrayBuffer` dictionaries in addition to typed-array views. The API docs and tests were updated accordingly, broadening interoperability for callers that already store dictionaries as raw buffers.

### **Recursive VFS readdir no longer risks stack overflow** (4bec191)
The in-memory VFS recursive readdir implementation was rewritten to use an explicit stack instead of recursion. This makes deeply nested trees safe to traverse and preserves the existing symlink-cycle behavior.

### **Zstd truncated-input handling is fixed** (8c1d128)
Finalized Zstd streams now correctly report unexpected EOF when the frame is actually truncated, while still allowing the output buffer to drain or a flush-mode partial result to complete. This closes a class of false-positive truncation errors and adds coverage for the edge cases.

### **Permission audit mode stops throwing denials** (51c09ea)
Permission checks now only raise access-denied errors when not running in `--permission-audit` mode. In audit mode, denied operations are logged but no longer throw, matching the intended non-blocking behavior across fs and net paths.

### Other misc changes
- Avoid redundant DataPointer reallocations in ncrypto.
- Update timezone data to 2026c.
- Several docs fixes and wording updates for crypto, vm, SEA, and release guidance.
- CI workflow tweak to merge multiple downloaded artifacts.
- Stream `share()` drop-newest behavior fix.
- Minor zlib docs/test updates and nixpkgs bump.
