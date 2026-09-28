---
date: 2026-09-27
repo: nodejs/node
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: L
title: "Node tightens security, stream performance, and runtime APIs"
excerpt: "This week brought a new env-permission model, major stream and crypto work, SQLite API changes, and a cluster of perf/runtime fixes."
commits: 172
---

### **Security and isolation get a major upgrade**
Node added `--allow-env` to the permission model, letting startup restrict environment variables by exact name, prefix, or wildcard. The change scrubs denied values from `process.env`, native `getenv()`, child processes, and workers, making it a significant semver-major hardening step.

### **Streams and async iteration were heavily refactored for correctness and speed**
A large stream overhaul landed across classic streams, async iterators, and web streams. It fixes cancellation, backpressure, wakeup, and lifecycle edge cases, while also trimming overhead on hot paths like flowing pipes, tee/pipeline usage, and BYOB reads. Related fixes also improved `stream/iter` interop and made `fromReadable()`, `fromWritable()`, and `toWritable()` behavior more predictable.

### **Crypto, perf_hooks, and diagnostics saw substantial API and correctness work**
Web Crypto received a broad correctness and hardening pass, including backend cSHAKE/KMAC support, tighter validation, and spec-aligned error handling. `perf_hooks` gained histogram snapshot/export features, zero-value recording, and a more robust CBOR import/export format. Separately, Node added `--process-timeout` and improved timeout reporting, especially for hung Workers.

### **SQLite and VFS continue to mature**
`node:sqlite` grew `createModule()` for read-only virtual tables, then saw a broader API rename from `DatabaseSync`/`StatementSync` to `Database`/`Statement` with deprecated aliases. VFS work also expanded, including recursive ZIP directory listings, a public reserved-root accessor, simplified CLI mounting around `--vfs-load`, and better path validation.

### **Core runtime and platform behavior got a number of important fixes**
This week fixed several long-standing edge cases: Node-API addon version mismatches now fail cleanly instead of crashing, `fd 0` is handled correctly in file handle and stream teardown, `-0` file descriptors no longer crash `fs`, and `FreeEnvironment()` no longer breaks sibling JS execution in shared isolates. There were also correctness updates in zlib reset behavior, FFI zero-length copies, FIPS-sensitive crypto availability, and HTTP parser callback retention.

### **Other misc changes**
- Temporal now builds with system ICU.
- `util.inspect()` now shows `SuppressedError` details.
- `monitorEventLoopDelay()` fixes large resolutions and documents new histogram options.
- Watch mode, test runner, SEA, QUIC, TLS, HTTP, and worker behavior all got smaller fixes and deflakes.
- A new Node 22.23.3 LTS release shipped with dependency and certificate updates.
