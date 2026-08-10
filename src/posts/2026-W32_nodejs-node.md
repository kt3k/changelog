---
date: 2026-08-09
repo: nodejs/node
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Node ships big networking, crypto, and SQLite updates"
excerpt: "Major HTTP/2 and TLS changes, a new SQLite statement API, stronger FIPS and DNS handling, plus several security fixes."
commits: 143
---

### Networking and TLS got a major overhaul
**HTTP/2 throughput defaults increased** — stream and connection flow-control windows now default to much larger sizes, improving performance on higher-latency links.

**TLS handshake and certificate selection were tightened** — `SNICallback` and `OCSPRequest` now run asynchronously, client-hello parsing was removed in favor of native callbacks, and SNI certificate selection no longer leaks default-context credentials. TLS 1.3 resumption also now preserves client-auth state correctly.

**QUIC shutdown semantics improved** — new `stream.onstopsending` support exposes peer STOP_SENDING distinctly, and buffered writes are now unscheduled correctly to avoid loops after shutdown.

**HTTP response completion and request reuse behave more predictably** — writable completion now waits for actual flushes, `end()` reports the real outcome, and reused pooled sockets keep backpressure semantics aligned with the next request.

### Crypto and security work landed across the stack
**FIPS support is clearer and more correct** — startup failures now explain why FIPS could not be enabled, disabling FIPS is no longer misreported as an error, and Argon2 now respects FIPS/OpenSSL configuration instead of bypassing it.

**WebCrypto and crypto APIs were hardened** — WebCrypto gained prototype-pollution defenses and stricter `[EnforceRange]` checks, while RSA-OAEP now supports separate `mgf1Hash` selection.

**Several security-sensitive fixes shipped** — DNS `resolveAny()` now sizes TTL buffers safely for large replies, ZIP EOCD detection rejects ambiguous endings, and other edge-case crashes/misparses were removed across URL, SEA, and process/resource-stat handling.

### SQLite continues to expand
**Prepared statements and tag stores got safer, more ergonomic behavior** — `StatementSync` now supports explicit `close()` and `Symbol.dispose()`, `SQLTagStore` clears stale bindings and validates placeholder counts, and `createTagStore()`/`backup()` now reject invalid sizing/rate inputs.

**SQLite binding coverage widened** — raw `ArrayBuffer` and `SharedArrayBuffer` values can now be bound directly, and the docs around parameter binding were expanded.

### Performance and platform support improved
**FFI saw a meaningful speed and memory win** — `DynamicLibrary.getFunction()` now reuses wrappers, trampoline probing was reduced, and fast-call paths also gained a libffi plan reuse optimization.

**Streams and buffers got new capabilities** — `Buffer.allocUnsafe()`/`allocUnsafeSlow()` now accept alignment, `ReadableStream.pipeTo()` cuts per-chunk allocations, and `WritableStream.abort()` is closer to spec.

**Windows and build support broadened** — task-runner paths now use UTF-8 on Windows, file streams can wrap raw Windows HANDLEs, extra Windows file-open flags are exposed, and shared-library cross-compilation was fixed.

### Other misc changes
- `net.BlockList` was reworked for faster reads/writes and new rule-management APIs.
- DNS `setServers()` got stricter validation, including proper handling of port 0 and out-of-range ports.
- `buffer.isAscii()`/`isUtf8()` now treat detached buffers as empty instead of throwing.
- MIME parsing gained a non-throwing `parse()` API.
- Documentation, tests, CI workflows, and dependency bumps were updated throughout the tree.
