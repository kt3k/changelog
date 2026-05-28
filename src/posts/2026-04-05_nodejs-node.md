---
date: 2026-04-05
repo: nodejs/node
size: L
title: "Node gains UUIDv7 and contextify tracing"
excerpt: "Node adds crypto.randomUUIDv7(), libuv keepalive_ex support, Windows crash hardening, and new contextify debug logs."
commits: 4
authors: [legendecas, santigimeno, panjf2000, nabeel378]
commit_authors: {"e775989": legendecas, "12249cc": santigimeno, "1637db0": panjf2000, "dec5973": nabeel378}
---

**crypto: add `randomUUIDv7()`** (dec5973)
Node now exposes a version 7 UUID generator, following RFC 9562 and exporting it from `crypto`. This is useful when callers want time-sortable UUIDs with cryptographically secure randomness.

**deps/uv: add extended TCP keepalive controls** (1637db0)
libuv gains `uv_tcp_keepalive_ex()`, which lets callers set `TCP_KEEPIDLE`, `TCP_KEEPINTVL`, and `TCP_KEEPCNT` instead of only the idle timeout. That broadens TCP tuning support across platforms and adds a new public API in Node’s bundled libuv.

**src: add contextify interceptor debug logs** (e775989)
Node’s contextify property interceptors now emit debug traces for queries, gets, sets, defines, deletes, and enumeration. The new `CONTEXTIFY` debug category should make sandbox/property-resolution behavior much easier to diagnose.

**deps/uv: harden Windows version probing** (12249cc)
libuv now initializes the `OSVERSIONINFOW` struct before calling `RtlGetVersion()`, fixing undefined behavior that could lead to random crashes. This is a small but important Windows stability fix.

### Other misc changes
- Updated bundled libuv keepalive internals and tests
- Added crypto docs and a test for `randomUUIDv7()`
