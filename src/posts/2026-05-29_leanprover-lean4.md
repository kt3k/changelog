---
date: 2026-05-29
repo: leanprover/lean4
size: L
title: "Lean4 hardens VCGen and symbolic reduction"
excerpt: "VC generation now tracks in-scope specs per subgoal, symbolic reducers gained new level/match fixes, and floating-point nondeterminism is blocked at compile time."
commits: 9
authors: [sgraf812, leodemoura, TwoFX]
commit_authors: {"1744bf5": leodemoura, "8076fa0": sgraf812, "86b74c3": TwoFX, "e8bf278": sgraf812, "5f3bec7": leodemoura}
---

### **VCGen now collects local specs per subgoal** (8076fa0)
`mvcgen'` now registers `Triple`-shaped hypotheses as specs as they enter scope, instead of only relying on globals. This makes VC generation pick up locally introduced contracts automatically, which should improve proofs that depend on intermediate assumptions.

### **Symbolic level unification handles more universe constraints** (1744bf5)
`Sym/Pattern` now solves a couple of previously unsupported level equalities, including approximated `u + 1 =?= v` and `max u ?v =?= u` cases. That broadens the symbolic matcher/unifier and fixes a real `sym_apply` bug exercised by new tests.

### **`mvcgen'` can decompose typeclass-method projections** (e8bf278)
VC generation now reduces kernel `.proj` heads for programs like `Add.add inst a b`, allowing `mvcgen'` to look through typeclass instance projections instead of getting stuck. The change is paired with a new reduction path in solve and a benchmark test update, so it directly affects which programs the tactic can handle.

### **`Sym.dsimp` fixes `match` reduction after structural simplification** (5f3bec7)
The `dsimp` symbolic reducer now always folds projections back after reducing `match` expressions, instead of sometimes bailing out when the expression was unchanged. This fixes a bug where match-driven simplification could leave `Expr.proj` terms behind and fail to make progress.

### **Floating-point builds now reject nondeterministic eval mode** (86b74c3)
Lean's build scripts now refuse to compile when `FLT_EVAL_METHOD != 0`, hardening the runtime against floating-point nondeterminism. This is a preventative platform-level change rather than a user-facing feature, but it matters for reproducible behavior.

### Other misc changes
- Reverted the new local-spec collection work in `mvcgen'` after merge, then reintroduced it in a corrected form.
- Reverted the typeclass-method projection reduction change in `mvcgen'` after a performance regression, then refined the reduction strategy.
- Localized `unfoldReducible` cost in `mvcgen'`'s projection reduction path.
- Bench/test updates for `mvcgen'`, `sym_apply`, and `sym_dsimp`.
