---
date: 2026-11-18
repo: oven-sh/bun
size: L
title: "Timers, compression, and Redis error fixes"
excerpt: "Bun tightened timer semantics, rewrote Brotli/zlib internals in safe Rust, updated WebKit, and fixed Redis failure reporting."
commits: 6
authors: [dylan-conway, alii]
commit_authors: {"128419f": alii, "ca74e0f": dylan-conway, "0dc17ea": dylan-conway, "4ce14ba": alii, "e017285": dylan-conway}
---

### **Timeout and Immediate are now distinct timer types** (128419f)
Bun refactored its event-loop timer model so `Timeout` and `Immediate` are separate phases with explicit ownership and lifecycle handling. That simplifies GC root/ref management, removes several brittle state combinations, and makes fake-timer and `AbortSignal.timeout` behavior more explicit.

### **Brotli window handling now matches HTTP expectations** (ca74e0f)
`fetch` and other HTTP clients now reject Brotli responses that use the large-window extension, aligning Bun with RFC 7932 and Node’s behavior for `br` decoding. The Brotli encoder/clusterer also got batching changes, which should improve correctness and maintainability around compression output.

### **Safe-Rust zlib replaces zlib-ng in the build** (0dc17ea)
Bun removed the `zlib-ng`/`zlib_sys` dependency path and switched to its own safe-Rust `bun_zlib` crate for gzip, zlib, raw DEFLATE, and the compression features built on top of them. This is a major internal rewrite that affects `node:zlib`, `CompressionStream`, `fetch`, WebSocket compression, PNG/tar handling, and build/dependency wiring.

### **Redis connection failures now preserve the real reason** (4ce14ba)
`connect()`, queued commands, and `onclose` now surface the same failure object instead of collapsing everything to a generic disconnect error. That makes auth problems, timeouts, and other connection issues much easier to diagnose, and the API docs/types were updated to describe the new behavior.

### **Bun’s Brotli implementation was fully switched to safe Rust** (e017285)
The Brotli encoder/decoder was removed from the old vendored dependency path and replaced with Bun’s own `src/brotli` implementation. This is a substantial compression-stack rewrite with build, docs, and binary-size implications across the runtime.

### Other misc changes
- WebKit dependency bump to `0befb64c5f30` (1 commit)
- Brotli/zlib-related docs and build metadata updates bundled into the compression rewrites
- Test and build harness updates for the new Brotli/zlib crates
