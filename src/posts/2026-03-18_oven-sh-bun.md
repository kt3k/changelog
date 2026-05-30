---
date: 2026-03-18
repo: oven-sh/bun
size: M
title: "MySQL fix and a few important runtime patches"
excerpt: "MySQL adapter now negotiates legacy EOF correctly, with fixes for tagged template null bytes and hot-reload test flakiness."
commits: 7
authors: [robobun, alii]
commit_authors: {"7abe6c3": alii, "6c65e77": robobun, "a7e9abe": robobun, "76f4f38": robobun, "e91fe3e": robobun, "256bba7": robobun, "a04817c": robobun}
---

### **MySQL adapter now negotiates server capabilities correctly** (6c65e77)
`Bun.SQL` now intersects its desired MySQL features with what the server actually advertises, instead of unconditionally requesting `CLIENT_DEPRECATE_EOF`. That fixes empty SELECT results against MySQL-compatible databases like StarRocks, TiDB, and SingleStore that still use the legacy EOF protocol.

### **Tagged template literals preserve embedded null bytes** (e91fe3e)
The transpiler now uses a non-colliding error sentinel when iterating code points, so `String.raw` and template literals no longer corrupt `\0` bytes. This closes a real data-loss bug and adds regression coverage for tagged, untagged, and embedded-null cases.

### **Hot-reload sourcemap tests were hardened against stderr buffering bugs** (a04817c)
The hot CLI test helper was refactored to preserve unprocessed stderr lines across reload cycles, preventing hangs caused by dropped buffered output. The test also switched to more memory-efficient comment spam generation for the stress case.

### Other misc changes
- Docs: corrected stale/incorrect code comments across many source files (7abe6c3)
- Docs: clarified SQLite WAL sidecar cleanup behavior and fixed an inaccurate `-shm` description (76f4f38, a7e9abe)
- Deflake: split Windows compile metadata invalid-version checks into concurrent cases (256bba7)
