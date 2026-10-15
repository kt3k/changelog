---
date: 2026-10-14
repo: leanprover/lean4
size: L
title: "Lean adds safer recursion and grind fixes"
excerpt: "Well-founded recursion is reworked around a non-eliminating fixpoint, while grind gets several correctness fixes around `<`, inverses, and inequalities."
commits: 10
authors: [leodemoura, nomeata, TwoFX, Garmelon, algebraic-dev, sgraf812, Vtec234]
commit_authors: {"7079108": leodemoura, "684a6ff": nomeata, "5852a4c": algebraic-dev, "969cfff": sgraf812, "7a0a58e": leodemoura, "6c94fec": leodemoura}
---

### **Well-founded recursion no longer eliminates `Acc` into data** (684a6ff)
`WellFounded.fix`, `fixF`, and `recursion` were redefined to avoid large elimination of accessibility proofs. Lean now uses a `FixGraph` witness plus `Classical.choice`, and adds `Acc.rec'`/`recOn'`/`ndrec'`/`ndrecOn'` for code that still needs non-`Prop` elimination.

### **`grind linarith` now respects `LawfulOrderLT`** (7079108)
`grind` no longer assumes `<` is safe to use just because a linear order exists; it now requires a `LawfulOrderLT` instance before processing strict inequalities, negated order facts, disequality splits, and related ordered-ring facts. This turns previous internal errors into ordinary failure cases on unsupported types.

### **`grind`’s ring module keeps inequality operands for matching** (7a0a58e)
The ring normalizer now registers the operands of `≤` and `<` instead of skipping them outright, so it can relate expressions like `b + c + d` and `2 * b + d` after rewriting. That fixes cases where equality propagation was blocked once the simp normalizer changed the shape of inequalities.

### **`grind` preserves numeral inverse facts before normalization** (6c94fec)
Inverse facts such as `k * k⁻¹ = 1` are now asserted without first running them through the simplifier, which used to collapse them to `True`. That lets the ring module actually connect `k⁻¹` back to the underlying numeral in field proofs.

### **TCP/UDP async sends and receives now reject oversized buffers** (5852a4c)
The libuv backend was changed to build send buffers on the stack and to reject 4 GiB+ sizes with `IO.Error.invalidArgument` instead of silently wrapping lengths to 32 bits. The public async TCP/UDP APIs and tests were updated to document and cover the new argument checks.

### **`WPMonad.withFrameClosure` is now universe polymorphic** (969cfff)
`withFrameClosure` now accepts monads and resources in arbitrary universes, fixing its usability for types like `StateT (ULift.{1} Nat) Id`. This closes a polymorphism hole that blocked legitimate higher-universe instantiations.

### Other misc changes
- JSON parser exponent cap tightened (1 commit)
- Development cycle version prep for v4.37.0 (1 commit)
- `grind linarith` short-circuit cleanup and doc/comment tweaks (1 commit)
- String slice file split / module reshuffling (1 commit)
