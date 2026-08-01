---
date: 2026-07-31
repo: nodejs/node
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Node sharpens security, streams, and worker transfer"
excerpt: "July brought security fixes, worker-thread socket transfers, major stream and HTTP/2 tuning, plus new net and tracing APIs."
commits: 326
---

### Security, permission, and HTTP hardening
**Security release and policy tightening** — Multiple CVE fixes landed in the month-end release, alongside clearer security policy guidance. Node also tightened permission-mode behavior for addons, trace file creation, report output paths, and `permission-audit`, and fixed several HTTP edge cases around CONNECT proxying, header limits, `IncomingMessage.signal`, timeout validation, and TLS session/identity reuse.

**Proxy and TLS behavior got safer and more correct** — Built-in proxy handling now validates absolute-form targets and preserves the CONNECT host header, while TLS gained better negotiated-group reporting, corrected IPv6 IP SAN matching, and new docs around SNI, ALPN, and certificate compression.

### Worker threads and native handle transfer
**TCP socket and server transfer across workers expanded** — `net.Socket` and `net.Server` transfer via worker `postMessage()` landed, then was extended to work on Windows and with bound sockets using host/port or pipe paths. This is a notable platform feature for worker-based connection dispatch and more flexible socket handoff.

**Native addon and FFI paths were hardened** — Addon import support was enabled by default, addon loading now respects permission drops, and a run of FFI fixes improved validation, reentrancy, and fast-path correctness. Separate changes updated libffi, improved crypto key handling, and cleaned up several native boundary behaviors.

### Streams, Web Streams, and HTTP/2 performance
**Web Streams and stream iterators saw a major optimization pass** — Readable/writable queues moved to ring buffers, byte-stream async iteration and BYOB paths were sped up, and multiple iterator/merge/broadcast abort and backpressure bugs were fixed. Node also exposed `ReadableStreamTee` publicly and tightened stream semantics around aborts, nested async streamables, and `throw()` handling.

**HTTP/2 and HTTP internals got faster and more robust** — HTTP/2 saw a broad hot-path cleanup with fewer closures, less allocation churn, and improved trailer handling, while HTTP request/backpressure behavior and late socket/error handling were repeatedly corrected. Several UAF/crash fixes also landed in HTTP/2, QUIC, inspector sockets, and stream piping.

### QUIC, crypto, and tracing
**QUIC stability improved and certificate compression arrived** — QUIC fixed crashes around oversized CIDs, fragmented ClientHello handling, missing stream handlers, and RST/GOAWAY races, while also gaining TLS certificate compression support and an updated ngtcp2 dependency.

**Crypto, zlib, and SQLite received correctness and security work** — Crypto added backend splitting for OpenSSL/BoringSSL/legacy paths, tighter key cleansing, KEM copy reduction, and safer encoding/export validation; zlib got stricter flush and size validation; SQLite fixed lifetime, session, and iterator bugs; and several memory-safety issues were addressed in buffer and blob paths.

### Platform, tooling, and developer experience
**Tracing, REPL, and diagnostics were modernized** — Perfetto tracing support was wired in, the REPL moved onto the inspector path with always-on top-level await and syntax highlighting, and diagnostics channel storage plus inspector probe behavior were improved. Test runner changes added live `context.log()`, coverage inclusion for unloaded files, and better stream/event metadata.

### Other misc changes
- OpenSSL gained riscv64 assembly support; Maglev was enabled for riscv64.
- `dns.reverse()` now ignores hosts files; `dns.setServers()` moved to newer c-ares APIs.
- VFS got multiple fixes for sync writes, renames, recursive mkdir/readdir, symlink metadata, and lchown/chown behavior.
- `node --help` now uses colored/styled output when supported.
- Numerous docs updates, dependency bumps, flaky-test cleanups, and benchmark tweaks.
