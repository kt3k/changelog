---
date: 2026-11-20
repo: leanprover/lean4
size: L
title: "Lean tightens kernel elimination and speeds cbv"
excerpt: "Major kernel soundness tightening plus several cbv/grind performance and correctness fixes, alongside WP API cleanup and a few module-system changes."
commits: 28
authors: [leodemoura, TwoFX, wkrozowski, Kha, hargoniX, sgraf812, nomeata, david-christiansen, Rob23oba]
commit_authors: {"6a27e3b": nomeata, "5b6d9d2": wkrozowski, "c82712b": wkrozowski, "48f4bfe": wkrozowski, "7a25714": wkrozowski, "450d6b1": TwoFX, "1649eb5": Kha, "1ee6b41": Kha, "a2edf8a": sgraf812, "0e9f5f5": TwoFX, "25d4a4c": leodemoura, "62e0d1a": leodemoura, "48dfba1": leodemoura, "7438ab3": leodemoura, "5f036c8": leodemoura, "5e0d3a5": leodemoura}
---

### **Kernel now forbids large elimination from recursive `Prop` inductives** (6a27e3b)
`Acc.rec` and related recursors are restricted to `Prop` motives, so the kernel no longer needs to reduce proof terms of recursive propositions. Non-recursive subsingleton-style inductives like `Eq`, `And`, `Iff`, `Or`, and `Unit` keep their larger elimination behavior.

### **`cbv` gets a set of performance fixes** (5b6d9d2, c82712b, 48f4bfe, 7a25714)
Several `cbv` paths were optimized at once: cheaper partial-application checks, avoiding exponential re-sharing during beta/zeta reduction, and sharing match reductions and congruence proofs more carefully. Together these target known slow paths and one assertion failure in the `reduceRecMatcher?` case.

### **`grind` gets multiple correctness and speed improvements** (5e0d3a5, 5f036c8, 62e0d1a, 25d4a4c, 7438ab3, 48dfba1)
The tactic now handles more termination/normalization cases correctly, including lambdas in the symmetry normalizer, shared `False` construction, numeral-scaled linear terms, and better propagation of ring equalities. It also speeds up failing matches by splitting a refuting discriminant first.

### **Weakest-precondition API is unbundled and generalized** (a2edf8a)
`Std.WP` is refactored around unbundled `Prop` classes and partial orders, replacing the bundled `WPMonad` setup with `MonadicWP` and friends. This broadens `vcgen` to interpretations beyond complete lattices, including cases with only a partial order.

### **Termination guessing learns custom `WellFoundedRelation`s** (450d6b1)
`GuessLex` can now infer measures for types like `String.Pos` using their own `WellFoundedRelation`, so some recursive definitions no longer need handwritten `termination_by`. Mutual recursion remains limited, but single-recursive definitions get noticeably better automation.

### **Lean now exports fewer proof-only realizations** (1649eb5)
Constants realized only from proofs are no longer exported into modules, which should reduce downstream rebuild churn and make `.olean` contents less sensitive to proof elaboration order. Importers still realize them on demand.

### **`unfold` on non-recursive defs becomes deterministic** (1ee6b41)
`unfold f` no longer depends on whether `f.eq_def` was realized earlier in the session or another module. That removes a source of fragile proof behavior; users who relied on the old extra reduction now need to request it explicitly.

### **`Name.iter` and `Name.revIter` added** (0e9f5f5)
Lean now exposes streaming iterators over name components, with `revIter` avoiding allocations and `iter` providing root-to-leaf traversal. This is a small API addition, but it can help avoid repeated list construction in name-heavy tooling.

### Other misc changes
- Removed experimental `idbg` support.
- Fixed FFI `Bool` alignment in C++ declarations.
- Improved `mkInstanceNameOfType` collision handling for private/public names.
- Fixed docstring highlighting, trace formatting, and several `grind`/`cbv` regressions.
- CI/test maintenance: moved deprecated tests, split `String` tests, and adjusted fsanitize workflow exclusions.
- Internal module/export handling and diagnostic messages were updated to reflect the new realization/export behavior.
