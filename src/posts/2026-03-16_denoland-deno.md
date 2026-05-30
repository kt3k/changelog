---
date: 2026-03-16
repo: denoland/deno
size: L
title: "FFI safety fix, Node compat and perf wins"
excerpt: "A security-relevant FFI GC fix lands alongside telemetry array attributes, Node compat fixes, and a core string-conversion speedup."
commits: 9
authors: [bartlomieju, dsherret]
commit_authors: {"764ce2f": bartlomieju, "f0e7923": bartlomieju, "216126e": bartlomieju, "954edda": bartlomieju, "39a07b2": dsherret, "4a19007": bartlomieju, "60edd78": bartlomieju}
---

### **Fix nonblocking FFI to retain ArrayBuffer backing stores** (764ce2f)
Nonblocking FFI calls now keep `BackingStore` references alive until the background thread finishes, preventing V8 GC from freeing ArrayBuffer memory early and leaving dangling pointers. This closes a real use-after-free hazard in async FFI paths involving buffer, struct, and out-buffer arguments.

### **Add OTEL array-valued attributes** (f0e7923)
Telemetry attributes can now carry homogeneous arrays of strings, numbers, booleans, and bigints instead of dropping them. That makes OpenTelemetry export more complete for apps that attach list-valued metadata to spans.

### **Speed up V8-to-Rust string conversion** (4a19007)
Deno core now uses newer rusty_v8 APIs and a reusable thread-local buffer to cut down string conversion overhead, reducing FFI calls on hot paths. This is a performance-focused runtime improvement that should benefit ops and helpers that move lots of strings across the V8/Rust boundary.

### **Reuse the threadpool for async N-API work** (216126e)
Async N-API work now goes through `spawn_blocking` instead of spawning a fresh OS thread per task. That lowers scheduling and creation overhead, especially on Linux, and brings the behavior closer to Node's worker-pool model.

### **Tighten Node compat around networking and child_process** (954edda, f7a43a2, 262cb59, 60edd78)
Node polyfills picked up several behavior fixes: `udp.send()` now requires net permission, invalid `child_process.send(..., handle)` values raise the proper handle-type error, and JSON IPC messages regain normal `Object.prototype` semantics. Deep-equality comparisons were also corrected for invalid dates, promises, maps/sets, and a few loose-equality edge cases to match Node's test suite more closely.

### **Other misc changes**
- Clippy override cleanup and rationale annotations (39a07b2)
- Dependency bumps: `v8` 146.5.0, `sys_traits` 0.1.25
- Tests added/updated for FFI, telemetry, and Node compat fixes
