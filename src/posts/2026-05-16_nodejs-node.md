---
date: 2026-05-16
repo: nodejs/node
size: M
title: "Streams get a safety pass, compose goes stable"
excerpt: "Stream internals fixed two pipe/backpressure bugs, broadcast now validates writev input, and stream.compose is marked stable."
commits: 6
authors: [inoway46, trivikr, aduh95, mcollina]
commit_authors: {"13c2374": aduh95, "9de9b9f": inoway46, "3163d8a": inoway46, "8c6e39e": trivikr, "19dd555": mcollina, "a6696e2": trivikr}
---

### **Stream pipeTo now respects accepted backpressure** (8c6e39e)
`pipeTo()` no longer retries chunks that a sync writer already accepted while signaling backpressure. This fixes a bug where block-mode `PushWriter` could cause duplicate async writes instead of waiting for drain, improving correctness under pressure.

### **BroadcastWriter now rejects non-array writev input** (a6696e2)
`BroadcastWriter.writev()` and `writevSync()` now validate that `chunks` is actually an array and throw `ERR_INVALID_ARG_TYPE` otherwise. That tightens the API and matches the validation covered by new tests.

### **`stream.compose` is now stable** (19dd555)
The docs now mark `stream.compose` as Stability 2 instead of experimental. This signals the API is ready for general use.

### Other misc changes
- WebStreams internal validation cleanup for highWaterMark/size coercion (13c2374)
- Debugger test flake fixes around restart/initial-break handling (9de9b9f, 3163d8a)
