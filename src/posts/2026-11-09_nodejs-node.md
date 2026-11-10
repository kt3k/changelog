---
date: 2026-11-09
repo: nodejs/node
size: L
title: "SEA code cache and TLS hardening land"
excerpt: "Major SEA VFS code-cache support, TLS hostname validation hardening, crypto fixes, and a few targeted runtime/refactor updates."
commits: 11
authors: [mcollina, inoway46, nodejs-github-bot, watilde, boorad, trivikr, aduh95]
commit_authors: {"eb3ae47": inoway46, "f39899d": boorad, "75d55af": trivikr, "9aa379e": mcollina, "f344e7f": mcollina, "7ae68bd": mcollina, "5d59de8": mcollina}
---

### **SEA now caches every VFS module at build time** (5d59de8)
`--build-sea` can now generate code cache for all JavaScript and type-stripped TypeScript modules in a VFS mount, not just the main script. That makes single-executable apps with `useVfs` and `useCodeCache` practical, while keeping the cache path-keyed and source-validated so stale cache is ignored.

### **TLS rejects hostnames with forbidden code points** (9aa379e)
`checkServerIdentity()` now fails closed when the requested hostname contains characters the WHATWG host parser would normalize or truncate, preventing certificate checks against a host the app never actually asked for. This closes off subtle mismatches around `/`, `?`, `#`, `%`, backslashes, spaces, and other forbidden host code points.

### **Crypto provider behavior is fixed for prime checks and PEM export** (f39899d)
OpenSSL provider-backed prime checks now honor the requested repetition count more accurately and handle cancellation even when `BN_check_prime()` returns without invoking callbacks. The same change also fixes empty-passphrase encrypted SEC1/PKCS#1 PEM output in provider mode.

### **Bundled Temporal cross-builds get separate Rust host/target handling** (eb3ae47)
Configure now detects Rust host/target triples for cross builds and wires them into separate Cargo targets so bundled Temporal can build correctly for host and target artifacts. If the triples can’t be determined, Temporal is disabled with a warning unless it was explicitly requested.

### **Worker startup snapshots now preload stream internals** (f344e7f)
Worker snapshot construction now includes `stream`, letting stdio-related worker code restore initialized stream constructors instead of redoing that setup on every startup. The accompanying stream refactors make the initialized state snapshot-safe and preserve worker isolation.

### **WebStreams wrappers are trimmed for sink/transform callbacks** (7ae68bd)
Underlying sink and transformer lifecycle methods are now stored and invoked more directly instead of being wrapped in per-instance async closures. This reduces lifetime overhead and updates the test coverage around underlying-method invocation semantics.

### **FFI fast trampolines now refuse unsafe multi-arg buffer shapes** (75d55af)
The arm64 and x64 FFI trampoline emitters now reject buffer-typed fast trampolines with more than one argument, avoiding a register-clobbering miscompile path. Future callers will fall back instead of silently passing corrupted arguments.

### Other misc changes
- Nix pin updates and shell workflow tweaks (2 commits)
- Test/docs fixes and flake cleanup
- Mock timers scheduler test deflake
