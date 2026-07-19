---
date: 2026-07-18
repo: oven-sh/bun
size: L
title: "Bun lands major Node parity and perf wins"
excerpt: "Big bundler, HTTP, sqlite, stream, zlib, and shell fixes improve correctness, compatibility, and throughput across the runtime."
commits: 55
authors: [robobun, cirospaciari, Jarred-Sumner, dylan-conway]
commit_authors: {"483fd42": robobun, "19d8ec0": cirospaciari, "b0925d7": robobun, "e8f5c6a": robobun, "934fa55": robobun, "1bd1783": robobun, "78f3a46": robobun, "b70524e": cirospaciari, "91462ff": robobun, "f44d5fe": robobun}
---

### **Bundler import-graph traversal goes iterative** (483fd42)
The bundler replaces several recursive JS import-graph walks with explicit-stack DFS/worklist passes. This avoids deep recursion hazards and should improve scalability on large graphs while preserving traversal order.

### **Node HTTP response writes now avoid copying large payload tails** (934fa55)
`res.write()` can now hold unwritten data by reference instead of copying it into uWS backpressure storage, matching Node’s behavior for large writes. That cuts allocation pressure and removes a major performance cliff for big streaming responses.

### **Node http server finish/pipeline handling is fixed** (78f3a46)
Bun now registers the socket-detach finish listener before emitting `request`, and defers the pipeline-advance/detach split so keep-alive middleware doesn’t lose the socket or double-advance the queue. This fixes a real regression in middleware-heavy servers like `vite preview`.

### **process.on('beforeExit') no longer fires after fatal uncaught exceptions** (b0925d7)
The runtime now skips `beforeExit` when the process is terminating due to a fatal uncaught exception, aligning with Node’s documented behavior. That removes a surprising callback path during crash handling.

### **bun:test expectation diffs stop eating literal `<...>` text** (f44d5fe)
The matcher formatting pipeline now preserves user data instead of interpreting every `<tag>`-looking span as markup. This fixes misleading failure output for tests whose expected/received values contain HTML-like text.

### **Zlib gains dictionary support and Node-compatible reset behavior** (19d8ec0)
Bun’s brotli and zstd paths now support dictionaries, and `reset()` behavior is tightened to match Node. The test coverage jump here suggests this closes several real compatibility gaps in compression-heavy code.

### **Web Streams compatibility expands substantially** (b70524e)
Another 17 Node web-streams tests were vendored, bringing Bun much closer to upstream coverage. The work also fixes a batch of stream/encoding edge cases discovered by those tests.

### **Server callbacks are now rooted and traced correctly** (1bd1783)
This refactor changes how server-level JS callbacks are managed so they stay alive through GC and are released deterministically. It also updates several server internals and adds broad regression coverage, indicating a high-risk correctness fix around server lifecycle and callback safety.

### **Spawns keep maxBuffer enforcement after stdout/stderr is touched** (91462ff)
Accessing `proc.stdout`/`proc.stderr` no longer disables the maxBuffer kill path. That fixes a hang and restores the expected “kill on overflow” behavior for piped subprocesses.

### **Bun.serve static responses stop emitting duplicate Date headers** (e8f5c6a)
Static routes now avoid adding a second `Date` header when the user’s `Response` already has one. That matters for cache correctness because `Date` is a singleton field and duplicate values can break freshness logic.

### **node:http now detaches keep-alive sockets at the right time** (78f3a46)
The rewritten finish handling also ensures middleware that rewires `res.on('finish')` can’t swallow Bun’s internal socket cleanup. This resolves a socket-assignment crash on the second keep-alive request in common compression middleware patterns.

### Other misc changes
- Node parity fixes across `dns`, `events`, `sqlite`, `assert`, `util.MIMEType`, `stream`, `fs/promises`, `os.networkInterfaces`, `napi`, `semver`, `dotenv`, `shell`, `ffi`, `bun:serve`, `bun.Transpiler`, `bun.color`, `bun:mmap`, `bun.gunzipSync/inflateSync`, and `redis`.
- Performance/internal refactors in CSS parsing/minification, source maps, semver parsing, resolver path handling, collections, js_parser, installer metadata scanning, and HTTP/2/3 lookup paths.
- Root CA bundle refresh and certificate generator fix for Izenpe.com.
- Tests and vendored Node fixtures added or updated across multiple subsystems.
