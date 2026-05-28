---
date: 2026-04-15
repo: oven-sh/bun
size: L
title: "Big crypto, test, and safety push"
excerpt: "Bun adds SHA3 and changed-only tests, plus fixes several crash/UAF edge cases in HTTP, fetch, NAPI, Windows, and ELF compile output."
commits: 16
authors: [Jarred-Sumner, dylan-conway, robobun]
commit_authors: {"5431749": robobun, "8143276": dylan-conway, "942c656": Jarred-Sumner, "443ba81": dylan-conway, "96f1e21": Jarred-Sumner, "b927e35": robobun, "600448f": Jarred-Sumner, "ad74aa0": Jarred-Sumner, "a6d29d5": dylan-conway, "48b7a8b": dylan-conway, "4d3fb02": dylan-conway, "9e5cb3d": dylan-conway}
---

### **Bun test can now run only changed tests** (5431749)
Adds a vitest-compatible `bun test --changed[=<since>]` mode that filters test files by whether their module graph touches git-changed files. It also supports watch mode by persisting changed paths across restarts, which makes iterative test runs much more targeted.

### **WebCrypto and node:crypto gain SHA3 support** (96f1e21)
Updates BoringSSL and wires SHA3-224/256/384/512 into `crypto.subtle` and `node:crypto`, including HMAC and serialization plumbing. This is a real API expansion for users hashing or signing with modern SHA-3 algorithms.

### **Fix a custom-SSL-context UAF during eviction** (443ba81)
Custom SSL contexts are now ref-counted so cache eviction skips contexts still attached to in-flight sockets. That closes a use-after-free path in HTTP teardown and makes eviction safe under active requests.

### **Prevent fetch abort from cancelling twice** (600448f)
`ResumableSink.cancel()` now returns early once a stream is already done, so abort-driven fetches can’t fire end-of-stream twice. This fixes a pair of long-standing fetch abort bugs and hardens request-body cancellation paths.

### **NAPI finalizers now run in LIFO order** (48b7a8b)
`napi_wrap` cleanup switches from hash-set iteration to an insertion-ordered structure and drains finalizers in reverse order during env teardown. That matches Node.js behavior and avoids child objects being destroyed after their parents.

### **bun build --compile skips PT_INTERP rewriting on Nix/Guix hosts** (b927e35)
The ELF interpreter rewrite now detects Nix/Guix-style hosts and leaves store-path interpreters alone instead of normalizing them to the generic FHS loader. This fixes the regression where compiled binaries failed to start on NixOS.

### **Windows readFile no longer panics on >2GB sync I/O** (8143276)
Sync libuv reads/writes now use the full `ssize_t` result instead of the truncated `int` return path, so large file operations don’t wrap negative and panic. That removes a hard limit-triggered crash in Windows file I/O.

### **Path resolution fixes a Windows UNC crash** (9e5cb3d)
`path.win32.resolve()` now handles a UNC path followed by a drive-relative path without corrupting its internal state. This eliminates an unreachable-code panic in a common Windows path edge case.

### **HTTP abort signals no longer leak on WebSocket upgrade catch-all** (ad74aa0)
The fallback WebSocket upgrade path now ref-counts its `AbortSignal`, matching the normal request path. That prevents leaked activity refs and GC-related cleanup issues for `Bun.serve()` setups without explicit routes.

### **WTFTimer stops panicking in JSC GC scheduling** (a6d29d5)
A small timer fix removes a Windows panic triggered by the GC scheduler passing an out-of-bounds floating-point value into the timer code. It’s a targeted stability fix for allocator-driven GC activity.

### **Yaml parser stops tripping an assertion on nested flow-map errors** (4d3fb02)
Parser stack management is tightened so syntax errors inside flow mappings unwind cleanly when they occur within block mappings. This fixes an internal assertion failure on malformed YAML instead of crashing.

### **Mimalloc is restored and re-tuned after the rollback** (942c656)
The allocator pin is re-un-reverted, restoring the newer mimalloc upgrade along with its associated bindings, baseline allowlist, and tests. This also reapplies the ARM arch guard and preserves the Darwin NAPI-addon workaround.

### Other misc changes
- Revert/restore churn around mimalloc and TLS slot handling (2 commits)
- WebCore binding sync and refactors without a user-facing API change (1 commit)
- HTTP/SSL allocation and lifecycle plumbing adjustments beyond the UAF fix (1 commit)
- Test-only additions for the above fixes and features
