---
date: 2026-09-09
repo: nodejs/node
size: L
title: "HTTP/2 flow control and VFS fixes"
excerpt: "Notable HTTP/2 API expansion plus security-oriented VFS, sqlite, crypto, and inspector-related fixes."
commits: 18
authors: [aduh95, panva, trivikr, HoonDongKang, christopher-buss, HBSPS, pimterry, richardlau]
commit_authors: {"01efbc6": HoonDongKang, "e026733": panva, "fb4f759": christopher-buss, "7ac314f": aduh95, "fd6682c": panva, "ee51d13": panva, "b3fb344": HBSPS, "a284965": aduh95, "8b52f14": aduh95, "875d905": aduh95, "b12688c": pimterry, "8c9d141": panva, "1dd48de": trivikr, "cb9b870": richardlau, "dfcfe25": trivikr, "36f16e7": trivikr, "f9072f3": trivikr, "dab3a73": aduh95}
---

### **HTTP/2 gains a new `connectionWindowSize` option** (b12688c)
The `http2` APIs now let callers set the session-level flow-control window separately from per-stream `initialWindowSize`. The docs and implementation were updated to explain the semantics, including how decreases apply and the default 32 MiB connection window for clients and servers.

### **Crypto key preparation is now optimized and benchmarked** (e026733)
`prepareAsymmetricKey()` was refactored for faster key preparation across the supported input shapes, with new benchmark coverage and regression tests. This should improve asymmetric key handling in hot paths while guarding against functional regressions.

### **Growable SharedArrayBuffer validation no longer trusts JS properties** (fd6682c)
WebIDL buffer-source checks now use an intrinsic getter instead of reading `buffer.growable`, so shadowed or overridden properties can’t bypass validation. The change closes a correctness/safety gap for shared buffer growability detection and adds tests covering tampered prototypes and accessors.

### **SQLite changeset application now copies inputs unconditionally** (f9072f3)
`database.applyChangeset()` now always copies the changeset before applying it, because SQLite can run JavaScript indirectly through user-defined SQL functions during apply. That prevents the input buffer from being detached or mutated while SQLite is still reading it.

### **VFS `fs.promises.open()` now returns a real `FileHandle`** (dfcfe25)
Mounted virtual file descriptors are wrapped in the public `FileHandle` interface instead of returning the raw provider handle. That makes VFS-backed `fsp.open()` behave more like normal `fs.promises.open()`, including exposing the expected methods and `fd` shape.

### **`fs.statfs*()` now reports ENOENT for missing VFS paths** (1dd48de)
The VFS layer now validates paths before synthesizing `statfs` data, so missing mounted paths correctly fail with `ENOENT` for sync, promise, and callback forms. The callback path also forwards validation errors asynchronously instead of throwing synchronously.

### **Inspector/V8 interrupt handling was reverted** (a284965, 8b52f14, 875d905)
A three-commit revert backed out recent inspector and V8 interrupt changes, including the JS-in-interrupt gating and related V8 backport. This is a significant rollback that likely restores prior behavior after the earlier changes proved problematic.

### Other misc changes
- Commit-message lint workflow hardened for forks and PR-target execution (ee51d13)
- `path.posix` internal string-char optimizations (b3fb344)
- Docs updates for `child_process.fork()`, `fs` ordering, and changelog/version metadata (fb4f759, 36f16e7, 7ac314f, dab3a73)
- CI/build/version sync and workflow maintenance, including Rust toolchain warnings and author-ready conflict handling (cb9b870, 8c9d141)
- `cli_table` iteration safety fix to avoid user-mutable iterators (01efbc6)
