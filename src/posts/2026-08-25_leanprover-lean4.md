---
date: 2026-08-25
repo: leanprover/lean4
size: L
title: "Fixes for simp, elaboration, and core datatypes"
excerpt: "Lean4 adds safer DiscrTree access and fixes several elaboration/simp regressions, plus new strong induction support and deprecation hints."
commits: 16
authors: [nomeata, ia0, wkrozowski, robsimmons, eric-wieser, joehendrix, FawadHa1der, Kha, hargoniX]
commit_authors: {"b9c9eb9": robsimmons, "30ad6f5": nomeata, "e276422": wkrozowski, "8c07c8f": wkrozowski, "0dc10a4": nomeata, "111a897": nomeata}
---

**Strong induction principles for fixpoints** (8c07c8f)
Lean now generates stronger (co)induction tools for lattice-theoretic predicates, letting proofs succeed earlier when they re-enter the target predicate. The new order-theory lemmas and helper machinery support `inductive_fixpoint`/`coinductive_fixpoint` with explicit meet witnesses.

**`casesOn`/`recOn` now work for proposition projections** (30ad6f5)
For certain proposition-like inductives, Lean now builds `casesOn` from projections instead of reducing through the recursor. That avoids failures when proofs are opaque or moved into auxiliary theorems, and it fixes a class of elaboration regressions around `And.casesOn`-style usage.

**`simp`/`dsimp` no longer reuse stale simproc matches** (111a897)
The simplifier now stops after the first simproc rewrite for a term, rather than continuing with candidates selected for the pre-rewrite expression. This fixes panics when a simproc changes the arity of the expression being simplified.

**Sort-polymorphic inductives no longer trip auxiliary generation** (0dc10a4)
Lean now correctly skips `.ctorIdx`, `noConfusion`, and `SizeOf` generation for inductives that only eliminate into `Prop`, fixing failures like `Unknown constant T.ctorIdx` for enum-like `Sort`-valued types. The change centralizes the large-elimination check and adds regression coverage.

**Deprecated-target warnings now include a code-action hint** (e276422)
When a deprecation points to something already deprecated, Lean now adds a hint and clickable code action suggesting the final replacement. This makes transitive deprecations easier to resolve in editors.

**DiscrTree trie nodes gained a stable abstraction** (b9c9eb9)
Lean adds `mkNode`, `asNode`, `nodeValues`, and `nodeChildren` for `DiscrTree.Trie`, so downstream code can inspect nodes without pattern matching on the internal representation. That makes future internal trie changes less likely to break clients.

### Other misc changes
- Fixed `LEAN_EXPORT` ordering in `ffi.cpp` for GCC builds.
- Corrected the C++ declaration of `lean_kernel_diag_is_enabled` for wasm64.
- Updated stage0.
- Tweaked `casesOn`/`recOn` construction order internally.
- Minor docs/typo fixes in IO and Prelude/Repr docs.
- Small refactors and proof golf in UInt and WF preprocessing.
- Enforced indentation rules for singleton/set notation elements.
