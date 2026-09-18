---
date: 2026-09-17
repo: oven-sh/bun
size: L
title: "Bun ships fetch, install, and runtime fixes"
excerpt: "Major HTTP/fetch correctness, install resolver hardening, and a new ModuleGraph runtime API landed alongside leak and perf fixes."
commits: 28
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"fd8422c": robobun, "8ce165a": robobun, "0ffd5b2": robobun, "b8c4a9b": robobun, "8f8e16c": robobun, "8eaad80": robobun, "b4315fa": dylan-conway, "0d3492e": Jarred-Sumner, "630e921": robobun, "b64b630": robobun, "5c26a6c": robobun, "2dee3bd": robobun, "08e4ccb": robobun, "64669ab": robobun, "67e94f0": robobun, "38acc20": robobun, "708bff2": robobun, "aafd78b": robobun, "b1be9ff": robobun, "dc078c8": robobun, "f0331c3": robobun, "e85f06b": robobun, "1a6b0d9": robobun, "8987cd7": robobun}
---

### **ModuleGraph lands as an experimental multi-instance runtime** (0d3492e)
Bun now exposes `Bun.ModuleGraph`, letting one process run many isolated instances of the same app with fresh module state, per-graph timers/I/O, and shared compiled code. The API also adds graph lifecycle controls and detailed disposal semantics, which matters for tenant-style or multi-app runtimes.

### **fetch() backpressure now caps decompressed output** (8f8e16c)
Decompression for streamed response bodies now stops at reader demand instead of inflating all available compressed input immediately. This closes a major memory-growth bug for `getReader()` consumers and brings Bun much closer to Node’s behavior under slow reads.

### **Install no longer downloads tarballs it will never place** (8eaad80)
The installer now skips fetching registry tarballs for dependencies that are filtered out by platform, production/omit mode, or bundling rules. That should cut unnecessary network traffic and cache churn substantially on large resolves.

### **HTTP/3 fetch and serve header trimming is fixed** (b8c4a9b, fd8422c)
Bun now strips leading/trailing whitespace from header values on both HTTP/2/3 response handling and HTTP/3 request handling. This aligns `fetch()` and `Bun.serve({ http3: true })` with HTTP/1 behavior and fixes cases where padded headers broke redirects or content-length parsing.

### **HTTPS agent reuse now respects per-request certificate checks** (dc078c8)
Connections are no longer reused across requests that supply their own `checkServerIdentity`. That closes a security bug where a permissive first request could allow a later request with stricter identity checks to inherit the wrong socket.

### **Install lockfile and resolver behavior is hardened** (b64b630, 8ce165a, 0ffd5b2, 64669ab)
Several install-path bugs were fixed, including trusting only user-authored folder dependencies, avoiding debug-only manifest assertions, handling empty `bin` with `directories.bin`, and preserving bundled `file:` dependencies when installing from `bun.lock`. These are correctness fixes that prevent crashes and broken installs in edge cases.

### **Other notable runtime fixes** (b4315fa, 2dee3bd, 1a6b0d9, 67e94f0, 708bff2, aafd78b, b1be9ff, f0331c3, e85f06b, 38acc20, 8987cd7, 08e4ccb, 630e921, 5c26a6c, 0d3492e)
- AbortSignal leak fix for `fetch()` and `Bun.spawn`.
- `Bun.serve` pipelining/Connection: close correctness fixes.
- Direct stream, readline/events, sqlite parameter-count, console depth, ELF compile, zstd, URL parsing, dynamic import minification, tar extraction, and several install/runtime edge cases.
- WebKit dependency bump.
