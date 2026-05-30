---
date: 2026-03-28
repo: oven-sh/bun
size: L
title: "Corking gets faster, Promise leaks fixed"
excerpt: "uWebSockets now batches nested async responses better, and Bun.serve stops leaking when an aborted Promise<Response> never settles."
commits: 2
authors: [Jarred-Sumner]
commit_authors: {"44f5b6a": Jarred-Sumner, "7c4714c": Jarred-Sumner}
---

### **Batch corking now supports nested async handlers** (44f5b6a)
Bun’s uWebSockets integration now keeps two per-loop cork slots instead of one, which avoids forcing resumed async handlers onto the uncorked slow path when another request is already using the shared buffer. That should reduce write syscalls in interleaved-await HTTP workloads and improve throughput for nested request patterns.

### **Fix leaked RequestContext when aborted Promise<Response> never resolves** (7c4714c)
`Bun.serve()` now wraps native promise callbacks in a GC-managed `NativePromiseContext`, so a pending `Promise<Response>` no longer keeps a `RequestContext` alive forever if the client disconnects first. This closes a real leak in abort-heavy servers and adds coverage for the abort-before-settle path.

### Other misc changes
- None.
