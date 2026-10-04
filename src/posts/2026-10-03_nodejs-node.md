---
date: 2026-10-03
repo: nodejs/node
size: L
title: "FFI integers, HTTP perf, and ALS cleanup"
excerpt: "A busy day: FFI now accepts safe numbers for 64-bit args, HTTP responses got faster, and AsyncLocalStorage’s legacy path was removed."
commits: 23
authors: [panva, mcollina, trivikr, RafaelGSS, HoonDongKang, inoway46, Kjubikstronk, aduh95, mertcanaltin]
commit_authors: {"2152942": panva, "c60762c": RafaelGSS, "0ded159": panva, "3f2450f": panva, "c6d52f5": panva, "9067cc4": mcollina, "617e082": HoonDongKang, "e21f812": trivikr, "a72712b": inoway46, "40933d5": mcollina, "b933d20": mcollina, "1ee5d29": Kjubikstronk, "253ebd2": aduh95, "52b68e0": mertcanaltin, "53eeed2": panva, "984aa0c": mcollina, "6ecfd65": panva, "c1e6d0c": panva, "993d004": panva, "2bcc5dd": trivikr}
---

### **FFI now accepts safe integer numbers for 64-bit args** (617e082)
64-bit `int64`/`uint64` arguments can now be passed as safe JavaScript `number`s as well as `bigint`s, with strict range checks for invalid, fractional, or out-of-range values. That removes friction for common inputs like buffer lengths while keeping 64-bit return values as `bigint`.

### **HTTP responses avoid dictionary-mode header/object overhead** (b933d20)
`OutgoingMessage` now uses a fast-mode null-prototype object for stored headers, and pre-seeds the event listener table with common keys to keep `_events` out of dictionary mode. This should reduce per-response allocation and speed up header/event access on a hot path.

### **AsyncLocalStorage legacy implementation was removed** (984aa0c)
Node now always uses `AsyncContextFrame` for `AsyncLocalStorage`, and the `--no-async-context-frame` flag was deleted from docs, config, and option handling. This simplifies the implementation and removes the old async_hooks-backed fallback entirely.

### **Synchronous random fill was inlined for performance** (52b68e0)
`crypto.randomFillSync()` now calls the native binding directly instead of going through a `RandomBytesJob`, shaving overhead from synchronous random byte generation. The binding and tests were updated to cover sync-IO tracing for the fast path.

### **FFI permission wrappers were aligned with handle methods** (2bcc5dd)
`ffi.dlclose()` and `ffi.dlsym()` now defer directly to the handle methods instead of re-checking permissions, matching the documented behavior and existing `handle.close()`/`handle.getSymbol()` semantics. This fixes a mismatch after permissions are dropped.

### **Process-timeout reporting was corrected for exit paths** (e21f812)
The watchdog now distinguishes a process that is still exiting from one that simply failed to respond, improving `--process-timeout` diagnostics for `process.exit()`, uncaught exceptions, and unhandled rejections. Related tests and fixtures were added to cover blocked workers during shutdown.

### **WPT rejection handling was made consistent in workers** (0ded159)
Node’s WPT worker harness now honors `allow_uncaught_exception` and related settings for unhandled promise rejections across both worker backends. This removes a flaky expectation and better matches testharness behavior.

### Other misc changes
- Benchmarked HTTP `setHeader` framing case added (40933d5)
- `tools/test.py` now waits on child processes instead of polling; SIGINT shutdown handling improved (9067cc4)
- `tools/nix` CI/benchmark build config shared; lint cache added (c6d52f5, 253ebd2)
- ESLint/tooling dependency bumps and lockfile refreshes (7ba8a73, 32caf9c, 001d644)
- Misc test maintenance: permission fixture dedupe, WPT status tweaks, Blob endian scoping, ZIP cleanup, flaky SmartOS marker, inspect indentation fix, lint rule tweak (c60762c, 2152942, 3f2450f, 53eeed2, 6ecfd65, 1ee5d29, a72712b, c1e6d0c, 993d004)
