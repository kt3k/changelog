---
date: 2026-07-23
repo: oven-sh/bun
size: L
title: "Bun lands major fixes across HTTP, crash handling"
excerpt: "Big day: Bun fixed several correctness, crash-reporting, and compatibility bugs, plus a bundler performance win."
commits: 32
authors: [robobun, cirospaciari, Jarred-Sumner]
commit_authors: {"1812844": robobun, "43372bd": robobun, "b39a270": robobun, "c08d509": robobun, "773be9d": robobun, "53eaebf": robobun, "79ee451": robobun, "0870c7c": robobun, "9e799f5": robobun, "a22f771": robobun, "892b1da": robobun, "f4d3cb3": robobun, "4e5e9cd": cirospaciari, "2a9dc0a": robobun, "ca68362": robobun, "5ed042b": robobun, "6bcc388": robobun, "3da0cc4": robobun, "b5d5017": robobun, "3a3f5d1": robobun, "a1e6a45": robobun, "750a510": robobun, "83436fe": robobun, "44aeb62": robobun, "fd98aaf": robobun}
---

### **Bun.Glob keeps `**` intact under negation** (43372bd)
Leading `!` no longer downgrades an initial globstar to a single-segment wildcard before applying negation. That restores expected complement behavior for patterns like `!**/a` and `!!**/a`.

### **child_process no longer leaks abort listeners on spawn failure** (b39a270)
`spawn()` / `execFile()` now clean up the `options.signal` abort listener even when process creation fails before `'exit'` can fire. This prevents listener and `ChildProcess` retention on long-lived shared signals.

### **HTTP/3 stops one dead peer from stalling the shared fetch engine** (c08d509)
The QUIC/UDP path now avoids letting stale ICMP error state from one peer poison unrelated sends on Bun's shared HTTP/3 client socket. That addresses flaky `http/3` test stalls and a real-world head-of-line blocking bug.

### **FileSink now rejects a pending write when deferred flush hits EPIPE** (773be9d)
If a backpressured `FileSink.write()` later flushes into a broken pipe, the pending promise now fails instead of resolving as if the buffered bytes were written. This fixes a correctness hole for consumers that rely on write completion to detect broken destinations.

### **Windows `Bun.write()` now rejects missing sources instead of segfaulting** (53eaebf)
The Windows blob copy/write path now handles nonexistent source files and missing destination parents as ordinary errors. That turns a crash into the expected `ENOENT`-style rejection.

### **Windows crash handler now lets foreign first-chance AVs reach SEH** (79ee451)
Bun now backs off from treating every first-chance access violation as fatal on Windows, and registers unwind-aware crash reporting for the JIT pool. This avoids killing the process for AV/EDR/VM hooks and similar code that intends to recover.

### **bundler code-splitting reachability is now BFS instead of quadratic DFS** (0870c7c)
The code-splitting walk was rewritten to use a queue and short-circuit already-marked files, cutting worst-case work on shared-importer DAGs from quadratic behavior toward O(V+E). This should noticeably improve large bundle builds on diamond-shaped graphs.

### **Windows crash handling now captures the real fault context** (892b1da)
The Windows segfault path now unwinds from the exception `CONTEXT` instead of reconstructing a stack from inside the handler. That makes crash stacks more accurate when `RtlCaptureStackBackTrace` can't unwind through the dispatcher.

### **Postgres framing now respects message boundaries** (6bcc388)
Postgres decoders now read within the declared message length instead of scanning past the end of a frame. This fixes malformed/unterminated-field cases and prevents one message from bleeding into the next.

### **Bun.serve now drains tryEnd tails before closing on peer FIN** (1812844)
The HTTP server now keeps half-open connections alive long enough to finish writing buffered response tails, rather than truncating them when a client half-closes. That fixes response truncation for raw-socket clients and related FIN-on-write edge cases.

### **SQL Postgres, crash reporting, and FS/stream fixes round out the day** (2a9dc0a, 4e5e9cd, 750a510, 83436fe, 44aeb62, ca68362, f4d3cb3, a1e6a45, 3a3f5d1, 9e799f5, a22f771, 5ed042b, 3da0cc4, b5d5017, fd98aaf)
These commits add compatibility fixes and test coverage across TLS/net, spawn/watch, file streams, crypto hashing, WebSocket proxy validation, and more. Several also reduce flaky or slow tests and tighten platform-specific errno/exit behavior.

### Other misc changes
- Dependency bumps / vendored updates / build-script tweaks
- Dead-code removals in semver and hash crates
- Test-only cleanup and speedups across HTTP, install, and Node compatibility suites
