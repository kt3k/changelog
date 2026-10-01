---
date: 2026-09-30
repo: nodejs/node
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Node 24.21.0 month: VFS, streams, crypto, and perf hardening"
excerpt: "Major VFS and stream API growth, faster core paths, stricter security controls, and broad crypto/SQLite hardening landed throughout September."
commits: 655
---

### **Big new platform surfaces: VFS, bench, and process controls**
Node gained several notable public APIs and runtime knobs this month. The virtual filesystem matured from mounted ZIP archives and SEA assets into a broader platform feature with startup load flags, `FileHandle`/`open()` integration, addon and FFI loading from mounted paths, recursive ZIP directory support, and better `statfs`/rename semantics. On the tooling side, `node:bench` expanded into a first-class benchmarking subsystem with file execution, diagnostics, and comparison exports, while `--process-timeout` and `--report-on-process-timeout` added a built-in way to terminate and diagnose hung processes.

### **Security and correctness tightened across crypto, permissions, and parsing**
The permission model got a major addition with `--allow-env`, enabling fine-grained environment-variable blocking across `process.env`, native `getenv()`, workers, and child processes. Crypto saw broad hardening and refactoring: Web Crypto gained hybrid KEMs and a substantial correctness pass, key handling moved further toward provider-backed metadata, PKCS#12 parsing landed, invalid encodings are now rejected, and FIPS behavior and indicators were tightened. Several memory-safety and crash fixes also landed in SQLite, FFI, Web IDL brand checks, snapshot parsing, and buffer handling.

### **Streams, fs, and HTTP get faster and more predictable**
A large share of the month focused on hot-path core APIs. Streams and `stream/iter` received multiple rounds of semantic cleanup plus throughput work, including faster flowing-pipe paths, slab-backed reads, cheaper writes, and better cancellation/backpressure handling. Filesystem APIs also got major improvements: native `fs.glob()`, faster recursive `readdir`, a C++ fast path for `fs.cp()`, fewer round-trips in `fs.writeFile()`, and several watch/rename/rm fixes. HTTP/HTTP2/QUIC saw flow-control, abort, teardown, and header-validation fixes, alongside performance wins in server response handling and parser callback management.

### **Startup, embedders, and build support broadened**
Worker startup was optimized via snapshot-based bootstrapping and related lifecycle fixes, while embedder-facing APIs improved for builtin code caches, inspector behavior, and multi-Environment isolate setups. Node also extended support for V8 sandbox builds and system ICU Temporal, improved shared-perfetto/build plumbing, and added/updated diagnostics surfaces such as `util.markPromiseAsHandled`, `Buffer.stringLength()`, `buffer.isLatin1()`, and new histogram APIs in `perf_hooks`.

### **Other misc changes**
- `util.throttle()` and `util.debounce()` were added as built-in utilities.
- HTTP, TLS, QUIC, and worker edge cases received numerous crash, ordering, and cleanup fixes.
- SQLite grew virtual tables and got a public rename from `DatabaseSync`/`StatementSync` to `Database`/`Statement`.
- Native addon, FFI, inspector, trace_events, and test runner regressions were fixed across multiple follow-up commits.
- Dependency bumps, WPT refreshes, CI/workflow tweaks, docs updates, and many test deflakes rounded out the month.
