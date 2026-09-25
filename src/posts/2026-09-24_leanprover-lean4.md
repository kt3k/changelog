---
date: 2026-09-24
repo: leanprover/lean4
size: L
title: "Lean4 strengthens grind, wp, and sym tactics"
excerpt: "Security, tactic, and arithmetic improvements span grind activation fixes, vcgen/WP migration, and broader Sym.Arith support."
commits: 11
authors: [leodemoura, sgraf812, emerardd, Kha]
commit_authors: {"28e5513": leodemoura, "7a10508": leodemoura, "d62c140": emerardd, "b8cd058": sgraf812, "dd8693c": sgraf812, "2c2bdd9": leodemoura, "48aaa6f": leodemoura, "be249fd": leodemoura}
---

### **Grind now activates theorems hidden behind binders and literals** (28e5513)
`grind` was missing E-matching theorems whose ground patterns mention lambdas, dependent `∀` binders, or nonparametric literals like chars and negative ints. Those theorems are now indexed and activated correctly, fixing cases where otherwise-relevant lemmas never fired.

### **`vcgen` gains pointwise exception VCs and custom `throws` support** (b8cd058)
`vcgen` now generates pointwise verification conditions for richer exception postcondition types, including custom types via `ToEStack`. This makes `throws` clauses usable beyond `Except ε`, so specs can quantify over individual thrown values instead of comparing higher-order postcondition functions.

### **`vcgen` moves into `Std.WP` and `Std.Do` proof mode is deprecated** (dd8693c)
The tactic surface was relocated to `Std.WP.Tactic`, and `import Std.WP` now brings `vcgen` into scope. Calls to the old `Std.Do` proof-mode tactics now emit deprecation warnings pointing to the new API, setting up the module split cleanly.

### **`Sym.Arith` now handles non-commutative rings and semirings** (48aaa6f)
The arithmetic normalizer was extended to preserve factor order in non-commutative structures, so expressions like `(a + b)^2` normalize without assuming commutativity. This broadens `Sym.simp`/`arith` to more algebraic settings and adds dedicated `_nc` reflection theorems to justify the new behavior.

### **`Sym.Arith` gains field normalization for division and inverses** (2c2bdd9)
The normalizer now rewrites field terms such as division and inverses into a polynomial-friendly form, including rules like `a / b ↦ a * b⁻¹`, inverse distribution over products, and simplifications for `0⁻¹` and `1⁻¹`. That lets `arith` simplify many field expressions more aggressively before reflection.

### **`Sym.Arith` now normalizes relations modulo characteristic** (be249fd)
Relation normalization now respects the ring characteristic, so equalities and inequalities over finite-characteristic rings can close after coefficient reduction. This adds dedicated reflected theorems for characteristic-aware relation proofs and improves `Sym.simp` on modular arithmetic goals.

### **`Sym.dsimp` fixes dependent binder abstraction** (7a10508)
Binder types in telescopes are now abstracted using the correct prefix of earlier variables, avoiding dangling free variables in dependent `∀`/`λ` types. This fixes `Sym.dsimp` and downstream tactics like `bv_decide` on dependent binders.

### **`Sym.simp` rebuilds `have` telescopes in the right dependency order** (d62c140)
When reconstructing nested `have`s, `Sym.simp` now applies `beta` with dependencies in the order expected by the kernel. That prevents ill-typed proof terms when later `have`s depend on multiple earlier ones.

### **Other misc changes**
- Fix `grind` indexing for binder/literal ground patterns.
- Security fix in `sharecommon_quick_fn` to panic on reference overflow.
- Rename lattice lemmas to Std naming conventions.
- Minor `vcgen`/`WP` internal refactors and test updates.
