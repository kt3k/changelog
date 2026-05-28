---
date: 2026-04-30
repo: oven-sh/bun
period: monthly
slug: 2026-04
period_label: "April 2026"
size: L
title: "Bun adds HTTP/3, native PTYs, and major hardening"
excerpt: "April brought big networking features plus wide-reaching fixes for security, installs, builds, and lifecycle bugs."
commits: 383
---

### **Major networking and protocol additions**
Bun landed experimental HTTP/3 serving (`Bun.serve({ h3: true })`) and experimental HTTP/2 client negotiation in `fetch()`, expanding the runtime’s modern transport story. It also added `ws+unix://`/`wss+unix://` support, HTTP/2 client hardening, stricter header/body parsing, and a number of fetch, proxy, WebSocket, and Redis/TLS correctness fixes.

### **Process, terminal, and runtime APIs got noticeably better**
`process.execve()` and a `dieWithParent` watchdog were added, while `process.ppid` became a live getter. On Windows, `Bun.Terminal` and `Bun.spawn({ terminal })` now work via ConPTY, bringing PTY support to the platform. Bun also added `Bun.cron()` for in-process scheduling, `Bun.markdown.ansi()` for direct terminal rendering, `bun test --changed`, `--isolate`, `--parallel`, and `--shard`, plus SHA-3 support in WebCrypto/node:crypto.

### **Security and memory-safety hardening was a theme all month**
A large number of crashes, UAFs, OOB reads, and parser bugs were fixed across HTTP, TLS, sockets, streams, SQL, YAML, zlib, WebSocket upgrade paths, and buffer APIs. Notable hardening included stricter Content-Length and chunked-body validation, safer `Buffer#copy`/`fill`, safer `structuredClone` limits, better TLS hostname verification, and multiple fixes to close race and teardown bugs in workers, watchers, and sockets.

### **Build, install, and CI infrastructure moved forward**
The build system picked up PGO modes, shared caches across checkouts, parallel Zig on Linux local builds, unified/PCH C++ compilation, and faster shard-based linking. `bun install` gained streaming tarball extraction, a global virtual store for warm installs, and better failure cleanup, while CI was modernized around Buildkite CLI helpers, binary-size checks, improved artifact handling, and faster cached runners/images.

### **Runtime compatibility and platform fixes**
Bun improved Node/libuv parity in many small but important places: Linux `statx`/`MemAvailable` fallbacks, `getDefaultResultOrder()`, `Stats` prototype/layout, `socket.setTimeout()` semantics, `AbortSignal.timeout()` cleanup, and `fs.watch()`/Unix socket behavior. It also broadened platform support with a lower glibc floor, FreeBSD/Android publish support, WSL1 compile fixes, and several Nix/Guix and Windows-specific corrections.

### **Other misc changes**
- Source maps switched to a packed internal binary format for faster, lower-overhead remapping.
- The bundled WebKit and SQLite were upgraded, along with mimalloc and zlib-ng.
- Docs, tests, and fixtures were refreshed widely, with many flakes converted into deterministic regressions.
