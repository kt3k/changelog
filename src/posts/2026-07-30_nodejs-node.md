---
date: 2026-07-30
repo: nodejs/node
size: M
title: "FFI fixes, glob cache isolation, and HTTP hardening"
excerpt: "Node.js tightens Fast API validation, preserves FFI buffer fast paths, fixes glob cache cross-platform bugs, and hardens HTTP timeouts."
commits: 8
authors: [trivikr, Archkon, IlyasShabi, bmuenzenmeyer, ganjanggejang, efekrskl]
commit_authors: {"c8e2a82": trivikr, "f85fdab": trivikr, "f9e2fe0": Archkon, "111a62d": Archkon, "396aad0": IlyasShabi, "3f2f10a": bmuenzenmeyer, "cacd7a2": ganjanggejang, "0012a77": efekrskl}
---

### **FFI fast path now validates 32-bit integers** (c8e2a82)
Fast API calls now reject out-of-range or non-integer values for `i32`/`int32` and `u32`/`uint32` instead of letting V8 coerce or truncate them. This closes a correctness gap for optimized FFI calls and brings 32-bit behavior in line with the existing integer validation for other widths.

### **Optimized FFI buffer conversions stay on the native fast path** (f85fdab)
Buffer- and ArrayBuffer-backed arguments were being routed through a slower or incorrect conversion path after Fast API optimization; this commit preserves the pointer-like handling for those signatures. It fixes a regression where memory-backed arguments could lose the specialized native path, which matters for both correctness and performance.

### **HTTP server now guards invalid timeout values** (0012a77)
`checkConnections()` now sanitizes `headersTimeout` and `requestTimeout` before using them, treating invalid or negative values as `0`. That prevents bad timeout settings from crashing connection checks and makes the server more resilient to unexpected configuration.

### **FS glob matcher cache is keyed by platform** (111a62d)
Glob matchers are now cached separately for `path.posix` and `path.win32`, matching the fact that compiled matchers capture platform-specific path semantics. This fixes cross-platform cache reuse that could return the wrong matcher for the same pattern.

### Other misc changes
- Registered the missing `SetURL` wasm web API external reference (f9e2fe0)
- Added permission enforcement for `v8.setHeapSnapshotNearHeapLimit()` (396aad0)
- Corrected `url.format()` return type docs (3f2f10a)
- Updated FFI docs to use `ffi.suffix` instead of hardcoded `.so` paths (cacd7a2)
