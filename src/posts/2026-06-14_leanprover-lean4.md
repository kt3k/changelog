---
date: 2026-06-14
repo: leanprover/lean4
size: M
title: "Lake cache overwrite controls land"
excerpt: "Lake adds overwrite flags and prefers trace outputs, while Lean gains BitVec cpop/setWidth lemmas and Nat.reprFast folding."
commits: 3
authors: [hargoniX, tydeu]
commit_authors: {"9f1e802": hargoniX, "49bb203": hargoniX, "7778d70": tydeu}
---

### **Lake cache gets conditional overwrite behavior** (7778d70)
Lake now distinguishes between preserving and replacing cached data, adding `--no-overwrite` and `--force-overwrite` with different defaults across cache subcommands. It also prefers outputs from a local trace file before falling back to cached mappings, and updates module/ltar handling to write cache data more carefully when artifacts are rebuilt.

### **BitVec cpop/setWidth lemmas added** (9f1e802)
New theorems relate `BitVec.cpop` to `setWidth`, including monotonicity bounds and an equality result when the target width is at least the original width. These lemmas make it easier to reason about popcount behavior across width changes in downstream proofs.

### **Constant folding now handles `Nat.reprFast`** (49bb203)
The compiler’s LCNF constant folder now folds `Nat.reprFast`, which should improve generated code for expressions that reduce to that function. A regression test was added to lock in the behavior.

### Other misc changes
- Cache CLI help text and option docs updated
- `lake cache` staging/online test scripts adjusted
