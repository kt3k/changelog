---
date: 2026-11-14
repo: nodejs/node
size: L
title: "Node removes async loader hooks"
excerpt: "Major module-loading cleanup: async loaders are gone, crypto error handling is tightened, and several runtime bugs in streams, HTTP/2, TLS, and VFS were fixed."
commits: 12
authors: [TrevorBurnham, GeoffreyBooth, chlily1, panva, dcavalcante, aduh95, lazerg, christianaurichzm, mcollina, orgads, inoway46]
commit_authors: {"cb05e4d": GeoffreyBooth, "dd23cd2": chlily1, "bd08ba3": panva, "0b4d0ac": dcavalcante, "3f8e1f5": aduh95, "52bfcaf": lazerg, "7996b18": christianaurichzm, "291d62f": mcollina, "6368e00": orgads, "f8ab610": inoway46, "530b8e3": TrevorBurnham, "b5e3a61": TrevorBurnham}
---

### **Async module customization hooks removed** (cb05e4d)
Node.js has removed `module.register()`, the `--experimental-loader`/`--loader` flags, and the async loader-thread machinery behind them. Module customization now goes through synchronous `module.registerHooks()`, making this a major breaking change for ESM/custom-loader users.

### **X509Certificate now throws on operation failures** (bd08ba3)
Certificate operations now fail loudly when required data can’t be decoded or computed, instead of silently returning missing fields, `false`, or invalid dates. That affects getters, `toLegacyObject()`, and key-comparison/verification paths, and should make certificate handling much more predictable.

### **Utf8Stream no longer closes a file descriptor mid-write** (7996b18)
`Utf8Stream` now waits for in-flight `fs.write()` work to finish before closing the fd, preventing EBADF races and accidental writes into a reused descriptor. The finish/close behavior is also tightened so dropped buffered data doesn’t falsely report completion.

### **HTTP/2 now sends deferred resets when streams are destroyed** (f8ab610)
If a stream was closed with `NO_ERROR` but destroyed before `finish`, Node now remembers the owed `RST_STREAM` and sends it anyway. A matching native backstop stops nghttp2 from spinning on a destroyed stream and sending empty DATA frames indefinitely.

### **Small TLS reads now get their own buffer** (6368e00)
Reads smaller than the shared 64KB slab are now allocated as right-sized managed buffers instead of views into the global read slab. This avoids small retained chunks pinning large slabs in memory and reduces GC pressure for workloads like TLS.

### **VFS gains `readv`/`writev` handlers** (0b4d0ac)
Mounted virtual filesystems now implement vectored reads and writes, fixing broken I/O on both virtual and real file descriptors when the VFS layer is active. The change is covered by a new regression test.

### **TLS session parsing no longer pollutes the OpenSSL error queue** (52bfcaf)
Failed TLS session deserialization now clears OpenSSL errors before returning, so unrelated crypto calls don’t inherit stale queue state. This fixes a subtle cross-operation bug in TLS/crypto error handling.

### **HTTP/2 destroy-after-close queue bug fixed** (f8ab610)
The HTTP/2 close/destroy path now correctly resets a stream even when the body is still queued behind flow control. Without this, nghttp2 could keep the stream alive and loop on empty DATA frames until resource exhaustion.

### Other misc changes
- Crypto portability fix for BoringSSL/OpenSSL ciphers API (dd23cd2)
- Stream transform micro-optimization for sync/non-thenable results (291d62f)
- SQLite docs clarified for number vs BigInt binding (b5e3a61)
- Security release steward doc update and mailmap tweak (3f8e1f5, 530b8e3)
