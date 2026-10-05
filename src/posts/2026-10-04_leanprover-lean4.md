---
date: 2026-10-04
repo: leanprover/lean4
size: L
title: "Lean4 hardens grind and speeds typeclass cache"
excerpt: "Multiple grind soundness fixes, a new Sym-based normalizer path, and major typeclass resolution cache work landed today."
commits: 17
authors: [leodemoura, Kha]
commit_authors: {"1909109": Kha, "e321b5d": leodemoura, "d2d056a": leodemoura, "058ddbd": leodemoura, "13147e4": leodemoura, "2c2a96f": Kha, "d8c07ad": Kha, "20a2063": Kha, "fc52110": Kha, "280f212": Kha, "e5d5d2a": Kha, "7b82ce8": leodemoura, "c884473": leodemoura, "991b617": leodemoura, "3b04c6c": leodemoura, "63fa4d6": leodemoura}
---

### **`grind` gets a safer `Sym`-based normalizer path** (3b04c6c)
`grind` now has a `backward.grind.normalizer` option to switch between the legacy normalizer and the new `Sym.simp`-based one, with the old behavior still the default. This also exposes the integer certificate checkers used by the `Sym.Arith` normalizer, making the new path usable for module-scoped arithmetic certificates.

### **`grind`’s `Sym` normalizer grows a `dsimp` pass and better theorem handling** (13147e4)
The `Sym.simp`-based normalizer now runs an added `Sym.dsimp` pass after simplification, which reduces beta-redexes and projections left in fixed application arguments. That closes a class of misses in E-matching and brings the new normalizer closer to the legacy `simp`-based behavior.

### **Several `grind` soundness fixes for arithmetic and canonicalization** (d2d056a, e321b5d, 058ddbd, 7b82ce8, c884473, 991b617, 63fa4d6)
Today’s `grind` work fixes multiple kernel-rejected proof bugs: numeral casts are now rewritten more aggressively, `Fin` literals are canonicalized more consistently, field-inverse rules only accept the intended numeral spellings, and projection reduction is done at reducible transparency so patterns don’t collapse unexpectedly. It also patches stale congruence-table entries around `match` conditions and `ite`, and teaches the `Sym.simp` path to respect `match` annotations and evaluate a few more integer/unsigned-number ground terms.

### **Typeclass resolution cache becomes persistent and more precise** (d8c07ad, 2c2a96f, fc52110, 20a2063, 1909109, e5d5d2a, 280f212)
Typeclass search now has a persistent cache tier across commands, plus free-variable normalization so structurally identical queries in different local contexts can share entries. The cache invalidation story was tightened at the same time: declaration-keyed extension writes are now logged and write-once, declaration generations are tracked, and unrecorded extension reads during dependency recording now panic instead of silently creating stale cache hits.

### Other misc changes
- Stage0 update (1 commit)
- Docstring/linter cleanup for exported declarations and iterators (2 commits)
- Internal refactors and plumbing around `Sym` proof-instance lookup and cache state (several commits)
