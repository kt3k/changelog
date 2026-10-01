---
date: 2026-09-30
repo: leanprover/lean4
size: M
title: "Grind gets a bugfix pass"
excerpt: "Key `grind` regressions were fixed, along with new normalizer coverage and a small e-matching tuning pass."
commits: 6
authors: [leodemoura, hargoniX, datokrat]
commit_authors: {"77f336f": leodemoura, "d9cc637": leodemoura, "0689378": leodemoura, "82fdd8e": leodemoura, "22d279f": hargoniX, "d6ab933": datokrat}
---

### **`grind` fixes goal normalization and forall handling** (d9cc637)
`grind` now normalizes the goal before negating it, fixing a regression where some implications proved via `[grind norm]` were no longer discharged. The normalizer also stops rewriting `(∀ x, p x) → q` into a disjunction, keeping the shape that `grind` expects and restoring a class of proofs involving quantified antecedents.

### **`grind` hom hooks now tolerate let-unfolding in literals** (82fdd8e)
The homomorphism rewriter now builds equality facts without re-checking them through `Meta.isDefEq` in cases where `zetaDelta` and ground evaluation change the visible type. This fixes an `Application type mismatch` on let-bound bitvector literals and closes a real `grind` failure mode for equality and disequality hooks.

### **`Sym.simp` learns `Char.val` ground evaluation** (0689378)
`Sym.Simp.evalGround` now evaluates `Char.val` on character literals, so expressions like `'a'.val` reduce to their numeric code point. That brings the new normalizer in line with the legacy one and removes a `grind_norm` discrepancy.

### **`grind` e-matching is made less aggressive** (22d279f)
Some array and vector range annotations were dialed back to avoid triggering extra cross-theory reasoning. This is a performance-oriented tweak that should reduce unnecessary e-matching work without changing user-facing behavior.

### **Other misc changes**
- New `grind_norm` probe coverage for ground evaluation, binders, `let`/`have`, `match`, and `grind` attributes (77f336f)
- Test hardening for `nestedDecidable`/kernel interaction (d6ab933)
- Small internal helper refactors around equality construction and `grind` normalizer plumbing (d9cc637, 82fdd8e)
- `grind_lint` / array-range test updates to match the new theorem annotations and output expectations (22d279f)
