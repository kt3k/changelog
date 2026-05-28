---
date: 2026-04-17
repo: oven-sh/bun
size: L
title: "Bun hardens tests, HTTP, and leaks"
excerpt: "Fixes several correctness bugs in fetch, http2, watchers, and Windows stdio, plus major test runner and install improvements."
commits: 22
authors: [robobun, Jarred-Sumner, alii, chrislloyd]
commit_authors: {"5383072": robobun, "36d3f60": chrislloyd, "55ab304": alii, "42e2aa3": Jarred-Sumner, "e822dc7": Jarred-Sumner, "fd86860": robobun, "5a39c2c": robobun, "766a9d7": robobun, "afdd135": Jarred-Sumner, "3864d8f": Jarred-Sumner, "90134bc": Jarred-Sumner, "f1064f2": robobun, "bc7da9e": robobun, "a3135fd": robobun, "f8ae8ed": robobun, "18c89a4": Jarred-Sumner, "89dccc7": alii, "048afd0": robobun, "7a59f9f": Jarred-Sumner, "f7f4ad6": robobun, "d9e397e": robobun}
---

### **bun test gets isolation, parallel env vars, and new benchmarks** (90134bc)
Bun’s test runner now has `--isolate` and `--parallel`, with per-file VM isolation, worker-aware environment variables, and supporting runtime changes across timers, modules, subprocesses, and caches. The commit also adds benchmark fixtures and docs to quantify the new modes.

### **isolated install dedupes peer-heavy trees much earlier** (7a59f9f)
The isolated installer was refactored to compute peer leakage sets and dedupe by peer context during the first pass, rather than exploding every dependency position and collapsing later. This targets massive lockfiles with heavy peer dependency fan-out and can cut node counts dramatically.

### **HTTP/2 server now behaves like strict peers expect** (fd86860)
Bun fixed several h2c compatibility issues in `node:http2`, including avoiding empty trailer HEADERS frames, handling `waitForTrailers` safely around stream finalization, and correcting server SETTINGS behavior. These changes matter because strict implementations like nghttp2 would previously fail on Bun’s wire output.

### **fetch aborts queued requests instead of hanging behind max concurrency** (5a39c2c)
Requests stalled in the HTTP thread’s queue could miss abort handling when `max_simultaneous_requests` was saturated, leaving aborted fetches unresolved. The fix adds queue/deferred-task tracking so aborts can fail fast even while the engine is at capacity.

### **fetch now settles when TLS succeeds but headers never arrive** (766a9d7)
A `fetch()` path with custom `checkServerIdentity` could hang forever if the connection died after TLS completed but before response headers were received. The promise now rejects correctly, so aborts and failures propagate instead of freezing the call.

### **Path watchers stop deadlocking and use-after-freeing on teardown** (f8ae8ed)
`fs.watch()` cleanup had multiple concurrency hazards around lock ordering and deferred deinit, which could deadlock or crash under contention. The fix tightens defer ordering and unlock sequencing to keep watcher teardown safe.

### **Windows stdio file descriptors survive handle swaps** (a3135fd)
Bun now recognizes cached startup stdio handles and stops panicking when `SetStdHandle` or similar APIs replace the process’s standard handles at runtime. This unblocks `fs.writeSync(0|1|2, ...)` and other stdio-based operations on Windows after handle changes.

### **Proxy request lines stop forcing default :80/:443 ports** (d9e397e)
Proxy-form requests now omit redundant default ports unless the original URL explicitly included one. That aligns Bun with curl/Node and avoids breaking strict proxies that match on exact authority strings.

### **Snapshot reruns reset counters correctly** (36d3f60)
`toMatchSnapshot()` no longer carries snapshot numbering across `--rerun-each` iterations or per-test retries, which had produced wrong snapshot keys and CI failures. This fixes snapshot creation/reuse in rerun-heavy test flows.

### **Glob scans and finalization stop leaking heap allocations** (89dccc7)
`Bun.Glob` now destroys both the walker struct and its arena-backed allocations on every `scan()`/`scanSync()` path, including error cases. That plugs repeated RSS growth from glob usage and tightens ownership cleanup.

### Other misc changes
- Malloc allocator bumped to upstream mimalloc dev3 merge (42e2aa3)
- `subprocess.stdio` cleanup now always runs (e822dc7)
- `LinearFifo` frees old buffers when growing empty (afdd135)
- Windows sync pipe reader now frees chunk backing storage (3864d8f)
- `Error.captureStackTrace()` no longer aborts on non-numeric limits (5383072)
- Valkey GC safety fix for finalized objects (048afd0)
- Resolver skips auto-install for invalid npm package names (f7f4ad6)
- Path resolve regression test coverage expanded across platforms (bc7da9e)
- LSAN suppression added to reduce test timeouts (18c89a4)
- `glob` allocator/finalization mismatch cleanup and dead code removal (55ab304)
- Docs added for Bun.WebView (f1064f2)
- Minor process/version expectation updates tied to dependency bumps
