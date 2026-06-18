---
date: 2026-06-17
repo: leanprover/lean4
size: L
title: "Lean4 tightens mvcgen and adds Float models"
excerpt: "A new Float logical model lands alongside mvcgen fixes for specs, dependent lattices, and partial-correctness proofs."
commits: 9
authors: [sgraf812, Kha, TwoFX, Garmelon]
commit_authors: {"8233528": sgraf812, "2b6ce0d": sgraf812, "9226d79": Kha, "314925d": Kha, "b3ba0f0": sgraf812, "e61bb27": sgraf812, "c64b560": TwoFX, "9c8794d": Garmelon}
---

### **Float logical models added for `Float` and `Float32`** (c64b560)
Lean now has `Float.Model` and `Float32.Model` as logical models for the native floating-point types, with substantial supporting infrastructure for unpacking, formatting, comparisons, arithmetic, and conversions. This is a major groundwork change for reasoning about floats in the logic, even though the models are not yet wired in as the official logical model.

### **`mvcgen'` now fails cleanly on dependent assertion lattices** (2b6ce0d)
`mvcgen'` no longer loops forever when its assertion lattice is a dependent function type; it now reports a clear error instead. The solver also treats the function-lattice peel step as optional, which avoids trying to apply `le_of_forall_le` where it cannot work.

### **`@[spec]` support was unified and priority-aware** (b3ba0f0)
Equational and unfold-style `@[spec]` annotations are now registered into the internal spec database at annotation time, preserving their annotated priority for `mvcgen'`. This also rejects malformed specs earlier and avoids repeatedly reconstructing the rule set from `mvcgen_simp` at each call.

### **Specs defined through reducible abbreviations now work** (e61bb27)
`mvcgen` and `mvcgen'` can now recognize `@[spec]` proofs whose type is a reducible abbreviation wrapping a Hoare triple. That fixes cases where the spec was registered but then dropped during lookup because the abbreviation was never reduced.

### **`Std.Do.Triple.observe` adds a partial-correctness bridge** (8233528)
A new lemma lets you turn a triple about an “observed” stateless program into a triple for a different program, which is useful for object-language specifications in `do`-notation. The new tests show it being used to thread boolean monadic predicates through `mvcgen`/`mvcgen'` proofs.

### Other misc changes
- CI now always uses the GitHub-hosted Linux ARM runner for aarch64 (9226d79).
- `requiresModule` test script portability fix for `sed` and shell setup (314925d).
- Stage0 and development-cycle preparation updates (492d7e8, 9c8794d).
