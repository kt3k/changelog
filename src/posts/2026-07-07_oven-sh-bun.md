---
date: 2026-07-07
repo: oven-sh/bun
size: L
title: "Blob fix, HTTP correctness, and crash patches"
excerpt: "Several high-impact fixes landed for Blob lifetime safety, fetch/Request signal semantics, HTTP correctness, and a Linux deadlock crash."
commits: 21
authors: [robobun, Jarred-Sumner]
commit_authors: {"1081434": robobun, "1de8bd3": robobun, "17df034": robobun, "2bffc92": robobun, "5260a43": robobun}
---

### **Blob content_type ownership is now encoded safely** (1de8bd3)
Bun’s Blob implementation now tracks whether `type` bytes are static or heap-owned in the type itself, eliminating the old raw-pointer + boolean scheme that could mis-free a static MIME pointer. This fixes a real ASAN-reported crash in nested Blob construction and tightens ownership across Blob-related request/response codepaths.

### **Fetch/Request now treat `signal: null` as an explicit detach** (17df034)
`new Request(input, { signal: null })` and `fetch(input, { signal: null })` now correctly sever inheritance from the input Request’s AbortSignal instead of silently falling back to it. The change also makes non-AbortSignal values throw a proper type error, matching WebIDL/spec expectations and fixing surprising abort behavior.

### **Bun.serve now honors `Connection: close` on responses** (2bffc92)
When a handler sends `Connection: close`, Bun now marks the underlying HTTP response state so the socket is actually closed after the response instead of being reused. This fixes a protocol violation that could leave a connection alive in the keep-alive pool and serve extra requests after it should have been shut down.

### **Chunked HTTP handling no longer panics when the body buffer is absent** (1081434)
The chunked-response path now falls back safely when `body_out_str` is missing instead of unwrapping `None`, avoiding the crash behind the chunked response retry bug. The retry path was also tightened so terminal requests simply stop early when there is no owner buffer to write into.

### **Linux set*id calls are protected against thread-suspension deadlocks** (5260a43)
`process.setuid`, `seteuid`, `setgid`, `setegid`, and `setgroups` now run with thread suspension disabled on Linux to avoid the GC/bmalloc signal-barrier deadlock that could wedge the entire process. This is a serious reliability fix for privilege-dropping servers and any code that switches credentials under GC pressure.

### **Other misc changes**
- HTTP fetch proxy URL handling now accepts `URL` objects.
- WebSocket upgrade sockets now emit `close` when the peer closes.
- UDP recvmmsg batches stop dispatching after a handler closes the socket.
- `If-None-Match` parsing now respects commas inside quoted ETags.
- Buffer raw slice/write bindings were aligned with Node semantics.
- FileSink async write promises now resolve to the correct byte count.
- `process` uncaught-exception behavior and fake timers were adjusted.
- Docs fact-check sweep across 120 pages.
- Test suite speedups and assorted CI/release-script tweaks.
- Dependency/build/test maintenance commits.
