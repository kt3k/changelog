---
date: 2026-11-22
repo: leanprover/lean4
size: L
title: "Grind gets smarter, funind fixed, leanchecker hardened"
excerpt: "Major theorem-proving improvements landed across `grind`, functional induction, and equation lemma generation, plus a leanchecker replay-map safety fix."
commits: 13
authors: [leodemoura, nomeata, Kha]
commit_authors: {"3208192": nomeata, "4e48c96": nomeata, "a9b5b8a": nomeata, "71874e6": nomeata, "5ec4e0b": leodemoura, "bd50d7e": leodemoura, "6f111b1": leodemoura, "56a0e0a": leodemoura, "d0fef00": leodemoura, "35876dc": leodemoura}
---

**`grind` learns fact filtering and new arithmetic reasoning** (bd50d7e, 35876dc, 56a0e0a)
`lia`/`grind` now skip irrelevant hypotheses by default, which should speed up arithmetic proofs and avoid wasted preprocessing on unrelated data. The solver also gains better bound propagation through nested `and`/`or` structure, and `grind_pattern` now normalizes guard terms consistently so patterns match what the normalizer actually produces.

**Functional induction now handles more recursive-call shapes** (3208192, a9b5b8a, 71874e6)
`funind` was fixed for recursive calls that appear partially applied, under `match`es, or beneath binders inside `match` alternatives. These cases previously produced kernel errors or failed to derive an induction principle at all; the new handling makes induction hypotheses line up with the refined recursive-call types.

**Equation lemma generation is more precise for non-variable discriminants** (5ec4e0b, 6f111b1, d0fef00)
`match` equation lemmas now simplify away redundant overlap hypotheses and can close branches when discriminant equalities force different literals apart, including nested literals inside constructors. This removes vacuous or bloated hypotheses and fixes several failure modes in `cases`/`unifyEq?` for literal-heavy patterns.

**`leanchecker` now rejects replay maps with mismatched constant names** (4e48c96)
The replay path now verifies that each map key matches the `ConstantInfo` stored under it, closing a hole where `.olean` metadata could be keyed under the wrong name and skip kernel comparison. This hardens `leanchecker` across plain, `--fresh`, and `--from-export` loading paths.

### Other misc changes
- `Meta.getUnfoldableConstNoEx?` no longer waits on theorem bodies for unfoldability checks.
- Bundled `lean4lean`/`nanoda` checker forks were pinned to accept certain recursive `Prop` inductives.
- `grind_primes` test updated for the new `Sym.simp` normalizer.
