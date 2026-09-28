---
date: 2026-09-27
repo: leanprover/lean4
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: L
title: "Lean4 adds major arithmetic power and hardens core caches"
excerpt: "This week brought a new reflected arithmetic normalizer, faster and safer `grind`/`sym` tactics, and multiple runtime/cache correctness fixes."
commits: 84
---

### **Arithmetic automation got a big new foundation**
Lean gained a reflected `Sym.Arith.normalize?` normalizer for commutative rings and semirings, then quickly expanded it to handle relations, non-commutative structures, fields, characteristic-aware reasoning, and inverse cancellation. That makes `arith`, `Sym.simp`, and related workflows much stronger on polynomial, field, and modular goals, with proof-by-reflection support throughout.

### **`grind` became substantially stronger on bitvectors and algebra**
`grind` picked up many new homomorphism rules and solver hooks: constant-mask bitwise reasoning, signed comparisons and shifts, rotations, concatenation, `BitVec.ofInt`, `signExtend`, and better coverage for mixed `Nat`/`BitVec`/`Int64`/`UInt64` goals. It also fixed missed theorem activation behind binders/literals, improved arithmetic classification reuse, and added a temporary `grind_norm` tool to compare the old and new normalizers during migration.

### **Core caching and invalidation were tightened for correctness**
Lean added generation tracking and cache validation across typeclass synthesis, environments, and scoped extensions, with new option-dependency recording for synth caches and a debug mode that can recompute cache hits to catch stale answers. These changes are aimed at making future cross-command caching sounder while preventing reuse after environment rollback or option changes.

### **Runtime, async, and I/O correctness improved**
The runtime’s reference-counting path was hardened against overflow edge cases, while async cancellation/wakeup handling was fixed to avoid stale waiters, hangs, and leaked background work. The socket stack also got a broad race and leak cleanup, including safer accept/wait paths and better cancellation behavior.

### **Compiler and elaborator performance got a number of wins**
Lean now caches option flags on hot paths like `isDefEq`/`whnf`, `ExplicitRC` avoids traversing irrelevant derived borrows, and `partial_fixpoint` unfold theorem generation is much cheaper for large mutual blocks. `DiscrTree` also got a more compact single-child chain representation, and constant folding for `USize` became a bit more aggressive.

### **Other misc changes**
- CaDiCaL was added as a real FFI backend for `Std.Sat`.
- `withPtrEq` was removed due to unsoundness risk.
- Float `min`/`max` now use IEEE-754 minimum/maximum models.
- `vcgen` moved into `Std.WP`, with old `Std.Do` proof-mode tactics deprecated.
- Lake cache handling for `.ltar` artifacts and several build/test docs were updated.
- Smaller fixes landed for `bv_decide`, `cbv`, deprecation warnings, docstring metadata, and assorted test/refactor cleanup.
