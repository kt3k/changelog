---
date: 2026-05-02
repo: leanprover/lean4
size: M
title: "Lean4 tightens instance and tactic diagnostics"
excerpt: "Better universe matching, safer default-instance visibility, and new `.instances` type-check diagnostics landed alongside a few Sym fixes."
commits: 7
authors: [Kha, leodemoura]
commit_authors: {"0303977": leodemoura, "75e37de": leodemoura, "508a113": Kha, "b7ca76a": Kha, "4b8e74b": Kha, "06ac472": Kha, "c53c4b4": Kha}
---

### **Public default instances no longer leak from private imports** (c53c4b4)
Lean now filters default instances during export/public-scope elaboration so privately imported instances can’t accidentally influence public signatures. This fixes a class of hard-to-diagnose elaboration failures where an unseen default instance was chosen and later reported as an unknown constant.

### **Tactics now warn when goals only type-check at `.instances` transparency** (508a113)
Added a new diagnostic path that checks tactic goals at `.instances` transparency and appends a lazy note when `rw`, `simp`, `dsimp`, or `simp_all` would otherwise fail after an `unfold`-style change. This should make transparency-related tactic failures much easier to understand and debug.

### **`wrapInstance` can now reuse nested sub-instances** (06ac472)
`inferInstanceAs`/`deriving` wrapping was extended to keep recursing through the class graph even after finding a local instance, so already-wrapped subclass instances can be reused instead of needlessly rebuilding them. That improves instance synthesis behavior in more complex class hierarchies.

### **`SymM` universe matching now handles the missing level case** (0303977)
`processLevel` in `Sym.Pattern` now re-substitutes already-assigned universe uvars before continuing, fixing a missing case that could make otherwise valid matches fail. The added regression test shows this unblocks a `MonadStateOf.get` vs. `Spec.get_StateT` universe match.

### Other misc changes
- Removed an incorrect assertion in `Sym.simp` `have` simplification (75e37de)
- Disabled one flaky interactive server test (4b8e74b)
- Refined CLAUDE.md PR description guidance (b7ca76a)
