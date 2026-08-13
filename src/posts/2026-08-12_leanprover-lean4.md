---
date: 2026-08-12
repo: leanprover/lean4
size: L
title: "Lean4 gets `grind` upgrades and kernel fixes"
excerpt: "New `lift_lets`, incremental `bv_decide_push`, homomorphisms for `grind`, plus fixes for kernel timeouts, HEq handling, and inductives."
commits: 12
authors: [leodemoura, sgraf812, hargoniX, maxc-osec, nomeata]
commit_authors: {"e27622c": leodemoura, "70119c2": leodemoura, "6e48bb2": leodemoura, "67b968e": sgraf812, "2906af0": leodemoura, "4678eb1": hargoniX, "b73bcf5": sgraf812, "929ad94": sgraf812, "8f0ceab": maxc-osec, "a3fbf67": hargoniX, "d53748c": hargoniX, "6eb06a5": nomeata}
---

**`grind` now has a `lift_lets` tactic in `sym =>` mode** (6e48bb2)
It adds a new `lift_lets` step that hoists target-side `let`/`have` bindings as far as dependencies allow, flattening nested lets and merging syntactically equal definitions. This can simplify goals and improve sharing in symbolic preprocessing, and the implementation is designed to be near-linear.

**Incremental preprocessing lands with `bv_decide_push`** (4678eb1)
A new tactic lets proofs checkpoint the bitvector preprocessor’s work mid-proof so later `bv_decide`/`bv_decide_push` runs can reuse cached results. That should speed up workflows with many similar subgoals and repeated preprocessing.

**`grind` learns homomorphism-based simplification sets** (2906af0)
This introduces `[grind hom]` and `[grind hom_pred]` support so `grind` can translate terms into solver-friendly domains like `Nat`, `Int`, `Fin`, and fixed-width integers. It’s a substantial capability boost for bitvector and arithmetic-heavy proofs.

**Kernel timeout fix for nested `Decidable` wrappers** (e27622c)
`Grind.nestedDecidable` is now an abbreviation, which keeps the kernel from getting stuck when checking `t =?= Grind.nestedDecidable t`. This fixes a real performance issue where `grind`-generated proof terms could trigger deterministic kernel timeouts.

**`grind hom` now skips heterogeneous equalities** (70119c2)
The homomorphism hooks no longer try to inject `=` facts when the two sides have different types, which avoids an internal `mkEqProof` type mismatch. This also repairs the broken `grind_bitvec2` benchmark.

**`@[spec]` verification now elaborates more in parallel** (b73bcf5)
Spec annotations no longer block on proof completion as early, allowing multiple `@[spec]` theorems in a file to elaborate concurrently. That’s a performance improvement for large verification-heavy files like the updated VERINA benchmark.

**Schematic exception postconditions are preserved in `vcgen`** (67b968e)
`vcgen` now keeps a schematic `epost` condition instead of accidentally weakening it to `⊥` during spec application. This fixes an unsound-looking verification-condition bug where the generated VC could become trivially false.

**Bitvector-to-nat preprocessing was reworked for incremental `bv_decide`** (d53748c)
`bv_decide` in grind mode now takes its type-selection/configuration through the updated preprocessing pipeline, and it no longer eagerly internalizes the goal state on its own. This changes which facts are available during preprocessing and aligns the tactic with the new incremental cache flow.

**Uniformity checks for inductive declarations are now stricter** (6eb06a5)
The kernel now rejects inductives whose occurrences of the datatype being declared are not applied uniformly to the declaration’s parameters and universe levels. This closes a soundness hole where non-uniform occurrences could previously slip past later checks.

### Other misc changes
- Runtime fix for `Ref.swap` race/corruption issue (8f0ceab)
- `test/compile` binaries now link dynamically to save disk space (a3fbf67)
- Added contract tests for while loops and nested loops (929ad94)
- `grind`/`bv_decide` bitvector preprocessing refactors and related benchmark updates (d53748c, 4678eb1, 2906af0)
- `@[spec]`/VCGen test and benchmark updates (b73bcf5, 67b968e)
- Misc. `grind` lemma/attribute cleanup and benchmark adjustments (e27622c, 70119c2)
