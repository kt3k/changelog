---
date: 2026-08-31
repo: oven-sh/bun
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Bun shipped major runtime, bundler, and HTTP upgrades"
excerpt: "August brought HTTP/2, SQL pub/sub, XML, stronger Node compatibility, and a long tail of crash, stream, and install fixes."
commits: 1043
---

### Major platform additions
**HTTP/2 server support lands** — `Bun.serve({ http2: true })` now negotiates HTTP/2 with shared HTTP/1.1 routing/fallback behavior, plus a batch of `node:http2` compatibility fixes and session lifetime hardening.

**SQL gets PostgreSQL LISTEN/NOTIFY** — `sql.listen()` and `sql.notify()` add first-class pub/sub for cache invalidation and event fan-out, alongside broader SQL/MySQL correctness work.

**XML becomes a native runtime format** — Bun now ships `Bun.XML.parse` / `stringify` and native `.xml` imports across `import`, `require`, build, and import attributes, with a later pass clarifying the API contract and improving parser performance.

**Compiled executables improve a lot** — `bun build --compile --bytecode` gained cross-platform bytecode portability, embedded builtin-module support, better startup ordering/prefetching, and smaller/more consistent output handling.

### Bundler and resolver improvements
**Tree-shaking and code-splitting got smarter** — August brought better barrel handling, dead `import()` chunk elimination, dynamic import/require usage analysis, deterministic chunk naming/binding, and safer cross-chunk resolution.

**Module resolution now matches real package layouts better** — fixes covered `browser` field priority, `jsnext:main`, wildcard extension probing, `.`/`..` directory resolution, TypeScript rewrite cases, and browser-map path handling.

**Build output correctness tightened** — Bun now fails hard on printer errors, avoids corrupt bundles, preserves proper re-export/namespace behavior, and fixes several source-map and renaming edge cases.

### Runtime compatibility, performance, and safety
**Major Node compatibility wins** — notable additions and fixes landed for `process`, `cluster`, `worker_threads`, `node:crypto` Argon2, `node:fs`, `node:net`, `node:http`, `node:vm`, `assert`, `bun:sqlite`, `bun:test`, and `bun:ffi` / N-API.

**Streams, fetch, and WebSocket lifetimes were heavily hardened** — many UAF/leak/reentrancy bugs were fixed across `fetch()`, `ReadableStream`, `HTMLRewriter`, compression streams, body piping, proxy tunnels, and server shutdown paths.

**Networking got more correct and faster** — fetch/TLS pooling, HTTP/2 framing, keep-alive handling, socket pause/resume behavior, named pipes, and Windows/macOS/Linux edge cases all saw substantial fixes.

**Developer APIs are more stable** — `Bun.inspect`, `Bun.deepEquals`, `Buffer` read/write paths, `URL`, `Intl`, `Temporal`, `bun shell`, and `bun watch` all picked up correctness and crash fixes.

### Install and package-manager changes
**Install became safer and more predictable** — fixes covered isolated hoisting controls, credentials in registry URLs, Git/tarball handling, failed downloads, workspace updates, lockfile resolution, and better handling of shared git repos and offline/recursive flows.

**Runtime/package boundaries tightened** — Bun now handles env-file edge cases, isolated store naming/path sanitization, dependency manifests, and compile-cache interactions more carefully, reducing silent misresolution and leaked credentials.

### Other misc changes
- WebView lifecycle, inspector, REPL, and test-runner fixes
- TLS CA loading and certificate handling improvements
- Windows, macOS, Linux, and FreeBSD platform fixes
- Dead-code removal, refactors, docs, and test-harness cleanup
