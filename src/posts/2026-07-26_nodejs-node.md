---
date: 2026-07-26
repo: nodejs/node
size: L
title: "Node tightens DNS, REPL, sqlite and streams"
excerpt: "Security and correctness fixes land across DNS reverse lookups, sqlite session lifetimes, REPL highlighting, and web streams."
commits: 9
authors: [avivkeller, 3zrv, Archkon, remcohaszing, arcanis, iliaal]
commit_authors: {"54a5095": Archkon, "4a5eb1c": avivkeller, "1ba3ce4": avivkeller, "893602c": avivkeller, "4314d13": 3zrv, "d4d35c6": 3zrv, "2c4ea73": remcohaszing, "c8da4ec": arcanis, "eb7ee32": iliaal}
---

### **DNS reverse lookups now ignore hosts files** (54a5095)
`dns.reverse()` is now forced to use DNS/PTR lookups only, matching the documented behavior of other `dns.resolve*()` APIs and avoiding `/etc/hosts` bleed-through via c-ares lookup order. This closes a surprising inconsistency for reverse lookups and adds a focused regression test.

### **REPL gains basic syntax highlighting** (4a5eb1c)
Node’s REPL now colorizes user input with a new tokenizer-based highlighter, wired through readline’s refresh path so multiline prompts and cursor movement stay visually correct. This is a user-facing polish change that makes interactive REPL use noticeably nicer without changing REPL semantics.

### **Buffer copyArrayBuffer gets a bounds check fix** (eb7ee32)
`process.binding('buffer').copyArrayBuffer()` now asserts offsets are within the buffer before subtracting, preventing unsigned wraparound from turning an out-of-bounds offset into a huge length. The fix addresses a real memory-safety bug in an internal binding.

### **sqlite sessions now keep their database alive** (d4d35c6)
`DatabaseSync.createSession()` now holds a strong reference to the database so a session can’t outlive freed database memory. That prevents a crash when the database handle is dropped first, and the new test covers the GC/lifetime behavior.

### **Module hooks support `Symbol.dispose`** (2c4ea73)
`registerHooks()` return values now implement `Symbol.dispose` as an alias for `deregister()`, which means they work with the `using` keyword and explicit resource management. This is a small but useful public API addition for cleaner hook lifecycle handling.

### **Web Streams adapters stop throwing after teardown** (4314d13)
The writable-side adapter now guards calls to `controller.error()` after the controller may already be gone, fixing an uncatchable error when closing half-open `Duplex.toWeb()` writables. This makes stream teardown behavior more robust in edge cases.

### **Loader package-map lookup normalizes paths first** (c8da4ec)
Package-map path resolution now normalizes incoming paths before cache lookup, which fixes resolution when `createRequire()` paths use mixed separators. This is a correctness fix for package-map users, especially on cross-platform path inputs.

### Other misc changes
- Test runner V8 deserializer unsigned-length handling fix + regression test (1ba3ce4)
- Mark `test-repl-user-error-handler` as flaky (893602c)
- Misc REPL test adjustments and internal cleanup around highlighting and multiline rendering (4a5eb1c)
