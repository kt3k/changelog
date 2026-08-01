---
date: 2026-07-31
repo: oven-sh/bun
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Bun shipped big Node parity, performance, and safety gains"
excerpt: "July brought major runtime refactors, new Node-compatible APIs, and many fixes across fetch, streams, HTTP, SQL, and Windows."
commits: 752
---

### Major runtime and compatibility expansions
**New Node-compatible surfaces landed** — Bun added fully implemented `node:sqlite`, meaningful `node:inspector`/`node:repl` support, experimental `node:quic`, and major `worker_threads`, `webcrypto`, `trace_events`, and `perf_hooks` parity work. This was one of the biggest months yet for Node compatibility.

**Config and parser infrastructure were upgraded** — TOML was rewritten as a full v1.1.0 parser with stringify support, the JSON parser was redesigned around a SIMD structural index, and TypeScript/JS/TOML parsing got multiple correctness fixes. Bun also tightened CSS parsing and color handling in several places.

**Streams and fetch were heavily reworked** — Web Streams saw a native C++ rewrite plus multiple performance passes, and fetch gained `textStream()`, lower-memory body handling, better abort semantics, per-hop proxy re-evaluation, gzip/zstd multi-member support, and more spec-compliant cloning and timeout behavior.

### Networking, HTTP, and server behavior
**HTTP and WebSocket correctness improved broadly** — Bun.serve now handles close semantics, preconditions, status validation, static route content-type preservation, directory-tree routes, and better backpressure/abort handling. WebSocket work covered upgrade validation, blob binary sends, permessage-deflate recovery, and safer callback/lifetime management.

**HTTP/2 and HTTP/3 got substantial fixes** — The month included header validation, keep-alive and pipeline handling, session-close behavior, QUIC/HTTP3 stability fixes, and several crash/UAF repairs in transport teardown paths. These changes were paired with a lot of upstream Node suite sync.

**Connection and socket lifetimes were hardened** — Bun fixed numerous UAFs, double-closes, and teardown races across TLS, sockets, `fs.watch`, `spawn`, `child_process`, and file I/O. Several Windows-specific bugs were also addressed, including AppContainer support and `--no-orphans`.

### Data, storage, and shell improvements
**SQLite, Postgres, and install flows became more reliable** — `bun:sqlite` and `node:sqlite` gained major capability and safety fixes, Postgres parsing/query accounting was hardened, and `bun install`/lockfile behavior was corrected across redirects, file dependencies, isolated store links, tarball retries, and peer resolution.

**Shell, FFI, and crypto saw important fixes** — Shell parsing and pipe handling became more robust, `bun:ffi` moved to engine-native FFI with safer conversions, and crypto gained better key support, NaN/detached-buffer handling, and Node-compatible behavior across several APIs.

### Performance and internal refactors
**Runtime internals were simplified and sped up** — The bundler switched several graph traversals to iterative/BFS forms, `Buffer#indexOf` got a linear worst-case path, GC scheduling was simplified, and a large Rust dead-code purge reduced maintenance surface. Build tooling also got more robust around order files, PE compilation, and embedded assets.

### Other misc changes
- Test runner, fake timers, heap snapshots, and diagnostics behavior were refined.
- CSS modules, source maps, MIME handling, cron, YAML, dotenv, and URL parsing got targeted correctness fixes.
- CI/release and builder-image workflows were updated, plus many vendored-test and flake cleanups.
