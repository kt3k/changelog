---
date: 2026-06-16
repo: nodejs/node
size: L
title: "Node gets deferred imports, FFI fast path, and fixes"
excerpt: "Major ESM deferred-import support lands alongside experimental fast FFI calls and several correctness fixes in sqlite, streams, crypto, and util."
commits: 11
authors: [nodejs-github-bot, watilde, MayaLekova, anonrig, panva, aduh95, ShogunPanda]
commit_authors: {"b09155d": MayaLekova, "cf89b61": anonrig, "dbaf45c": panva, "65ffd02": aduh95, "3e55527": ShogunPanda, "6e8c171": watilde, "5ee27e3": watilde}
---

### **Deferred static module imports now use V8 support** (b09155d)
Node now enables deferred import evaluation for statically imported modules by wiring the new phase through the ESM module job and native module wrapper logic. This unlocks the proposal’s basic syntax in Node and comes with new smoke/regression coverage for modules with their own imports.

### **Experimental fast FFI call API for AArch64 and x86_64** (3e55527)
Node adds an experimental fast-path FFI calling mechanism on AArch64 and x86_64, including a capability probe for executable JIT memory and new benchmark coverage across common argument/return types. This is a substantial performance-oriented API addition for `--experimental-ffi` users.

### **SQLite no longer stays open after a failed `open()`** (cf89b61)
A failed `sqlite3_open_v2()` could leave Node holding SQLite’s “sick” handle, making `isOpen` lie and allowing later calls to misuse the connection. The fix closes and clears the handle on failure, restoring correct state and preventing leaks/misbehavior.

### **WebCrypto raw-format aliases are now directional** (dbaf45c)
The raw key format aliasing logic now distinguishes between public and secret-key paths instead of accepting every raw alias everywhere. That tightens validation for WebCrypto imports and prevents unsupported values from slipping through.

### **Streams/Web Streams now pass the expected callback arity** (65ffd02)
Internal promise-callback wrappers were specialized so read, write, pull, and transform hooks receive exactly the arguments they are supposed to. Besides fixing observable callback behavior, this also avoids per-call argument-array allocation on hot paths.

### **Utf8Stream no longer drops the first buffer in buffer mode** (6e8c171)
A bug in the buffered write path could discard the first chunk of each batch, corrupting output and eventually crashing in merge logic. The fix preserves the initial buffer and adds a regression test covering both single-buffer and batch-boundary cases.

### **Scientific notation formatting in `util.inspect` is fixed** (5ee27e3)
`util.inspect` now formats scientific notation correctly again. This is a focused correctness fix with a small regression test.

### Other misc changes
- `deps: update undici to 8.5.0` (1 commit)
- WPT fixture updates for URL, URLPattern, and WebCrypto (3 commits)
- ESLint/tooling config updates for deferred import syntax support (1 commit)
