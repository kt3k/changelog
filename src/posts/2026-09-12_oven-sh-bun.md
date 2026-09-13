---
date: 2026-09-12
repo: oven-sh/bun
size: L
title: "Bun tightens runtime, parser, and React compiler"
excerpt: "Important fixes for decorators, GC, stream semantics, require.cache, and several React compiler memory/perf bugs."
commits: 28
authors: [robobun, Jarred-Sumner, steipete]
commit_authors: {"2427149": Jarred-Sumner, "5822b76": robobun, "290c216": Jarred-Sumner, "e0b8e1e": robobun, "b6060ea": robobun, "7e6d1e5": robobun, "62ceb03": Jarred-Sumner, "a749e0a": robobun, "65245c2": robobun, "4a1b32f": robobun, "d0a2743": robobun, "3d40e50": robobun, "2da1e61": robobun, "f14b716": robobun, "e33e659": robobun, "23a7002": robobun, "1a126e4": robobun}
---

### **Decorators now get unique temp names** (5822b76)
Lowering standard decorators and bare accessors now generates per-class temporary names instead of reusing shared `_init`, `_dec`, `_base`, and related symbols. This fixes cross-class collisions in `bun run` and other paths that print lowered output without symbol renaming.

### **`Bun.gc(true)` now returns memory to the OS before it returns** (2427149)
The JS-visible GC entry points now follow synchronous collection with a forced `mi_collect(true)`, so memory reclaimed by the collector is actually released back to the OS before the call finishes. This brings `Bun.gc(true)` and `gc()` in line with their documented expectation while leaving runtime-driven GC behavior unchanged.

### **Metafile split-import edges now preserve the input entry point** (290c216)
When splitting turns an `import()` or `require()` boundary into a chunk, the metafile now names the original input behind that edge via `entryPoint`. That makes tooling able to map chunk imports back to source files without extra joins through the outputs table.

### **HTTP/2 streamed bodies no longer duplicate the tail after partial writes** (e0b8e1e)
`Bun.serve({ http2: true })` now avoids resending the last bytes of a small streamed body when backpressure causes consecutive short writes. That fixes protocol errors from peers that saw duplicated DATA at end-of-stream.

### **React compiler: fix a memory blow-up when validating phi dependencies** (b6060ea)
`ValidateExhaustiveDependencies` now deduplicates dependency sets for phi nodes instead of appending repeated copies. This removes a quadratic-style memory spike in `bun build --react-compiler` on branches that reassign locals.

### **`PerformanceObserver` callbacks from `node:vm` no longer crash** (7e6d1e5)
The perf_hooks observer callback path now handles callbacks created in a `node:vm` context correctly instead of downcasting them as if they came from the main global. That fixes a process crash when delivering performance entries.

### **`require.cache` no longer materializes namespace objects just to inspect ESM entries** (62ceb03)
Probing or enumerating `require.cache` now checks whether an ES module has already evaluated without forcing a namespace object creation. This prevents a hidden leak where readonly inspection of the cache could pin module namespace objects indefinitely.

### **Windows named-pipe connect failures now unwind cleanly** (a749e0a)
A synchronous failure while connecting to a Windows named pipe now releases the attempt ref and tears down the socket path instead of leaking native state. This closes a resource leak that accumulated across repeated failed connects.

### **React compiler: avoid quadratic memory and fix several codegen bugs**
The compiler got multiple correctness and scalability fixes: it now keeps only one copy of each phi dependency, walks nested functions once, emits the classic JSX runtime correctly, honors the last `children` prop, hoists captured context variables safely, and preserves declarations when DCE keeps a store. Together these changes remove OOM cases and several crash/ReferenceError regressions in `bun build --react-compiler`.

### **`bunfig` no longer panics on oversized config paths** (65245c2)
Startup now handles config paths that exceed the path buffer instead of indexing past the end and crashing. This fixes a class of failures for very deep working directories across commands that always load config.

### **`node:module._resolveFilename` now throws on invalid overrides** (4a1b32f)
Assigning a non-callable value to `_resolveFilename` now produces a `TypeError` instead of segfaulting when `require()` or `require.resolve()` uses it. The setter/getter path also keeps the overridden value separately from the original function.

### **`spawnSync` now throws instead of segfaulting when loop creation fails** (d0a2743)
Event-loop setup now checks for allocation/OS-resource failures in the native loop constructors and unwinds cleanly instead of passing null into later init code. That converts a crash into a handled failure on both Windows and POSIX backends.

### **`react-compiler`: fix enum map blow-ups in the parser** (3d40e50)
Bundling repeated top-level enum declarations now builds a single cross-module enum map per merged enum instead of copying the same map repeatedly. That removes the pathological memory growth on large repeated-enum inputs.

### **React compiler: reduce mutation-aliasing memory usage** (2da1e61)
Several compiler passes now avoid quadratic memory behavior by reusing state more carefully and using swap-removal in internal maps. This mainly improves large loop-free components that previously consumed hundreds of MB or more.

### **React compiler: emit correct classic JSX and `key` handling** (f14b716)
The compiler now emits `createElement` for classic JSX runtime inputs instead of incorrectly generating `jsxDEV` calls, and it preserves `key` placement after spreads. That fixes runtime `ReferenceError`s and classic-runtime output mismatches.

### **React compiler: honor the last `children` prop** (e33e659)
JSX lowering now treats only the final `children` key as the actual JSX children, matching plain build behavior. This fixes incorrect merged children arrays when `children` is provided multiple ways.

### **React compiler: fix hoisting around captured context variables** (23a7002)
A hoisting pass now correctly handles closures that read a `let` before its declaration in the lowered output. This prevents a compiler panic on patterns that previously failed during scope pruning.

### **Bundler compile prelinked test now runs in smaller batches** (1a126e4)
The test harness now links executables three at a time and checks stderr, reducing Windows lane wall-clock time. This is a test-only throughput tweak.

### Other misc changes
- Dependency bumps and patch refreshes (1 commit)
- Windows CI runner configuration tweak (1 commit)
- Misc test updates and coverage additions across parser, HTTP, websocket, GC, and bundler areas
