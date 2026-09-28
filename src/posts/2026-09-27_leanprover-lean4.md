---
date: 2026-09-27
repo: leanprover/lean4
size: L
title: "Grind gets smarter, faster, and more reliable"
excerpt: "Major `grind`/`sym` normalization work lands alongside bit-vector support and cache fixes; environment tracking also got a big overhaul."
commits: 21
authors: [leodemoura, Kha, hargoniX]
commit_authors: {"ddbe818": leodemoura, "059fb8a": leodemoura, "6d9787c": Kha, "02c16a9": leodemoura, "47f4cf8": leodemoura, "368dc83": leodemoura, "aee6d42": leodemoura, "1e92f02": leodemoura, "32ac626": leodemoura, "e39e715": leodemoura, "2830e0d": hargoniX, "d0c575d": Kha, "48bfd58": Kha, "b12696a": Kha, "7cf0f85": Kha, "0518648": leodemoura, "a23e3ce": leodemoura, "1f38be1": leodemoura, "6350ba5": leodemoura}
---

### **`grind_norm` debugs the new normalizer migration** (ddbe818)
Adds a temporary `grind_norm` tactic with `sym` and `check` modes so the legacy and `Sym.simp`-based normalizers can be compared directly. That gives the Lean team a targeted way to find mismatches while the `grind` normalizer is being migrated.

### **`grind` now understands more signed bit-vector operations** (059fb8a, 02c16a9, 47f4cf8, 1e92f02, 32ac626, 0518648, 1f38be1)
A batch of homomorphism-rule improvements lets `grind` handle signed `slt`/`sle`, signed bitwise complement, variable shifts, arithmetic shifts to `Nat`, rotations, exponentiation, and concatenation. These changes expand the class of bit-vector and integer goals `grind` can close automatically, especially in `Int64` and `BitVec`-heavy proofs.

### **`sym =>` simplification now behaves much closer to default `simp`/`dsimp`** (368dc83, e39e715)
`Sym.simp` and `Sym.dsimp` now unfold definitions and discharge side conditions more like the default simplifier, including better handling of conditional theorems and `rfl`-theorems. A related fix makes `zetaDelta` unfold let-bound heads inside applications, closing long-standing gaps where `dsimp [foo]` or `dsimp [*]` left head-position lets untouched.

### **Type class cache invalidation was tightened to prevent stale answers** (48bfd58, d0c575d)
Type class resolution now tracks environment generations for instances and unification hints, so cached results are invalidated when those dependencies change. A companion fix drops cache entries created in rolled-back environments, avoiding stale instance reuse after failed or reverted elaboration paths.

### **Environment/scoped-extension generation tracking landed** (7cf0f85, b12696a)
Lean’s environment and scoped extensions now carry generation counters, letting downstream caches ask whether tracked extensions changed since a result was recorded. This provides the plumbing needed for sound dependency tracking across scope pushes/pops and environment rollback.

### **`cutsat` can reorder variables multiple times during search** (6350ba5)
`grind`’s arithmetic solver now supports repeated variable reordering, which avoids pathological Cooper enumeration when later E-matching rounds introduce new variables. The proof construction code was reworked around epochs so reordered searches can still produce valid justifications.

### **`USize` constant folding got a bit more aggressive** (2830e0d)
The compiler now accepts more `USize` folds by comparing truncated `UInt64` results against the `UInt32` result instead of requiring literal equality across widths. That enables more constant propagation in cross-platform code generation.

### Other misc changes
- `lake check` test projects were narrowed to avoid re-checking all of `Init`/`Lean` every time (6d9787c).
- Stage0 was updated twice (e21c2cf, d8472dd).
- `grind` negative-zero normalization got a kernel-soundness fix for `-0 : Int` (aee6d42).
- A `grind` test for subtraction-with-borrow was enabled after the `cutsat` reorder work (a23e3ce).
