---
date: 2026-07-12
repo: oven-sh/bun
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "Bun sharpens Node parity and stabilizes core networking"
excerpt: "A week of stream, fetch, HTTP, SQL, and worker-thread fixes, plus key memory-safety and crash hardening across Bun."
commits: 148
---

### **Major Node/WHATWG compatibility and stream behavior fixes**
Bun landed a broad wave of interop improvements across Web Streams, fetch, and Node stream bridges. `Response.clone()` now tees observed bodies correctly, `Readable.fromWeb()` and `finished()` handle WHATWG streams better, `Readable.toWeb()` preserves paused state after EOF, and fetch timing/error behavior was tightened for pre-aborted signals, option-conversion failures, redirects, timeouts, and compressed bodies. Web Streams also got a performance pass on write/pump/BYOB paths, reducing allocations and overlapping pulls.

### **HTTP server correctness and protocol hardening**
`Bun.serve` saw several important fixes: `Connection: close` is now honored, invalid `Response.error()` status lines are rejected, HEAD requests against streaming responses cancel cleanly, and error-handler edge cases no longer re-run or mis-handle pending rejections. HTTP/3 shutdown now sends `CONNECTION_CLOSE` properly, WebSocket protocol checks were tightened, and chunked-response handling avoids crashes when buffers are missing.

### **Memory-safety, crash, and lifetime fixes**
This week included a number of high-value safety fixes: unsound pointer provenance in JSON/internal parsers, Blob MIME ownership, use-after-free in `upgradeTLS()`, TSFN finalization after abort, GC lifetime issues in bundler `onBeforeParse` externals, and teardown bugs in bake/dev-server code. Bun also fixed several crashers in structured clone, Unicode escape parsing, fake timers, and WebSocket/stream teardown paths.

### **Filesystem, process, and Windows behavior gets more consistent**
`node:fs` now preserves contents for non-truncating write flags and closes leaked `FileHandle`s on GC. Process spawning got multiple correctness fixes around stdio, cwd, timeouts, and fd handling, while Windows path, HANDLE, and file-response I/O code was cleaned up to avoid fd leaks and double-closes. Linux credential switching (`setuid`/`setgid` etc.) was also hardened against thread-suspension deadlocks.

### **SQL, workers, and binary data handling improve**
Worker threads gained a substantial compatibility bump, including richer messaging semantics and better lifecycle handling. SQL got safer pipelining plus better error/result handling, and Postgres numeric decoding was hardened. Bun also fixed cookie parsing order dependence, gzip multi-member decoding, and several fetch/proxy and cache-validator edge cases.

### **Other misc changes**
- `bun build --compile` path rewriting fixes for out-of-root entries
- `bun-types` updated for newer TypeScript lib layouts
- CSS parser/printer fixes, including `color-mix()` validation
- N-API cleanup, sqlite error codes, and assorted addon/runtime fixes
- Release/build/CI maintenance, docs sweep, and test deflakes
