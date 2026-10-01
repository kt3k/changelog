---
date: 2026-09-30
repo: oven-sh/bun
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Bun hardens networking, streams, and the bundler"
excerpt: "September focused on Node-compatibility fixes, security hardening, and fewer leaks across HTTP/TLS, streams, installs, and bundling."
commits: 560
---

### **Networking and HTTP/TLS compatibility tightened**
Bun spent the month closing a long list of edge-case gaps in `node:http`, `http2`, `http3`, TLS, fetch, and WebSocket handling. Highlights include stricter proxy and certificate validation, better request/body framing, pipelining and close-order fixes, pooled-socket hardening, safer handshake shutdowns, and improved support for stream aborts and partial reads. Several security-relevant issues were addressed too, including TLS identity validation, poisoned keep-alive reuse, reset-rate limiting for HTTP/2, and safer handling of streamed request bodies.

### **Streams, body lifecycle, and GC got much more robust**
A major theme was fixing leaks, hangs, and ordering bugs in readable/writable stream plumbing. Bun now handles direct streams, cloned bodies, native-backed bodies, file sinks, S3 uploads, subprocess stdio, and response teardown more predictably, with multiple fixes for backpressure, late callbacks, abort propagation, and finalization. GC and memory-management work also reduced retention and leak paths across native objects, stream wrappers, HTMLRewriter, and idle collection behavior.

### **Bundler, splitting, and CommonJS/ESM interop saw heavy correctness work**
The bundler received extensive fixes around lifted CommonJS exports, namespace writes, chunk splitting, renaming, `modulepreload`, metafiles, and dynamic imports. This month also improved minification correctness, class/decorator lowering, React compiler output, and compile-time handling for large or invalid graphs. Several changes targeted real-world app breakage, especially React and mixed CJS/ESM builds.

### **Install, workspace, and build-system reliability improved**
`bun install` and workspace resolution got sturdier with better lockfile handling, mixed linker detection, safer hardlink/cache behavior, fewer corrupting edge cases, and improved pruning/migration flows. Build infrastructure also moved forward with more accurate dependency tracking, Rust/Ninja integration, toolchain-sensitive rebuilds, content-addressed CI images, and new bytecode/orderfile plumbing for compiled apps. Some experimental build changes were later reverted, but the overall direction was toward more reproducible and incremental builds.

### **New APIs and notable runtime additions**
September introduced `Bun.ModuleGraph` for multi-instance runtime isolation and added `--disallow-code-generation-from-strings` for security-conscious deployments. There were also meaningful runtime expansions such as better proxy session controls via `Bun.FetchSession`, bytecode ordering for compiled apps, more addon-compatible V8 shims, and broader support in `Bun.Image`, `Bun.YAML`, `bun:ffi`, and SQLite/Postgres bindings.

### **Other misc changes**
- React compiler fixes for decorators, JSX/classic runtime, dependency validation, and memory usage
- Error/stack-trace and `unhandledRejection` behavior made more Node-like
- `bun test` and coverage/isolation flows got multiple correctness and performance fixes
- macOS, Windows, and Linux-specific crashes, freezes, and fd leaks were trimmed across spawn, fs, and CLI paths
