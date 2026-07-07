---
date: 2026-07-06
repo: leanprover/lean4
size: L
title: "Lean4 lands sym-mode rewrites and fixes"
excerpt: "New `rw` for `sym =>`, better `finish?`, VCGen `mdata` handling, and several bug/perf fixes plus API cleanup."
commits: 18
authors: [TwoFX, sgraf812, leodemoura, hargoniX, datokrat, kim-em]
commit_authors: {"a54f7e9": sgraf812, "ae93890": sgraf812, "f7cb017": hargoniX, "cc9a8de": datokrat, "d1f1051": leodemoura, "38d05f6": leodemoura, "258319d": sgraf812}
---

### **`sym =>` gains `rw` and better tactic splitting** (38d05f6)
Lean's symbolic grind mode now supports `rw` on the goal, with conditional rewrite premises turned into subgoals as needed. The implementation also splits the sym machinery into smaller files and wires the new tactics into the main `Grind` import path.

### **`finish?` now emits replayable `intros`/`by_contra` in `sym =>` mode** (d1f1051)
`finish?` now mirrors the initialization that `grind =>` normally performs, so suggested scripts are actually replayable in symbolic mode. This fixes a real usability bug where `finish?` could omit preprocessing steps and produce a script that didn't work.

### **`vcgen` now strips `mdata` from programs before solving** (ae93890)
VC generation no longer chokes when the program term is wrapped in metadata, such as `save_info` left by spec elaboration. That makes `vcgen` robust on a class of programs that previously fell through to an internal error.

### **Go-to-definition works again for `mut` vars after `for` loops** (a54f7e9)
The language server now records alias information when mutable bindings are threaded through tuples, fixing go-to-definition and find-references for `let mut` variables used after a `for` loop. This restores editor navigation on a common `do`-notation pattern.

### **`int_toBitVec` is split into SymM and MetaM versions** (f7cb017)
`int_toBitVec` is now SymM-compatible by separating its rewrite theorems into distinct sym and meta simp sets. Users of `simp` inside `bvdecide`-style workflows need to switch to `int_toBitVec_meta`, which is a small but breaking API change.

### **Default transparency gets stricter for metavariable assignment** (cc9a8de)
`backward.isDefEq.respectTransparency.types` is enabled by default, changing how metavariable types are compared during assignment. The change improves user control and scalability, but it is explicitly breaking and can alter elaboration behavior in existing code.

### **Sym-pattern matching gets a pointer-equality fast path** (258319d)
The symbolic matcher now short-circuits when a pattern subterm is pointer-equal to the target, avoiding unnecessary traversal. This is a targeted performance win that should help once patterns and targets share the same internalized terms.

### **Other misc changes**
- Namespace/API cleanup and declaration moves (`Injective.leftInverse`, `Nat.elimOffset`, LSP `MessageType`, namespace pollution reductions)
- Bootstrapping/stage0 updates and workaround churn
- Borrowed-string fix for `dbgTraceIfShared`
- Small internal refactors and tests
