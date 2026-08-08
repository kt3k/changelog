---
date: 2026-08-07
repo: oven-sh/bun
size: L
title: "Major Bun day: streams, net, process, and compat"
excerpt: "Several high-impact fixes landed across compression streams, module loading, sockets, process compat, and server shutdown behavior."
commits: 16
authors: [robobun, dylan-conway, cirospaciari, Jarred-Sumner]
commit_authors: {"392726b": robobun, "f8b6342": robobun, "11e3f2b": robobun, "f493239": robobun, "8c5bf69": Jarred-Sumner, "43caaf3": cirospaciari, "45ee955": robobun, "45eda51": cirospaciari, "e3f9e3b": robobun, "c6f3f7d": dylan-conway, "eba6c07": robobun, "9b7c272": robobun, "6d090a2": dylan-conway, "25d9d4a": dylan-conway, "5a5f1b8": robobun, "898b169": robobun}
---

### **CompressionStream now stays alive across async transforms** (392726b)
Bun now keeps the native compression coder alive while off-thread brotli/zstd work is still in flight, fixing a use-after-free during VM teardown. This matters because large chunks can hand codec work to the WorkPool; the new refcounted ownership prevents the pool thread from touching freed native state.

### **Long `data:` imports no longer hit `ENAMETOOLONG`** (f8b6342)
The module loader no longer treats oversized `data:` URLs like filesystem paths, so very long inline module imports resolve correctly instead of failing at platform path limits. That restores parity with Node for large generated modules and avoids a surprising size ceiling.

### **`bun test --parallel` now aborts on fatal Windows worker crashes** (11e3f2b)
Parallel test runs now distinguish fatal NTSTATUS-style crashes from ordinary flaky exits on Windows and stop the whole run when a worker dies that way. This prevents serious engine/addon crashes from being misclassified as transient file failures and hidden by retries.

### **V8 addon callbacks keep returned values alive across scope pops** (f493239)
The V8 shim now preserves callback return values even when nested handle scopes close inside the callback, fixing a deterministic crash with the common `nan` pattern. This is a compatibility fix for native addons that expect V8's handle-scope lifetime rules.

### **macOS half-open sockets stop spinning forever on peer reset** (8c5bf69)
The usockets kqueue path now correctly treats FIN/RST edge cases and stops the 100% CPU spin seen on half-open sockets behind pending writes. That closes a nasty liveness bug for keep-alive and tunnel sockets that could previously deadlock idle processes.

### **Node `process` compatibility gets a large semantics pass** (45eda51)
Bun picked up a broad `node:process` compatibility batch covering env-object behavior, warnings/flags, exit semantics, and other gaps surfaced by the Node v26.3.0 test suite. This is a substantial runtime parity update with direct user-visible behavior changes.

### **HTMLRewriter no longer use-after-frees abandoned transforms** (45ee955)
A GC-sweep race in the HTMLRewriter streaming path was fixed so abandoned transforms can't be freed while a sink/controller still expects them. This removes an ASAN-detected use-after-free in a newly added streaming code path.

### **`Bun.serve().stop()` now closes idle connections, and `closeIdleConnections()` is exposed** (eba6c07)
Server shutdown semantics changed: idle keep-alive connections are closed immediately, in-flight requests drain before the stop promise resolves, and a new `closeIdleConnections()` API is available. This improves graceful shutdown behavior and makes the HTTP server match documented expectations more closely.

### **Windows named-pipe listeners now release correctly on `unref()`** (9b7c272)
`server.unref()` now actually lets Windows named-pipe servers stop keeping the process alive. That fixes a platform-specific hang where a listener would remain resident even though it had been unreferenced.

### Other misc changes
- React Compiler client-mode bundling fix for full-stack browser graphs (e3f9e3b)
- Dev error page switched to JSON payloads, restoring stack traces and richer diagnostics (6d090a2)
- Mimalloc build define removal and related build cleanup (c6f3f7d)
- THP disabling no longer leaks into spawned processes (25d9d4a)
- Bun.plugin segfault fix for throwing object-loader `exports` getters (5a5f1b8)
- Clippy/rustfmt/Miri/tsconfig and compatibility-test maintenance (898b169, 43caaf3)
- Minor usockets and HTTP cleanup around half-close/shutdown behavior (8c5bf69, eba6c07)
