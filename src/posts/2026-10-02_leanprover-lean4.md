---
date: 2026-10-02
repo: leanprover/lean4
size: M
title: "Lean4 adds Fin and modular ring solving"
excerpt: "`Sym.simp` now evaluates `Fin` literals/functions, and `grind` can solve certain equations in nonzero characteristic."
commits: 2
authors: [leodemoura]
commit_authors: {"4636786": leodemoura, "7c383e2": leodemoura}
---

**`Sym.simp` now evaluates `Fin` literals and ground operations** (4636786)
`evalGround` learned to reduce `Fin` constructors and operations on literal inputs, including `succ`, `rev`, `last`, `val`, `pred`, casts, and `ofNat`. This lets expressions like `(7 : Fin 5)` normalize to `2`, and it also helps `grind` because its ground rewriter shares this evaluation path.

**`grind` can solve simple equations in nonzero characteristic** (7c383e2)
The arithmetic normalizer now uses modular inverses to solve equations like `k * m + k' = 0` or `k * m₁ = k * m₂` over commutative rings with nonzero characteristic, including `Fin`, `UInt8`, and `BitVec`. This makes `grind` stronger on modular arithmetic goals, turning cases like `4 * x + 2 = 0` in `Fin 5` into `x = 2`.

### Other misc changes
- `grind_norm` discrepancy reporting got clearer when differences are hidden by pretty-printing.
- New/expanded tests for `grind` and `Sym.simp` ground normalization.
