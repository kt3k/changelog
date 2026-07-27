---
date: 2026-07-26
repo: oven-sh/bun
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "Bun ships a big week of Node parity, networking, and Windows fixes"
excerpt: "Major Node-compat gains landed across crypto, test, REPL/inspector, QUIC, and HTTP, alongside serious Windows, TLS, and SQLite fixes."
commits: 206
---

### Major Node compatibility jumps
**Crypto and WebCrypto got a big upgrade** — Bun expanded `node:crypto`/WebCrypto support for post-quantum keys and algorithms, ChaCha20-Poly1305, raw import/export, and more Node v26.3.0 surface.

**Test, REPL, inspector, and performance APIs moved closer to Node** — `node:test` gained `run()` and current skip/todo behavior, `node:repl` and `node:inspector` became usable ports, and `perf_hooks.performance` now behaves like the real global object.

**HTTP and fetch semantics tightened** — Bun fixed HTTP/2 header validation, trailer rejection, WebSocket upgrade checks, latin-1 header wire encoding, and several fetch abort/options edge cases to better match Node and browser expectations.

### Networking, server, and runtime reliability
**QUIC and HTTP/3 saw major progress** — Bun landed experimental `node:quic` on lsquic and fixed multiple HTTP/3 client/server bugs, including handshake stalls, stale peer error poisoning, and half-close truncation.

**TLS and socket handling were hardened** — TLS shutdown and injected-socket paths now behave more correctly, with better close-notify handling and improved coverage of handshake edge cases.

**Backpressure and file I/O correctness improved** — `child_process` pipes now respect kernel backpressure, `FileSink` now settles pending writes properly, and broken-pipe/error paths no longer masquerade as successful writes.

### Windows, SQLite, and SQL fixes
**Windows support took a big step forward** — Bun can now run inside Windows AppContainer, `--no-orphans` works on Windows, and several path, file, timer, crash-handling, and blob-write bugs were fixed.

**SQLite and Postgres semantics were corrected** — Bun fixed a SQLite `serialize()` use-after-free, preserved empty aliases and row-count behavior, and made Postgres infinities and frame boundaries round-trip safely.

**Cron and server precondition handling were corrected** — cron schedules now default to local time with explicit time-zone support, and static/file serving now evaluates HTTP preconditions in the right RFC order.

### Other misc changes
- Dead-code purges and internal refactors across Rust, bundler, parser, and HTTP code
- Bundler fixes for CJS-to-ESM output and code-splitting performance
- Shell/glob/YAML/diagnostics polish and regression fixes
- CI/build/bootstrap updates, including refreshed builder images and dependency bumps
