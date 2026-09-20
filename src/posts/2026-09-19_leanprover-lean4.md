---
date: 2026-09-19
repo: leanprover/lean4
size: M
title: "Lean 4 speeds up elaboration and frontend parsing"
excerpt: "Two performance fixes cut overhead in command processing and closure construction, improving large-file elaboration times."
commits: 2
authors: [leodemoura]
commit_authors: {"963b1e4": leodemoura, "3041ca2": leodemoura}
---

### **Skip an unnecessary type check in value/type closures** (963b1e4)
`Closure.mkValueTypeClosure` now avoids calling `check` when the local context has no let-declarations, since there can be no dependent lets to discover. This trims wasted meta work during elaboration of `match`-heavy code and auxiliary defs/theorems, giving a measurable speedup on large pattern-matching workloads.

### **Make per-command frontend state persistent to avoid quadratic copying** (3041ca2)
The frontend and command elaborator now thread command accumulators as `PersistentArray`s instead of plain arrays, so each new command no longer copies previously captured state into every task. This removes a linear-per-command overhead that could turn large files into quadratic behavior, especially when module linters and code-quality logging are active.

### Other misc changes
- Updated tests and expected diagnostics for the new behavior.
- Minor internal signature/docs adjustments around command parsing and linter plumbing.
