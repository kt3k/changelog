---
date: 2026-08-03
repo: leanprover/lean4
size: L
title: "BV decide speedups and lint refactor land"
excerpt: "Major BVDecide performance work, a SymM theorem fix, and a Lake builtin-lint refactor; plus a small runtime and constant-folding optimization."
commits: 6
authors: [Kha, wkrozowski, hargoniX, leodemoura]
commit_authors: {"945e78b": wkrozowski, "a2294bb": hargoniX, "41dfb4d": Kha, "0bae321": Kha, "6ce2149": leodemoura}
---

### **BVDecide gets a faster SymM preprocessing pipeline** (a2294bb)
`bv_decide`'s preprocessor was ported to `SymM`, which the PR says can speed up large rewriting-heavy goals by up to 6x and improves constraint-substitution asymptotics to linear in the total hypothesis size. It also introduces breaking behavior changes around `bv_normalize` and `@[bv_normalize]`, so proofs relying on old normalization behavior may need updates.

### **`mkTheoremFromDecl` now handles polymorphic SymM theorems correctly** (6ce2149)
This fixes a bug where universe-polymorphic theorems with non-equality conclusions (`↔`, `¬`, or plain propositions) could fail to elaborate in `SymM` because their proof constants were created without the needed universe levels. A regression test was added covering the reported `Foo.ext_iff` case and related shapes.

### **`lake lint --builtin-lint` gains an explicit mode flag** (945e78b)
Builtin linting was refactored around a new `Mode` enum, separating normal reporting from in-place exception recording. This makes the CLI internals cleaner and prepares the code path for a future third lint-checking mode.

### **`lean_dec_ref_cold` keeps its deletion worklist in a register** (41dfb4d)
The runtime deletion path was tuned so the pending free-list is passed by value and returned, rather than threaded by reference. That lets clang keep the worklist in a register and removes spill traffic from one of Lean's hottest object-deletion loops.

### **LCNF constant folding now reduces `UInt*.ofNatLT` on literals** (0bae321)
The LCNF simp constant folder learned how to fold `UInt8/16/32/64.ofNatLT` when the argument is a numeral. That avoids leaving literal integer conversions to codegen, which should make some constants compile down to plain literals instead of runtime memoized terms.

### Other misc changes
- Stage0 refresh (1 commit)
