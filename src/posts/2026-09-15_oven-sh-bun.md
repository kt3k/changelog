---
date: 2026-09-15
repo: oven-sh/bun
size: L
title: "Bun tightens HTTP, YAML, and compiler fixes"
excerpt: "Major fixes land across serving, TLS, YAML, React Compiler, and crash-prone string handling."
commits: 32
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"0ea0a56": robobun, "0963a1b": robobun, "f59e351": robobun, "d9b0bf7": robobun, "ffb316c": robobun, "c3a107e": robobun, "37c2892": robobun, "368a6f7": robobun, "86e3c75": robobun, "b364c63": robobun, "e8750e3": robobun, "f3c1954": robobun, "81b7f41": robobun, "80d35ac": robobun}
---

### **UTF8View now throws instead of aborting on huge non-UTF-8 strings** (0ea0a56)
Bun’s UTF-8 conversion path no longer hard-aborts when a string can’t be represented as UTF-8, including extreme Latin-1 inputs that previously took down the process. The change threads failure through `UTF8View` and adds coverage for the conversion limit.

### **Bun.serve restores correct pipelined response flushing** (86e3c75, 37c2892)
Responses completed earlier in the same read are now sent before later JavaScript handlers run, fixing both the performance regression and the response-loss edge cases introduced by the prior corking behavior. This brings Bun.serve’s pipelined HTTP/1.1 handling back in line with expected ordering and makes the behavior more robust when handlers stop or terminate sockets mid-read.

### **YAML.stringify fixes alias reuse and block layout** (f59e351, d9b0bf7)
`Bun.YAML.stringify` now keeps visited collections alive so garbage collection can’t recycle their addresses into incorrect aliases, and block-style output is corrected for trailing spaces, empty collections, and indentation alignment. These fixes address both silent data corruption and malformed YAML output.

### **TLS hostname handling strips IPv6 brackets before verification** (81b7f41)
Bun now normalizes bracketed IPv6 literals like `[::1]` before TLS cert verification, SNI, proxy tunnel setup, and websocket upgrades. That prevents false certificate mismatches and aligns Bun with Node’s hostname handling.

### **React Compiler preserves compound-assignment values correctly** (c3a107e, f3c1954, 80d35ac)
Compound assignments to locals now keep the value they store, instead of lowering into a separate read that can reorder expressions or leave stray reads behind. A related scope-pruning panic on assignments inside `?:` tests is also fixed, improving both correctness and compiler stability.

### **Fake timers stop zero-delay rearm loops from hanging** (368a6f7)
Under `jest.useFakeTimers()`, timers rearmed with zero delay inside a timer callback are now treated as due again in the same drain cycle. That fixes hangs in `advanceTimersByTime()` and `runOnlyPendingTimers()` for common recursive timer patterns.

### **HTTP/3 aborted uploads now reset streams properly** (b364c63)
Aborted `fetch()` uploads over HTTP/3 now send `RESET_STREAM` instead of finishing with `FIN`, so servers stop treating truncated bodies as complete requests. This also avoids collateral session failures on subsequent uploads.

### **`process.memoryPressure` no longer emits a false critical event** (0963a1b)
Linux memory pressure notifications now ignore the spurious event fired by an unprivileged PSI trigger immediately after arming. That removes a recurring false-positive signal for apps that attach and detach listeners over time.

### **`drainMicrotasks()` no longer runs queued tasks** (ffb316c)
The `bun:jsc` microtask drain now stays scoped to microtasks instead of also ticking the event-loop task queue. That prevents surprising callback nesting and matches the API’s name and intent more closely.

### **`fs.read` validates buffer type before offset** (e8750e3)
`fs.read`/`readSync` now match Node’s argument validation order, throwing `ERR_INVALID_ARG_TYPE` for a bad buffer before complaining about the offset. This fixes a long-standing compatibility mismatch in the error surfaced to user code.

### **Other misc changes**
- JS printer fixes: minify empty-source/data-loader crash, output-position bugs, and an infallible writer refactor (3 commits)
- Memory/allocator work: mimalloc pin updates and ASAN build flag tweak (3 commits)
- Dead-code cleanup across native bindings, HTTP2, shell, and WebView wrappers (2 commits)
- Bun.markdown performance fix removing O(depth^2) work
- CSS pseudo-element parsing fix for `::view-transition-group-children()`
- `bun:crypto` HKDF zero-length validation
- Terminal leak fix on Windows spawn pipe errors
- `bun run` / AST hoisting fix for classes with static accessor initializers
- Misc test and build-only adjustments
