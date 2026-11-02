---
date: 2026-11-01
repo: nodejs/node
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: L
title: "Node ships engine, crypto, and API fixes across the week"
excerpt: "V8 and OpenSSL upgrades landed alongside zlib, sqlite, FFI, TLS, and crash fixes, plus a few performance wins."
commits: 87
---

### Major runtime and security refreshes
**V8 and OpenSSL updates** — Node picked up a V8 patch release and upgraded bundled OpenSSL to 4.1.0, bringing in broad engine, TLS, and crypto changes along with regenerated platform artifacts.

**sqlite and zlib improvements** — SQLite binding behavior was tightened to preserve query plans, and zlib got both new raw ZipEntry read APIs and faster convenience paths for large one-shot compress/decompress workloads.

### Performance and caching wins
**WebAssembly compile cache now covers ESM-loaded wasm** — Repeat loads can now reuse compiled wasm when V8 serialization is available, improving startup for wasm-heavy apps.

**UTF-8 and buffer hot paths improved** — Buffer byte-length calculation gained a safer fast path for one-byte strings, while zlib helpers now avoid extra stream work on common calls.

### Stability, security, and correctness fixes
**Crypto, TLS, and X.509 fixes** — Certificate cloning now preserves issuer chains across isolates, TLS session reuse keeps the original host for provided sockets, issuer checks stop clobbering unrelated OpenSSL errors, and crypto random APIs reject immutable buffers.

**Filesystem, streams, and HTTP fixes** — `readFileSync(..., 'utf8')` no longer risks overflow on short reads, Web Streams keep the correct async context through `pipeTo()`/`tee()`, and HTTP/2 cleans up idle timers and outbound memory accounting properly.

**QUIC and child process behavior clarified** — QUIC error reporting was tightened, and subprocess timeout handling now exposes a `timedOut` signal for better observability.

### FFI and N-API safety work
**FFI callback lifetime and parsing fixes** — Callback registration now validates trailing args correctly, keeps registered callbacks alive with their library, and standardizes integer argument handling.

**N-API shutdown crash fixed** — TSFN teardown was reordered to avoid re-entrance crashes during shutdown.

### Release engineering and maintenance
**Node 26 entered LTS and 27 alpha landed** — Release metadata advanced for Lithium LTS and the 27.0.0-alpha line, with accompanying docs and workflow updates.

### Other misc changes
- `util.inspect()` no longer depends on `Buffer.prototype.hexSlice`.
- SQLite internals were cleaned up around constructor caching, backup settling, handle ownership, and statement tracking.
- Build/tooling and docs updates touched CI workflows, release docs, test fixtures, benchmark consolidation, and minor grammar/typing cleanups.
