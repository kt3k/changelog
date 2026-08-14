---
date: 2026-08-13
repo: leanprover/lean4
size: L
title: "Lean4 gets VCGen split and stronger defeq"
excerpt: "Major VCGen namespace/module rework, better `vcgen` docs, a defeq heuristic change, and two runtime fixes: a borrowed-scalar leak and a performance regression."
commits: 9
authors: [sgraf812, datokrat]
commit_authors: {"def75fd": sgraf812, "0bfd592": sgraf812, "bc59d63": sgraf812, "ae17c03": sgraf812, "537e47a": sgraf812, "ff241b9": sgraf812, "5847d9b": datokrat, "0f051d9": sgraf812}
---

### **`vcgen` is documented in depth** (def75fd)
`vcgen` now has a full docstring instead of a placeholder, so `#help tactic vcgen` and the reference manual explain its contract, syntax, and options. The new docs clarify that it works over any `WP`-interpreted program type, not just monads, and describe `until`, `frames`, `with`, and invariant suggestions.

### **`vcgen` moves to `Lean.Elab.Tactic.VCGen`** (bc59d63)
The tactic was renamed/re-homed out of `Lean.Elab.Tactic.Do.Internal` into a public `Lean.Elab.Tactic.VCGen` namespace, with its modules moved to match. This is a notable API/namespace cleanup: `vcgen` is now the generic name, while `mvcgen` remains available separately for now.

### **Weakest-precondition modules are split into generic vs monadic layers** (0bfd592)
The `Std.Internal.Do` codebase was reorganized so generic `WP`/triple machinery is separated from monad-specific material. This makes the verification infrastructure work more cleanly for non-monadic program types and preserves the existing `import Std.Internal.Do` surface while moving the implementation toward `Std.WP`/`Std.WP.Do`.

### **Order and frame-closure infrastructure is moved out of `Do`** (537e47a, ae17c03)
The lattice/order API used by `vcgen` was extracted into `Std.Internal.Order`, and `PredTrans` plus frame closure were moved there as well. This is a substantial refactor that reduces `Do`-specific coupling and makes the frame-closure machinery live alongside the order abstractions it relies on.

### **Definitional equality now defers stuck exceptions more intelligently** (5847d9b)
`isDefEqApp` no longer immediately bails out on certain stuck cases; instead, Lean can continue with later heuristics before re-throwing. This should improve both robustness and performance in unification and instance search, with a compatibility option to restore the old behavior.

### **IR interpreter: borrowed scalar params no longer leak** (0f051d9)
A memory leak in the IR interpreter was fixed for compiled calls reached through borrowed scalar arguments. The runtime now handles these parameters as owned, matching the IR lowering change that drops borrow annotations on scalar parameters.

### **VERINA benchmark converted to intrinsic verification** (ff241b9)
The VERINA benchmark was rewritten so each program carries its own `requires`/`ensures` and loop invariants directly, instead of maintaining separate spec theorems and adapters. This aligns the benchmark with the new intrinsic-verification workflow and exercises the updated `vcgen` path.

### **Other misc changes**
- `vcgen`/order imports and namespace updates across several files
- Added/updated tests for borrowed scalar externs and VCGen behavior
- Small supporting refactors in `Std.Internal.Do` and `Lean.Elab.Tactic`
