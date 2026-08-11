---
date: 2026-08-10
repo: microsoft/typescript-go
size: L
title: "Watch fixes, emit correctness, and crash guards"
excerpt: "Several user-facing fixes landed for watch mode, nested emits, namespace await handling, and extensionless files."
commits: 5
authors: [johnfav03, jakebailey, UditDewan]
commit_authors: {"264a3a5": jakebailey, "1f55045": johnfav03, "71cc1b1": johnfav03, "2e998f1": UditDewan}
---

### **Watch mode now falls back more safely on Linux fanotify issues** (71cc1b1)
If fanotify hits filesystem errors, the watcher now falls back to inotify instead of getting stuck — a practical fix for Docker and other Linux setups. The change also tightens watch-manager error handling so failed directory batches are reported cleanly and partial watches are closed.

### **Nested declaration emits are now accounted for during incremental builds** (264a3a5)
Incremental compilation now tracks “nested emit” time and threads a clock into program creation so emit work inside affected-file handling is measured correctly. This also updates emit-path tests around nested declarations, which suggests a real correctness fix for emit-time invalidation.

### **Exported classes in nested containers keep await context correctly** (8e53cbe)
The parser now only enables await context for exported classes when parsing top-level source elements, not nested block/switch contexts. That prevents `await` in computed class members from being accepted in places where it should still be a grammar error.

### **Watch diagnostics now update when a global declaration disappears** (1f55045)
Incremental snapshotting now treats global-scope changes as change-set triggers, so removing a global declaration can surface new downstream errors in watch mode. This closes a correctness gap where another file’s diagnostics could stay stale after a global script edit.

### **Extensionless root files no longer panic** (2e998f1)
Files referenced without a recognized extension are now handled as valid root inputs instead of crashing the parser or file-loading path. The compiler also falls back to a safe script kind for such files, which matters for `allowNonTsExtensions`, declaration maps, and CLI/tsconfig entrypoints.

### Other misc changes
- Watch-mode and parser regression tests added for the above fixes.
- New baselines for extensionless-file and namespace-await scenarios.
- Small internal refactors around file parsing and source-definition handling.
