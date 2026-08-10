---
date: 2026-08-09
repo: oven-sh/bun
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Bun ships XML, hardens HTTP/2, workers, and addons"
excerpt: "New XML support and parser speedups landed alongside major stability, compatibility, and shutdown fixes across HTTP/2, workers, N-API, and streams."
commits: 163
---

### **New XML runtime support and faster parsing**
Bun added first-class `Bun.XML.parse` / `Bun.XML.stringify` plus `.xml` imports for `import`, `require`, `bun build`, and import attributes. The parser also got a SIMD rewrite that should materially improve throughput.

### **Big stability pass across workers, streams, and shutdown paths**
A broad set of UAF/crash fixes landed in `Worker` / `node:worker_threads`, `CompressionStream`, `ReadableStream`, `HTMLRewriter`, fetch body handling, and async file reads. Shutdown and teardown paths were tightened so VM exit, worker termination, and abandoned transforms no longer leave dangling native state.

### **HTTP/2 and `Bun.serve` became much more robust**
Several high-severity HTTP/2 bugs were fixed, including reentrancy during stream start, malformed header handling, and transport write races. On the server side, `Bun.serve().stop()` now waits for real open connections, idle connections can be closed explicitly, and parsing/streaming behavior around file responses, transfer encodings, and TLS settings was corrected.

### **Compatibility work expanded for Node, N-API, and native addons**
Bun picked up a large Node 26-aligned N-API compatibility update, plus fixes for `process`, `node:stream` web adapters, V8 profiler APIs, buffer creation, async cleanup hooks, and addon callback lifetimes. This week also improved `node:http2`, `bun test`, `openInEditor`, and other edge cases where Bun previously aborted or misbehaved on bad input.

### **Resolver, bundler, and package/install behavior got sharper**
The resolver now handles chained barrel namespaces, wildcard extension resolution, `.`/`..` directory specifiers, and large `data:` imports more correctly. Bundling became safer on printer failures, while install/linker behavior gained `install.hoist` control, better Windows/fallback handling, and more deterministic output in test/build paths.

### Other misc changes
- HTTP/2, WebKit, and libuv updates plus assorted protocol fixes
- SQL, DNS, Redis, timers, spawn, and shell runtime correctness fixes
- TLS session caching for `fetch()` and MariaDB JSON column decoding
- Security hardening for cache file permissions and several abort-to-error conversions
- CI, docs, lint, and test flake cleanup
