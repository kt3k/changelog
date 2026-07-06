---
date: 2026-07-05
repo: oven-sh/bun
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Bun ships major runtime refactors and compatibility fixes"
excerpt: "This week brought a new trace-events API, a SIMD JSON parser rewrite, Web Streams and HTMLRewriter refactors, plus many Node/web compat fixes."
commits: 96
---

### Major platform and runtime upgrades
**Node trace-events compatibility lands** — Bun added end-to-end `trace_events` support, including trace flags, JSON output, worker tids, and inspector integration.
**SIMD-backed JSON parser rewrite** — Core JSON parsing was rebuilt around a SIMD structural index and immutable AST, touching package.json, lockfiles, loaders, and env/define parsing.
**Web Streams rewritten in C++** — The WHATWG Streams implementation moved out of the old JS builtin path into native C++, a major internal refactor with performance and maintainability gains.
**HTMLRewriter switches to the Rust lol_html crate** — Bun removed a large FFI layer by using `lol_html` directly, simplifying the HTML stack.
**Build pipeline order-file support improved** — Build now traces, reuses, relinks, and verifies order files more reliably, including better handling for canary/bootstrap flows and PTY tracing.

### Compatibility and correctness fixes across core APIs
**Fetch, Response, and header semantics tightened** — Clone now rejects disturbed/locked bodies, Bun.serve reports reused response bodies, duplicate headers are combined correctly, and redirect retries preserve the original request state.
**Stream and WebSocket behavior fixed** — Streams now reject already-errored inputs instead of throwing, `Readable.fromWeb()` preserves chunk order, `pipeTo()` was optimized, and WebSocket publish/unsubscribe edge cases no longer drop messages or fail from unsubscribed sockets.
**Node API parity improved** — `Buffer.from()` and `Buffer.prototype.fill()` now match Node’s bounds and parsing rules, `process.execve()` throws on failure, `process.hrtime()` coerces inputs correctly, and `dgram`/`console.write` now fail with proper errors instead of internal crashes.
**Spawning and subprocess safety hardened** — `spawn`, `spawnSync`, and child_process now honor `uid`/`gid`, maxBuffer overreads were fixed, and Windows stdin/shutdown and shell pipe use-after-free cases were addressed.
**Filesystem and watcher fixes** — `fs.watch` gained missing Linux delete events, a macOS shutdown crash fix, and better overflow reporting.

### Language, parsing, and data handling improvements
**MySQL and FFI correctness** — `caching_sha2_password` fast auth was fixed, and `bun:ffi` now preserves NaN, -0, and BigInt conversions correctly.
**CSS and color handling improved** — CSS selector parsing is stricter, CSS modules now rewrite animation-name references properly, and several `Bun.color` round-trip/serialization bugs were fixed.
**Text and formatting accuracy** — `Bun.stringWidth` now ignores invisible format characters, `console.table` only reads getters once per cell, and sparse array inspection no longer walks every hole.
**Archives and package tooling** — Non-ASCII archive entry names work correctly, `bun pm pkg set` fixed a use-after-free, and install/isolation logic was hardened around file: dependencies, peer drift, and stale links.

### Other misc changes
**Runtime and platform cleanup** — Windows `process.env` behavior was aligned with Node, `X509Certificate.checkHost()` now returns the matching SAN, a few TLS and FileReader lifetime bugs were fixed, and numerous docs/tests/typing updates landed throughout the week.
