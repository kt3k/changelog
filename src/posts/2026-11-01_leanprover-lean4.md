---
date: 2026-11-01
repo: leanprover/lean4
size: L
title: "Lean4 tightens grind and speeds the core"
excerpt: "New grind capabilities, multiple symmetry/universe fixes, and several interpreter/meta performance wins landed in one busy day."
commits: 12
authors: [leodemoura]
commit_authors: {"b1204e2": leodemoura, "6178d4e": leodemoura, "40b9bd6": leodemoura, "55bdc9a": leodemoura, "95d7b99": leodemoura, "27afe47": leodemoura, "42f8024": leodemoura, "dbac646": leodemoura, "8bca63d": leodemoura, "aa363b4": leodemoura, "6df1f77": leodemoura, "b21ac79": leodemoura}
---

### **`grind` gets stronger disjunction handling and a new branch budget** (b21ac79, 6df1f77)
`lia`/`grind` now derive linear bounds from every disjunct in an `or` hull, avoiding exponential case splits on join-point-style goals. The split limit was also reworked from a per-branch depth cap to a global `branches` budget, so proof search can keep going through long chains of cheap splits without failing early.

### **`Sym` universe matching and level unification are made robust** (b1204e2, 55bdc9a)
`Sym` now correctly matches theorem universe variables even when they first appear under `max`, fixing mis-instantiation in pattern rewriting and related tactics. Universe-level unification also now avoids cyclic assignments and overwriting existing ones, preventing stack overflows and proof terms with dangling universe metavariables.

### **`Sym.simp` arithmetic learns more field and ground-term rewrites** (40b9bd6, 95d7b99, 27afe47, 6178d4e)
The arithmetic normalizer now handles `Int`-exponent powers in fields, rewrites division above `maxChar` back into a multiplicative form, and evaluates ground `Nat`/`Int`/`Rat` subterms directly by `rfl` for cheaper kernel checking. It also fixes a `grind` MBTC bug around `Nat` numerals in products, quotients, and remainders, reducing spurious nonlinear case splits.

### **Interpreter and meta caches shave noticeable build time** (dbac646, aa363b4, 42f8024, 8bca63d)
The IR interpreter now evaluates several scalar and array primitives in place, adds a pointer-keyed callee cache, and caches default unfoldings of definition applications. `Simprocs.add` also stops doing expensive fallback lookups for builtin simprocs, cutting fixed overhead in `grind` and `lia`.

### Other misc changes
- `grind`/`lia` config and docs updated for the `branches` rename, with deprecated `splits` handling.
- Misc `Sym` arithmetic normalizer refactors and helper cleanup.
- New regression tests across `grind`, `lia`, `sym`, the interpreter, and universe-level unification.
