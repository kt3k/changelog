---
date: 2026-04-19
repo: oven-sh/bun
period: weekly
slug: 2026-W16
period_label: "Apr 13–19, 2026"
size: L
title: "Bun adds faster builds, safer runtime lifecycles, and wider compatibility"
excerpt: "This week brought major runtime fixes, streaming installs, better test isolation, and broader Linux compatibility."
commits: 87
---

### **Runtime correctness and lifecycle fixes**
Bun spent the week tightening object and signal lifetimes across core APIs. TCPSocket/TLSSocket switched to JS refs for cleaner GC behavior, custom SSL contexts are now safely ref-counted during eviction, BroadcastChannel and worker teardown races were fixed, and several abort paths were hardened so fetch, WebSocket upgrades, and `AbortSignal.timeout()` no longer leak refs or double-cancel.

### **Big build, install, and compatibility improvements**
`bun install` can now stream tarball extraction while downloads are in flight, reducing memory use and improving latency. Bun also lowered its Linux baseline to glibc 2.17, added `BUN_ZIG_PATH` for external Zig installs, enabled parallel Zig for local Linux builds, and switched compression from cloudflare/zlib to zlib-ng.

### **Testing and debugging got materially better**
The test runner gained `--changed`, `--isolate`, `--parallel`, and `--shard=M/N`, making it easier to focus local runs and split CI workloads. On the profiling side, `--cpu-prof` output now matches Node/Deno-style DevTools profiles more closely, and the debugger no longer spins a CPU core while paused.

### **Bundler, source maps, and packaging fixes**
Bundling got several correctness fixes, including stale HTML-import etags, safer plugin resolver races, preserved quoted export names, and standalone HTML asset inlining. Bun also replaced serialized VLQ source maps with a packed internal binary format to reduce memory churn and speed up stack-trace remapping.

### **Other misc changes**
MySQL multi-statement hangs were fixed, `Bun.SQL` parsing got more robust, NAPI finalizers now run in LIFO order, Windows file/path edge cases were patched, HTTP/2 interoperability improved, SHA3 landed in WebCrypto and `node:crypto`, and a number of allocator, YAML, glob, and test flake fixes rounded out the week.
