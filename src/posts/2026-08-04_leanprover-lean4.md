---
date: 2026-08-04
repo: leanprover/lean4
size: L
title: "Lean adds unified loop specs and bv tactics"
excerpt: "New `forIn` specs cover effect-free containers, `bv_decide` now works in `sym` mode, and vcgen improves spec selection."
commits: 4
authors: [sgraf812, hargoniX]
commit_authors: {"f2bcf2e": sgraf812, "8c72ff8": sgraf812, "1da5368": hargoniX, "6eaa2f8": sgraf812}
---

### **Unified loop invariants for effect-free containers** (f2bcf2e)
`vcgen` now gets one loop-spec story for any container whose iteration is effect-free, instead of requiring a bespoke spec per container. That brings `for ... invariant` support to hash/tree maps and sets, polymorphic ranges, slices, and iterators, including universe-polymorphic element types.

### **`bv_decide` is available inside `sym =>`** (1da5368)
Bitvector automation can now be invoked from `sym =>` mode, expanding where `bv_decide`, `bv_decide?`, `bv_normalize`, and `bv_check` can be used. The change threads the new tactics through the interactive/grind parsers and the BVDecide elaborator so symbolic goals can use the same bitvector workflow.

### **`vcgen` now tries the next matching spec theorem** (6eaa2f8)
When a `@[spec]` theorem doesn’t apply, `vcgen` will keep searching instead of letting that candidate shadow a more specific one. This makes spec dispatch more robust for instance-heavy programs and avoids false “missing spec” failures when an earlier candidate can’t be applied.

### **Loop-state universe bounds were relaxed in Do specs** (8c72ff8)
Specification lemmas for `Std.Internal.Do` loops no longer force loop state and elements into the same combined universe bound. That removes a source of universe-constraint failures when writing container-generic specs, while preserving prior behavior through the updated instantiation.

### Other misc changes
- `Range.size` gained a `grind` attribute.
- New `PureForIn` instances and `ForIn.toList` simp lemmas for several map/set containers.
- Documentation and error-message cleanup in `vcgen`.
- Minor BVDecide and spec-lemma refactors/tests.
