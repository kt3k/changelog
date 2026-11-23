---
date: 2026-11-22
repo: nodejs/node
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "Node ships major perf, security, and API cleanup wave"
excerpt: "A big week for Node: stream and URL perf wins, a stream read memory-safety fix, QUIC/HTTP2 tightening, and several crypto/API changes."
commits: 213
---

### Major performance, memory, and correctness work
**Stream/iter gets a broad performance sweep** — A large refactor removes async-generator layers and cuts promise churn/quadratic queue behavior across `from()`, `pull()`, `share()`, `broadcast()`, `push()`, and `merge()`, with batching/snapshotting improvements.

**URL and source-map hot paths got faster and leaner** — `URLSearchParams` avoids rescanning long `a&` runs quadratically, source maps now use packed storage for lower heap usage, and `import()` avoids dictionary-mode objects on a hot path.

**A stream read memory-safety bug was fixed** — Detached onread buffers are now retained and revalidated before reuse, closing a memory corruption risk in socket read paths.

### Security and protocol hardening
**HTTP/2 and HTTP agent behavior was tightened** — Client HTTP/2 requests now respect `maxSessionMemory`, poisoned free sockets are blocked from reuse, and HTTP/2 compat responses gained cleaner header handling via `response.setHeaders()`.

**TLS/crypto behavior was made stricter and safer** — TLS renegotiation is now deprecated and opt-in, direct `Hash`/`Hmac` construction is forbidden, backend requirements are explicit, and TLS/session handling was hardened across typed-array sessions, handshake teardown, and certificate reporting.

**QUIC saw multiple correctness fixes** — Invalid payload sizes are rejected up front, FIN/data packing is handled more reliably, and server early-data configuration now respects `enableEarlyData`.

**URL parsing and HTTP request construction got safer** — `urlToHttpOptions()` now ignores duck-typed impostors, and `ada` was updated to 4.1.1 with parser table refreshes.

### Platform, tooling, and API updates
**Node moved to V8 15.8 and refreshed the ABI** — The runtime now tracks V8 15.8.62.44 with a NODE_MODULE_VERSION bump to 155, impacting native addon compatibility and embedder builds.

**Debugger and observability got better** — `node inspect --probe` can attach to live processes, new diagnostics channels landed for HTTP/2 headers and worker registry events, and the test runner gained several rerun/reporting fixes.

**Filesystem and permissions behavior was corrected** — Permission audit mode no longer blocks fd-based fs calls, permission revocation handles moved paths, `fs.opendir()` validates `bufferSize` earlier, and `fs.existsSync()` now throws on invalid argument types.

### Other misc changes
- SEA with VFS now resolves source maps.
- Process exit no longer hangs on V8 worker thread shutdown.
- SQLite got empty-buffer, tracing, and close-time fixes; docs now mark it stable.
- Compile cache is disabled during V8 coverage collection.
- Misc build/docs/test updates, package/dependency bumps, and small cleanup work across crypto, HTTP/2, QUIC, and the test runner.
