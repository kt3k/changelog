---
date: 2026-04-18
repo: oven-sh/bun
size: L
title: "Bun ships major socket, install, and debugger fixes"
excerpt: "Concurrency, memory-safety, and install-path bugs got fixed across sockets, workers, TLS, and the debugger; zlib also got replaced."
commits: 22
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"6495154": robobun, "f8d4254": robobun, "983ee68": robobun, "e2fd5fb": robobun, "8f2519f": Jarred-Sumner, "2a32783": robobun, "19635e7": robobun, "a97b8d8": Jarred-Sumner, "d7a66f5": robobun}
---

### **Bun swaps socket retention to JS refs** (f8d4254)
TCPSocket/TLSSocket now hold the wrapper with `jsc.JSRef` instead of `hasPendingActivity`, so active sockets stay alive without a per-socket pending-activity flag. The change also makes inactive sockets downgrade to weak refs so GC can reclaim them sooner, which should improve lifecycle correctness and retention behavior.

### **`bun install` now streams tarball extraction** (6495154)
Package tarballs can be extracted while they’re still downloading instead of buffering the full archive first, cutting peak memory use and improving install latency. This is a substantial plumbing change through the network, extract, and libarchive layers, with new non-blocking retry semantics to make streaming work reliably.

### **Bun replaces cloudflare/zlib with zlib-ng** (8f2519f)
The repo now vendors zlib-ng 2.3.3 in `ZLIB_COMPAT` mode, replacing the older cloudflare/zlib fork. That brings an actively maintained compression backend with SIMD dispatch and should matter for both correctness and performance-sensitive gzip/zlib paths.

### **Debugger pauses no longer spin a CPU core** (983ee68)
While paused at a breakpoint or `debugger;`, the inspector thread now waits on a condition variable instead of busy-looping. That fixes the long-standing 100% CPU burn while paused in IDE debugger sessions.

### **BroadcastChannel gains race fixes on main-thread dispatch** (e2fd5fb)
BroadcastChannel’s context lookup is now properly locked on both readers and writers, and message dispatch keeps the channel alive while posting work across threads. This closes two ASAN-reported use-after-free races that could surface under worker GC churn.

### **Worker termination and exit-path lifetime bugs fixed** (a97b8d8)
Worker teardown now avoids dangling references between the Zig `WebWorker` and C++ `Worker`, and exit/ref/unref paths no longer trip wrong-thread assertions. This is a meaningful correctness fix for worker shutdown and termination races.

### **TLS root certificate init is now thread-safe** (19635e7)
Root certificate loading switched to `std::call_once`, eliminating a race where concurrent callers could observe initialization as complete before certificate parsing had finished. That prevents truncated CA lists and potential segfaults when multiple workers or TLS connections initialize at once.

### **`bunx claude` alias and native-binlink fix** (2a32783)
`bunx @anthropic-ai/claude-code` no longer exits silently, and `bunx claude` is added as a shorthand alias. This is a user-facing install/CLI fix for a popular package flow.

### **`bun test --shard=M/N` lands for CI splitting** (d7a66f5)
Tests can now be split deterministically across multiple jobs with a shard index/count. That’s a useful CI scaling feature, but it’s still mostly infrastructure rather than runtime behavior.

### Other misc changes
- CI binary-size annotation simplified (1 commit)
- Windows mimalloc build config fix (1 commit)
- Windows NTSTATUS/openDirAt and readdir iterator fixes (2 commits)
- Blob file-size clamp to avoid `@intCast` panic (1 commit)
- libarchive buffered damaged-block retry semantics preserved (1 commit)
- Tagged-union partial-write fix in Zig codegen/internal plumbing (1 commit)
- Chunked encoding parser hardening and `1*HEXDIG` correctness fix (1 commit)
- Misc socket/http/internal lifetime and race fixes not shown in detail (2 commits)
