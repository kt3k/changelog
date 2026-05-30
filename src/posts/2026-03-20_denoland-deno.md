---
date: 2026-03-20
repo: denoland/deno
size: M
title: "Node compat gets several runtime fixes"
excerpt: "Deno tightened Node API compatibility around child_process, sqlite, process, and HTTP, plus a few smaller test/metadata updates."
commits: 11
authors: [bartlomieju, dsherret]
commit_authors: {"3015343": bartlomieju, "4a0e228": bartlomieju, "5a92ed2": bartlomieju}
---

### **Node child_process now honors uid/gid and exposes getgroups()** (49a9e13)
`spawn()` was missing uid/gid on async launches, and permission failures now surface as synchronous `EPERM` like Node.js. The day also adds `process.getgroups()` on Unix, filling a previously missing API for code that inspects supplementary groups.

### **SQLite `prepare()` now matches Node options and iterator semantics** (3015343)
`DatabaseSync.prepare()` now accepts the Node-style second-argument options object, including `readBigInts`, `returnArrays`, `allowBareNamedParameters`, and `allowUnknownNamedParameters`. It also defaults defensive mode to `true` and fixes iterator invalidation so active iterators fail cleanly after statement execution.

### **`process.threadCpuUsage()` is implemented** (5a92ed2)
Deno now exposes per-thread CPU accounting with an optional diff argument, aligning with Node’s API shape. This is backed by a new runtime op that reuses native thread CPU usage plumbing across macOS, Linux, and Windows.

### **HTTP h2c upgrade requests no longer hang** (4a0e228)
`node:http` no longer emits the `
