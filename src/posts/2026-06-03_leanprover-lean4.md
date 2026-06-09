---
date: 2026-06-03
repo: leanprover/lean4
size: L
title: "Lean speeds up trees, maps, and Lake fixes"
excerpt: "Performance gains in DiscrTree and decidable quantifiers, a new PersistentHashMap.alter, and Lake dep resolution fixes."
commits: 6
authors: [hargoniX, georgerennie, TwoFX, kim-em, tydeu]
commit_authors: {"d413148": hargoniX, "d69367f": georgerennie, "9820f61": hargoniX, "1c71c35": kim-em, "c7856b6": tydeu}
---

### **DiscrTree insertion is faster** (d413148)
Lean now uses `PersistentHashMap.alter` in `DiscrTree.insertKeyValue` instead of a separate lookup followed by insert. That removes a redundant traversal and helps cut `import Mathlib` time by around 10%.

### **PersistentHashMap gains `alter`** (9820f61)
A new `PersistentHashMap.alter` API lets callers insert, update, or delete in one pass based on the current value. This is a useful building block for map-heavy code and is already backed by compile-time tests.

### **Bounded-quantifier `Decidable` instances get tail-recursive runtime replacements** (1c71c35)
Lean adds `@[csimp]` tail-recursive implementations for `Nat.decidableBallLT`, `Nat.decidableExistsLT`, and `Nat.decidableExistsLT'`, avoiding quadratic behavior and stack overflows at runtime. Kernel reduction stays unchanged, but compiled code for large bounds should be much more robust and faster.

### **Lake fixes `depPkgs` for overridden transitive deps** (c7856b6)
Workspace dependency resolution now computes `depPkgs` in a single final pass, which fixes cases where an overridden transitive dependency was left with incorrect resolved dependencies. This should prevent confusing downstream build/query behavior in nested dependency graphs.

### **LRAT CNF conversion preserves clause positions** (d69367f)
`CNF.convertLRAT'` now maps clauses to `Option` entries instead of filtering out tautologies, so clause indices remain stable for the LRAT checker. That fixes an unsound conversion path where deleting clauses could invalidate generated proofs.

### Other misc changes
- Floating-point compiler flag tweak to disable contraction (1 commit)
- Internal Lake workspace/package bookkeeping refactor to support dependency indices
