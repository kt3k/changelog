---
date: 2026-10-06
repo: leanprover/lean4
size: M
title: "Lean fixes grind, VCGen, and Lake"
excerpt: "A mix of important correctness fixes, two performance wins, and a few new syntax/VCGen capabilities landed today."
commits: 14
authors: [leodemoura, hargoniX, sgraf812, Kha, rbeauchamp, carlohamalainen, Garmelon]
commit_authors: {"4656f09": leodemoura, "0f6e0e9": rbeauchamp, "e51e86f": sgraf812, "cd842b6": leodemoura, "3dc0360": hargoniX, "1bc0c1c": carlohamalainen, "f93a70a": Garmelon, "c659118": Kha, "2369f26": sgraf812, "80fbe9c": hargoniX, "4d609df": hargoniX, "6f79a3e": Kha, "03eeb6f": leodemoura, "3e3b5b1": leodemoura}
---

### **Grind and VCGen get a round of correctness fixes**
`grind` now handles proof-only hint holes correctly, avoiding an internal error from ground patterns that captured free variables in nested proofs (cd842b6). VCGen also gained support for splitting `∃` and `⨆` preconditions over propositions on the RHS of entailments, which lets verification conditions make progress more reliably (e51e86f).

### **Lake now fetches partial facets under resolved keys**
Facet requests that come in through package-elided, package-named, or module forms now resolve to the same build-store key as direct target requests, fixing a cache/key mismatch in Lake (0f6e0e9). The change is backed by regression coverage for all three request styles.

### **Runtime and import-path performance improve**
The Lean IR interpreter now returns symbol-cache entries by reference instead of copying them, trimming lookup overhead in the interpreter hot path (3dc0360). Lean module imports also reuse imported environment extension entries outside the language server, cutting redundant work and reducing Mathlib import time by about 6% (6f79a3e).

### **`sym` arrow proofs work in modules again**
`Lean.Arrow` is now exposed so `sym => simp` can type-check its linear arrow-telescope proof terms inside modules without kernel errors (4656f09). This fixes a regression in `sym` on goals involving non-dependent arrows.

### **VCGen lattice decomposition becomes more expressive**
VCGen’s lattice splitting machinery was generalized to be driven by `splitLatticeOp?`, and it now knows how to decompose existential and propositional supremum forms as first-class lattice operators (e51e86f, 2369f26). That makes entailment solving work on a broader class of proposition-indexed lattice goals.

### **`grind` and `sym` handle more edge cases**
`grind`’s upward propagation was fixed to run from the `toProcess` queue to avoid internalization ordering bugs, and `Sym.Arith.classify?` now safely handles carriers in `Sort u` instead of tripping on universe-level assumptions (03eeb6f, 3e3b5b1). `grind` also stopped using the old “generate while reifying” path that caused another internal error in ring reification (03eeb6f, cd842b6).

### Other misc changes
- Added `private variable` / `public variable` syntax, currently accepted as no-ops (c659118)
- Disabled the mathlib4 nightly-testing workflow step and async ASAN CI tests (f93a70a, 80fbe9c)
- Small HTTP server fix for generating `Date` without a timezone database (1bc0c1c)
- Closure/runtime fast-path work for high-arity application handling (4d609df)
- Internal refactors and doc/comment updates in grind, VCGen, and import finalization (03eeb6f, 6f79a3e, e51e86f)
