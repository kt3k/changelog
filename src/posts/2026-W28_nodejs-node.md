---
date: 2026-07-12
repo: nodejs/node
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "Node hardens QUIC, streams, and crypto while speeding hot paths"
excerpt: "A week of major perf wins and safety fixes across QUIC, streams, crypto, and HTTP, plus worker-thread socket transfer support."
commits: 84
---

### Major stability and security fixes
**QUIC and HTTP client crash paths were hardened** — QUIC now rejects oversized version-negotiation CIDs and no-handler stream destruction, while HTTP client teardown stops surfacing late socket errors after a complete response.
**Input validation and native edge cases were tightened** — zlib flush validation is now consistent across stream types, `validatePort()` rejects string zero correctly, and Blob/MIME handling fixes close spec and correctness gaps.
**Filesystem and inspector regressions were fixed** — the in-memory VFS blocks directory self-moves and handles recursive mkdir through symlinks, and the inspector no longer crashes on writes after socket close.

### Performance work across streams and HTTP
**HTTP/2 and Web Streams got faster** — HTTP/2 cut closure, callback, and allocation overhead in its hot path, while WHATWG stream iteration and enqueue/dequeue logic were optimized with faster byte-stream paths and ring-buffer queues.
**Buffer and timeout helpers were streamlined** — `buffer.isUtf8()`/`isAscii()` moved to fast APIs, and `setStreamTimeout()` reuses timeout objects to reduce allocation churn on busy connections.
**HTTP and stream internals saw targeted cleanup** — `IncomingMessage._read` dropped dead parameters, stream merge/from behavior was corrected, and nested streamable handling was tightened to avoid surprising async/sync mixing.

### Platform, crypto, and networking updates
**Crypto and QUIC internals were refactored** — crypto now splits OpenSSL, BoringSSL, and legacy code paths more cleanly, QUIC transport responsibilities moved deeper into `Session`, and `ngtcp2` was updated to 1.24.0.
**TLS and OpenSSL compatibility improved** — IPv6 IP SAN matching in `checkServerIdentity()` is fixed, and OpenSSL now enables riscv64 assembly support for better RISC-V performance.
**Networking metadata and proxy guidance were updated** — `perf_hooks` now reports correct request URLs with proxies and non-default ports, and the docs clarify the intended trust model for built-in proxy support.

### Test runner and worker-thread enhancements
**Workers can now transfer sockets and servers** — freshly accepted TCP sockets and listening servers can be moved between worker threads via `postMessage()` transfer lists, enabling new connection-dispatch patterns.
**Test runner observability improved** — `context.log()` and immediate `test:log` events were added, and `TestStream` now includes `entryFile` metadata for clearer reporting.

### Other misc changes
**Blob, MIME, and stream correctness fixes** — Blob stream retention was fixed, SAB-backed stream iterator chunks now copy to `ArrayBuffer`, MIME parameter accessors became case-insensitive, and `writevSync()` validates chunks before queueing.
**Maintenance and docs refreshes** — V8 global-property interception was backported, c-ares/npm were bumped, benchmark and CI workflows were adjusted, and several docs, tests, and flaky cases were cleaned up.
