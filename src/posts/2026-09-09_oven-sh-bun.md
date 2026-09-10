---
date: 2026-09-09
repo: oven-sh/bun
size: L
title: "Bun tightens streams, clones, and startup"
excerpt: "Major fixes for direct streams, cloned request bodies, terminal EOF cleanup, spawn deadlocks, and faster bytecode startup."
commits: 14
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"4ff9193": robobun, "8d21080": robobun, "83e2e4b": robobun, "90431a2": robobun, "f86be9d": robobun, "5f55496": Jarred-Sumner, "5eba206": Jarred-Sumner, "9685ae9": robobun, "e3b6d63": robobun, "d797369": robobun, "8547bde": robobun, "f3e5bdd": robobun}
---

### **Direct streams now ignore late controller calls** (4ff9193)
A `type: "direct"` stream no longer accepts `write()`/`close()` calls that happen after `end()` or `close()` inside the same `pull()`. This fixes cases where late writes were still being buffered or where close/error ordering produced the wrong outcome.

### **Cloned request bodies now error instead of ending on failure** (8d21080)
When a cloned body fails mid-stream, the original reader is now errored consistently instead of cleanly ending with `{ done: true }`. That keeps truncated uploads from being mistaken for complete bodies.

### **Body consumption and locking are now tracked independently** (83e2e4b)
Bodies now preserve their own bookkeeping even when the underlying stream source changes, fixing cases where cloned or blob-backed bodies lost the right `bodyUsed`/locking behavior. This also aligns Bun more closely with Node and browser behavior for locked streams and consumed bodies.

### **Terminal wrappers are released correctly after PTY EOF** (90431a2)
`Bun.spawn({ terminal })` now drops its wrapper and callbacks once the child side is gone and buffered input can no longer drain. That fixes leaked PTY resources and the CPU spin/memory growth seen when input was still queued at EOF.

### **Spawn no longer blocks the JS thread when `pidfd_open` fails** (f86be9d)
If Bun runs out of file descriptors while spawning, it now kills and reaps the child without doing a blocking `wait4()` on the JS thread. This removes a Linux-only freeze path at fd exhaustion.

### **`--compile --bytecode` gets build-time optimization controls and faster startup** (5f55496)
The standalone executable path now carries pre-resolved module graph data and exposes a new startup JIT policy knob, letting compiled apps stay in the interpreter longer during boot. Bun also adds `--no-optimize-bytecode` / `optimize.bytecode` to skip bytecode optimization passes when desired.

### **Native sinks now root controller state correctly and avoid a leaked flush promise** (5eba206)
This refactor changes how direct/native sink plumbing keeps the readable stream alive while piping, and fixes a promise that could be left hanging when `end()` hit backpressure. It also makes stream teardown more explicit across the sink pipeline.

### **HTMLRewriter now cancels still-open JS inputs on failure or abort** (9685ae9)
When rewrite output is cancelled or the rewrite fails, the upstream JS stream is now cancelled too instead of being left to keep producing. That restores the expected backpressure/abort behavior for direct inputs.

### **Direct-stream responses now end exactly once** (e3b6d63)
A `Bun.serve` direct stream that ends and then throws in the same `pull()` no longer writes the HTTP chunked terminator twice. This prevents response framing corruption that could break keep-alive clients.

### **`bun test --isolate` no longer charges deferred cleanup to the wrong file** (d797369)
Deferred work from a retired test file is now dropped before it can run in a later file’s context. That fixes a flaky isolation bug where cleanup could abort the rest of the suite.

### **`node:vm` now throws defineProperty errors in the vm realm** (8547bde)
`TypeError`s raised during `Object.defineProperty` inside a vm context are now created in the sandbox realm instead of the host realm. That closes a cross-realm prototype leak that could expose host `process`.

### **`fetch()` no longer reuses poisoned pooled connections** (f3e5bdd)
Bun now avoids reusing keep-alive sockets that the origin has already written to, preventing stale wire bytes from being misattributed to the next request. This fixes a real request/response mix-up hazard in connection pooling.

### Other misc changes
- Misc direct-stream behavior fixes and tests
- Stream/fetch body contract and locking tests
- Documentation updates for bytecode and direct streams
- Dependency/baseline and internal cleanup changes
