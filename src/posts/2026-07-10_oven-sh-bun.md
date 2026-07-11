---
date: 2026-07-10
repo: oven-sh/bun
size: L
title: "Bun lands major compatibility and correctness wave"
excerpt: "Worker threads, fetch, spawn, SQL, TLS, and file/path handling all got substantive fixes, plus a large C API cleanup and timer overhaul."
commits: 34
authors: [robobun, cirospaciari, dylan-conway, Jarred-Sumner, sosukesuzuki]
commit_authors: {"4643931": robobun, "5496119": sosukesuzuki, "ab84aa2": cirospaciari, "b330399": robobun, "4f94391": robobun, "593ec74": robobun, "3da0963": robobun, "4880f0a": robobun, "282b94c": robobun, "c773f88": dylan-conway, "095eb31": robobun, "91675d0": robobun, "5f145d6": Jarred-Sumner, "c1076ce": robobun, "65aa83b": robobun, "c56430c": robobun, "5d024c5": robobun, "ed4a810": robobun, "f6e084f": robobun, "c91d7da": robobun, "6bb5135": robobun, "90f8746": robobun, "2c12b16": robobun, "eec0425": robobun, "7445e63": robobun, "70f6679": robobun, "86caf6e": robobun, "49a3ca8": robobun, "eead6e8": robobun}
---

### **Worker threads compatibility jumps by 48 passing tests** (ab84aa2)
Bun ports Node’s `worker_threads` messaging machinery, adding support for `postMessageToThread`, richer `MessagePort` semantics, shared environment handling, inspector hooks, and better exit/error/transfer behavior. The commit substantially expands Node compatibility in an area that touches worker lifecycle and cross-thread messaging.

### **TLS and socket connection behavior now matches Node more closely** (c1076ce)
This fixes multiple client-side TLS edge cases, including certificate verification and socket-wrapping paths that previously leaked or mis-handled plaintext data on untrusted chains. It’s a broad compatibility and security-relevant change for outbound connections.

### **`fetch()` now decodes concatenated gzip members fully** (4f94391)
Responses with `Content-Encoding: gzip` no longer stop after the first gzip member; Bun now continues through multi-member streams like `cat a.gz b.gz`, `pigz`, and BGZF-style payloads. That prevents silent truncation of real-world compressed responses.

### **`Bun.serve` fixes HTTP method and cache-validator edge cases** (593ec74, c56430c, 49a3ca8, 3da0963)
Several server paths now behave correctly for `HEAD`, `If-None-Match`, and `If-Modified-Since`, avoiding protocol violations and stale-cache bugs. The streaming-response abort path also now handles peer disconnects without surfacing the wrong failure mode.

### **Spawn handling gets a cluster of correctness fixes** (b330399, 4880f0a, 2c12b16, eec0425, 282b94c, 65aa83b)
Bun now avoids double-closing exposed stdio fds, rejects NUL bytes in `argv0`/`cwd`, drains piped sync stdio through EOF, preserves inherited cwd behavior, fixes a Windows `spawnSync` timeout regression, and keeps terminal-attached subprocess output from being lost on POSIX. Together these close several correctness holes in process spawning.

### **SQL gains safer pipelining and numeric decoding** (7445e63, 70f6679)
Postgres query queuing now tracks pending writes so a later prepared statement can’t leapfrog an earlier queued request, preventing response mixups and pipeline wedges. Numeric float decoding also now sanitizes NaN boxing from binary wire results, removing a memory-safety class of bug.

### **Windows path resolution and filesystem behavior improve** (c773f88, 5d024c5)
Windows `openat` now builds NT-native object names from device paths instead of DOS-style paths, which should make dirfd-relative file operations more reliable. Separately, `mkdtemp` now honors its `encoding` option, matching Node’s return-type and encoding behavior.

### **WebStreams and timer internals see major refactors and fixes** (5496119, 6bb5135, f6e084f, eead6e8)
A large WebStreams cleanup fixes several crash, hang, and data-loss issues in the C++ streams rewrite, while timer/event-loop changes move POSIX away from expensive `us_timer_t` usage and address fake-timer heap spinning. The sourcemap finalization fix also corrects mapping order/columns for minified bundles.

### **Rust/JSC cleanup removes legacy C-API usage** (86caf6e)
Bun deletes the Rust-side JavaScriptCore C API bridge and rewires call sites onto native bindings and `JSValue` methods. This is a major internal refactor that reduces API surface and should make the engine codebase easier to maintain.

### Other misc changes
- DNS pending-cache leak fix in HiveArray (4643931)
- Docker test images optimized to avoid healthcheck wedges (90f8746)
- `net.connect({ localPort })` now sets `SO_REUSEADDR` on Unix (c91d7da)
- Re-export/cleanup pass across repo internals and build files (91675d0)
- Gitignore adds heap snapshots, profiler output, and core dumps (5f145d6)
- Windows timeout/leak test stabilization and related harness tweaks (ed4a810, 095eb31)
