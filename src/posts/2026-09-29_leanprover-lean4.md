---
date: 2026-09-29
repo: leanprover/lean4
size: L
title: "Lean4 adds char simp, control-flow, and ctorIdx speedups"
excerpt: "Char ground evaluation, faster ctorIdx codegen, better grind normalization, and a few Sym/BVDecide fixes landed today."
commits: 11
authors: [leodemoura, hargoniX, sgraf812, Kha, casavaca]
commit_authors: {"791e095": leodemoura, "a332ad1": leodemoura, "58d4764": leodemoura, "089d938": hargoniX, "6dae63b": hargoniX, "633a200": leodemoura, "4ac30d4": hargoniX, "c266b91": sgraf812, "8d33884": Kha, "67a8629": sgraf812, "62e2afd": casavaca}
---

### **`Sym.simp` now evaluates `Char` ground terms** (791e095)
`evalGround` can now compute a broad set of `Char` operations on literals, including case conversion, predicates like `isDigit`, comparisons, and `toString`. It also normalizes `Char.ofNat n` to a character literal when `n` is numeric, which helps `grind` and gives chars a single canonical form.

### **`grind` normalizer handles control flow more like `simp`** (58d4764)
The `Sym.simp`-based `grind` path now simplifies `ite`/`dite`/`cond` conditions and `match` discriminants without blocking further simplification in the branches. The same change also aligns `normLegacy` with the metadata erasure that `preprocess` already performs, reducing false discrepancies in normalization checks.

### **`ctorIdx` becomes O(1) in generated code** (089d938)
Lean now codegens `ctorIdx` by reading the runtime constructor tag directly in the common case, with special handling for singleton inductives and built-ins like `Nat` and `Int`. The patch also adds constant folding for both `Nat.ctorIdx` and the underlying primitive, which should make generated code cheaper and more predictable.

### **Bitvector normalization and benchmarks get cleaned up** (6dae63b, a332ad1, 8d33884)
`bv_decide` avoids a sharing bug by reordering preprocessing around `symByContradiction`, and the `grind_bitvec2` benchmark was first disabled and then re-enabled with explicit hints after upstream lemma removals. The benchmark is back in the suite, but the whole sequence is mostly maintenance around existing proofs rather than new capability.

### **`Sym.intros` now hides implementation-detail binders** (c266b91)
Binders whose names start with `__` are now marked as implementation-detail locals in `Sym.intros`, matching elaborator behavior. That keeps generated VCs cleaner by hiding join points like `__do_jp` from the visible local context.

### **`grind`/`Sym.simp` infrastructure gets broader and safer** (633a200, 4ac30d4, 67a8629, 62e2afd)
Several support changes landed around the main tactics and order theory: a sharing-violation fix in `Sym.Arith`, infrastructure for incremental/partially verified bitblasting, new lattice and `PredTrans` lemmas for `do`-notation forms, and a `findOLean` cache keyed by package root to avoid re-scanning the search path for every module. These are mostly enabling or performance-oriented changes that support the larger tactic stack.

### Other misc changes
- `grind_norm` test updates for the new control-flow and char normalization behavior.
- New/updated tests for `ctorIdx`, `findOLean` caching, and implementation-detail binders.
- Minor public API visibility adjustments in `Std.Sat.AIG.CNF` to support the new bitblasting infrastructure.
