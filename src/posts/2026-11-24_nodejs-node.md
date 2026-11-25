---
date: 2026-11-24
repo: nodejs/node
size: L
title: "Streams and fs get faster, safer, and more correct"
excerpt: "Major stream perf work, pipe peer addresses, fs fixes, and several correctness patches across core APIs."
commits: 26
authors: [nodejs-github-bot, Renegade334, yohannesjoya, ychuhai, jakecastelli, JuHyeong424, vedchaudhari, jasnell, rozzilla, inoway46, IlyasShabi, guybedford, RafaelGSS, aduh95]
commit_authors: {"506a565": ychuhai, "7a74c7b": jakecastelli, "448888a": vedchaudhari, "a055d9f": yohannesjoya, "d2c9ac0": guybedford, "85eb0c7": yohannesjoya}
---

### **Stream consumers skip the Blob detour for ArrayBuffer results** (506a565)
`stream/consumers` now has a fast path that concatenates eligible Uint8Array/Buffer chunks directly into one ArrayBuffer instead of copying through an intermediate Blob. That cuts extra allocations and microtasks for binary streams, while preserving the fallback path for unsupported chunk shapes.

### **Readable flow no longer drops buffered chunks during sync reentry** (7a74c7b)
The flowing fast path now accounts for chunks added by `push()`/`unshift()` while a prefetched chunk is pending, instead of silently losing or reordering them. This fixes a subtle data-loss bug in synchronous `data`-listener scenarios and makes the fast path fall back correctly when the buffer is touched.

### **Pipe sockets now expose their peer path** (d2c9ac0)
Unix domain pipe connections now implement `getpeername()`, so `socket.remoteAddress` can report the peer path instead of staying `undefined`. The change also updates HTTP/2 and net handling to treat pipes distinctly from IP sockets, and documents the new behavior.

### **Recursive mkdir() returns EROFS on read-only filesystems** (a055d9f)
`fs.mkdir({ recursive: true })` now preserves `EROFS` instead of converting it into a misleading `ENOENT` when the target path is on a read-only filesystem. This aligns recursive mkdir with other direct filesystem errors and makes read-only mount failures easier to diagnose.

### **Stream operators now reject immediately for pre-aborted signals** (448888a)
`map()` and `toArray()` now check an already-aborted `AbortSignal` up front, which fixes empty streams incorrectly resolving instead of rejecting. The related operator tests were expanded to cover the same edge case across the stream helpers built on top of this logic.

### **cpSync() dereferences symlink sources correctly** (85eb0c7)
The source-side file type checks in `cpSync()` were reversed for `dereference: true`, which could make a symlink to a file look like a directory and trigger `ERR_FS_EISDIR`. The fix makes synchronous copy behavior match `fs.cp()` and removes the stale directory special case.

### Other misc changes
- Stream consumer benchmark and additional regression tests
- Heap profile serialization optimization and benchmark
- `dgram` negative-zero buffer size fix
- Documentation typo/behavior clarifications in `http` and `net`
- Dependency updates: ICU timezone data, histogram, nbytes, zlib, simdjson, undici, V8
- Permission API async error handling coverage for filesystem ops
- ZIP central directory parser micro-optimization
- CI/workflow tweaks: Rust caching, sccache update, readonly cache, Cachix pinning
- Test fixture and WPT updates
