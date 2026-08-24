---
date: 2026-08-23
repo: oven-sh/bun
size: L
title: "Bun tightens runtime compatibility and compile perf"
excerpt: "Big wins for HTTP parity, compiled executables, module resolution, and JIT-inlined Buffer accessors; plus several safety and crash fixes."
commits: 20
authors: [robobun, Jarred-Sumner, dylan-conway, sosukesuzuki]
commit_authors: {"2082869": Jarred-Sumner, "acd3422": robobun, "d43ddf3": dylan-conway, "3e347b3": Jarred-Sumner, "0091072": robobun, "4bb20e5": Jarred-Sumner, "d9faab3": Jarred-Sumner, "bfa75d1": robobun, "5ab2bd9": robobun, "36cddd8": robobun, "d77b4bd": robobun, "8eb5b6e": Jarred-Sumner}
---

**Buffer read/write accessors are now JIT-inlined intrinsics** (2082869)
Buffer.prototype.read*/write* moves from JS builtins that lazily allocated hidden DataViews into C++ host functions wired into JSC’s BufferAccessorRegistry. That should cut per-call overhead and avoid extra allocations, especially when touching many distinct Buffers.

**Compiled executables now embed text imports as pre-encoded strings** (0091072)
`bun build --compile` now treats `text` loader imports as string payloads, storing them once in the executable and returning them without an extra copy at runtime. The change adds support for text assets in standalone builds and updates the bundler/runtime path that resolves embedded assets.

**Node-style module resolution now passes the right override context** (d77b4bd)
Overridden `Module._resolveFilename` handlers now receive Node-compatible arguments, including the parent module and resolve options. This should improve compatibility with tools like proxyquire, mock-require, and nyc that hook resolution.

**HTTP servers now match Node’s listen()/close() timing more closely** (bfa75d1)
`net.Server` and `node:http` switch `listen()` callbacks and `'listening'` emission from a 1 ms timer to `process.nextTick`, and align error delivery/close-loop behavior with Node. This fixes racey IPC and test-fake-timer behavior where Bun announced readiness too late or held the loop differently.

**Empty Transfer-Encoding values are now ignored like Node** (36cddd8)
A request whose `Transfer-Encoding` header is empty or whitespace-only no longer triggers a spurious `clientError` in node:http mode. That brings framing behavior in line with Node and avoids killing otherwise valid keep-alive connections.

**Async iterator bodies no longer append the final return value** (acd3422)
`new Response(asyncIterable)` and `new Request(..., { body: asyncIterable })` now drop the `{ done: true, value }` result instead of appending it to the body. This matches Node/Web stream behavior and fixes incorrect response/request payloads from async generators.

**Module/DOM resolution and thrown errors are propagated more correctly** (d43ddf3)
Several paths now preserve the actual thrown value or exception state instead of wrapping the wrong internal cell or checking stale state after resolution. This tightens `toSatisfy`, websocket handler error handling, and module resolution exception propagation.

**More of Bun’s route and cron machinery is now safe Rust** (4bb20e5, d9faab3, 8eb5b6e, 3e347b3, 5ab2bd9)
A large safety-focused refactor removes remaining `unsafe` from cron, server route objects, and websocket client/webview plumbing by fixing ownership and provenance below the call sites. The practical impact is fewer footguns around lifetime/GC interactions and a narrower unsafe surface in core runtime code.

### Other misc changes
- Test/CI maintenance: stale exception-coverage entries removed, macOS heap-stat test updated for newer VM tag labels, and various regression tests added.
- `bun-types` widened `TextDecoder` encoding labels to match runtime support.
- Dead-code sweeps removed large amounts of unused code from bindings, scripts, and legacy modules.
- Standalone compile output layout/madvise behavior was reworked for better payload locality and source-text handling.
- Minor internal refactors in printer/string handling, websocket server plumbing, and node module globals.
