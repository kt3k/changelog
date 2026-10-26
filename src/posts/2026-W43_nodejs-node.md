---
date: 2026-10-25
repo: nodejs/node
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: L
title: "Node hardens crypto/TLS and trims legacy OpenSSL support"
excerpt: "A security-heavy week with new checksum/temp-file APIs, stronger permission checks, and major OpenSSL compatibility cleanup."
commits: 117
---

### Security and crypto hardening dominate the week
**Multiple TLS/DNS/crypto fixes and CVE work** — Node tightened certificate verification, rejected malformed or ambiguous DNS/TLS inputs, reset snapshot-stale random caches, and hardened X.509 parsing/formatting. It also refreshed root certs, updated bundled c-ares, and surfaced new Brotli invalid-stream errors as part of security fixes.

**OpenSSL support is being modernized** — The tree was prepared for OpenSSL 4.1, then later cut over further by removing legacy ENGINE/backend support, simplifying FIPS to provider-based OpenSSL builds, and requiring OpenSSL 3+ while pruning older compatibility branches. BoringSSL support was also expanded and aligned for SHA-3 and TLS 1.3 cipher handling.

### New APIs and performance improvements
**Filesystem gets race-free temp-file creation** — `fs.mkstemp()`, `fs.mkstempSync()`, and `fsPromises.mkstemp()` now create and open unique temp files in one step, filling a long-standing gap with `mkdtemp()`.

**Checksums and hot paths get faster** — Node added `zlib.crc32c()`, optimized `TextEncoder.encode()` for short strings, reduced `MakeCallback()` overhead, sped up AbortSignal creation/abort paths, and coalesced buffered TLS reads to cut churn.

### Permissions, workers, and runner tooling
**Permission model coverage expanded** — `fs.realpathSync()` now participates in permission checks, wildcard env drops are rejected, and wildcard handling in the filesystem permission tree was fixed.

**Workers and test runner gained sharper defaults** — Web Workers now use a dedicated `worker` package condition, the test runner got `--test-forbid-only`, and it switched to `AsyncLocalStorage` for tracking test context.

### Storage, VFS, and native integration fixes
**SQLite, blob, and VFS behavior was corrected** — SQLite constructors now propagate option getter errors, `backup()` is hardened against type confusion, Blob sizes are no longer truncated to 32 bits, and VFS path/handle behavior was made more consistent for encoding, watch aborts, and live in-memory updates.

**FFI and callbacks were tightened** — Fast buffer FFI calls no longer leak handles, and libuv-invoked FFI callbacks now drain next ticks and microtasks in the right scope.

### Other misc changes
**Additional cleanup and platform work** — QUIC/DTLS configure validation was tightened, HTTP/2 teardown got a hang fix, diagnostics channel shutdown is safer, TransformStream context handling was corrected, and there were assorted build, docs, test, and CI updates.
