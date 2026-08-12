---
date: 2026-08-11
repo: leanprover/lean4
size: L
title: "Loop contracts and vcgen get smarter"
excerpt: "Lean4 adds loop invariants/termination for `do`, speeds vcgen simplification, and improves `grind` support for loop measures and iterators."
commits: 8
authors: [sgraf812, TwoFX, Garmelon]
commit_authors: {"7976735": sgraf812, "cb5bb5f": sgraf812, "9a36a53": sgraf812, "8e0b558": sgraf812}
---

### **`do` loops can now state invariants and termination measures** (7976735)
`repeat`, `while`, and `for` loops now accept `invariant` and `decreasing` clauses, letting vcgen pick up loop contracts directly from the program. That removes a lot of manual proof scaffolding for verified `do` blocks and extends the loop gadget machinery to handle each annotation set separately.

### **vcgen can step through specs with continuation variables** (cb5bb5f)
`vcgen` now keeps going when a spec’s program applies a continuation variable under a binder, instead of giving up once the metavariable gets instantiated late. This fixes a class of verification failures where the emitted goal’s program shape only becomes known after pending constraints are processed.

### **vcgen simplifies symbolic state as it is produced** (9a36a53)
The VC generator now eagerly folds the state arguments of `wp` goals when `simplifying_assumptions` is enabled, so later discharge work sees cleaner verification conditions. The change also avoids duplicating simplification effort, and the benchmark notes a large kernel-checking speedup on a representative `vcgen` case.

### **`grind` learns loop measures and iterator invariants** (8e0b558)
New `@[grind =]` lemmas let `grind` reason about loop termination measures in stateful monads without forcing a prior `simp_all`, and specializations cover common arities for those measures. The day’s iterator verification tests also show `invariant` working through `PureForIn`-backed iterators such as `iter.map` and `iter.filter`.

### Other misc changes
- Diagnostics typo fixes across compiler, elaborator, linter, and widget messages.
- Release script updates for downstream/toolchain release handling.
- Minor benchmark and test adjustments for the new loop/vcgen behavior.
