---
date: 2026-05-31
repo: oven-sh/bun
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Bun adds image pipeline, import defer, and major hardening"
excerpt: "May brought Bun.Image, Stage 3 import defer, cross-build upgrades, and a large wave of security, parser, and runtime fixes."
commits: 395
---

### **Major new features and platform changes**
Bun shipped **Bun.Image** as a full decode/transform/encode pipeline with ICC profile preservation, added **Stage 3 `import defer`** support, and renamed `Bun.serve()`’s experimental QUIC options to **`http3`/`http1`**. The month also saw a big Rust-side build and repo restructuring effort, plus new JSC microbenchmarks to track engine regressions.

### **Security hardening was the dominant theme**
Across the month, Bun landed repeated hardening passes and explicit fixes for memory corruption, UAFs, OOB reads/writes, prototype leakage in sandboxed VM contexts, unsafe socket reuse, TLS trust issues, and parser-triggered crashes. Notable fixes covered shell path handling, `Buffer.concat`/`Bun.concatArrayBuffers`, Blob/File deserialization, WebSocket upgrades, HTTP request shutdown, N-API external buffers, and numerous SQL/HTTP/parser edge cases.

### **Networking, TLS, and HTTP behavior became more correct**
Bun tightened TLS and fetch semantics with cleaner handshake timeouts, proper keepalive handling, stricter server identity checks before sending requests, safer TLS shutdown, and better CA-store behavior on macOS and Windows. HTTP and WebSocket paths also picked up correctness fixes for duplex request flows, HEAD handling, HTTP/2 framing, signal mapping on Windows, and safer upgrade/header lifetimes.

### **Parsing, YAML, CSS, and shell got broad robustness upgrades**
The parser and language tooling absorbed many fuzz-driven fixes: JSX/TS edge cases, deadlock-prone dynamic imports, malformed `declare`/`using` forms, stack-depth guards, and safer error recovery. YAML became much stricter and more spec-compliant, CSS gained multiple anti-hang and anti-exponential-blowup fixes, and shell expansion/globbing/builtins were hardened for correctness and safety.

### **Database, filesystem, and runtime APIs were tightened**
SQL drivers saw repeated fixes for MySQL/Postgres binary decoding, DATETIME/TIMESTAMP round-tripping, and memory/lifetime issues. Filesystem and stream APIs got important cleanup too, including `fs.readFile`, `fs.watch`, `ReadableStream`, `FileSink`, `Buffer` encoding behavior, and descriptor ownership in `bun_sys`.

### **Build, CI, and cross-compilation moved forward**
Bun expanded cross-compilation for macOS and Windows from Linux, reworked Rust/C++ LTO and CI lanes, and continued shrinking binaries and improving startup/build throughput. The repo also saw major internal source-tree and build-system cleanup as the Rust port progressed.

### Other misc changes
Docs navigation and API docs were refreshed, package manager behavior was tightened around install dedupe/trust metadata/lockfile parsing, and a steady stream of test coverage and internal refactors landed alongside the user-facing fixes.
