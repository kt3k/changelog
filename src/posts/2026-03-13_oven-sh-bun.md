---
date: 2026-03-13
repo: oven-sh/bun
size: L
title: "Big build overhaul, several crash fixes"
excerpt: "TypeScript-based build replaces CMake, while crypto, HTTP, websocket, watcher, and bundler bugs get targeted fixes."
commits: 8
authors: [Jarred-Sumner, robobun, WhiteMinds, gaowhen, dylan-conway]
commit_authors: {"8863614": robobun, "636c638": Jarred-Sumner, "7c00cce": Jarred-Sumner, "2964b4a": Jarred-Sumner, "ace03ea": WhiteMinds, "0d22c69": gaowhen, "a8ee0d3": dylan-conway}
---

### **Build system moves from CMake to TypeScript** (a8ee0d3)
The repo’s build pipeline was replaced with a TypeScript-based ninja generator, touching CI, dependency handling, configuration, and compile/link steps across the tree. This is a major infrastructure shift that changes how Bun is built and maintained.

### **Fix HTTP 304 responses hanging through proxy tunnels** (ace03ea)
Bun now forces `content_length = 0` for 1xx/204/304 responses even when proxy tunneling is enabled, so the client won’t wait for a body that can never arrive. This fixes long hangs during `bun install` behind HTTP proxies.

### **Fix websocket ping()/pong() no-arg behavior** (0d22c69)
Calling `ws.ping()` or `ws.pong()` without arguments now sends empty control frames instead of a timestamp payload. The JS wrapper and native implementation are aligned, fixing protocol correctness and compatibility with Node’s `ws` behavior.

### **Fix crypto hash segfaults and invalid-state handling** (7c00cce)
`Hash.update()` and `Hash.digest()` now validate `this` before dereferencing it, and detached buffers now throw a proper invalid-state error instead of crashing. The constructor also now cleanly errors when no digest method is supported.

### **Fix invalid `this` crashes in crypto/stream bindings** (636c638)
Follow-up null checks were added to more native bindings that could dereference a failed `jsDynamicCast`, including HMAC digest, Diffie-Hellman group `verifyError`, and `JSBufferList`. This closes additional crash paths when these APIs are called with the wrong receiver.

### **Fix StatWatcher GC crash by switching to JSRef** (2964b4a)
`StatWatcher` was refactored to use the standard `jsc.JSRef` pattern instead of an indirect strong reference, removing a thread-safety hazard during cleanup. This should prevent crashes in `HandleSet::visitStrongHandles` and related finalization paths.

### **Fix dynamic import loader propagation for attributes** (8863614)
Dynamic `import()` records now carry through the loader selected by import attributes, which was previously populated but never applied. That fixes bundling/compile failures for cases like importing `.html` with `{ with: { type: 'text' } }`.

### Other misc changes
- Docs-only fixes for dynamic import examples in `yaml.mdx` and `json5.mdx`.
