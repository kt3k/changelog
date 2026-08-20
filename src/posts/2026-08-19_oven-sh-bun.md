---
date: 2026-08-19
repo: oven-sh/bun
size: L
title: "Valkey fixes lead a broad perf-and-stability day"
excerpt: "Redis/Valkey correctness, socket shutdown, fetch memory/keepalive, and Windows startup/perf work landed alongside buffer speedups."
commits: 28
authors: [robobun, alii, Jarred-Sumner, dylan-conway, cirospaciari]
commit_authors: {"4199361": Jarred-Sumner, "cfa9f8e": robobun, "6ee3009": Jarred-Sumner, "0a4e3b1": robobun, "a356964": robobun, "24c0063": alii, "8226b3d": robobun, "88165c6": Jarred-Sumner, "118154c": alii, "6dfa8f4": dylan-conway, "7da5a09": robobun, "1f4eaa0": robobun, "6c076d4": robobun, "32e8703": robobun, "547bc99": robobun, "e19faeb": robobun, "e5b534d": robobun, "c7eb848": Jarred-Sumner, "152c561": alii, "72e3725": robobun, "e878e03": dylan-conway, "c4618cd": robobun, "a8861fc": cirospaciari, "35f4662": dylan-conway, "b9f5090": robobun, "8df7fe0": alii, "681a49b": alii}
---

### **Valkey reply decoding gets more precise** (24c0063, cfa9f8e)
Bun’s Redis/Valkey client now distinguishes server error replies from malformed responses, adds support for null arrays, big numbers, and other RESP3 conversions, and updates the public docs/types accordingly. That makes error handling and reply mapping much closer to Redis semantics and removes ambiguity for callers.

### **fetch no longer buffers unread bodies without bound** (7da5a09)
Unread `fetch()` response bodies are now parked instead of being greedily read into memory, fixing a serious RSS blow-up on long-lived or endless streams. The patch also tightens native piping cleanup, which matters for proxy-style responses and stream cancellation correctness.

### **Buffer swap and multi-byte search performance rebound** (88165c6)
`Buffer.swap16/32/64` and multi-byte `indexOf`/`lastIndexOf`/`includes` got their canary regressions reversed with runtime-dispatched Highway kernels. This restores x64 throughput and keeps the fast paths available across SIMD targets instead of relying on baseline compiler vectorization.

### **TLS terminate() now sends a bare reset** (4199361)
TLS socket termination stops emitting `close_notify` and instead behaves like a direct reset, aligning Bun with the intended hard-close semantics. This fixes macOS timeout cases and makes peer-reset behavior more consistent with the non-TLS path.

### **HTTP keepalive moves to connection open, not every request** (72e3725)
TCP keepalive is now enabled once per socket connection, instead of being re-applied on each request. That avoids redundant socket option churn and keeps pooled-connection behavior aligned with the actual lifecycle of the fd.

### **Windows startup sheds more DLL work** (e878e03)
Windows builds now delay-load several noncritical system DLLs and parse argv without shell32, trimming startup overhead and reducing the number of modules loaded before `main`. The change also improves command-line handling for non-ASCII arguments.

### **Linux memory-pressure trigger gets fixed** (0a4e3b1)
The PSI trigger used to arm `memoryPressure` on Linux is now NUL-terminated correctly. This is a small but important runtime fix for the watcher path on Linux.

### Other misc changes
- Feature flag env var plumbing restored for experimental bake/libdeflate toggles (6ee3009)
- Linux and kqueue socket reset/close edge-case fixes (a356964, 6c076d4, 547bc99, b9f5090)
- Valkey connection lifecycle and subscription cleanup fixes (152c561, 8df7fe0, 681a49b, e5b534d, e19faeb)
- CSS clamp() minifier bug fix (8226b3d)
- libjpeg-turbo x64 SIMD and build wiring updates (118154c)
- Windows orderfile and startup tracing work (1f4eaa0)
- DNS callback argument validation fix (c4618cd)
- Argon2 low-memory hash verification fix (a8861fc)
- GC scheduling tweak at entrypoint wait (35f4662)
- Dependency/build/CI/tooling updates and test-only changes (6dfa8f4, c7eb848, 32e8703, others)
