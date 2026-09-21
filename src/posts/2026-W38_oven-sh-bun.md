---
date: 2026-09-20
repo: oven-sh/bun
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "Bun hardens networking, errors, and the build pipeline"
excerpt: "This week brought major HTTP/TLS security and correctness fixes, a new experimental ModuleGraph, plus substantial build-system refactors."
commits: 164
---

### **Security and protocol correctness got a major pass**
Bun tightened several high-risk networking paths: TLS hostname verification now IDNA-normalizes and fixes a wildcard edge case, `fetch()` respects proxy envs more safely, request bodies are framed more defensively to avoid smuggling bugs, and HTTPS agent reuse no longer leaks per-request identity checks across sockets. HTTP/3 and WebSocket edge cases were also fixed, including aborted uploads, header trimming, early frame handling, and pipelined request timeouts.

### **Error handling and stack traces became much safer and more Node-like**
Multiple crashers were converted into recoverable failures instead of aborts, including huge non-UTF-8 strings, oversized stack traces, and VM string joins at length limits. Bun also made `error.stack` formatting stable regardless of when it is read, updated default stack headings to use the thrown error’s name, and fixed Node error-code message text so common `ERR_*` paths now match expectations more closely.

### **Runtime and Web API behavior kept converging on Node**
This week’s compatibility work touched `fs.read` validation order, `http2` option validation, `vm` constructors, `node:zlib`, `util.aborted()`, `process.memoryPressure`, `drainMicrotasks()`, `TextEncoder.encodeInto` typings, and several stream/fetch completion paths. Bun also fixed `CompressionStream` level handling, `HTMLRewriter` GC retention, `YAML.stringify` alias/layout bugs, and `StringDecoder`/URL parsing edge cases.

### **Streaming, fetch, and server semantics were tightened**
`fetch()` got better backpressure handling for decompression, while Bun.serve fixed pipelined response flushing, correct socket teardown, and WebSocket upgrade behavior when frames arrive with the handshake. Direct readable streams now settle ownership correctly on close, reducing hangs and leaks across HTTP/1.1, HTTP/2, and HTTP/3.

### **Build and install infrastructure saw major refactors**
Bun introduced `Bun.ModuleGraph` for multi-instance isolated runtimes, reworked the build graph so toolchain changes trigger the right rebuilds, split Rust compilation into per-edge ninja work, and made CI images content-addressed. The installer also skipped unnecessary tarball downloads, hardened lockfile/resolver behavior, and fixed several migration and update edge cases.

### **Other misc changes**
- Bundler fixes for chunk splitting, CJS wrappers, dead top-level await/using output, and import/require metadata
- React compiler fixes for compound assignments and operand ordering
- Fake timers, test runner, shell pipeline, and postgres/sqlite reliability fixes
- Memory/GC tuning, leak fixes, and a small zlib allocation improvement
- Docs, CI, type, and build cleanup across the tree
