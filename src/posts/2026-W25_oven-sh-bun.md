---
date: 2026-06-21
repo: oven-sh/bun
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Bun lands major Node parity across HTTP, streams, fs, and React"
excerpt: "Big week for compatibility: rewritten Node HTTP/HTTP2 paths, broader stream/fs parity, React Compiler support, and several crash fixes."
commits: 63
---

### Major compatibility leaps in networking
**node:http gets a full socket-based client rewrite** — Bun replaced the fetch-based client with a real Node-style implementation on net/tls, llhttp, and an Agent socket pool, bringing proxy support and a big jump in test parity.

**node:http2 gets a major frame-engine overhaul** — inbound handling was rewritten and outbound writes were batched/vectored for better compatibility and throughput, with a large chunk of Node v26.3.0 tests ported over.

**net/tls parity expands significantly** — this week added half-open/reset/write behavior fixes, server TLSSocket wrapping, session/keylog handling, SNICallback/ALPNCallback, pfx, addCACert, and local bind support.

**HTTP/WebSocket streaming becomes safer under backpressure** — `Bun.serve` now respects backpressure for `ReadableStream` bodies, and abort/crash paths were fixed when streaming responses overlap with corked TCP or HTTP/3 lifetimes.

### Broader Node compatibility across fs, stream, install, and crypto
**node:fs and recursion behavior improved** — Bun ported a large Node v26.3.0 fs test set and fixed copy, watcher, `glob`, `opendir`, `mkdtempDisposable`, recursive `rmdir`, and recursive `readdir` edge cases.

**node:stream gains async-iterator support and API parity fixes** — the upstream stream suite was updated and experimental `stream/iter` and `zlib/iter` APIs were added behind `--experimental-stream-iter`.

**Install, crypto, and v8 behavior align more closely with Node** — `bun install` now trusts root `file:` overrides, SHAKE aliases are accepted in hashing APIs, and `startupSnapshot.isBuildingSnapshot()` now returns `false` like Node.

### Stability, memory, and platform fixes
**GC, spawn, and proxy paths were hardened** — concurrent GC no longer risks a stale VM read, `Bun.spawn()` handles blob-like stdio more safely, and HTTP proxy tunnel bugs were fixed, including a use-after-free and a dead-socket assertion.

**Memory leaks and hot-path overhead were trimmed** — fixes landed for JSON5 stringify refs and `require('module')._nodeModulePaths()`, AST node types were shrunk, and URL join helpers stopped zero-initializing scratch buffers.

**Windows and Linux runtime bugs were fixed** — Windows `fs.rm` now maps more NTSTATUS failures correctly, and `epoll_pwait2` now uses a raw syscall with an Android disable path to avoid seccomp-related crashes.

### React Compiler and build/tooling updates
**React Compiler ships as a built-in transform** — Bun added parser/bundler integration and CLI/API wiring, then fixed a configuration bug where compiler output mode could enable it accidentally.

**Build profiles and linting were tightened** — debug assertions now behave differently from release-asan/release-assertions builds, and a new lint rule catches duplicate property reads in Bun’s JS internals.

### Other misc changes
- TLS, SQL, WebSocket, and crypto error-shape compatibility fixes.
- Browser globals like `navigator.userAgent` were made getter-only.
- Docs, CI, WebKit, BoringSSL, and bootstrap updates.
- `bun list`/`bun pm ls` gained `--trusted` filtering.
