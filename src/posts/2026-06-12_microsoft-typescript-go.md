---
date: 2026-06-12
repo: microsoft/typescript-go
size: L
title: "Watchers, checker stability, and LS timeouts"
excerpt: "Major LSP/watch infrastructure changes plus several crash fixes in the checker and module helper handling."
commits: 6
authors: [ahejlsberg, jakebailey, andrewbranch, johnfav03]
commit_authors: {"7ce96c8": jakebailey, "3e6ed73": andrewbranch, "bb2240e": johnfav03, "4cf361f": ahejlsberg, "52a0fe6": ahejlsberg}
---

### **LS checkers now time out when idle** (7ce96c8)
The language service now tags checker work with a lifetime and uses that to let idle checkers expire after being unused. This should reduce stale checker retention and make diagnostics/API requests behave more predictably under load.

### **LSP server can use native watchers on Windows and macOS** (3e6ed73)
A new LSP watcher backend was added, with the server able to prefer built-in recursive watching on platforms that support it efficiently. That’s a big reliability and performance win for file watching, especially for large trees.

### **CLI watch mode was rebuilt on top of the new fswatch layer** (bb2240e)
The command-line watcher was reworked around the new filesystem watch package, and watch loops now honor cancellation instead of sleeping in a fixed loop. This is a substantial plumbing change that should make watch mode more robust and easier to integrate with interrupts/signals.

### **Fixed an external helper crash after module-status updates** (b1e0c7e)
Program updates now re-evaluate whether a file needs an importHelpers specifier, instead of assuming that property stays stable across edits. This prevents a crash when a script becomes a decorated module and external helper resolution is forced after the change.

### **Fixed stack overflows in recursive type resolution** (4cf361f, 52a0fe6)
Two separate checker crashes were fixed: one in base constraint resolution and one in simplification of recursive indexed access types. Both are important correctness fixes for pathological or highly recursive types that previously could blow the stack.

### Other misc changes
- Checker determinism fix around instantiated symbols and target-symbol unwrapping.
- Small public API addition: `Program.GetCheckerPool()`.
- New/updated tests and baselines for watcher behavior and recursive-type regressions.
