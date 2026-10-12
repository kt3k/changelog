---
date: 2026-10-11
repo: leanprover/lean4
size: L
title: "Grind gets smarter; bv_decide expands"
excerpt: "Lean4 fixed several `grind` soundness/UX bugs, improved arithmetic normalization, and added more BitVec support."
commits: 6
authors: [leodemoura, hargoniX]
commit_authors: {"29a05d3": leodemoura, "1aacc7a": leodemoura, "12ae34c": leodemoura, "0ec0956": hargoniX, "fe2da21": leodemoura, "2bbdc29": leodemoura}
---

### **`grind` now rewrites propositional binder domains** (29a05d3)
`Sym.simp` can now simplify dependent `Prop` binder domains and rewrite the binder body through the appropriate congruence lemmas. This restores legacy behavior for goals like `∀ h : i < a.size, ...`, and also adds matching support for `∃` domains.

### **`grind` stops dropping `Prop` hypotheses during eager cases** (fe2da21)
When eager `cases` splits a newly introduced `Prop`, the hypothesis itself is now re-asserted so each branch still knows the proposition was true. This fixes failures on field-less inductive predicates such as `P` and makes eager splitting work for `intros`-introduced facts too.

### **`grind?` now emits a script for every split goal** (2bbdc29)
If parameter facts split the initial goal during setup, `grind?` now collects a replay script for each resulting goal instead of only the first one. That avoids unresolved metavariables and makes the suggested proof syntax match the actual multi-goal structure.

### **`Sym.canon` canonicalizes non-global class-field instances** (12ae34c)
Instance canonicalization now falls back to class projections when a field like `NatCast`/`IntCast` is not a global instance. This fixes spurious `grind` ring errors where equivalent parent paths produced different instance spellings and were compared by pointer.

### **`Sym.Arith` no longer chokes on metadata in arithmetic terms** (1aacc7a)
The arithmetic normalizer now strips transparent metadata before destructuring expressions, preventing panics on inaccessible pattern terms from `match` equations. This fixes a real crash in `grind` on equations whose patterns contain annotated arithmetic spines.

### **`bv_decide` learns a few more BitVec terms** (0ec0956)
`bv_decide` gained normalization support for `BitVec.zero`, `BitVec.ofNat _ (Bool.toNat _)`, and `BitVec.carry`. That broadens the tactic’s reach on common bitvector identities.

### Other misc changes
- Added regression tests for the `grind` and `bv_decide` fixes.
- Small supporting lemmas/imports for the new normalizer behavior.
