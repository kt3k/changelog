---
date: 2026-11-02
repo: leanprover/lean4
size: L
title: "Lean4 lands key theorem-prover fixes"
excerpt: "Major updates to `grind`, `Sym.simp`, `bv_decide`, casts, and runtime/FFI behavior, plus a few test and CI fixes."
commits: 13
authors: [leodemoura, Kha, basvandijk, hargoniX, TwoFX]
commit_authors: {"bac4efa": hargoniX, "d68a2dc": leodemoura, "e5c946c": basvandijk, "091b640": basvandijk, "bdb69a2": leodemoura, "1e6e4a6": leodemoura, "bbf92e1": leodemoura}
---

### **`bv_decide` now caches boolean substructure bitblasting** (bac4efa)
`bv_decide` adds caching for the boolean layer of bitblasting, avoiding repeated traversal of already-shared subexpressions before the AIG-level cache kicks in. This should help on larger workloads that are less purely BitVec-shaped and more mixed logical structure.

### **`Sym.Arith` pushes casts through arithmetic** (1e6e4a6)
The arithmetic normalizer now rewrites `Nat`/`Int` casts through addition, multiplication, and literal-exponent powers, and for `Int` also through subtraction, negation, and `Nat` casts. That broadens what `Sym.simp` and `grind` can normalize automatically, including goals like casted sums and scalar multiplication identities.

### **`grind` MBTC now handles casts into uninterpreted targets correctly** (bdb69a2)
Model-based theory combination no longer treats all `NatCast`/`IntCast` applications as solver-owned: it case-splits on their arguments when the target theory does not interpret the cast, instead of skipping them. This fixes a Mathlib regression around proving equalities in generic rings and `ZMod`-style targets.

### **`Sym.simp` now reduces `match`es on literal values** (bbf92e1)
`Sym.simp` can now rewrite matches whose discriminants are values like `String`, `Nat`, or `Char` literals, instead of leaving them stuck because the value-pattern machinery stays opaque at reducible transparency. That makes `sym => simp` and the `grind` normalizer handle more control-flow terms that previously required manual help.

### **`grind` no longer builds invalid match-condition proofs** (d68a2dc)
A kernel error in match-condition reasoning is fixed by only refuting equations between two literals; pattern variables are no longer treated like literals. This closes the hole that produced invalid proofs such as `decide ¬3 = fst` in overlapping-pattern cases.

### **`lean` now returns proper exit codes on 32-bit targets** (e5c946c)
The CLI exit path on wasm32/i386 and similar 32-bit targets now returns conventional status codes for help/version/deps, bad options, missing files, and `--run`. Previously it could leak a heap-derived value as the exit code, which broke scripting and tooling expectations.

### **FFI signatures were aligned with generated C** (091b640)
Eight runtime/IR interpreter FFI definitions had mismatched arities versus generated C, which could trigger WebAssembly signature mismatches and traps without LTO. Aligning the signatures removes a platform-specific runtime hazard for common file/tempdir and library calls.

### **`grind` MBTC now distinguishes envelope embeddings from user casts** (bdb69a2)
The cast-like handling was split so only solver-generated envelope embeddings are skipped in MBTC, while ordinary casts are handled based on whether the target theory interprets them. This tightens the theory-combination boundary and avoids skipping user-level casts that still matter for reasoning.

### Other misc changes
- CI/workflow fix for Grove branch-name passing.
- Bundled `nanoda` dependency bump to fix runaway `Nat` reduction.
- Test updates and regressions: markdown conformance LF check, stack-safe JSON nesting input, moved `lia` benchmarks, and new `grind`/`Sym` regression tests.
- Minor internal refactors and documentation/comments around BVDecide/Sym/Grind support code.
