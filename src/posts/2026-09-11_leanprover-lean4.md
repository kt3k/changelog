---
date: 2026-09-11
repo: leanprover/lean4
size: L
title: "Lean adds erased do-vars and tactic params"
excerpt: "Erased variables land in do-notation, `lia`/`grobner` gain inline params, and the compiler gets several bug/perf fixes plus a new external checker."
commits: 17
authors: [Kha, hargoniX, mhuisi, TwoFX, kim-em, sgraf812]
commit_authors: {"a714e83": sgraf812, "de6d209": Kha, "5023e7e": Kha, "624fffa": mhuisi, "e93ea18": kim-em, "8b126ad": kim-em}
---

### **Erased variables in `do` notation** (a714e83)
Lean now supports `erased x := e`, `erased mut x := e`, and `erased x ← act` in `do` blocks. These variables are available to proofs and loop invariants, but compile away to dummies, letting specs mention values without forcing runtime retention.

### **`lia` and `grobner` accept inline parameter lists** (e93ea18)
Both tactics can now take `[...]` extra facts and lemmas, matching `grind`'s interface. This makes it easier to feed local hypotheses or lemma instantiations directly into automation without cluttering the context.

### **`Info` is preserved when elaboration passes holes through** (624fffa)
The elaborator no longer drops hover/info metadata for syntax adjacent to tactic holes or postponed elaborations. This fixes editor tooling so terms like type ascriptions still produce usable hover data even when a nested elaboration returns a hole.

### **`pullInstances` stops hoisting `Decidable` computations** (5023e7e)
The compiler now keeps saturated `Decidable` values inside the branches or thunks where they were created instead of pulling them out like cheap dictionaries. That avoids accidentally running decision procedures on code paths that should not evaluate them, including `if` branches.

### **`Fin.addNat?` is exposed across module boundaries** (8b126ad)
`Fin.addNat?` now reduces reliably in imported modules, fixing `cbv` and kernel reduction for code that builds `Fin` ranges through the module system. This removes a subtle boundary issue that could leave reductions stuck on `Fin.addNat?` applications.

### **`con-leche` is bundled with release toolchains** (de6d209)
Release builds now ship the `con-leche` external checker alongside the existing toolchain binaries. That makes the checker usable without a separate install and adds CI/build plumbing to produce and test it.

### **Other misc changes**
- Performance fixes: avoid non-linearity in `pushProj`, match elaborator toposort, and LRAT trimming (3 commits)
- CI/build workflow tweaks: stage0 refreshes, macOS aarch64 job moved, `jj` fallback fix, Grove action update, restart-on-label fix (6 commits)
- Added missing order instances for `UIntX`/`IntX` (1 commit)
- Minor compiler/internal refactors, tests, and stage0 syncs (several commits)
