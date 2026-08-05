---
date: 2026-08-04
repo: oven-sh/bun
size: L
title: "HTTP compat, profiler fixes, and safety hardening"
excerpt: "A big Bun day: Node compat work, native profilers, streaming/backpressure fixes, and several crash-to-error fixes across CLI, HTTP, and VM APIs."
commits: 39
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"77d79f9": robobun, "a07354a": cirospaciari, "9a95458": robobun, "52ec9f2": robobun, "6a2c626": robobun, "ccf5efb": robobun, "ace8f42": robobun, "db5b68d": robobun, "b66764f": Jarred-Sumner, "b8d9477": robobun, "af63b8a": robobun, "5d70c96": robobun, "83c7055": robobun, "2190ef1": robobun, "7fab798": robobun, "10a986e": robobun, "6e13cb6": robobun, "5ad56ed": robobun, "87e168f": robobun, "d6302e9": robobun, "3f7144f": robobun, "0336d04": robobun, "c44df8b": Jarred-Sumner, "d6a03fc": robobun, "390e15c": Jarred-Sumner, "6fb3d65": robobun}
---

### **Native V8 profiler APIs land for dd-trace/pprof** (7fab798)
Bun now implements `v8::CpuProfiler` plus related V8 APIs needed by `@datadog/pprof`, removing a major blocker for native profiling integrations. This also adds `v8.isStringOneByteRepresentation` and exports the supporting V8 bindings/tests.

### **HTTP/2 server compat and crash fix for malformed headers** (a07354a, 83c7055, ace8f42)
The HTTP/1/HTTP/2 compatibility work expands Node v26.3.0 coverage, including HTTP/1 fallback/upgrade handling, session error scoping, frame parsing, and additional upstream tests. Separately, malformed HEADERS blocks and delayed server-stream delivery no longer take down the process; protocol errors stay at the connection/session level instead.

### **HTMLRewriter now streams correctly under backpressure** (87e168f, 9a95458)
`HTMLRewriter.transform()` was reworked to stream through `SinkHandle`/`SourceHandle` with proper suspension of async handlers instead of waiting the event loop. A follow-up fixes backpressured `RewriterPipe` consumers so native sinks and body collectors finish instead of hanging.

### **Filesystem and upload paths fix incorrect lengths/copies** (2190ef1, d6302e9)
`Bun.write()` no longer over-copies or truncates caller-supplied destination fds, and file-slice uploads now send the slice’s actual `Content-Length` when the sendfile fast path is used. Both fixes prevent subtle data corruption and wrong request metadata.

### **`Bun.serve` gets stricter, safer HTTP parsing and TLS behavior** (af63b8a, b66764f, b8d9477)
Server parsing now rejects invalid `Transfer-Encoding` lists instead of silently accepting bodies with unsupported codings, and FIFO/pipe file responses keep working as streaming bodies instead of being mislabeled as `Content-Length: 0`. Per-host TLS entries also now honor `requestCert` and `rejectUnauthorized` correctly.

### **More APIs now throw instead of aborting on bad input** (52ec9f2, 6a2c626, ccf5efb, db5b68d, 3f7144f, 10a986e, 5ad56ed, 77d79f9)
Several previously fatal edge cases were turned into normal errors: `URL.revokeObjectURL()`, `node:vm` context option getters, `bun:test` title formatting, DNS callback argument validation, N-API external string/reference behavior, Redis `expire()`, native addon loading on musl, and overlong profiler output paths now report errors instead of crashing or panicking.

### **Spawn, SQL, timers, and install behavior improvements** (5d70c96, 6e13cb6, d6a03fc, 0336d04, 390e15c, 6fb3d65, c44df8b)
`spawn()` now resolves relative `$PATH` entries against the requested `cwd`; `Bun.SQL` respects `PGSSLMODE`; timers reschedule correctly when `_idleStart` is rewritten; and install/binlink logic gained Windows and fallback fixes. Test runner timing/sharding support was also expanded and documented.

### Other misc changes
- Dead-code removal across runtime, allocators, webcore, and HTTP subsystems (2 commits).
- Test speedups and determinism cleanups in bundler/VM/install suites (4 commits).
- Native inspector frontend/server reconnect handling fixed (1 commit).
- JSON string quoting now uses valid `\u` escapes for BEL/VT (1 commit).
- Native compression/decompression streams landed with a major internal rewrite (1 commit).
