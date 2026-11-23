---
date: 2026-11-22
repo: oven-sh/bun
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "Bun spent the week replacing unsafe core deps with Rust"
excerpt: "Major parser, compression, path, ICU, and ownership refactors landed, alongside security hardening and several correctness fixes."
commits: 111
---

### Core runtime keeps moving to safer Rust implementations
**Parser/compression stack rewrites:** Bun replaced or rewired several major C/C++ dependencies with in-tree Rust code: WebP image codec, HTTP/1 and HTTP/2 parsers, Brotli, zlib, zstd, and ICU pieces. These changes touch fetch, node:zlib, CompressionStream, WebSocket compression, image handling, and protocol framing.

**Safer ownership across the runtime:** A broad wave of refactors moved native resources, callbacks, descriptors, and wrapper back-references onto explicit owned types like `RefPtr`, `Arc`, `File`, and `MaybeOwnedFile`. This landed across HTTP, blob/file IO, sockets, DNS, SQL clients, Redis/Valkey, HTMLRewriter, and bindgen-generated classes.

### Correctness and stability fixes in networking, timers, and IO
**HTTP, Redis, SQL, and dev server behavior:** Bun fixed request ownership and proxy tunnel handling, made Redis connection failures report the real cause, refactored PostgreSQL/MySQL state machines, and corrected hot-reload edge cases for saved CJS/JSON views and import cycles.

**Event loop and descriptor safety:** Timers now model `Timeout` and `Immediate` separately, futex condition variables no longer lose wake-ups, and blob/IO wait paths were hardened against stale tickets, UAFs, and spin loops.

**Compression and archive fixes:** Brotli large-window responses are now rejected, compressed fetch bodies decode at the consumer’s pace, and archive/blob slicing semantics were tightened to better match expectations.

### Security hardening and build integrity
**Supply-chain and path safety:** WebKit tarballs are now pinned by SHA-256 before unpacking, cron paths and logs were sanitized on macOS, and launchd/crontab generation now rejects newline injection. Bun also centralized path handling into a single model, changing POSIX backslash behavior to better align with Node-style semantics.

**Crash reporting and platform fixes:** Crash reports now preserve signed return addresses on arm64 PAC systems, Windows/POSIX wrappers were hardened, and build settings picked up LTO, linker, and metadata updates.

### Other misc changes
- URLPattern was ported from C++ to Rust.
- `Bun.deepEquals` now matches properties by name.
- `Bun.cron()` accepts `file://` URLs.
- Various benchmark, docs, dependency, and test updates across the new Rust crates and build tooling.
