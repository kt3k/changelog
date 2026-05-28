---
date: 2026-05-03
repo: oven-sh/bun
size: L
title: "Security fixes plus Bun.Image lands"
excerpt: "A big day of memory-safety fixes, SQL hardening, and a new image pipeline with ICC profile preservation."
commits: 46
authors: [robobun, Jarred-Sumner]
commit_authors: {"ed75c88": Jarred-Sumner}
---

### **Bun.Image ships as a full decode/transform/encode pipeline** (ed75c88)
Bun adds `Bun.Image` for JPEG/PNG/WebP/GIF/BMP processing, with resize/rotate/modulate support and platform backends for native formats. The pipeline now preserves source ICC profiles through JPEG/PNG re-encode, avoiding color shifts for non-sRGB images.

### **Several memory-safety bugs were closed across core APIs**
Multiple high-severity fixes landed for `crypto.randomFill`, structured-clone Blob/File deserialization, `Bun.serve` header handling on HEAD responses, MySQL BLOB binding, IPC length checks, and more. These issues included heap overflows, use-after-free paths, and out-of-bounds reads/writes that could be triggered from JS or untrusted data.

### **Worker, WebSocket, and FS lifetime bugs were hardened**
The worker heap-snapshot path no longer races cross-thread handle ownership, recursive `fs.readdirSync` cleanup now releases all Dirent refs, and WebSocket tunnel mode gets additional ref-counting to avoid leaks and UAFs. Bun also fixed GC/backpressure edge cases in server response handling and `fs.promises.cp`.

### **SQL and resolver parsing are stricter now**
Postgres binary `int4[]`/`float4[]` parsing now validates server-provided lengths before iterating, and MySQL auth rejects undersized nonce/public-key data instead of reading past buffers. Resolver and bundler-related fixes also closed type confusion and invalid cached-entry reads in error paths.

### Other misc changes
- DNS hostname size checks and `readlink` NUL-termination bounds fixes
- Buffer/Blob small correctness fixes and cleanup
- `Worker.postMessage` transfer-list support in self-workers
- Misc internal refactors, build-script tweaks, and test additions
