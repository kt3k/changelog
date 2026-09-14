---
date: 2026-09-13
repo: oven-sh/bun
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Bun hardens streams, HTTP, and the React/compiler pipeline"
excerpt: "A week of leak fixes, protocol hardening, and major React compiler/decorator correctness work across Bun’s runtime and tooling."
commits: 109
---

### **Stream lifecycle and body handling got much stricter**
Bun fixed a cluster of stream bugs around native/direct streams, cloning, and teardown. Direct streams now enforce late-write/close ordering, propagate backpressure and cancellation correctly, and end exactly once. `Response.clone()` and `req.clone()` now preserve native body metadata and settle parked branches instead of leaking them, while native sinks and locked readable streams clean up controller state and pending promises more reliably. Pipe-backed writers, PTYs, and file/pipe readers also got event-loop and EOF fixes to avoid dropped data, spins, and pinned processes.

### **HTTP, fetch, and sockets were hardened for correctness and security**
`fetch()` and HTTP handling saw several important wire-level fixes: fragments are no longer leaked into request targets, pooled keep-alive sockets with unsolicited bytes are now destroyed, malformed chunk-size tokens are rejected, and large file responses wait for headers to drain before `sendfile()`. Bun also fixed HTTP/2 close/event ordering, refused-connect behavior, ALTSVC/ORIGIN byte preservation, and duplicated tail bytes on streamed bodies. On the server side, HTTP/1 fallback now queues pipelined responses instead of throwing, and TLS/socket adoption now respects readable/writable state and half-open behavior.

### **Memory leaks and native crashes were reduced across the runtime**
GC-related leaks were closed for several native-backed objects, including `ImportMetaObject`, `MIMEType`, and `JSHTTPParser`, and `Bun.gc(true)` now returns reclaimed memory to the OS before returning. Other fixes removed leaks in request-body handling, PTY wrappers, Windows named-pipe connects, `spawnSync` loop setup, and `node:vm` performance observer callbacks. Bun also fixed an HTTP/2 fetch use-after-free and tightened error surfacing for native promises and `console`/inspect paths.

### **React compiler and decorators got a large correctness pass**
The React compiler received a major round of bug fixes and memory reductions: it now preserves locals bound to `require()`/`import()`, emits correct classic JSX and `key` handling, honors the last `children` prop, and avoids quadratic blow-ups in dependency and alias analysis. Decorator lowering was also corrected so class members keep their original order and temporary names no longer collide across classes, fixing bad runtime behavior and output corruption. The compiler’s enum handling and hoisting around captured variables were tightened as well.

### **Native and Node compatibility widened**
Bun filled more addon and Node API gaps, including extra `v8` methods, improved `node:http2`, `node:http`, `node:tls`, and `node:net` behavior, plus better `node:module._resolveFilename` and `spawn` failure handling. SQLite bindings now reject invalid `bytea` inputs properly and treat detached typed arrays as empty blobs instead of NULL. `mock.module()` also gained async factory support that updates already-loaded modules once the promise resolves.

### Other misc changes
- `bun test --isolate` got several flake fixes around late completions and deferred cleanup.
- Bundler/minifier fixes landed for array-constructor folding, symbol-aware property iteration, chunk renamer sizing, and metafile split-import metadata.
- Config/startup edge cases were hardened, including oversized bunfig paths and removal of the dead Solid JSX runtime option.
- CI, test expectations, and baseline/ASan housekeeping were updated throughout the week.
