---
date: 2026-06-21
repo: oven-sh/bun
size: L
title: "Bun hardens streams, Windows fs, and Linux syscalls"
excerpt: "Backpressure now propagates through serve streams, a Windows fs.rm crash is fixed, and Linux epoll_pwait2 gets an Android-safe fallback."
commits: 7
authors: [robobun, Jarred-Sumner]
commit_authors: {"7a5293c": Jarred-Sumner, "602d956": robobun, "9cb2faf": robobun, "febcc24": robobun, "8dd1b61": robobun, "1031c66": robobun, "b0fb1f7": robobun}
---

### **Bun.serve now respects socket backpressure for ReadableStream bodies** (7a5293c)
`Bun.serve` responses backed by `ReadableStream` bodies now stop pulling when the socket reports backpressure, awaiting the pending flush before continuing. This should prevent runaway buffering and improve behavior under slow clients; the patch also tightens close/cancel handling so writes stop cleanly if the sink dies mid-stream.

### **Fix crash when a client aborts a streaming response under backpressure** (8dd1b61)
A streaming response abort path could crash when HTTP/3 or corked TCP backpressure overlapped with the request lifetime. The fix separates writable callback state from request state and updates the sink/controller teardown path so aborts and late writes no longer race into the wrong object.

### **epoll_pwait2 now uses a raw syscall and disables itself on Android** (1031c66)
Bun now issues `epoll_pwait2` through a raw Linux syscall path and adds an escape hatch to disable it via feature flag. That avoids a segfaulting Android/seccomp edge case and makes the event loop fall back to older polling behavior when the syscall is blocked or faulty.

### **Windows `fs.rm` now maps more NTSTATUS failures correctly** (b0fb1f7)
Windows filesystem errors now translate more `NTSTATUS` values through `RtlNtStatusToDosError`, fixing cases that were surfacing as generic `UNKNOWN` and crashing recursive `fs.rm(..., { recursive: true })`. The change preserves the special directory handling while preventing misclassification of driver/placeholder failures.

### **React Compiler substitution revisit keeps resolved identifiers** (febcc24)
The parser no longer re-resolves identifiers during a substitution revisit if they already have a resolved `Ref`. That prevents generated React Compiler symbols from being rebound incorrectly, which could break minification and name preservation in bundled output.

### Other misc changes
- Removed a debug-only microtask-queue assertion and related tracking counters (602d956)
- CI lint workflow now installs dependencies before running oxlint (9cb2faf)
