---
date: 2026-11-07
repo: leanprover/lean4
size: M
title: "Lean fixes grind literals and speeds deriving"
excerpt: "A bug fix for negative literals in grind, a kernel-proof performance fix, and a deriving optimization for mutual blocks."
commits: 3
authors: [leodemoura, Kha]
commit_authors: {"4390641": leodemoura, "da4295a": leodemoura, "f063abb": Kha}
---

### **grind now classifies negative literals by their syntactic type** (da4295a)
`grind` no longer unfolds the type when deciding whether `-n` is a literal. This fixes the internal error where `linarith` could miss the numeral inside negative literals like `-1 : T` when `T` reduces to `Int` but is not literally `Int`.

### **Kernel checking for `lia`/`grind` and Nat offset simprocs is much cheaper** (4390641)
The certificates produced by `lia`, `grind`, and the Nat offset simprocs were changed so the kernel no longer has to evaluate their arithmetic atoms during proof checking. This addresses a real performance cliff on large Nat expressions and makes these automation proofs practical to verify.

### **Deriving `Repr`, `BEq`, and `Hashable` now works once per mutual block** (f063abb)
The deriving handlers now group inductive declarations by mutual block and generate shared auxiliary functions once per block instead of once per type. That removes quadratic elaboration behavior on large mutual blocks and should make deriving noticeably faster in big recursive definitions.

### Other misc changes
- Added regression tests for the negative-literal `grind` fix.
- Updated deriving helper utilities and test coverage for mutual-block handling.
- Minor internal proof/support changes around Nat/Int linear arithmetic helpers.
