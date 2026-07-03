---
date: 2026-07-02
repo: denoland/deno
size: L
title: "Deno desktop, parser, and runtime fixes land"
excerpt: "Major CLI parser work ships alongside desktop API expansion and multiple crash/freeze fixes in core, compile, and N-API."
commits: 9
authors: [bartlomieju, littledivy, minato32, crowlKats]
commit_authors: {"3551015": crowlKats, "4e8b2f4": bartlomieju, "8d719ba": bartlomieju, "101ef28": littledivy, "5766ec5": minato32, "4b53ac1": bartlomieju, "3fa6cfa": littledivy, "2c4414a": minato32, "3cfcdcc": littledivy}
---

### **CLI parser split adds defs, conversion, help, and completions** (4e8b2f4)
This continues the clap replacement by moving the remaining command definition, flag conversion, help rendering, and shell completion generation into `deno_cli_parser`. It’s a major internal refactor that centralizes CLI behavior in static tables and sets up the rest of the parser migration.

### **Desktop apps now support opacity and transparent windows** (3551015)
The desktop API gains creation-time transparency plus runtime window opacity controls, with matching TypeScript types and runtime ops. This is a user-facing capability expansion for Deno desktop apps, enabling fades and true transparent backgrounds on supported platforms.

### **Desktop packaging now boots by renamed executable, not launcher scripts** (101ef28)
`deno desktop` now renames the backend to `<app>.exe`/`<app>` so it self-loads the colocated runtime instead of relying on a `.bat` or shell wrapper. That simplifies packaging and fixes startup issues in install paths with spaces, including the default Windows `Program Files` location.

### **N-API adds `uv_cond_*` polyfills for native addons** (5766ec5)
Native addons that use libuv condition variables can now run without missing symbols. The polyfill covers the `uv_cond_*` API surface across platforms, which should unblock addons that depend on background synchronization primitives.

### **Fix async module evaluation from stalling under `require()`** (4b53ac1)
Deno now skips a microtask checkpoint when already inside top-level module evaluation, preventing re-entrant draining from wedging async graphs with deferred TLA dependencies. This closes a nasty deadlock where an ES module required from CJS could leave evaluation promises pending forever.

### **`deno compile` gets two separate crash fixes via libsui bumps** (3cfcdcc, 3fa6cfa)
`libsui` is bumped twice on the same day: once to survive `eu-strip`/Flatpak stripping, and again to fix a gVisor/Cloud Run startup segfault for compiled binaries with native addons. Both are high-impact reliability fixes for shipped executables.

### **Legacy abort warning points to a real docs page** (8d719ba)
The `Deno.serve` deprecation warning now links to the correct `docs.deno.com/go` target instead of a missing migration page. This reduces user confusion when they hit the legacy request-abort warning.

### **Node polyfill stops panicking on invalid main-module URLs** (2c4414a)
`process.argv[1]` resolution now catches URL decoding failures and falls back safely instead of crashing during bootstrap. That prevents malformed percent-encoding in the main module path from taking down the runtime.

### Other misc changes
- Dependency bumps / lockfile updates (2 commits)
- Test and fixture updates for the compile and module-evaluation regressions
- Minor generated symbol export refresh for N-API
