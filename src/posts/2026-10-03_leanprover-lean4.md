---
date: 2026-10-03
repo: leanprover/lean4
size: L
title: "grind gets faster, broader, and safer"
excerpt: "Major grind upgrades: faster library-suggestion indexing, new Char/String handling, and more Fin homomorphism support, plus BVDecide private realizations."
commits: 7
authors: [leodemoura, hargoniX, marcelolynch]
commit_authors: {"a2f9576": hargoniX, "44539f8": leodemoura, "699a19a": leodemoura, "193c358": marcelolynch, "d4f7ec2": leodemoura, "11ab3c2": leodemoura}
---

### **Library suggestions now build indexes in one parallel pass** (193c358)
The first `try?`/`simp? +suggestions`/`grind +suggestions` query is much faster, especially in large imports like Mathlib. Lean now computes the symbol-frequency map and Sine Qua Non trigger index together from a single traversal, with parallel tasks and less cache contention.

### **`grind` learns more `Fin` homomorphism rules** (11ab3c2)
`grind` can now reason about `Fin.log2` and casts from `Nat`/`Int` into `Fin n` via their `val` images. This closes a gap where these terms were opaque to `cutsat`, unlocking a batch of previously unsupported arithmetic-on-`Fin` goals.

### **Character literals are now normalized and propagated in `grind`** (d4f7ec2)
`grind` now canonicalizes `Char.ofNat 97` to `'a'` and evaluates `Char.toNat`, `Char.val`, and `Char.ofNat` when the argument is already a literal. That fixes a kernel error on mixed `Char` representations and makes character reasoning stable across equivalent spellings.

### **`String.push` and `String.singleton` now ground-evaluate** (44539f8)
`Sym.simp` can now evaluate string construction on literals, so expressions like `"abc".push 'd'` reduce to `"abcd"`. Because `grind` reuses this ground evaluator, the same improvement also benefits `grind` and related normalization paths.

### **`grind` keeps bit-vector literals in `OfNat.ofNat` form** (699a19a)
The `Sym.simp`-based normalizer now preserves the literal shape `OfNat.ofNat` for bit-vectors instead of rewriting to `BitVec.ofNat`. That makes its output match the legacy normalizer and avoids spurious representation differences on ground bit-vector terms.

### **BVDecide realized constants are now private** (a2f9576)
The bit-vector enum realization machinery now uses private names for generated constants, avoiding name clashes when multiple imported modules realize the same enum helpers. This is a correctness/maintainability fix for projects that compose several BVDecide-generated modules.

### Other misc changes
- Enabled a couple of `Int64` word-boundary `grind` tests (1 commit)
- Test updates for the new `grind`/`Sym.simp` behavior
- Small internal refactors around BVDecide enum realization
