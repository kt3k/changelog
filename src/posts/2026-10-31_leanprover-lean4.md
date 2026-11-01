---
date: 2026-10-31
repo: leanprover/lean4
size: L
title: "Lean tightens grind and typeclass performance"
excerpt: "Major performance wins in `grind`, `rw`, and instance search, plus fixes for replay correctness and atomic Lake cache writes."
commits: 7
authors: [leodemoura, nomeata, tydeu]
commit_authors: {"8c6cec8": leodemoura, "842c518": nomeata, "809db99": leodemoura, "947df38": leodemoura, "9635a51": leodemoura, "92292d1": leodemoura, "b4e5cf2": tydeu}
---

### **grind avoids several exponential slow paths** (8c6cec8, 92292d1)
`grind` now uses cheaper type comparison in several hot paths, avoiding exponential blowups on terms whose types only line up modulo the E-graph. It also stops re-instantiating proofs at every nested case split, which dramatically cuts proof construction time on large split-heavy goals.

### **`rw` checks only the rewritten parts of its motive** (9635a51)
Rewrite motive checking no longer traverses the entire goal when only a few subterms changed. This makes `rw` much faster on large goals, while preserving the fallback to full checking for binders whose types or values are themselves rewritten.

### **`kabstract` skips revisiting shared subterms** (947df38)
`kabstract` now caches shared subterms that were already proven to have no match, so tactics built on it stop redoing the same failed `isDefEq` work over and over. This is a targeted speedup for goals with heavy sharing, especially `rw`-style workflows.

### **Typeclass search delays universe instantiation** (809db99)
Instance search no longer eagerly freshens universe levels for every candidate. That reduces overhead in classes with huge instance sets, where only a small fraction of candidates are actually tried.

### **`grind` and replay correctness fixes** (842c518, b4e5cf2)
`Kernel.Environment.replay` now records constants needed by every member of a mutual inductive block, fixing a hash-order-dependent `unknown constant` rejection. Lake’s artifact cache also switched to atomic writes so concurrent readers can’t observe partially written cache files.

### Other misc changes
- `grind` congruence/type propagation now consistently uses the cheaper `instances`-transparency type check.
- `rw`, `grind`, and `SynthInstance` received supporting refactors and new regression tests.
- Completion/info-tree expected outputs were updated after the instance-search changes.
