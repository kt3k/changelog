---
date: 2026-08-02
repo: oven-sh/bun
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Bun sharpens fetch, server, and runtime correctness"
excerpt: "A big week for web/runtime compatibility: faster, leaner fetch bodies; new static routing and asset embedding; and many protocol, FFI, and GC fixes."
commits: 194
---

### **Fetch and streams got faster, leaner, and more spec-compliant**
Bun made a broad pass over body handling: `textStream()` landed for `Request` and `Response`, buffered body aborts now error correctly, and response-body reads use less memory across `.text()`, `.bytes()`, `.arrayBuffer()`, and streaming clones. Backpressure was tightened in both `fetch()` pipelines and `Bun.serve`, while `Response.clone()` stopped multiplying chunk copies and `ReadableStream`/Web Streams lifetime handling was cleaned up to avoid leaks and stalls.

### **Server and networking behavior got several important fixes**
`Bun.serve()` now applies real TCP backpressure to slow readers, supports directory-tree mounts via `{ dir: "..." }`, and fixes websocket lifetime issues, Blob sends, and 304 `Content-Length` handling. On the client side, aborts, redirects, header timeouts, and token-list parsing were tightened, DNS/connectivity bugs were reduced, and Windows socket errors now surface the actual failure code instead of a generic one.

### **New compile, routing, and packaging capabilities**
Standalone builds gained embedded asset support through `--asset`, making compiled binaries able to carry whole directory trees and expose them through `fs` and `Bun.file()`. Bun also improved browser-resolution behavior, lockfile/install extraction, and minifier output safety, including fixes for browser field precedence, `jsnext:main`, and malformed naming templates.

### **FFI, SQLite, and runtime internals saw major changes**
`bun:ffi` moved to JSC-native FFI for faster direct calls and safer `toBuffer()` ownership handling. SQLite close/query semantics were expanded with graceful close behavior and LRU query caching, and runtime internals got GC scheduling simplifications, stronger root management, better string search worst-case complexity, and stream-controller lifecycle fixes.

### **Other misc changes**
- `Bun.spawn()` now fails fast for pre-aborted signals and ignores `encoding` like Node.
- `bun test` and CI were reworked for faster, more predictable parallel execution.
- Windows `--compile` PE checksum/truncation bugs were fixed.
- Parser/transpiler and React compiler semantics were corrected for TypeScript, `delete`, and `typeof` behavior.
- Smaller fixes landed across `fs`, `dotenv`, `sql`, `module._nodeModulePaths()`, `pushStream`, and assorted test flake cleanup.
