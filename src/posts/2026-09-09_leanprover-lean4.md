---
date: 2026-09-09
repo: leanprover/lean4
size: L
title: "Lean4 adds sandboxing, perf, and core instances"
excerpt: "Major changes to lake challenge isolation, compiler floating safety, export checking, plus new order/linear instances and goal-view fixes."
commits: 11
authors: [hargoniX, TwoFX, Kha, Garmelon, kim-em]
commit_authors: {"1163653": Kha, "2d2ed32": hargoniX, "0610069": TwoFX, "cb43d9d": hargoniX, "3029c59": Garmelon, "e3f5286": TwoFX, "d7918b7": kim-em, "eea0213": hargoniX, "fe53f21": hargoniX, "c1b4fae": TwoFX, "0243d9f": Kha}
---

### **Challenge checking now uses bwrap sandboxing** (0243d9f)
`lake challenge` is moved from `landrun` to a tighter `bubblewrap`-based sandbox, further restricting filesystem and network access during build/export. The checker also gained a `--silent` mode and reworked export handling to pass file paths between sandboxed steps instead of raw export strings.

### **Compiler stops floating lets across side-effectful state cases** (cb43d9d)
`floatLetIn` now refuses to float declarations into `cases` over `ST.Out` or `EST.Out`, avoiding reordering around `ST.Ref` reads and writes. This fixes a subtle linearity bug that could make compiler output unsound in the presence of side effects.

### **Hash maps gain linearity markers** (eea0213)
`HashMap` and `DHashMap` now expose `markLinear`, mirroring `Array.markLinear`, so bucket arrays can be marked linear and protected from silent copies. The implementation preserves the marker through resizing and comes with compile-time tests covering semantics and panic behavior.

### **`Fin` now has missing order infrastructure** (0610069)
Lean adds `Min`, `Max`, and related lawful order packages for `Fin`, along with supporting lemmas in core order theory. This fills in missing instances that downstream code can now rely on without local workarounds.

### **Goal display fixes nested empty `by` blocks** (1163653)
The server’s goal lookup now distinguishes hanging `by` blocks from ordinary indentation, fixing a regression where empty nested `have ... := by` blocks showed the outer state instead of the goal being typed. This makes hover goal display consistent in nested tactic contexts.

### **`leanchecker` and export flow are now path-based** (0243d9f, 2d2ed32)
The challenge checker now streams export output through temp files instead of materializing large strings, reducing memory pressure and enabling the new sandboxed flow. It also tightens how the built artifacts and toolchain paths are passed into the sandbox.

### **`Int` and `Nat` gain lawful order packages** (e3f5286, c1b4fae)
Core instances were added for `LinearOrderPackage Int` and `LawfulOrderBEq` on both `Int` and `Nat` via package definitions. These are mostly infrastructure additions, but they unblock generic order-based code from needing special cases.

### Other misc changes
- Deprecated `Lean.MVarId.liftReflToEq` and `Lean.Meta.Rfl.rel_of_eq_and_refl` (d7918b7)
- Removed obsolete reference-manual bot/branch automation (3029c59)
- Bench cleanup for `riscv-ast` (fe53f21)
