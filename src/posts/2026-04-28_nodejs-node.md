---
date: 2026-04-28
repo: nodejs/node
size: L
title: "FFI fast path, watch-mode fix, V8 update"
excerpt: "Major FFI shared-buffer support lands, watch mode now tracks worker files, plus a few important bug and V8/security-adjacent fixes."
commits: 13
authors: [nodejs-github-bot, JamieMagee, ShogunPanda, semimikoh, panva, IlyasShabi, SudhansuBandha, bengl]
commit_authors: {"7466249": SudhansuBandha, "4247cd3": semimikoh, "3ee30d9": panva, "8385efc": IlyasShabi, "1ad06ff": bengl}
---

### **FFI gets a shared-buffer fast path** (1ad06ff)
Node’s experimental FFI now adds an ArrayBuffer-based invocation path for numeric and pointer-heavy signatures, bypassing the usual V8 callback machinery for supported calls. This is a substantial performance and architecture change for FFI users, with new benchmarks and tests covering the new path.

### **Watch mode now follows worker entry files** (7466249)
`--watch` previously missed dependencies loaded by `new Worker()` entry points, so edits to worker files did not restart the process. The new plumbing reports worker-side imports/requires back to the main watcher, fixing a real usability gap for multi-threaded apps.

### **Crypto raw-key imports now reject strings** (3ee30d9)
Raw public/private/seed key imports are tightened so string input is no longer accepted where binary data is expected. That closes an unintended input path and aligns the API with the documented binary-only formats.

### **Crash fix in error source extraction** (4247cd3)
`GetErrorSource()` now handles invalid column ranges more defensively instead of crashing on malformed `using` syntax. This is a targeted stability fix for parser/error-reporting edge cases.

### **V8 picks up allocation-profile live/dead tracking** (8385efc)
Node’s bundled V8 now exposes an `is_live` flag on sampled allocations, letting profilers distinguish retained objects from ones already collected by GC. The patch also includes the corresponding V8 tests and embeds a new patch-level update.

### Other misc changes
- Corepack bumped to 0.34.7.
- libffi build fix for macOS.
- Export `isRiscv64` from test common helpers.
- V8 patched to 14.6.202.34.
- nixpkgs-unstable, gyp-next, timezone data, and a GitHub Action were updated.
