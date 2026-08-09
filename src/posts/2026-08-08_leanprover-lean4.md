---
date: 2026-08-08
repo: leanprover/lean4
size: M
title: "Termination measures get state-aware"
excerpt: "Lean4 now supports well-founded, state-dependent termination measures in `Spec.repeatM`, broadening vcgen's loop reasoning."
commits: 1
authors: [sgraf812]
commit_authors: {"f29e9e4": sgraf812}
---

### **`Spec.repeatM` accepts well-founded and state-dependent measures** (f29e9e4)
Lean4 generalizes `vcgen` loop termination measures so they can target any type with a `WellFoundedRelation`, not just `Nat`, and they can now depend on monadic state. That means proofs can use lexicographic or other custom measures, and decreases for `Nat` measures still discharge in the familiar `<` shape when applicable.

### Other misc changes
- Updated `Std.Internal.Do` assertion infrastructure to support total nondeterministic functions and related lemmas.
- Bench/test updates for the new termination-measure behavior.
- Internal proof/library plumbing around order and `SpecLemmas`.
