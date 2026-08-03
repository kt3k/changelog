---
date: 2026-08-02
repo: denoland/deno
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Deno hardens network, Node compat, and package workflows"
excerpt: "This week brought safer redirect and socket handling, better Node compatibility, faster startup/builds, and a few package manager fixes."
commits: 45
---

### Network, HTTP, and transport got safer
**Redirect headers now stay stripped across chains** — Deno’s HTTP client preserves redirect state so `Authorization`-class headers removed on one hop can’t be resurrected later, while still respecting same-origin upgrade cases.
**Pending writes are cancelled on close** — TCP, Unix, vsock, TLS, and HTTP/2 teardown paths now cancel blocked writes and shutdowns too, preventing sockets and sessions from lingering after close.
**HTTP/2 and WebSocket edge cases were hardened** — WSS-over-H2 now disables server push during handshake, HTTP/2 `respondWithFD` handles read errors cleanly, and destroyed HTTP/2 sessions stop before firing late callbacks.

### Node compatibility got noticeably stronger
**Stream interop and memory behavior improved** — `Readable.toWeb()` now applies byte-based backpressure for non-object streams, closing a major buffering bug in Node stream conversion.
**More Node APIs and edge cases are covered** — `v8.promiseHooks` landed in the Node polyfill, `process.constrainedMemory()` now respects permission checks, `node:net` BlockList stores compact ranges, and `spawn` preserves pre-quoted shell args without weakening escaping.
**CommonJS and module loading were tightened up** — CJS analysis now uses loader-owned sources, internal runtime imports bypass user import maps correctly, and `deno eval`/stdin works more reliably from `node_modules`-adjacent paths.

### Startup, runtime, and build work
**Startup got leaner** — Deno now defers eager Node builtin shim compilation until needed, cutting snapshot/startup work for CommonJS entry points.
**Linux releases were slimmed down** — shipped Linux binaries now drop unwind tables and rely on frame pointers, reducing artifact size.
**Runtime cleanup and safety fixes landed** — WebGPU mapped ranges now own their backing stores, QUIC stream resources are released correctly, concurrent TCP listener drops no longer leave ports bound, and TLS write completion avoids reentrancy panics.

### Package manager, tooling, and other fixes
**npm/JSR handling was made more robust** — malformed npm packument `scripts` fields are treated as empty, auth matching now uses full authority and path boundaries, `deno add --unscoped` was added for friendlier aliases, and `deno outdated` no longer treats JSR pre-releases as latest for stable deps.
**Formatter and API polish** — `fmt --ext` now accepts XML and SVG on stdin, Web Storage keeps the `Storage` constructor name, and `deno --help`/docs links were updated.

### Other misc changes
- Release/dependency bumps, CI and metadata updates
- Minor test additions and deflakes
- Small Node/web compat cleanups and doc link fixes
