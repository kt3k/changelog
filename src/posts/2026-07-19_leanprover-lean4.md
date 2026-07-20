---
date: 2026-07-19
repo: leanprover/lean4
size: L
title: "Grind gains homomorphism attrs"
excerpt: "Lean4 adds `grind homo_pred`, validates `grind homo` rules, and ships a broad set of homomorphism lemmas for numeric types and `BitVec`/`Fin`."
commits: 5
authors: [leodemoura]
commit_authors: {"5772089": leodemoura, "263276d": leodemoura, "2cf39b8": leodemoura}
---

### **Grind gets a new eager predicate mechanism** (2cf39b8)
Lean now supports `[grind homo_pred]`, a separate attribute for eager fact injection keyed by a theorem’s head symbol. It complements `[grind homo]` by letting `grind` derive facts as soon as matching terms enter the E-graph, which is especially useful for range and relation lemmas.

### **`[grind homo]` rules are now validated and enforced** (263276d)
`grind` now rejects homomorphism theorems that would require conditional rewriting or otherwise can’t be instantiated from the left-hand side. The reset command also clears both homo-related extensions, tightening correctness and making attr state resets complete.

### **Core `grind` gains a full homomorphism library** (5772089)
A new `Init.Grind.Homo` module wires `grind` to homomorphism lemmas for `BitVec`, `Fin`, `Nat`, `Int`, fixed-width signed/unsigned integers, `USize`/`ISize`, and `List`. This broadens the tactic’s ability to normalize and reason across machine integers and embedded representations without manual bridging lemmas.

### Other misc changes
- Stage0 updates (2 commits)
- Minor attr/parser plumbing for new `grind` modifiers
- Tests added/expanded for homo and homo_pred attributes
