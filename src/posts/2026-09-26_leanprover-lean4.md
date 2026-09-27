---
date: 2026-09-26
repo: leanprover/lean4
size: L
title: "Lean4 boosts `grind` on bitvecs and fields"
excerpt: "`grind` learns new bit-vector homomorphisms, signed `signExtend` reasoning, and stronger arithmetic normalization in fields."
commits: 6
authors: [leodemoura, andres-erbsen]
commit_authors: {"946e891": leodemoura, "443f650": leodemoura, "51e162c": leodemoura, "51a24c3": andres-erbsen, "a0e5696": andres-erbsen, "6562e9d": leodemoura}
---

**`grind` gets constant-mask `&&&` support on `Nat`/bitvecs** (946e891)
A new homomorphism rule rewrites masks of the form `1…10…0` into `%`, `/`, and `*`, letting `cutsat` handle more bitwise goals directly. This unlocks reasoning about common mask patterns over `Nat`, `BitVec`, and fixed-width integer types.

**`Sym.Arith` now cancels atoms against their inverses in fields** (443f650)
The arithmetic normalizer can now simplify expressions like `x * x⁻¹`, `a * b / a`, and `a ^ 3 / a` when a discharger proves the relevant atom is nonzero. That makes `Sym.simp` and `arith` materially stronger on field goals, including context-sensitive simplifications driven by hypotheses.

**`Sym.Arith` treats numeral inverses as rational coefficients** (51e162c)
In characteristic-zero fields, inverse numerals are now folded into rational-style coefficients instead of staying as opaque atoms. This improves normalization of sums and equations with denominators, such as turning `a / 2 + b / 3 = 1` into a denominator-free polynomial relation.

**`grind` learns `BitVec.ofInt` and signed `signExtend` homomorphisms** (51a24c3, a0e5696)
`grind` can now track the unsigned value of `BitVec.ofInt` and the signed value of `BitVec.signExtend`, which helps it follow carries and narrowing/widening behavior more precisely. These rules close several previously disabled intblasting-style examples.

**`grind` gets a broader bitvec homomorphism test suite** (6562e9d)
A large port of intblasting-prototype tests landed for `BitVec`, `Fin`, `UInt64`, `Int64`, and mixed list/word arithmetic. This gives much better coverage for the homomorphism layer and documents the current proof frontier.

### Other misc changes
- New helper lemmas and imports to support the above `grind`/`Sym.simp` work.
- Minor test-suite reshuffling and TODO updates in `tests/elab`.
- Small internal solver plumbing updates for `BitVec` and arithmetic normalization.
