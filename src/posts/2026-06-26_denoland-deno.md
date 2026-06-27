---
date: 2026-06-26
repo: denoland/deno
size: L
title: "Deno speeds up fetch, HTTP, and response cloning"
excerpt: "Performance wins for streamed responses and Response reconstruction, plus fixes for timers, node loading, cache 404s, and AppImage packaging."
commits: 6
authors: [nathanwhit, rnbguy, magurotuna, nathanwhitbot]
commit_authors: {"845e9fd": rnbguy, "e887f38": nathanwhit, "49c3825": magurotuna, "c5a85e9": nathanwhitbot, "87bc062": nathanwhit, "876a960": nathanwhit}
---

### **Streamed HTTP responses now flush in one write** (87bc062)
`Deno.serve` chunked responses now coalesce head, body chunks, and the terminating chunk into a single buffered write where possible. This restores throughput for streamed/SSE-style bodies while still flushing incrementally when the body stalls, so clients see data sooner without regressing the fast path.

### **Response reconstruction avoids header/body rework** (e887f38)
`new Response(body, otherResponse)` and similar header-copying paths now take a fast path that reuses already-validated `Headers` entries instead of re-running the slower webidl conversion and per-entry checks. Static bodies materialized into streams are also tracked so round-tripping a string/Uint8Array body through a `Response` or `Request` can preserve the `Content-Length` path instead of falling back to chunked transfer.

### **Fix timer expiry races that could drop timers** (49c3825)
The event-loop timer handoff was reworked to stop relying on a shared expiry buffer that could be stale after JS side effects. This closes a race where promise hooks or async-op callbacks could mutate timers between the snapshot and Rust’s readback, causing timers to be delayed, cleared, or lost.

### **Sync `require()` can now load graph-backed TS modules** (c5a85e9)
Node compatibility loading now has a synchronous prepared-module path for graph-backed modules, letting sync `require()` emit TypeScript ESM modules without piling up work in the async blocking queue. That fixes deadlocks in large batches of local `.ts` imports and makes synchronous loading more robust.

### **404 cache entries no longer get checksum-validated** (876a960)
Negative cache entries are recognized before content checksums are applied, so cached 404 metadata no longer trips checksum validation meant for real file bodies. This fixes JSR dependency probes against extensionless Node built-ins like `crypto`, `fs`, and `path`.

### **AppImage SquashFS now uses zstd** (845e9fd)
Linux AppImage packaging switched its SquashFS compressor from xz to zstd to match the runtime’s supported format. That avoids packaging/runtime mismatches and should also improve build and extraction performance.

### Other misc changes
- Dependency/config updates for desktop packaging (1 commit)
- Expanded tests for HTTP, cache, node loading, and AppImage behavior (multiple commits)
