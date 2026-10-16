---
date: 2026-10-15
repo: leanprover/lean4
size: L
title: "Lean4 gains lexicographic VCgen and order tools"
excerpt: "New `vcgen` measure automation, private-name fixes, String/ByteArray order instances, and several grind/kernel regressions fixed."
commits: 10
authors: [Rob23oba, nomeata, leodemoura, sgraf812, algebraic-dev, TwoFX]
commit_authors: {"8853987": sgraf812, "11ab0e7": Rob23oba, "8258e75": Rob23oba, "3d3b24d": Rob23oba, "f08082c": algebraic-dev, "b7476d0": TwoFX, "326a565": nomeata, "b8af4e1": leodemoura, "7583dc7": leodemoura}
---

**`vcgen … with finish` now proves lexicographic measure decreases** (8853987)
`Std.WP` gains automation for `NondetFun.EvalsTo` and `Variant` measure lemmas, including lexicographic pair and nested-pair decreases. This lets `vcgen … with finish` discharge loop termination proofs over tuple measures more directly, and deprecates the fixed-arity `*_apply_1`…`*_apply_5` helpers in favor of general lemmas.

**String slices and byte arrays now have ordering support** (b7476d0)
Lean adds `LE`/`LT`/`Ord`-style instances and supporting lemmas for `String.Slice`, plus comparison lemmas for `Array`, `List`, `ByteArray`, and `String` extraction-based lexicographic reasoning. This expands what can be compared and ordered in proofs and removes the old `lean_slice_dec_lt` path.

**`mkPrivateName` and private-name queries were made consistent** (11ab0e7)
The private-name utilities were reworked so `isPrivateName`, `isPrivatePrefix`, and conversion back to user names line up on the same representation. The change also adds documentation/proofs and a regression test for private-name handling.

**`Bool.dand` and `Ordering.dthen` add dependent short-circuiting** (8258e75)
Lean now has dependent versions of boolean and ordering combinators, with a batch of lemmas for rewriting and case analysis. These primitives are important for deriving handlers and for more precise proof automation over dependent comparisons.

**`DiscrTree` can now return entries with matching keys** (3d3b24d)
A new `getEntriesWithKeys` API exposes all entries stored under a specific key sequence. This is a useful query primitive for metaprogramming on discrimination trees.

**LibUV requests now own their Lean references** (f08082c)
The runtime refactors async DNS, TCP, UDP, timers, signals, and related helpers to use an `owned_ref` wrapper instead of manual `lean_inc`/`lean_dec` bookkeeping. This is a substantial memory-management cleanup that reduces reference-counting hazards in the libuv layer.

**`fun_cases`/`induct` now handle named literal patterns correctly** (326a565)
Pattern matching principles are fixed for named patterns like `n@5` or `b@true`, which previously could trigger kernel errors. The regression test covers both `fun_cases` and `fun_induction` on literals and zero-argument constructors.

**`grind`’s symbolic normalizer now rewrites nested `∀`/`∨` more robustly** (b8af4e1)
The normalizer now applies `forall_or_forall` / `forall_forall_or` at the innermost binder so disjunctive goals are split into the right universally quantified obligations. This fixes failures where a single `∀` body with `∨` prevented E-matching from seeing the right patterns.

**`grind` avoids eagerly building empty arithmetic contexts** (7583dc7)
The arithmetic normalizer now constructs the empty `RArray` context lazily, only initializing `NatCast` when needed. This fixes regressions on semirings where the synthesized `NatCast` is not reducibly equal to the internal `natCast` field.

### Other misc changes
- Bug report template updated with a soundness checklist item.
- `Ordering`/`Bool`/`Prop` lemma additions and simp support.
- Regression tests added for private names, slices, `grind`, and VC generation.
