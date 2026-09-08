---
date: 2026-09-07
repo: nodejs/node
size: L
title: "Node hardens QUIC, streams, and sandbox builds"
excerpt: "Major fixes land across QUIC, Workers, inspector, streams, fs.cp, and build support for the V8 sandbox and Perfetto."
commits: 22
authors: [codebytere, mcollina, aduh95, schuay, christianaurichzm, pipobscure, nodejs-github-bot, Y1D7NG, marjakh, legendecas, jasnell]
commit_authors: {"72c1fea": christianaurichzm, "1e0ebef": codebytere, "8d1d7b6": codebytere, "b113d09": mcollina, "0f5cb92": mcollina, "a701540": pipobscure, "1d0e5f1": aduh95, "073e85d": aduh95, "718cfe4": legendecas, "8fb89ab": jasnell, "29667e0": codebytere, "c7d80a2": codebytere, "48c90ff": codebytere}
---

### **fs.cp gets a C++ async fast path** (29667e0)
`fs.cp()` and `fs.promises.cp()` now copy directory trees on the thread pool instead of walking them entry-by-entry in JavaScript. That should cut latency and main-thread overhead substantially for large trees, while preserving the existing behavior around filters, symlinks, permissions, and special files.

### **Node now supports building with the V8 sandbox** (48c90ff)
This broad port fixes multiple code paths that previously broke when `V8_ENABLE_SANDBOX` was enabled, including Buffer allocation, crypto helpers, FFI, trace events, and SQLite-related paths. It makes sandbox builds actually compile and run, which is a significant step toward supporting this V8 configuration in real Node builds.

### **QUIC rejects `addressLRUSize: 0`** (72c1fea)
The QUIC endpoint now validates that the socket-address LRU cache has a positive size instead of crashing on the first packet with a zero-capacity cache. This closes an undefined-behavior bug in endpoint receive handling and makes the API contract explicit in the docs.

### **Workers and startup-without-snapshot no longer hit null calls** (1e0ebef)
Node now passes snapshot data through as a typed pointer instead of unwrapping an embedder wrapper too late, which avoids calling through a null `SnapshotData*` when there is no startup snapshot. This fixes Worker startup and bootstrap paths under `--no-node-snapshot` / `--without-node-snapshot` builds.

### **Inspector no longer crashes without a platform** (8d1d7b6)
`currentTimeMS()` now falls back to the wall clock when an isolate has no `MultiIsolatePlatform`, instead of dereferencing a null platform pointer. That fixes a crash when an embedder uses the inspector without creating the platform Workers normally rely on.

### **Stream writes avoid eager JS request allocations** (b113d09)
Write request objects are now created lazily, only when a write actually goes async. That trims overhead from the common synchronous-write path and reduces allocation churn across stream writes.

### **Stream reads use slab-backed buffers** (0f5cb92)
Readable stream buffers are now carved out of a 64KB slab instead of allocating and copying per read. This should reduce memory churn and copy costs for stream-heavy workloads, especially where reads usually return partial buffers.

### **`util.markPromiseAsHandled` is added** (8fb89ab)
Node exposes a new utility for marking promises as handled from JS and native code. This is a public API addition that gives embedders and internals a direct way to suppress unhandled-rejection tracking for specific promises.

### **VFS reserved-root lookups handle unowned paths** (a701540)
The virtual filesystem loader now correctly answers for paths under the reserved root that no layer owns, instead of falling through to the native filesystem in edge cases. That matters most on Windows, where the previous behavior could misroute reserved-root lookups.

### **Perfetto support is wired into the build and CI** (073e85d, 1d0e5f1, 718cfe4, c7d80a2)
Build and test plumbing now supports `--shared-perfetto`, vendored Perfetto CI, V8 gdb/lldb plugins, and sandbox defaults for shared-cage builds. This is mostly infrastructure work, but it materially expands the supported build matrix and tooling.

### Other misc changes
- V8 backports for stack-trace and `CallSiteInfo` performance work (3 commits)
- `cpSync()` directory-mode fix and matching tests (1 commit)
- `fs.cp()` / `cpSync()` special-file error cleanup and async mode preservation tweaks
- WebCrypto WPT sync/update and status file refresh
- Stream operator cleanup when iterators close early
- Misc build and CI adjustments, including quiet `make` output and GHA workflow updates
