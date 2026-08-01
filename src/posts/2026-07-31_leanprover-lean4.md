---
date: 2026-07-31
repo: leanprover/lean4
size: L
title: "Lean tightens kernel invariants and adds cbv at"
excerpt: "Kernel checks got stricter around nested inductives and Prop detection, while `cbv at` returned with safe local-hypothesis reduction."
commits: 9
authors: [leodemoura, Rob23oba, wkrozowski, sgraf812, tydeu]
commit_authors: {"23393b9": Rob23oba, "448dc44": leodemoura, "02a57df": leodemoura, "21b167c": wkrozowski, "34a43df": leodemoura, "17dbc81": leodemoura}
---

### **Kernel now re-checks nested-inductive declarations** (448dc44)
Lean’s kernel now re-validates the constructor types plus generated recursor types and equations after nested inductive elimination and name restoration. These extra checks are redundant in the happy path, but they harden the environment against soundness bugs if nested-inductive rewriting misses something.

### **`cbv` now supports `at` locations safely** (21b167c)
`cbv` can now reduce the goal, a hypothesis, or both via standard location syntax like `cbv at h`, `cbv at h |-`, and `cbv at *`. The implementation isolates each hypothesis reduction in its own `SymM` session, preserving incrementality invariants while restoring a useful tactic feature.

### **Kernel fixes universe-normalized `Prop` detection** (17dbc81)
The kernel now recognizes propositions up to universe normalization, so sorts like `Sort (imax 1 0)` are treated as `Prop`. This closes a serious soundness hole where non-proof data could be projected out of something that should have been proof-irrelevant.

### **Inductive checking now normalizes `Prop`-like result levels** (34a43df)
The inductive checker now treats `Sort (imax 1 0)` and `Sort 0` equivalently when deciding whether an inductive is a predicate, including K-like reduction and elimination restrictions. That makes metaprogrammed declarations consistent with what the elaborator already normalizes before the kernel sees them.

### **`grind` canonicalizes bit-vector and `Fin` literals in patterns** (02a57df)
Ground e-matching patterns now normalize literals before entering the E-graph, preventing malformed `BitVec.ofNat` / `Fin.mk` spellings from violating `grind`’s interpreted-node invariants. This fixes a regression where a quantified goal with `#`-syntax bit-vector literals could crash with a kernel error instead of solving.

### **`MonadTail (StateT σ m)` no longer needs `Nonempty σ`** (23393b9)
The `MonadTail` instance for `StateT` was generalized so it works even when the state type has no `Nonempty` instance. That unblocks `while` specifications over `StateT` monads whose state type is only inhabited locally, which is a meaningful ergonomic improvement for proofs.

### Other misc changes
- Kernel rejects declarations that refer to `_nested` auxiliary types, closing a metaprogramming-only soundness hole.
- vcgen benchmark driver now reports sub-ms timings as fractional milliseconds.
- Lake docstring fix for `buildLeanSharedLibSync`.
