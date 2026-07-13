---
date: 2026-07-12
repo: leanprover/lean4
size: L
title: "grind fixes bitvectors and zero divisibility"
excerpt: "Three bug fixes harden `grind`: bitvector literal normalization, `0 ∣ p` handling, and a BitVec simproc crash/unsoundness fix."
commits: 3
authors: [leodemoura]
commit_authors: {"7f3f2fd": leodemoura, "5c74909": leodemoura, "1d69dd5": leodemoura}
---

### **`grind` no longer loops on `0 ∣ p` constraints** (7f3f2fd)
A cutsat bug let divisibility constraints with a zero divisor get stored in a form the model search couldn’t handle, leading to nontermination and missed refutations. These are now converted to the equivalent equality `p = 0`, and proof generation was extended to justify that step.

### **Bitvector literals are normalized consistently in `grind`** (5c74909)
`grind` now reduces both `BitVec.ofNatLT` literals and out-of-range `OfNat.ofNat` literals to the canonical bitvector form it expects, preventing distinct representations of the same value from producing invalid kernel-rejected proofs. The change also updates the normalization theorem set and adds regression tests for out-of-range, `ofNatLT`, and width-zero cases.

### **`BitVec` literal simproc fixed for `bitVecOfNat := false`** (1d69dd5)
The `BitVec` simproc previously mishandled literal normalization when `bitVecOfNat` was disabled, which `grind` relies on, causing unsound or incomplete reasoning on expressions like `0#2 ++ 1#2`. It now normalizes literals into the right canonical form in that mode and covers `0#n` handling explicitly.

### Other misc changes
- Removed a redundant `grind` theorem for `BitVec.ofNat_eq_ofNat`.
- Updated expected test output for internalized BitVec literals.
- Added regression tests for the BitVec simproc and literal normalization paths.
