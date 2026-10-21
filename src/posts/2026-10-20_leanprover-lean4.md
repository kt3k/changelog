---
date: 2026-10-20
repo: leanprover/lean4
size: L
title: "Lean 4 lands major grind and VCGen fixes"
excerpt: "A day of substantial proof-engine work: `lia`/`grind` got multiple kernel-fix regressions handled, plus a new `vcgen +jp` mode."
commits: 22
authors: [leodemoura, arthur-adjedj, sgraf812, TwoFX, nomeata, mhuisi]
commit_authors: {"70acba1": leodemoura, "9e6de59": leodemoura, "1f7c91a": leodemoura, "4307c8e": leodemoura, "1df3115": leodemoura, "0b30632": leodemoura, "a5168dd": sgraf812, "9a2a8e0": leodemoura}
---

### **`lia` now normalizes dependent integer constraints correctly** (70acba1)
`lia` no longer misses proofs or trips kernel errors when integer terms and inequalities appear in dependent positions that the preprocessor can’t rewrite. The solver now detects when it must normalize such expressions itself, and it logs which path it took via a new debug trace.

### **Divisibility handling in `lia` got stronger and more robust** (1f7c91a)
`lia` now normalizes divisibility constraints by reducing coefficients modulo the divisor and can tighten bounds whenever values are known modulo a divisor of `d`. This expands the class of goals it can solve without expensive residue-case splits, especially on large moduli.

### **`grind` fixes binder-heavy equality abstraction** (9e6de59)
`abstractGroundMismatches?` now uses the correct argument order for abstracted terms and caches results by binder offset as well as the term pair. That fixes kernel/internal errors on equalities involving binders, including cases triggered by `grind [f]` on unfolded definitions.

### **`vcgen +jp` proves shared join-point code once** (a5168dd)
Verification condition generation can now factor out code shared after an `if` or `match` into a join point and discharge it once instead of duplicating it across branches. This turns branch-explosion from exponential to linear in the number of splits, which should matter a lot for larger proof-producing programs.

### **`grind` learned a series of soundness and normalization fixes** (9e6de59, 4307c8e, 1df3115, 0b30632, 9a2a8e0)
Several regressions in `grind` were addressed: binder-related equality abstraction, divisibility model-search looping, nested numeral canonicalization, `Float` literal handling, and constant-function propagation. Together these are kernel-safety and completeness fixes for common arithmetic/proof-search paths.

### **Other misc changes**
- `fun_cases` / `fun_induction` fixes for dependent matches.
- Deprecation warnings now surface in more macro-expanded syntax.
- Eta-expansion and smart-unfolding improvements for structure/recursor handling.
- Pretty-printer formatting fix for antiquotations on the left of trailing syntax.
- Stage0 updates and assorted test additions/expected-output updates.
