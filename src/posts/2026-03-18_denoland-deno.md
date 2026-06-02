---
date: 2026-03-18
repo: denoland/deno
size: L
title: "Deno sharpens Node parity and runtime behavior"
excerpt: "Signal handling, Node compat fixes, V8 task ownership, and a macOS TTY fallback headline a busy day."
commits: 19
authors: [bartlomieju, nathanwhit, kajukitli, dsherret, denobot]
commit_authors: {"1012804": bartlomieju, "a087e7c": bartlomieju, "e03b790": nathanwhit, "852d499": bartlomieju, "d63ae19": bartlomieju, "cdeec3c": bartlomieju, "f5d0971": bartlomieju, "0896ac3": kajukitli, "76c3d7e": dsherret, "3449a2d": bartlomieju, "ffbaf13": denobot, "0fede96": bartlomieju, "328c8d3": bartlomieju, "7d810ee": bartlomieju, "2b62955": bartlomieju, "97a701c": bartlomieju, "cca89e6": bartlomieju, "6f4d5e9": bartlomieju}
---

### **Graceful shutdown now dispatches SIGTERM during watch restarts and Ctrl+C** (a087e7c)
Watch mode now synthetically raises SIGINT/SIGTERM to registered JS handlers before cancelling or restarting, giving apps up to 5 seconds to clean up gracefully. The new `deno_signals::raise()` API makes that work cross-platform, including on Windows.

### **Node crypto GCM tag checks are now constant-time** (852d499)
AES-GCM authentication tag verification now uses constant-time comparison instead of `==`, closing a timing side channel in both AES-128-GCM and AES-256-GCM decrypt paths. This aligns Deno’s Node compatibility layer with OpenSSL/Node behavior for AEAD verification.

### **Node `process` behavior gets a round of compatibility fixes** (1012804, cdeec3c, f5d0971, 6f4d5e9, 0fede96, 2b62955, cca89e6)
Multiple process and worker APIs were tightened to match Node more closely: `process.exitCode` validation, `process.title` and `--title` support, worker-thread-only stubs for unsupported process methods, and better worker path validation. The day also adds `util.MIMEType`, `util.MIMEParams`, `util.convertProcessSignalToExitCode()`, `ChildProcess[Symbol.dispose]()`, and fixes around TTY/stdin interaction and `process.features`.

### **macOS TTYs now fall back to select() when kqueue can't handle them** (e03b790)
Deno now mirrors libuv’s fallback path for kqueue-incompatible devices on macOS, including `/dev/tty`, by switching to a background select-based reactor. This fixes a real initialization failure and makes TTY I/O work on devices that previously returned `EINVAL`.

### **V8 runtime integration moves to foreground task ownership** (7d810ee)
Deno upgrades to `v8` 146.8.0 and adapts its runtime to the newer task ownership model, where tasks are queued per-isolate and drained directly on the event loop. That removes the old `PumpMessageLoop` dependency and is a significant internal runtime refactor.

### **URLPattern matching gets a lower-overhead op path** (328c8d3)
The URLPattern implementation now sends concatenated match input plus offsets through a shared buffer instead of returning heavier serde payloads. This reduces serialization overhead and GC pressure in a hot web API path.

### **WebIDL dictionary conversion hot paths are optimized** (3449a2d)
Dictionary converters now avoid repeated allocations by precomputing context strings, copying only needed defaults, and removing per-call default option objects. This is a performance-focused cleanup in a frequently exercised conversion layer.

### **Other misc changes**
- Node UDP IPv6 multicast now resolves interface options correctly (`0896ac3`)
- `path.win32.join()` no longer normalizes through reserved device names (`d63ae19`)
- Fixes for Node compat test regressions in `events`, `worker_threads`, `net`, `util`, and related polyfills (`0fede96`)
- Re-enabled compile determinism test (`76c3d7e`)
- CI cache version bump and release version update to 2.7.6 (`ffbaf13`)
- Test harness tweak to stop Claude from running the full spec suite (`97a701c`)
