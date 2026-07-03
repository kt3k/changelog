---
date: 2026-07-02
repo: leanprover/lean4
size: L
title: "Lean gets faster select and better doc handling"
excerpt: "Performance wins in async selection and compiler dead-code elimination, plus a docstring overhaul and a few user-facing fixes."
commits: 12
authors: [hargoniX, TwoFX, david-christiansen, ia0, tydeu]
commit_authors: {"2538854": hargoniX, "62e670c": hargoniX, "0b50ada": david-christiansen, "5e84667": TwoFX, "989fca4": ia0, "8ca1cb8": david-christiansen, "ce85346": TwoFX, "1391dbb": hargoniX, "2df8f51": TwoFX, "e281ba8": tydeu}
---

### **Async selection is now cheaper and more stateful** (62e670c)
`Selectable.one`, `Selectable.tryOne`, and `Selectable.combine` now reuse `IO.stdGenRef` instead of calling `getRandomBytes` for every shuffle, reducing overhead in hot paths. The shuffle now also threads the RNG state forward, which should preserve basic fairness while making repeated selection noticeably faster.

### **Deferred Verso docstring checks now use the linter framework** (0b50ada)
Deferred docstring checks were moved onto the existing linter machinery, replacing the custom CI setup and making them configurable via `linter.doc.deferred`. This is also a breaking change for custom Verso docstring elements, which now use a two-constructor representation separating ordinary custom elements from deferred-check elements.

### **`bv_decide` now uses extensionality for structures** (1391dbb)
Structure handling in `bv_decide` was rewritten to look for `ext_iff` lemmas and use them during normalization instead of relying on the older injectivity-based path. That should improve the tactic's ability to reason about structure equality, but it may require users to add `@[ext]` or extensionality lemmas for some structures that previously worked implicitly.

### **Coinductive docstrings and `afterCompilation` attributes are fixed** (8ca1cb8)
Verso docstrings now elaborate correctly on `coinductive` declarations and their constructors, avoiding the binder interpretation failure that previously occurred with `doc.verso`. The change also moves docstrings and `afterCompilation` handling into inductive postprocessing so coinductives behave more like inductives here.

### **Lake restores executable permissions correctly** (e281ba8)
Restored cached executables now have their executable bit reapplied even if the cached artifact itself was not executable, which covers cases like artifacts fetched via `lake cache get`. This fixes a real usability issue where restored binaries could fail to run after cache operations.

### **Dead-code elimination avoids a performance trap** (ce85346)
`LCNF.ElimDead` switches `UsedLocalDecls` from a hash set to a tree set because the set is sometimes used non-linearly. This is a targeted compiler performance fix for large `do` blocks and similar workloads.

### Other misc changes
- Benchmark added for `Selectable.one` fast path (2538854)
- Stage0 updates (390cdf5, fbe3221)
- Type annotation cleanups, including a small vector-index behavior fix (5e84667)
- Documentation typo fix in `Quot` (989fca4)
- Minor internal refactors and cleanup (2df8f51)
