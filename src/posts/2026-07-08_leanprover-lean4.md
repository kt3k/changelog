---
date: 2026-07-08
repo: leanprover/lean4
size: M
title: "Lean adds richer lint hints and tactic replay speedups"
excerpt: "New hints for unused bindings and simp args, plus a major incremental-elaboration fix that avoids rerunning tactics on trailing whitespace changes."
commits: 10
authors: [Kha, wkrozowski, hargoniX, Vtec234]
commit_authors: {"8554442": Kha, "6b303d9": wkrozowski, "306bbbc": hargoniX, "c1d6de5": Vtec234, "d14ff0b": wkrozowski, "81074d1": wkrozowski, "6405ec1": Kha, "86b7320": Kha, "e90c70f": Kha, "fedd162": Kha}
---

### **Replay tactics when only trailing whitespace changes** (8554442)
Lean now avoids rerunning tactics when you edit only whitespace immediately after them, preserving progress while typing the next step. The change threads stripped trailing whitespace through the snapshot tree and reapplies it on access, with broad updates across elaboration and language snapshot code.

### **Unused variables linter now suggests underscore-prefixing** (6b303d9)
The `unusedVariables` linter now emits a hint that suggests prefixing the binding with `_`, making the warning more actionable. This improves the UX of a common lint by showing the exact fix directly in the message.

### **Unused `simp` args hint now renders a cleaner edit** (81074d1)
The `UnusedSimpArgs` linter now produces a hint with `.none` diff granularity, so the suggested edit is displayed more clearly. The tests were updated to reflect the new `[apply]`-style hint rendering.

### Other misc changes
- Added `Insert` instances for `NameMap` and `NameSet` (c1d6de5)
- Fixed namespacing in `DeprecatedModule` (d14ff0b)
- Disabled binary stripping in release CMake config (306bbbc)
- Re-enabled header snapshots in CI (6405ec1)
- Tweaked CI to skip stack-overflowing tests under fsanitize (e90c70f)
- Adjusted PR release tag pushes to negotiate common objects first (fedd162)
- Disabled Lake cache when `PREV_STAGE` is used (86b7320)
