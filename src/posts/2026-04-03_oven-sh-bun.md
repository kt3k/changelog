---
date: 2026-04-03
repo: oven-sh/bun
size: L
title: "Cron callbacks, socket fixes, and Linux stats"
excerpt: "Bun adds in-process cron jobs, fixes Unix socket cleanup/semantics, and widens Linux statx fallbacks for seccomp and other edge cases."
commits: 8
authors: [Jarred-Sumner, robobun, alii, ant-kurt]
commit_authors: {"9053830": robobun, "159a285": Jarred-Sumner, "ea83a74": Jarred-Sumner, "3f41407": Jarred-Sumner, "2f6f266": Jarred-Sumner, "cf11b7d": alii, "85f073f": Jarred-Sumner, "a440dff": ant-kurt}
---

### **In-process `Bun.cron` lands with new scheduling API** (cf11b7d)
Bun now supports `Bun.cron(schedule, handler)` for running callbacks inside the current process, alongside the existing OS-level cron job registration and cron parsing APIs. The new handle supports stop/unref-style lifecycle control, and the docs clarify UTC vs local-time behavior across the two cron modes.

### **Linux `statx` fallback now matches libuv’s edge cases** (9053830)
`fs.stat`/`lstat`/`fstat` on Linux now fall back not just for `ENOSYS` and `EOPNOTSUPP`, but also for `EPERM`, `EINVAL`, and positive non-zero `statx` return codes. This fixes seccomp-filtered environments and other platforms where `statx` is unavailable in practice but didn’t previously trigger Bun’s fallback path.

### **Unix socket lifecycle now matches Node/libuv** (3f41407)
Bun no longer silently unlinks an existing Unix socket path before binding, which means it won’t steal a live socket from another process. It also now removes the socket file on close/finalize, fixing stale `.sock` file leaks and bringing behavior in line with Node.js expectations.

### **MacOS long Unix socket paths get a new workaround** (159a285)
`bun-usockets` now handles macOS Unix socket paths that exceed `sun_path` by opening the parent directory and using `__pthread_fchdir()` to bind/connect via a relative basename. This mirrors Bun’s Linux path workaround and extends Unix socket support to longer paths on Apple platforms.

### **Event loop drains saturated ready-poll batches** (ea83a74)
When epoll/kqueue fills the full ready-polls buffer, Bun now re-polls and dispatches additional events before running callbacks, up to a capped drain loop. This reduces latency and prevents large bursts of ready FDs from being processed one 1024-event slice at a time.

### **Other misc changes**
- FreeBSD Linuxulator `/dev/fd` fallback for `getFdPath` and realpath regression coverage (a440dff)
- Cgroup-aware `availableParallelism` / `hardwareConcurrency` work on Linux (85f073f)
- WebView test flake cleanup and `using`-style resource cleanup updates (2f6f266)
