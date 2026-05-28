---
date: 2026-04-12
repo: nodejs/node
period: weekly
slug: 2026-W15
period_label: "Apr 6–12, 2026"
size: L
title: "QUIC, streams, SQLite, and crypto all move forward"
excerpt: "Node shipped a week of big QUIC upgrades, stream fixes, new SQLite snapshot APIs, faster searches, and broader crypto/diagnostics work."
commits: 60
---

### QUIC and transport get a major capability bump
**Arena-allocated QUIC packets** replaced the old per-packet ReqWrap/free-list model, cutting V8 involvement and lowering allocation overhead.
**Multi-ALPN, SNI contexts, and token handling** landed in QUIC, including `endpoint.setSNIContexts()`, better early-data/token behavior, and hashing/perf improvements.
**ngtcp2 1.22.0 update** refreshed the vendored QUIC/TLS stack with handshake and callback tweaks that may matter to embedders.

### Streams and Web Streams became more robust
**`stream/iter` gained classic stream interop**, including `Readable` integration and a new `Stream.toAsyncStreamable` path for the experimental iterator APIs.
**Destroy and adapter edge cases were fixed** in duplex pairs, `Readable.pause()/resume()`, and Web Streams `fromWeb()` adapters to avoid hangs, crashes, and unhandled rejections.
**WPT harness support improved** with per-subtest skipping, making large web-platform suites easier to triage.

### SQLite got snapshotting and faster row handling
**`DatabaseSync` can now serialize and deserialize in-memory databases**, enabling snapshots, cloning, and transfer without filesystem I/O.
**Row decoding and column-name caching were optimized** so ASCII text can use cheaper one-byte strings and repeated `iterate()` calls reuse cached keys.

### Crypto, diagnostics, and core APIs expanded
**Heap profiling now has a synchronous API** via `v8.startHeapProfile()` and `SyncHeapProfileHandle`.
**`crypto.diffieHellman()` was broadened and cleaned up**, with new accepted key inputs, followed by later simplification of stateless validation and removal of legacy checks.
**Docs were tightened** around `randomUUIDv7()` timestamp monotonicity and module resolution rules, while inspector webstorage events and protocol error reporting were made more accurate.

### Performance and correctness improvements across core
**Buffer search APIs now accept an `end` bound**, avoiding subarray allocations for bounded searches.
**String encoding got cheaper for small outputs**, and QUIC-related hashing saw a faster path.
**`assert` deep equality was fixed** for stale nested cycle state, and `fs.utimes()` tests were hardened around timestamp normalization.

### Other misc changes
**Undici was bumped to 8.0.2** with updated guidance for `fetch`/`FormData` pairing and dispatcher behavior.
**OpenSSL and build/test tooling were refreshed**, including OpenSSL 3.5.6 updates, perfetto 54.0, WPT README/doc clarifications, and assorted runner/config cleanup.
