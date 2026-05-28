---
date: 2026-04-04
repo: oven-sh/bun
size: L
title: "Build system hardens and gains PGO support"
excerpt: "Windows rebuilds, shared caches, WebKit CPU flags, and IR PGO landed alongside several security/stability fixes."
commits: 15
authors: [dylan-conway, sosukesuzuki, Jarred-Sumner, robobun]
commit_authors: {"58ebb16": dylan-conway, "d8ebb9b": dylan-conway, "d27d84f": dylan-conway, "8effa8c": dylan-conway, "871f660": dylan-conway, "c721d35": dylan-conway, "0d09afe": dylan-conway, "485ec52": dylan-conway, "376a036": dylan-conway, "edc40e9": dylan-conway, "de10885": dylan-conway, "686eda3": dylan-conway, "0ebe66d": sosukesuzuki, "d2e6753": Jarred-Sumner, "9850dd5": robobun}
---

### **Windows build stops endlessly recompiling** (58ebb16)
Fixes a path-suffix mismatch in the DirectBuild codegen host tool on Windows, where Ninja expected `codegen-tool` but clang emitted `codegen-tool.exe`. That missing output was causing a permanent rebuild cascade through TinyCC and all C++ objects.

### **Bun now supports IR PGO build modes** (0ebe66d)
Adds `--pgo-generate=<dir>` and `--pgo-use=<file.profdata>` to the build system, with validation that they’re mutually exclusive. The flags are threaded into compilation and WebKit local builds, enabling instrumented/profile-guided optimized builds.

### **Local builds share caches across checkouts** (0d09afe)
Changes the default local `cacheDir` from per-build to a machine-shared cache under `~/.bun/build-cache` (or `BUN_INSTALL/build-cache`). This means ccache, Zig artifacts, tarballs, and prebuilt WebKit can be reused across worktrees instead of being rebuilt each time.

### **Local WebKit builds inherit the CPU target** (8effa8c)
Separates CPU-target flags from other global compiler flags so local WebKit builds still get `-march`/`-mcpu` even though WebKit manages its own optimization and sanitizer flags. This avoids accidentally compiling JSC for a generic CPU while the rest of Bun targets a newer microarchitecture.

### **Zig checks are now first-class Ninja targets** (686eda3)
Integrates `zig build check[-*]` into the main build graph so the check targets depend on codegen outputs automatically. This removes a stale-codegen footgun and makes the checks chainable via stamp files.

### **UDP sockets now surface ICMP errors and truncation** (9850dd5)
On Linux, UDP sockets now enable `IP_RECVERR`/`IPV6_RECVERR` so ICMP failures like port-unreachable can be delivered back to the socket instead of being silently dropped. The API also exposes `MSG_TRUNC`-style receive metadata to let callers detect datagram truncation.

### **FormData boundary parsing no longer crashes on malformed quotes** (376a036)
Fixes a panic in multipart boundary parsing when the boundary value starts with a quote but never closes cleanly, including cases like `boundary="`. Malformed inputs now reject cleanly instead of crashing the runtime.

### **Tar extraction skips absolute Windows paths** (edc40e9)
Prevents archive extraction from honoring absolute Windows paths after normalization, which could otherwise escape the target directory. The new test covers drive-letter paths and verifies they’re skipped during extraction.

### **DNS lookup avoids a fixed stack buffer overflow risk** (de10885)
Replaces the fixed 1024-byte stack buffer used for hostname lookup with a stack-fallback allocator that spills to the heap for longer names. This removes a crash/truncation risk for long hostnames.

### Other misc changes
- Removed 29 dead/unreferenced files and patch leftovers (c721d35)
- Spurious build/test flake fixes and minor build-script cleanup (d2e6753, 485ec52, 871f660, d8ebb9b, d27d84f, 58ebb16, 0d09afe, 0ebe66d, 8effa8c)
- Build-system docs/comments updated to match the new cache and dependency behavior (multiple commits)
