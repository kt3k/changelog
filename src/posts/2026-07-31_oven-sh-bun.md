---
date: 2026-07-31
repo: oven-sh/bun
size: L
title: "Bun fixes fetch memory, redirects, and more"
excerpt: "Major fetch and stream memory improvements landed alongside several notable correctness and crash fixes across networking, SQL, TLS, and FFI."
commits: 44
authors: [robobun, Jarred-Sumner]
commit_authors: {"5f65d37": robobun, "30032c6": robobun, "5b7c3ca": robobun, "e03e8cf": robobun, "b7fef25": robobun, "b78a50d": robobun, "c999bf6": robobun, "26f65fa": robobun, "997739f": robobun, "12ab112": robobun, "37a7767": robobun, "9ad23e2": robobun, "d9f53ed": robobun, "fe473ea": robobun, "f0c4263": robobun, "15feee1": robobun, "3ec728d": robobun, "45ccba4": robobun, "90da0f9": robobun, "081b614": robobun, "af5e88d": robobun, "befd269": robobun, "fadf10e": robobun, "ff512ea": Jarred-Sumner, "78bf500": Jarred-Sumner, "d370057": robobun, "34bcd29": robobun, "ceddc66": robobun, "503b01c": robobun, "11e09c7": robobun, "4454cc5": robobun, "cbe3e18": robobun, "529adec": robobun, "84416cf": robobun, "468dac3": robobun, "2fbb08a": robobun, "f70a5eb": robobun}
---

### **Fetch bodies now stream with much lower peak memory** (5f65d37)
Buffered consumers like `.arrayBuffer()`, `.bytes()`, and `.text()` now avoid the old over-allocation pattern and the streaming path can hand response bytes through as borrowed slices. The change should materially cut RSS for large fetches and concurrent streaming workloads, especially when bodies are read incrementally.

### **`fetch(..., { redirect: 'error' })` now only rejects real redirect codes** (b7fef25)
Bun was treating every `300..399` status as a redirect, so responses like `300`, `304`, `305`, and `306` were incorrectly rejected. This brings redirect handling in line with the WHATWG spec and avoids breaking callers that need to observe non-redirect 3xx responses.

### **`Response.clone()` no longer multiplies stream chunk copies** (5b7c3ca)
Stream tee branches now share chunk references instead of deep-copying each chunk through structured clone per branch. That removes a major memory blow-up for clone chains and makes cloned streamed bodies far cheaper to retain.

### **`bytes()` / `arrayBuffer()` single-chunk fast paths now copy safely** (e03e8cf)
The single-chunk consumer fast path used to return the producer’s backing storage by identity, which could alias or transfer the live source buffer. This fixes the correctness hole by copying binary chunks even in the one-chunk case.

### **`fs.watch(..., { recursive: true })` now reports subtree watch failures** (9ad23e2)
On Linux, failures from `inotify_add_watch` on nested directories were previously swallowed, leaving partially-watched trees with no error signal. The watcher now surfaces those failures as `'error'` events so applications can detect incomplete coverage.

### **`fs.statfs` no longer truncates large filesystems on non-bigint paths** (ceddc66)
The non-बigint `statfs` implementation was storing fields in `i32`, which overflowed on larger volumes and returned negative counts. Large filesystems now report correct values instead of wrapping.

### **FFI `toBuffer()` stops freeing caller-owned memory** (45ccba4)
`bun:ffi` now borrows caller-owned bytes unless a finalizer is provided, avoiding accidental GC-time frees of foreign memory. This closes a serious use-after-free / bad-free footgun for native integrations.

### **TLS session helpers now return resume-capable tickets on TLS 1.3** (60bee4f)
`getSession()` and `getTLSTicket()` now return the ticket-bearing session on TLS 1.3 connections, matching Node’s behavior. That restores session resumption for callers that cache the accessor result.

### **`Bun.serve` preserves handler `Content-Length` on 304 responses** (37a7767)
304 responses previously had their handler-supplied length replaced with `0`, which is not valid framing for this status. Bun now forwards the handler value correctly and avoids synthesizing an invalid length.

### **`server.stop(true)` no longer crashes when a close handler closes a sibling** (529adec)
The uSockets teardown walk has been hardened against handlers that close other sockets during shutdown, eliminating a use-after-free in bursty TLS teardown scenarios. This is a real stability fix for concurrent connection shutdown paths.

### **SQL result rows no longer silently drop columns on structure mismatch** (997739f)
The row builder now asserts the structure/column offset invariant instead of skipping writes when it fails. That turns a silent data loss bug into an explicit failure and protects row shape integrity.

### Other misc changes
- CI allowlist regenerated from newer parallel-build data (30032c6)
- `spawn` stdio cleanup and overlapped shorthand support fixes (c999bf6, af5e88d)
- `AbortSignal.any()` exception-handling fix (12ab112)
- `bun test` / timer / shell / inspect / zlib / crypto / websocket compatibility fixes (d9f53ed, 11e09c7, fe473ea, 468dac3, 081b614, 84416cf, 26f65fa, b78a50d)
- Install/catalog/postinstall and bundle tree-shaking / dead-code cleanup work (f0c4263, cbe3e18, fadf10e, 78bf500, d370057, 503b01c, 34bcd29, 15feee1, ff512ea, 3ec728d, befd269, 2fbb08a, f70a5eb, 90da0f9, 4454cc5)
