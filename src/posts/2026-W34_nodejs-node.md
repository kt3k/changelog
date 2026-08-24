---
date: 2026-08-23
repo: nodejs/node
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Node.js week: security fixes, faster I/O, and QUIC/URL wins"
excerpt: "A strong week of memory-safety fixes, module/compile-cache portability, faster URL and fs paths, plus QUIC and stream correctness work."
commits: 140
---

### Major fixes and security hardening
**Memory-safety and correctness bugs were fixed in core file and transcoding paths** — `fs.mkdtemp()` got a heap-overflow fix for long prefixes, and UCS2 transcoding no longer writes out of bounds on odd-length input.

**Module resolution now handles unreadable configs more safely** — Node distinguishes missing `package.json` from unreadable ones, avoiding incorrect resolution when config files exist but can’t be read.

**Source-mapped errors, signals, and platform behavior were tightened** — `ERR_INVALID_ARG_TYPE` now behaves correctly with `--enable-source-maps`, Windows `SIGWINCH` handling in child processes is fixed, and `--use-largepages` was effectively retired as a no-op warning flag.

### Performance and startup improvements
**URL and query-string handling got significantly faster** — WHATWG URL parsing added an ASCII fast path with fewer allocations, while `URLSearchParams` was reworked to reduce scanning, coercions, and repeated serialization work.

**File and module loading paths were optimized** — `fs.readFile()` now finishes small regular files in one thread-pool round trip, `package.json` lookup is cached per directory, and bootstrap defers more builtin loading when snapshots aren’t being built.

**Compile cache support became more flexible** — the compile cache can now be read-only, and portable cache layout no longer gets split by uid, making prebuilt caches usable across users.

### Streams, QUIC, and async I/O correctness
**Stream iteration and broadcast semantics were hardened** — aborts are now handled earlier and more consistently, consumer leaks on pre-aborted signals were fixed, and broadcast/end handling better respects buffering and backpressure.

**QUIC/HTTP/3 handling was improved** — incoming streams can now be consumed through session-level callbacks like `onheaders`, blocked streams resume correctly when flow control opens up, and unconsumed HTTP/3 requests now get `H3_REQUEST_REJECTED`.

**Filesystem async APIs gained cancellation support** — stat-style promise and callback operations now accept `signal`, aligning them with the rest of the abortable fs surface.

### SQLite, FFI, and networking hardening
**SQLite bindings were made more reentrancy-safe** — parameter binding now blocks reentry during stepping, busy statements can’t be finalized from authorizers, and `StatementSync.run()` validates integer result conversion more strictly.

**FFI semantics were tightened** — callbacks stay non-constructible, float setters now reject non-numbers, and shared-buffer/pointer conversion paths were aligned to reject invalid inputs consistently.

**HTTP and socket edge cases were fixed** — keylog listeners now attach to existing agent sockets, socket teardown no longer crashes on nullish parent links, and parser/header accounting got a few small cleanups.

### Other misc changes
- `perf_hooks` histograms gained statistical comparison APIs
- `fs.cp` preserved symlink types more accurately with filters
- Test runner JUnit output and coverage reporting improved
- `node --test` directory handling regressed less and was restored
- Various docs, benchmarks, build/CI, and type-definition updates across the tree
