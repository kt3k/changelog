---
date: 2026-07-27
repo: oven-sh/bun
size: L
title: "Backpressure, spawn aborts, and websocket blobs"
excerpt: "Major fixes for request-body flow control, synchronous abort handling in spawn, and Blob support in server websockets."
commits: 17
authors: [robobun]
commit_authors: {"7c92467": robobun, "6fb430d": robobun, "783d2a9": robobun, "6c12afd": robobun, "bcdf88e": robobun, "2d96969": robobun, "c7233fb": robobun}
---

### **Bun.serve now applies real TCP backpressure to slow body readers** (783d2a9)
`Bun.serve` no longer lets request bodies pile up in memory when handlers consume them slowly. The fix wires pause/resume behavior through the request-body pipeline so clients are throttled appropriately and oversized or buffered reads behave correctly.

### **Bun.spawn now throws immediately for pre-aborted signals** (2d96969)
`Bun.spawn({ signal })` now fails fast with an `AbortError` when the signal is already aborted, instead of forking a child and killing it afterward. That matches expected AbortSignal semantics and preserves `signal.reason` as the error cause.

### **ServerWebSocket APIs now send Blob bytes as binary frames** (c7233fb)
Server-side websocket send/publish/ping/pong paths now recognize `Blob` input and transmit its raw bytes instead of stringifying it to `"[object Blob]"`. This fixes silent data corruption and brings Bun in line with client-side websocket behavior and common ecosystem expectations.

### **DecompressionStream("zstd") now handles concatenated frames** (7c92467)
Zstd decompression now continues across back-to-back frames instead of treating the second frame as trailing junk. This matters for real-world multi-frame zstd streams, including `cat a.zst b.zst` and `pzstd` output.

### **Shell `yes` output no longer aborts captured stdout** (6fb430d)
Captured-output shell commands now dispatch the correct task type for `yes`, preventing an internal panic when the process reschedules work onto the event loop. This restores `.text()`, `.quiet()`, `.lines()`, and `.json()` for a common infinite-output command.

### **DNS timeout timers stay armed for overflowed in-flight queries** (bcdf88e)
The resolver now keeps its c-ares timeout timer alive even when more than 32 queries of one type are in flight. That closes a hang where overflowed requests could become invisible to the timer and never time out.

### **`spawn()` ignores `encoding` like Node does** (6c12afd)
`child_process.spawn()` now tolerates `encoding:
