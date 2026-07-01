---
date: 2026-06-30
repo: nodejs/node
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Node tightens core APIs while shipping new module and crypto features"
excerpt: "June brought package maps, text modules, BoundSocket, and big crypto/TLS updates, alongside security hardening and stream/fs fixes."
commits: 279
---

### Major new capabilities
**Module resolution and loading expand** — Node introduced experimental package maps for import control and experimental text modules via `--experimental-import-text`, adding new resolver and import-attribute plumbing.

**Networking adds new socket primitives** — `net.BoundSocket` enables synchronous port reservation/adoption, while `dgram` gained `bindSync()` and `connectSync()` for immediate UDP setup.

**WebCrypto and TLS grow significantly** — WebCrypto picked up non-byte lengths, named cSHAKE variants, text streaming via `Blob.textStream()`, and several input-validation and performance improvements. TLS added certificate compression support and exposed supported algorithms.

### Security and correctness hardening
**OpenSSL/TLS and HTTP idle handling were hardened** — Node bumped OpenSSL to 3.5.7 with security fixes, tied TLS session reuse to the authenticated host, made SNI matching case-insensitive, and improved handling of callback exceptions. HTTP agents now destroy suspicious idle sockets to prevent response poisoning.

**Crypto validation got stricter** — Changes rejected low-order EdDSA points, tightened WebCrypto input/output bounds, deprecated OpenSSL engine-based crypto paths, and made several failure modes return errors instead of aborting or silently succeeding.

**Filesystem and path correctness improved** — Recursive `fs.watch()` and `fs.rm()` saw multiple race and platform fixes, `fs.readFile()` can now read into caller-provided buffers, and the VFS gained safer traversal and clearer security guidance.

### Performance, streams, and runtime behavior
**Streams and buffers were optimized** — The month included faster coverage reporting, stream backpressure and abort handling fixes, `pipeTo()`/`pipeToSync()` correctness work, faster UTF-8/byte-length paths, and lower-allocation WHATWG stream internals.

**Core runtime APIs were refined** — `domain` moved to `AsyncLocalStorage`, `ObjectWrap` was formally deprecated, `Hmac.digest()` now warns on repeat calls, `perf_hooks` gained per-iteration event loop sampling, and `util.inspect()`/`URLSearchParams` received correctness fixes.

**Tooling and build support expanded** — Build and configure changes improved libnode snapshot/codecache support, added emulator support for cross builds, refreshed vendored dependencies like libffi and Undici, and cleaned up tracing, debugger, and test-runner behavior.

### Other misc changes
- QUIC got new callbacks and multiple stream reliability fixes.
- `node:crypto`, `node:vm`, and `path.win32` saw assorted bug fixes and refactors.
- Release bookkeeping and docs were updated across current and LTS lines.
