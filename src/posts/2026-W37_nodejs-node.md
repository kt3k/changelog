---
date: 2026-09-13
repo: nodejs/node
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Node adds new APIs while hardening core startup and I/O"
excerpt: "This week brought native globbing, QRDE histograms, PKCS#12 parsing, QUIC/HTTP2 upgrades, and several startup, VFS, stream, and crypto fixes."
commits: 148
---

### Major new APIs and platform support
**Native `fs.glob()` lands** — Node now ships a built-in glob implementation, reducing dependency surface and adding benchmarks around the new path.

**`perf_hooks` gets QRDE analysis** — Histograms can now compute quantile-respectful density estimates via `histogram.qrde()`, with native backing, documentation, and benchmark coverage.

**`crypto.parsePKCS12()` is added** — Applications can now parse PKCS#12 bundles directly into JS objects, exposing private keys and certificate chains without external tooling.

**QUIC and HTTP/2 gain new capabilities** — HTTP/2 added a session-level `connectionWindowSize` option, while QUIC added pending-stream promises and earlier validation around endpoint cache sizing.

### Startup, snapshots, and embedder safety
**Snapshot and isolate startup became more robust** — Multiple fixes hardened snapshot blob handling, preserved startup metadata across isolate creation, and removed aborts when several Environments share one `IsolateData`.

**V8 sandbox builds now work** — The sandbox port completed enough core fixes that Node can compile and run with `V8_ENABLE_SANDBOX`, expanding the supported build matrix.

**Inspector and shutdown edge cases were fixed or rolled back** — Null-platform and startup/shutdown crashes were addressed, and a recent inspector/V8 interrupt change was reverted after proving problematic.

### Streams, filesystem, and virtual filesystems
**Stream I/O is lighter and more correct** — Writes now allocate request objects lazily, reads use slab-backed buffers, and Web Streams/async iteration/cancellation edge cases were fixed.

**`fs.cp()` and VFS paths got correctness and performance work** — `fs.cp()` gained a C++ async fast path for directory trees, while VFS behavior was tightened for `open()`, `statfs()`, ZIP directory renames, reserved-root lookups, and `cpSync()`/`cp()` parity.

**Windows deletion and file-handle behavior improved** — `fs.rmSync()` now clears read-only files more reliably on Windows, and mounted VFS descriptors now return real `FileHandle` objects.

### Crypto, TLS, SQLite, and security hardening
**Crypto hot paths were optimized** — EC JWK import/export and key-detail lookups were sped up, and V8 startup entropy now comes from the OS CSPRNG to avoid DRBG churn.

**TLS and WebIDL validation were tightened** — TLS now defers re-entrant state-machine calls from JS, while multiple WebIDL and buffer-source checks were hardened against prototype tampering.

**SQLite behavior and safety improved** — `undefined` now binds as `NULL`, changesets are copied before apply, and user-defined SQLite functions are tracked correctly for cleanup.

**Memory-safety fixes landed** — Histogram import validation was hardened against malformed input, and snapshot parsing now rejects empty, foreign, or truncated blobs cleanly.

### Other misc changes
- `net.BoundSocket` can now be transferred across workers and subprocesses.
- Zstd handling was fixed across chunk boundaries, with reset/dictionary validation improvements.
- `stop()` termination leakage, cppgc wrapper teardown, and shared-buffer validation bugs were fixed.
- Build/CI/tooling updates covered Perfetto, WPT scheduling, benchmark CSV export, commit-lint hardening, and assorted test/docs cleanups.
