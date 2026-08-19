---
date: 2026-08-18
repo: leanprover/lean4
size: L
title: "Lean gains kernel fixes and grind upgrades"
excerpt: "A mix of serious kernel soundness fixes, grind canonicalization work, and new verification/WP features landed today."
commits: 22
authors: [sgraf812, leodemoura, hargoniX, wkrozowski, TwoFX, jt0202]
commit_authors: {"6310719": sgraf812, "8426679": leodemoura, "16e77c4": sgraf812, "66edbe0": leodemoura, "3e77766": wkrozowski, "b80e849": sgraf812, "2d268e9": sgraf812, "25dacd7": sgraf812, "a8ec7f8": sgraf812, "0bdfa79": sgraf812, "de18327": leodemoura, "e4be9b5": sgraf812, "ee1b07e": TwoFX, "9d0aa5e": hargoniX, "a46c2a6": sgraf812, "b8ba597": jt0202, "9319b09": hargoniX, "dec70ee": leodemoura, "7412bc4": leodemoura, "d108aae": leodemoura}
---

### **Kernel `is_def_eq` caching is now order-independent** (d108aae)
The kernel no longer uses the old equivalence-manager cache that could make equality results depend on query order. This fixes a soundness issue where earlier successful `is_def_eq` checks could wrongly influence later ones.

### **Kernel rejects malformed proposition checks correctly** (7412bc4)
`is_prop` now requires the inferred type to reduce to an actual sort, instead of silently treating stuck terms as non-propositions. That closes a soundness hole in projection inference where proof-irrelevance checks could be bypassed.

### **Generated recursors are now type-checked in the kernel** (dec70ee)
The kernel now verifies synthesized recursors and their computation rules before accepting them. This adds a defensive layer against malformed recursors entering the kernel unchecked.

### **`grind` now canonicalizes numeric literals consistently** (66edbe0)
Literal normalization was extended to cover wrapped numeric types like `Fin`, `BitVec`, and fixed-width integers, so equivalent literals normalize to the same term. This fixes a real `grind` bug and prevents inconsistent internal value nodes.

### **Transitive deprecations now warn when pointing at deprecated targets** (3e77766)
The `@[deprecated]` attribute now warns if its replacement is already deprecated, and suggests skipping directly to the newer target when possible. This should help avoid chains of stale deprecations.

### **Intrinsic verification syntax is marked experimental** (b80e849)
`requires`, `ensures`, `assert`, `invariant`, and `decreasing` now emit warnings unless `experimental.intrinsic` is enabled. The change makes the status of this syntax explicit without removing functionality.

### **VC generation now head-reduces emitted conditions** (6310719)
`vcgen` simplifies verification conditions before presenting them, so trivial cases close earlier and generated goals are easier to read. The cleanup pass was also renamed from `solveTrivialConjuncts` to `cleanupVC`.

### **`Std.WP` gets conjunctive Hoare lemmas and soundness cleanup** (a8ec7f8)
New lemmas `Triple.and`, `Triple.mp`, and `Triple.observe` let conjunctive specifications be combined more directly across any `WP`-interpreted program type. The supporting order infrastructure was expanded to make these proofs work smoothly.

### **`do←` now infers binder types from the wrapper** (25dacd7)
Binders in `do←` arguments are now typed from the wrapper signature, fixing field-notation resolution in forwarded bodies. The change also improves acceptance of typed binders and gives clearer errors for pattern binders.

### **`Sym.simp` can unfold definitions passed as parameters** (de18327)
Interactive `sym => simp [f]` now uses the equational theorems of `f` instead of failing when `f` is a definition. This makes `Sym.simp` behave more like regular `simp` for extra rewrite inputs.

### **Kernel-friendly `Bool` operations land in `Init`** (ee1b07e)
`Bool.and`, `Bool.or`, and `Bool.not` are now defined in a kernel-efficient way, with compatibility shims preserved for compiled code. This is a performance-oriented change in a very hot part of the core library.

### **C output files are written atomically** (9d0aa5e)
Lean now writes generated C files via a temporary file and atomic move, reducing the chance of concurrent write corruption. This should help avoid intermittent `clang` lexer crashes during builds.

### **`Std.WP` soundness support is ported from `Std.Do`** (a46c2a6)
`WPSound` was moved into `Std.WP` as `LawfulWPMonadAttach`, with instances for core monads and common transformers. That gives the WP framework a cleaner soundness bridge to concrete executions.

### Other misc changes
- Performance tweak in `vcgen` goal replacement (16e77c4)
- `binderNameHint` is unfolded earlier in the kernel for faster definitional equality (e4be9b5)
- `PredTrans` simp framework completion and identity-instance cleanup (2d268e9)
- `grind`/`Sym.simp` theorem handling improvements and non-prop theorem rejection (8426679, 9319b09)
- Array lemma simplification cleanup (b8ba597)
- Stage0 updates and other internal maintenance commits (147c4c4, a3c1157, 0bdfa79)
