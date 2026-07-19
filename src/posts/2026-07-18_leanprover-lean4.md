---
date: 2026-07-18
repo: leanprover/lean4
size: M
title: "Grind gets homo rules and two key fixes"
excerpt: "Lean4 adds a new `@[grind homo]` attribute, plus fixes for `grind` performance and canonicalization bugs, and a private-export regression."
commits: 7
authors: [leodemoura, plp127, Kha]
commit_authors: {"5fe1ea9": leodemoura, "79d62bd": plp127, "bb32c6c": leodemoura, "ca190c9": leodemoura, "5adc1e7": Kha, "49ff957": leodemoura}
---

### **Add `@[grind homo]` for homomorphism rules** (5fe1ea9)
Lean’s `grind` tactic now has a dedicated `homo` attribute for registering homomorphism rules, meant to translate source-domain operations into a target solver domain. This is the first step toward replacing the `ToInt`-based approach in `grind`, and it comes with new docs, parser support, and a test for bitvector-to-nat style rules.

### **Avoid expensive definitional equality checks in `grind` match-condition handling** (ca190c9)
`grind` now avoids calling `isDefEqD` on arbitrary non-pattern-like hypotheses that merely resemble `match` conditions, which could trigger very expensive reductions and timeouts. The tactic first consults congruence closure and only falls back to definitional equality checks when the right-hand side looks like a real pattern (constructor, literal, or metavariable).

### **Fix wrapped nested proofs in the grind canonicalizer** (49ff957)
The canonicalizer no longer resynthesizes unwrapped nested proposition proofs in binder bodies skipped by preprocessing, preventing closed proofs from losing the `Grind.nestedProof` wrapper. That avoids splitting equivalent terms in congruence closure and fixes missed contradictions in `grind`.

### **Restore ambient exporting scope in `mkAuxDefinition`** (5adc1e7)
A regression in auxiliary-definition generation is fixed so private references inside exposed bodies stay unexported. This prevents dangling private constants from leaking into exported aux definitions and breaking downstream imports, especially in Mathlib.

### Other misc changes
- Pretty-printing fix for reverse attributes like `@[simp ←]` and related syntax cleanup (79d62bd)
- Added regression tests for issue #14440 (bb32c6c)
- Stage0 refresh and generated C artifacts update (25ba8c3)
