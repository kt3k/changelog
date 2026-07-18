---
date: 2026-07-17
repo: nodejs/node
size: L
title: "HTTP2 UAF fix, TLS docs, glob cache"
excerpt: "A security-relevant HTTP/2 fix lands alongside glob pattern caching, VFS lchmod behavior, and new TLS socket docs."
commits: 10
authors: [beeequeue, pimterry, trivikr, HoonDongKang, Eusgor, aduh95, manNomi, sjungwon03]
commit_authors: {"5520388": aduh95, "b8f81e9": beeequeue, "0a32b56": beeequeue, "1d4e86e": trivikr, "89df046": pimterry, "050fc39": HoonDongKang, "46de80d": Eusgor, "c1bd1c4": manNomi, "358adc8": sjungwon03, "ed2d7f4": pimterry}
---

### **http2: avoid use-after-free during rst_stream handling** (46de80d)
Defers GOAWAY flushing while nghttp2 is receiving data, so RST_STREAM handling can’t race with `nghttp2_session_mem_recv()` and free state still in use. The fix also stops delivering read chunks if JS destroys the stream mid-callback, closing a heap-use-after-free path.

### **fs: cache compiled glob matchers** (b8f81e9)
`matchGlobPattern()` now reuses compiled matchers from a small cache instead of rebuilding minimatch state for every call. This should reduce overhead for repeated `path.matchesGlob()` checks in hot filesystem paths.

### **vfs: make lchmod update symlink metadata** (1d4e86e)
`lchmod()` now calls a non-following provider operation, so changing a symlink’s mode updates the link itself rather than the target file. The in-memory and real VFS providers were updated accordingly, and the test suite now verifies the expected symlink mode behavior.

### **TLS docs now document `servername` and `alpnProtocol`** (ed2d7f4)
The TLS docs now spell out the `tlsSocket.servername` and `tlsSocket.alpnProtocol` properties, including their `null`-before-handshake behavior and final values after negotiation. This clarifies what consumers can expect from SNI and ALPN inspection.

### Other misc changes
- Added `path.matchesGlob()` benchmarks for posix and win32 (0a32b56)
- Kept finalization refs alive in a before-exit test fixture (89df046)
- Fixed typos in contributing docs, comments, and source comments (050fc39, 358adc8)
- Reused `assignFunctionName` in DNS/inspector internals (5520388)
- Preserved QUIC session stats after close; added a small test update (c1bd1c4)
