---
date: 2026-05-24
repo: leanprover/lean4
size: L
title: "Lean4 adds SymM dsimp and new simprocs"
excerpt: "Lean4 adds a new `SymM`-based `dsimp`, binder simplification, and reusable reduction simprocs for beta/zeta/projections."
commits: 3
authors: [leodemoura]
commit_authors: {"07dd2c9": leodemoura, "5c6e3b1": leodemoura, "ee66ef2": leodemoura}
---

### **Lean4 now has a full `SymM` `dsimp` pipeline** (ee66ef2)
This adds the basic infrastructure for definitional simplification in `SymM`, with a new public `Lean.Meta.Sym.DSimp` module exported from `Sym`. It lays the foundation for composing `dsimp` into the broader symbolic meta API.

### **`Sym.dsimp` can now simplify binders** (5c6e3b1)
Lambda, `forall`, and `let` forms now recurse through binder types and bodies instead of stopping at the outer shape. That makes `dsimp` much more useful on dependent terms, where simplification often has to happen under binders to expose the real redexes.

### **Reusable reduction simprocs and bug fixes for `Sym.dsimp`** (07dd2c9)
This adds public reduction simprocs for beta, zeta, projection reduction, and match reduction, so callers can assemble custom reduction strategies. It also includes bug fixes to `Sym.dsimp`'s recursive behavior and application reconstruction, which should make the new simplifier more reliable in practice.

### Other misc changes
- Minor internal import/export cleanups in the new `DSimp` modules
- Small `DSimproc.andThen` and `let` reconstruction adjustments
- Added `sym_dsimp` test coverage
