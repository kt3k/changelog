---
date: 2026-06-05
repo: oven-sh/bun
size: L
title: "GC fixes, resolver hardening, and CI guardrails"
excerpt: "A heavy day of memory-safety fixes, stream/cache correctness, and test infrastructure hardening across Bun’s core runtime."
commits: 18
authors: [Jarred-Sumner, robobun, alii, dylan-conway]
commit_authors: {"6038601": Jarred-Sumner, "a7839df": alii, "08226e2": Jarred-Sumner, "d155a2c": robobun, "a2eaf90": dylan-conway, "82808d4": alii, "a1dd647": Jarred-Sumner, "f500993": Jarred-Sumner, "7ab24e4": robobun, "bf79fe7": Jarred-Sumner, "55f6c89": Jarred-Sumner, "74c709d": robobun, "3360a9e": Jarred-Sumner, "3d125dc": Jarred-Sumner, "b56491b": Jarred-Sumner, "91270aa": robobun, "ef89527": robobun}
---

### **Bun closes several GC and lifetime holes** (7ab24e4, 3360a9e, 3d125dc, 55f6c89, a1dd647)
Multiple core subsystems were tightened to avoid use-after-free, aliasing, and lifetime bugs: aggregate-error construction now keeps JS wrappers on the stack during GC-sensitive paths, CSS printing threads real lifetimes instead of erasing them, FFI drops a write-only field with clearer rooting rules, YAML removes raw parser back-pointers, and resolver slot pointers are now derived from the singleton with provenance-safe helpers.

### **ReadableStream locking and cancelation are fixed** (d155a2c)
`ReadableStream::isLocked` was effectively broken and returned `false` for every stream; the fix aligns native checks with the JS builtins’ actual `$reader`/sentinel behavior. It also avoids mis-routing cancelation for direct streams and marks native cancel promises handled to prevent unhandled rejection noise.

### **Test isolation now cleans up leaked handles and timers** (ef89527)
`bun test --isolate` now proactively closes leaked watchers/servers and cancels stale timers before swapping globals, so one file’s leftovers don’t pin the next file’s entire module graph. The same change adds a test-only hook to inspect isolated module cache state, improving coverage for the isolation machinery.

### **Bundler output dirs now own their file descriptors** (f500993)
The bundler’s output-dir handle is converted from a raw duplicated FD into an owning `bun_sys::Dir`, so the descriptor is reliably closed instead of leaking through worker clones and downstream result structs. This is a real resource-management fix for long-running build paths.

### **fs.watch now stores its JS wrapper weakly** (08226e2)
`FSWatcher` no longer keeps a bare self-reference that could pin the wrapper forever; it now uses `JsRef` with weak semantics and helper accessors. That matches the watcher’s actual liveness model and fixes a GC/rooting hazard around open/closed watcher lifecycle.

### **Zlib GC accounting no longer reads mutable stream state on the marking thread** (74c709d)
`NativeBrotli` and `NativeZstd` now cache their estimated external size at construction so `estimated_size` can run safely during concurrent GC marking without touching `JsCell`-backed stream state. This removes a thread-safety violation in GC memory accounting.

### **CI now sanity-checks platform tags before tests run** (a7839df)
Buildkite smoke steps now declare their expected OS/arch/ABI/distro/release, and the runner aborts early if the agent doesn’t match. That prevents entire shards from wasting time on misrouted jobs and makes platform mismatches fail fast.

### **Base64 crash-path encoding no longer overflows on i32::MIN** (91270aa)
The crash handler’s VLQ encoding path now avoids negating `i32::MIN`, which had been able to trigger a nested panic during crash reporting in debug builds. This hardens Bun’s panic reporting path so the reporter itself is less likely to abort.

### **Bundler and CSS correctness fixes land across minify and grid parsing** (b56491b, 6038601, 3360a9e)
The minifier reuses parser-owned scratch storage instead of allocating per call, and grid-template-areas now correctly parses `.` null-cell tokens, including runs of dots. CSS module printing also got a safer lifetime model, which matters for emitted chunk generation.

### Other misc changes
- Intel SDE is baked into the Windows verify-baseline image to avoid flaky job-time downloads (a2eaf90)
- SQL test now uses `container.host` for remote Docker compatibility (82808d4)
- Comptime string map refactor replaces workspace `phf` usage (bf79fe7)
- `bun test --isolate` and various runtime paths got additional cleanup and test coverage (ef89527, 7ab24e4, 74c709d)
- Resolver, YAML, CSS, FFI, bundler, and parser internal refactors/supporting tests (a1dd647, 55f6c89, 3360a9e, 3d125dc, f500993, b56491b, 6038601)
