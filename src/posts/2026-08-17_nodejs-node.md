---
date: 2026-08-17
repo: nodejs/node
size: M
title: "Debugger fix leads a mixed bugfix day"
excerpt: "Key fixes landed for debugger startup, FFI, sqlite, streams, and HTTP agent keylog handling, plus internal cleanup."
commits: 19
authors: [trivikr, leah-1ee, greenheadHQ, ulofiai, Y1D7NG, shani-singh1, jasnell, avivkeller, aduh95, Ayoub-Mabrouk, panva, minirang]
commit_authors: {"8488e13": Y1D7NG, "45d6d31": shani-singh1, "d95dba2": trivikr, "8f6c69f": trivikr, "2004fbd": panva, "977c20e": trivikr, "3abf65f": trivikr}
---

### **Debugger waits for the target before launching** (2004fbd)
The inspector startup path now waits for `NodeRuntime.waitingForDebugger` before releasing launched targets, closing a race where `Runtime.runIfWaitingForDebugger` could arrive too early and leave `--inspect-brk` sessions stuck. The change also hardens the handshake against disconnects and applies the fix across interactive and probe startup.

### **FFI callbacks and wrappers got safer semantics** (8f6c69f, d95dba2)
FFI functions are kept non-constructible across fast API, shared-buffer, and fallback paths, matching the expected native behavior and fixing a reported issue. Separately, callback argument conversion drops a dead null-pointer branch that never triggered with libffi, clarifying that pointer nulls are represented as `0n` instead.

### **sqlite StatementSync now validates integer returns properly** (3abf65f)
`StatementSync.run()` now uses standard integer conversion rules for `changes` and `lastInsertRowid`, throwing `ERR_OUT_OF_RANGE` when the value cannot fit safely in a JS number unless BigInt reads are enabled. This makes large row IDs and change counts behave predictably instead of silently truncating.

### **HTTP agent keylog listeners now attach to all existing sockets** (45d6d31)
Adding a `'keylog'` listener no longer trips over the agent's internal socket maps: the code now walks both active and free socket buckets instead of treating each bucket array like a socket. That fixes a throw when enabling keylog after sockets already exist and ensures all current sockets start receiving events.

### **Stream iterators stop leaking consumers on pre-aborted signals** (977c20e)
`broadcast.push()` and `share.pull()` now validate and short-circuit pre-aborted `AbortSignal`s before registering consumers, preventing unreachable cursors from inflating `consumerCount` and creating permanent backpressure. This is a meaningful correctness and resource-leak fix for streaming pipelines.

### **FileHandle streams clean up close listeners on reuse** (8488e13)
The file-handle stream plumbing now unregisters its `'close'` listener when `autoClose: false` streams finish, error, or end. That prevents listener leaks when the same `FileHandle` is reused for multiple read or write streams.

### **More notable fixes and internal refactors**
- `fs` stream close-listener leak fix for `FileHandle` streams
- `http` agent keylog bug fix for existing sockets
- `repl` benchmarks added
- `stream` validation fixes for zlib/iter params and BYOB reader options
- `typings` added for `signal_wrap`, `diagnostics_channel`, and `watchdog` internal bindings
- `build` small-icu codegen now receives the target architecture
- `util` primordials cleanup in comparisons helpers
- `doc` typo/lint-command cleanup
- `test` updates for stale-close exit code and multiple new regression cases
