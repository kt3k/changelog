---
date: 2026-04-21
repo: denoland/deno
size: L
title: "Node compatibility and N-API behavior improved"
excerpt: "HTTP/1 and HTTP/2 compat fixes, deferred N-API finalizers, spawnSync FD inheritance, and a memory win in Command.output()."
commits: 7
authors: [bartlomieju, jeanibarz]
commit_authors: {"528ed97": bartlomieju, "f1a6660": bartlomieju, "5fc4ac9": bartlomieju}
---

### **Node HTTP client/server compatibility improved** (528ed97)
Fixed several `node:http` edge cases around aborts, keep-alive pooling, and server-initiated socket closes. This should make Deno behave more like Node in mixed async/I/O timing scenarios and avoid handing half-closed sockets to new requests.

### **Node-API finalizers now run after GC** (5fc4ac9)
Weak-callback finalizers are now deferred to the next event-loop tick instead of running during V8 GC pauses, matching Node.js behavior and avoiding unsafe reentrancy during collection. The public `node_api_post_finalizer` path is updated too, with regression coverage added.

### **spawnSync now supports sparse stdio FD inheritance** (f1a6660)
`spawnSync` can now honor `
