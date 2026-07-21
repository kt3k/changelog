---
date: 2026-07-20
repo: leanprover/lean4
size: L
title: "VCGen fix, stateful linters, and grind cleanup"
excerpt: "Lean4 adds stateful linter plumbing, fixes a vcgen annotation bug, improves grind homomorphism support, and tightens universe linting."
commits: 16
authors: [leodemoura, sgraf812, hargoniX, TwoFX, wkrozowski, eric-wieser]
commit_authors: {"3259610": sgraf812, "f77ee21": leodemoura, "dc1498b": hargoniX, "8e7d074": hargoniX, "29f574e": leodemoura, "e300ebc": TwoFX, "9a61e83": wkrozowski, "e1832d7": wkrozowski, "1e207c4": TwoFX, "33ae929": eric-wieser, "5ea1d32": leodemoura}
---

### **Stateful linters land in command elaboration** (9a61e83)
Lean now supports persistent, two-phase linters that can carry state across commands. The new API lets linters run an early phase and a late phase with shared state, opening the door to more powerful checks and cross-command analysis.

### **vcgen now reads goal types through `have`/`let`/`suffices`** (3259610)
This fixes a failure where `vcgen` could not determine the program type after tactic annotations desugared through `noImplicitLambda` metadata. In practice, `vcgen` now works in more common proof patterns instead of dropping through and emitting an unusable triple.

### **`grind` homomorphism support is expanded and renamed** (f77ee21, 29f574e, 5ea1d32)
The `grind` attribute modifiers are being migrated from `homo`/`homo_pred` to `hom`/`hom_pred`, with the new spellings wired through parsing and validation. At the same time, `grind` now records source types for homomorphism rules, which helps it track which terms should be treated as solver-relevant.

### **`Sym.(D)Simp.evalGround` learns more BitVec and Bool operations** (dc1498b, 8e7d074)
Ground evaluation now covers additional `BitVec` operations, and boolean equality/inequality cases are handled more directly. `Sym.dsimp` also gains an option to rewrite inside instances, which is useful when rewriting ground terms to make instance heads syntactically match.

### **IO error decoding is fixed, then the fix is reverted for Windows** (33ae929, e300ebc)
A runtime change made `lean_decode_io_error` use thread-safe error decoding and adjusted `IO.Error.osCode` semantics to better match POSIX-style errno handling. That was immediately reverted pending Windows follow-up work, so the day ends with the runtime change backed out.

### **`checkUnivs` now accounts for mutual declarations and constructors** (e1832d7)
The universe linter now considers related declarations in a mutual block, including constructors for inductives, when deciding whether universes only ever appear together. This reduces false positives for structures and inductive types whose self-references would otherwise skew the analysis.

### **`Nat.nextPowerOfTwo` gets more lemmas** (1e207c4)
Lean adds a batch of new lemmas around `Nat.nextPowerOfTwo`, along with some reshuffling of the surrounding `Power2` files. This broadens the library support for power-of-two reasoning.

### Other misc changes
- Stage0 updates (4 commits)
- `repeatM` docstring/internal-lemma cleanup
- Minor grind/core attribute and test adjustments
