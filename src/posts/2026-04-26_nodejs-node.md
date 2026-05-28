---
date: 2026-04-26
repo: nodejs/node
size: L
title: "V8 CPU profiles get options; HTTP keep-alive grows"
excerpt: "CPU profile tuning lands, HTTP keep-alive defaults jump to 65s, and URLSearchParams mutation gets faster."
commits: 10
authors: [watilde, gurgunday, IlyasShabi, addaleax, pimterry, panva]
commit_authors: {"4e332e0": IlyasShabi, "bac030c": addaleax, "9f75269": pimterry, "adef648": watilde, "4532d33": watilde, "846806b": watilde, "11f76b4": watilde, "c202696": gurgunday, "44f9fc3": gurgunday, "0f68423": panva}
---

### **V8 CPU profiling now accepts options** (4e332e0)
`v8.startCpuProfile()` and `worker.startCpuProfile()` now take an options object with `sampleInterval` and `maxBufferSize`. The implementation wires those settings through the V8 and worker internals, giving users control over profile granularity and retained sample count.

### **HTTP keep-alive default increased to 65 seconds** (9f75269)
Node’s default `http.Server.keepAliveTimeout` has been raised from 5s to 65s. That changes connection reuse behavior for servers by default, and the docs/tests were updated to reflect the new timeout.

### **URLSearchParams set/delete duplicate handling optimized** (c202696)
`URLSearchParams.set()` and `.delete()` were rewritten to avoid repeated `splice()` calls while mutating the internal list. This should reduce overhead on large parameter sets, and the new benchmark covers unique vs. duplicate-heavy cases.

### **`processTicksAndRejections()` skips unnecessary rejection work** (44f9fc3)
Promise rejection processing now only runs when there is actually rejection work pending. This trims extra work from the tick/rejection loop without changing the observable API.

### Other misc changes
- TCPWrap `Connect` signature cleanup and heap-allocation removal (bac030c)
- Shared-library CI workflow changes, including non-default OpenSSL matrix support (0f68423)
- `.editorconfig` deps-section simplification (11f76b4)
- Three doc typo fixes in API references (adef648, 4532d33, 846806b)
