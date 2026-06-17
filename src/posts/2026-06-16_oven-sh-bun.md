---
date: 2026-06-16
repo: oven-sh/bun
size: L
title: "Bun hardens GC, spawn, URL, and WebSocket paths"
excerpt: "A packed day of crash fixes, correctness fixes, and a Node 26 compatibility bump across Bun's runtime and engine bindings."
commits: 13
authors: [robobun, alii, Jarred-Sumner, cirospaciari, sosukesuzuki]
commit_authors: {"53bd013": robobun, "b0fef2f": robobun, "0fcead6": cirospaciari, "06c90af": robobun, "49269d3": robobun, "bbbab38": robobun, "78f0fff": robobun}
---

### **Upgrade reported Node.js compatibility to 26.3.0** (0fcead6)
Bun’s bootstrap, build, and runtime shims were updated to target Node.js 26.3.0, including ABI and stream/http behavior changes. This is a broad compatibility shift that affects native addon expectations and Node-facing behavior.

### **Fix concurrent GC crash in `GlobalObject::visitChildren`** (b0fef2f)
The GC path now fetches client data through `visitor.vm()` instead of dereferencing `thisObject->vm()` on a concurrent marking thread, avoiding a stale VM read that could segfault during parallel GC. `HTTPHeaderIdentifiers` is also made eager instead of lazily emplaced, removing a race between the mutator and GC helper threads.

### **Allow WebSocket upgrades to carry pipelined frames past header caps** (bbbab38)
The WebSocket client now caps only incomplete header bytes, not total bytes received while parsing a split upgrade response. This prevents false `InvalidResponse` terminations when the HTTP upgrade headers and subsequent WebSocket frames arrive in the same read stream.

### **Preserve long recursive `readdir` entries instead of dropping them** (06c90af)
Recursive directory reads no longer skip entries whose joined path would exceed the path buffer limit; the entry is still returned, and only deeper descent is length-gated. That fixes missing files in recursive listings for deep directory trees.

### **Make `Bun.Terminal` NaN clamping match Zig** (49269d3)
Terminal termios flag assignment now clamps with the same min-then-max order as Zig, so `NaN` resolves to the platform max instead of zeroing the flags. That keeps Bun’s terminal behavior aligned with the reference implementation.

### **Avoid zero-initializing URL join scratch buffers** (53bd013)
The URL join helpers now use uninitialized 2 KB scratch buffers instead of zero-filled arrays. This trims avoidable per-call work in URL normalization and joining hot paths.

### **Fix `spawn` handling for blob-like stdio at fd >= 3** (78f0fff)
`Bun.spawn()` no longer panics on Blob/ReadableStream stdio entries beyond the standard three descriptors; it now rejects unsupported cases cleanly and handles file-backed blobs more carefully. This closes a crash path in child-process stdio plumbing.

### **Other misc changes**
- WebKit upgraded to `b5ba38a21e17` and `51cc3feb7298` with fork sync changes.
- CI runner now ignores local console logins in its wait loop.
- SQL tests expanded for TLS rejection coverage across both adapters.
- SQL row-decoding refactors added tag constructors and removed hand-rolled struct literals.
- Misc docs/build/bootstrap updates, including Node 26 image pins and Windows sysroot caching fixes.
