---
date: 2026-07-01
repo: oven-sh/bun
size: L
title: "Trace events, JSON parser, and key fixes"
excerpt: "Major Node compatibility and parser work landed alongside several correctness fixes in crypto, SQL, install, archive, and WebSocket handling."
commits: 22
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"3128951": robobun, "8973584": robobun, "5b55beb": cirospaciari, "27009bf": robobun, "b124ed3": robobun, "eba370b": robobun, "48a4b01": robobun, "ae6051b": robobun, "2c62c01": robobun, "1773b96": robobun, "6640fcf": Jarred-Sumner, "d816daf": robobun, "5124b0c": Jarred-Sumner, "570f857": robobun, "eb6c0fe": robobun, "56c514a": robobun, "5585f36": robobun, "253e487": robobun, "725f46e": robobun, "d6a82e7": robobun, "00a93bd": robobun, "7f33321": robobun}
---

### **Node trace-events compatibility lands** (5b55beb)
Bun now implements Node’s `trace_events` subsystem end to end, including JSON trace output, the `--trace-event-*` / `--trace-env` / `--trace-exit` flags, per-subsystem events, worker thread tids, and the NodeTracing inspector domain. The change also ports 34 upstream v26.3.0 trace tests, so this is both a compatibility boost and a substantial new debugging capability.

### **SIMD-backed JSON parser rewrite** (6640fcf)
`bun_parsers::json` was rewritten around a SIMD structural index, replacing the old byte-at-a-time lexer and mutable AST builder with an immutable row AST. This affects core parsing paths like package.json, lockfiles, registry manifests, `.jsonc`, bundler loaders, and env/define parsing, so it’s a major performance and architecture change.

### **WebSocket receive/dispatch path no longer holds exclusive refs across callbacks** (5124b0c)
The WebSocket client was refactored to use interior mutability instead of carrying an exclusive mutable borrow through user callbacks. That removes a large class of reentrancy/borrow hazards and makes the receive path more robust, but it is also a deep internal refactor with lots of touched code.

### **Sparse array inspection no longer walks every hole** (48a4b01)
Printing huge sparse arrays now skips hole runs in one step instead of probing index-by-index, which fixes a hang/CPU peg when inspecting arrays with enormous length and few or no elements. This is a user-visible bug fix for logging/inspection of pathological arrays.

### **MySQL `caching_sha2_password` fast auth fixed** (2c62c01)
Bun now builds the fast-auth scramble in the correct operand order and keeps the connection in the authenticating state until the server’s concluding OK/ERR packet arrives. That restores compatibility with warmed MySQL 8 auth caches and fixes a real login path.

### **Windows `process.env` now behaves more like Node** (5b55beb)
Windows environment proxying now preserves original key casing for enumeration/JSON output and falls back correctly for non-env properties and prototype methods. This matters for `JSON.stringify(process.env)`, IPC env echoes, and Node-style property checks like `hasOwnProperty`.

### **`bun pm pkg set` fixed a use-after-free** (b124ed3)
Bracketed key-path segments no longer reuse freed memory when writing nested package.json keys. This was a correctness and safety issue that could corrupt output JSON, so it’s a meaningful bug fix.

### **Archive UTF-8/non-ASCII entry names fixed** (1773b96)
Archive read/write now handles non-ASCII entry names correctly across platforms, including Windows pathname conversion and libarchive’s warning-vs-failure behavior. That unblocks archives containing names like `日本.txt` and prevents silent entry loss or creation failures.

### **Bun.spawn Windows stdin shutdown bug fixed** (ae6051b)
A Windows-specific shutdown path now stops hanging when a spawned child dies while stdin is an async iterable. This resolves a real process-lifecycle bug and a CI-flaky spawn case.

### **`bun:ffi` preserves NaN, -0, and BigInt conversions** (d816daf)
`f64` argument conversion now passes the correct values through to native code instead of silently normalizing them first. That fixes observable ABI behavior for native interop.

### **`bun install` dependency resolution and file: handling fixed** (56c514a, 5585f36, 253e487)
Local `file:` dependency graphs, lockfile migration, and auto-install name lookup all got correctness fixes. These address real install-time breakage in vendored or migrated projects, especially around transitive local packages and exact-version package resolution.

### **CSS selector parsing tightened** (725f46e)
`nth-child(... of ...)` and `:has()` are now parsed non-forgivingly, rejecting invalid or empty selector lists instead of recovering into malformed output. This improves standards compliance and prevents silently emitting broken CSS.

### **`inspect`/WebKit stack of compatibility fixes and sync** (00a93bd, eb6c0fe, d6a82e7, 7f33321, 570f857, 8973584, 3128951, 27009bf, eba370b)
A WebKit sync, a GC crash fix, a build-artifact type confusion fix, and several smaller runtime correctness tweaks landed together. These are important, but they’re narrower than the main feature and bug-fix work above.

### Other misc changes
- WebKit sync and related compatibility adjustments (1 commit)
- Small GC/error-stack follow-up comment cleanup
- Docker image CA-certificate packaging fix
- Error/stack trace review nit cleanup
- Type declarations and internal builtins cleanup
