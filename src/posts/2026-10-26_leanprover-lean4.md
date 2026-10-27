---
date: 2026-10-26
repo: leanprover/lean4
size: L
title: "Lean adds proofs folding, syntax deprecations"
excerpt: "New proof-folding LSP support, syntax deprecation via attributes, a vcgen simp attribute, and several correctness/perf fixes landed."
commits: 20
authors: [TwoFX, leodemoura, mhuisi, Garmelon, sgraf812, Rob23oba]
commit_authors: {"20dfdd5": sgraf812, "6ca8f97": TwoFX, "385d784": TwoFX, "40fbc23": TwoFX, "eb09211": TwoFX, "f148b89": Rob23oba, "2c24809": TwoFX, "a733d87": TwoFX, "73f954d": mhuisi}
---

### **Proof folding ranges now expose theorem/proof bodies** (73f954d)
Lean’s LSP folding support now distinguishes declaration proofs from generic regions, letting clients fold theorem bodies as a dedicated kind. The server also starts emitting declaration-value info earlier, so proof ranges can be reported without waiting for async elaboration to finish.

### **`@[deprecated]` can now deprecate syntax declarations directly** (a733d87)
Applying `@[deprecated]` to `syntax`, `macro`, `elab`, `notation`, and related mixfix commands now marks the declared syntax as deprecated, matching `deprecated_syntax` behavior. This removes a common source of duplicated deprecation plumbing and enables the linter to warn on use of the syntax itself.

### **`@[vcgen_simp]` adds a new simp collection for `vcgen`** (20dfdd5)
A new attribute collects `Sym.simp` theorems specifically for the `vcgen` tactic. That gives proof-generation code a dedicated simplification pool instead of relying on ad hoc theorem selection.

### **`Char` gains the missing order instances** (385d784)
`Char` now has `Min`/`Max` and the associated lawfulness proofs, filling out its order API. This makes character order available to generic ordered code without special cases.

### **TC cache normalization now bails on non-fvar local instances** (40fbc23)
Typeclass cache normalization no longer tries to treat local instances that are not free variables as if they were. That fixes an observable cache-key bug introduced by the deriving framework, where normalizing metavariable-backed local instances could produce incorrect cache hits or misses.

### **Non-GMP bignum edge cases are fixed** (eb09211)
Lean’s hand-rolled `mpz` implementation now avoids an overflow in `get_int`, drops an overly strict `get_size_t` assertion, and rewrites exponentiation to handle powers more safely. The accompanying tests cover boundary cases for `Nat`, `Int`, and `USize` conversions.

### **Deprecated-syntax false positives are reduced further** (2c24809)
The deprecated-syntax linter now avoids reporting deprecations that only appear in the expansion of already-deprecated terms. This trims another class of noisy warnings in elaborated code.

### **Instance-name generation is centralized** (f148b89)
Lean adds `mkInstanceNameOfType` and switches delta-deriving to use it. That makes instance naming consistent across the elaborator instead of duplicating the logic in one derivation path.

### **`String`/`Char` Grove data is refreshed** (6ca8f97)
The Grove-generated docs were updated with newly recorded order-instance data for `String`, `String.Slice`, and `Char`. This is documentation metadata only, but it keeps the generated reference in sync with stdlib changes.

### Other misc changes
- Performance work across `grind`, environment-extension lookups, `whnf`, and quick prop/type predicates.
- Stage0/bootstrap updates.
- Small repo hygiene/docs/config tweaks, including measurement fix and VS Code/Tombi config.
- Additional tests and generated data updates for the above changes.
