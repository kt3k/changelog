---
date: 2026-09-22
repo: nodejs/node
size: L
title: "SQLite virtual tables land; streams and watch mode sharpen"
excerpt: "A new SQLite virtual table API headlines a day of major stream internals, test runner fixes, watch-mode cleanup, and VFS safety hardening."
commits: 24
authors: [jasnell, nodejs-github-bot, leah-1ee, haramj, mcollina, trivikr, vserpokryl, agape1225, codebytere, sxa, greenheadHQ, panva, marcopiraccini, TrevorBurnham, soulee-dev]
commit_authors: {"2693529": jasnell, "3407386": jasnell, "c0ed28f": mcollina, "dd5cf4c": trivikr, "d72fb59": jasnell, "85bd860": jasnell, "e2acffa": jasnell, "665791f": jasnell, "6fb199a": jasnell, "e898f5c": vserpokryl, "ed9ad59": agape1225, "36dd044": greenheadHQ, "1eacebb": marcopiraccini, "dd9f4da": TrevorBurnham}
---

### **SQLite adds virtual table modules via `createModule()`** (dd9f4da)
Node’s SQLite binding now exposes `database.createModule(name, options)`, wrapping `sqlite3_create_module_v2()` so JavaScript can back read-only virtual tables with custom row generators. The new API supports eponymous tables, `CREATE VIRTUAL TABLE`, hidden parameters, and module options like `directOnly` and `useBigIntArguments`.

### **Stream async-iterator internals get cancellation, protocol, and perf fixes** (6fb199a, e2acffa, 3407386, d72fb59, 85bd860, 2693529, 665791f, c0ed28f)
A substantial stream refactor tightens async-iterator normalization and broadcast/share behavior, including cancellation-aware nested iterators, safer protocol access, and cleanup of factory listeners and waiters. Separately, web streams were optimized to cut per-pipe/tee overhead and avoid extra promise/microtask work in BYOB reads, which should improve hot-path performance.

### **Test runner now reuses only free worker IDs** (e898f5c)
The test runner stops handing out worker IDs round-robin and instead tracks which IDs are currently in use, avoiding collisions with still-running test files. That makes concurrent isolation more accurate and closes a class of flaky scheduling bugs.

### **Watch mode strips `--watch` flags from child `NODE_OPTIONS`** (1eacebb)
Child processes spawned by watch mode no longer inherit watch-related flags from `NODE_OPTIONS`, preventing recursive watch loops. The change also preserves other options more carefully by re-parsing and re-quoting the environment string before relaunch.

### **`util.inspect()` now shows `SuppressedError` details** (ed9ad59)
`inspect()` and `console.log()` now surface the non-enumerable `error` and `suppressed` fields on `SuppressedError`, matching the treatment of `Error.cause` and `AggregateError.errors`. That makes disposal failures much easier to debug.

### **VFS ZIP provider rejects entries under file parents** (dd5cf4c)
The ZIP-backed virtual filesystem now validates parent directories before `open`, `mkdir`, and `rename`, so it rejects paths that try to create children beneath a file. This fixes a correctness hole in both async and sync APIs and prevents malformed archive state.

### **Filesystem streams handle fd 0 correctly** (36dd044)
Closing file streams now works for file descriptor `0`, which previously could be mishandled as a falsy value. That prevents leaks and incorrect stream teardown when stdin-like descriptors are involved.

### **Other misc changes**
- Release-note and API doc updates for the 26.10.0 cutover.
- Typings refinements for internal bindings and `mksnapshot`.
- WPT syncs and test flake suppressions/deflakes.
- Nixpkgs update and benchmark cleanup.
