---
date: 2026-08-17
repo: leanprover/lean4
size: L
title: "Lean adds sym `let_to_have` and Lake clone overhaul"
excerpt: "A new `sym =>` tactic landed, LCNF got smarter about proof overapplications, and Lake now uses partial clones for dependencies."
commits: 5
authors: [Rob23oba, leodemoura, tydeu]
commit_authors: {"5594178": Rob23oba, "a7dfd2e": leodemoura, "6e91fff": Rob23oba, "029e0bf": tydeu}
---

### **Add `let_to_have` to `sym =>` mode** (a7dfd2e)
Lean gained a new interactive `sym =>` tactic that rewrites nondependent `let`s in the goal target into `have`s, preserving definitional equality while unlocking the efficient `Sym.simp` telescope machinery. This is a meaningful proof-engine improvement and comes with new support code, alpha-sharing updates, and extensive tests/benchmarks.

### **Improve `ToLCNF` handling of proof-over-applied cases** (5594178)
The compiler now avoids generating immediately-called helper functions for proof-overapplication cases, reducing unnecessary indirection in LCNF. This is a targeted performance fix that should help compilation in patterns involving proof-heavy `cases`/`match` code.

### **Lake now materializes dependencies via partial clones** (029e0bf)
Lake’s dependency fetching was overhauled to use treeless partial Git clones at a single revision, cutting download size and avoiding redundant fetches when the needed objects are already present. It also reuses repositories across URL changes and cleans up unreachable objects, which improves robustness and reduces local churn.

### **Meta/compiler updates for the `Decidable` redefinition** (6e91fff)
Lean adjusted `decide`, `cases`, simprocs, and `ToMono`/`LCNF` plumbing to stay compatible with the upcoming `Decidable` redesign. The changes are broad but mostly infrastructure-level, aimed at keeping meta-programming and codegen working across the transition.

### Other misc changes
- Stage0 stdlib rebuild (1 commit)
