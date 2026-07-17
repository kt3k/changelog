---
date: 2026-07-16
repo: leanprover/lean4
size: L
title: "Symmetry fixes and core linting land"
excerpt: "Major Sym.simp and vcgen fixes landed alongside a new core-internal linter set and a few API cleanups."
commits: 14
authors: [ia0, leodemoura, TwoFX, wkrozowski, sgraf812, Garmelon, Kha]
commit_authors: {"0c8d331": leodemoura, "9eeac71": sgraf812, "52edefc": TwoFX, "3d9b6b8": ia0, "a53ddb3": TwoFX, "acdf5fd": leodemoura}
---

### **Fix Sym.simp sharing when discharged proofs end up in the result** (0c8d331)
`Theorem.rewrite` now restores maximal sharing only for discharged hypothesis proofs that are actually spliced into the rewritten RHS. This fixes a `SymM` invariant violation detected by `sym.debug` without paying the sharing cost on unrelated discharges.

### **Improve Sym matcher/unifier support for offsets** (acdf5fd)
`SymM` can now postpone certain quasi-offset constraints and recognize more arithmetic expressions as natural-number values/offsets. That should make matching/unification succeed in cases that previously got stuck on `t + k`-style patterns.

### **Fix vcgen/mvcgen splitting for `match h : e`** (9eeac71)
Annotated discriminants are no longer abstracted into the split motive when the alternatives bind equality hypotheses like `h : e = pattern`. This avoids ill-typed VC generation and fixes replay for `match h : ...` cases, including the reported `#12275` failure mode.

### **Enable the coreInternal linter set in core** (52edefc)
Lean now registers and enables the new `linter.coreInternal` set, which includes `internalModule` checks for declarations that leak out of internal core modules. The rollout required touching a number of builtin simprocs and expected server outputs to explicitly suppress or accommodate the new lint.

### **Add a namespace-pollution linter for core** (a53ddb3)
A new `internalModule` linter warns when internal modules declare non-internal names, helping keep Lean's own implementation details from accidentally becoming public API. The change adds the linter infrastructure, test coverage, and the new `linter.coreInternal` option gate.

### **Remove the unused `s` parameter from `ExceptCpsT.runK`** (3d9b6b8)
`runK` no longer takes an unused success-state argument, and the old parameter is now deprecated for compatibility during migration. This is a small public API cleanup that simplifies the CPS exception transformer interface.

### Other misc changes
- Release script updates and related maintenance tweaks.
- Docstring/typo fixes in `Nat.mod`, `Exists`, `Except.map`, and `addBuiltinLinterSet`.
- CMake 4.4 command-line variable handling update.
- Stage0 and small internal housekeeping changes.
