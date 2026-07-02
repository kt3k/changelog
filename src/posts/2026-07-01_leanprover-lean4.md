---
date: 2026-07-01
repo: leanprover/lean4
size: L
title: "Auto-try proof hints and bv_decide overhaul"
excerpt: "Major proof-engine updates added automatic try? suggestions, refactored bv_decide’s USize/ISize handling, and fixed InfoTree context bugs."
commits: 6
authors: [nomeata, david-christiansen, wkrozowski, hargoniX]
commit_authors: {"3196914": hargoniX, "009a063": wkrozowski, "85e60ac": nomeata, "4907d41": nomeata}
---

### **Automatic `try?` suggestions at common proof sites** (4907d41)
Lean now surfaces `try?` suggestions for empty proofs, unsolved goals, and `sorry`, controlled by new options that default to off. The implementation moves the feature into a new `AutoTry` module and hooks it into the post-elaboration pipeline, making proof assistant feedback much more proactive.

### **`bv_decide` gets a major USize/ISize refactor** (3196914)
The bit-vector decision procedure was reworked to handle `USize` and `ISize` via new `IntToBitVec` lemmas and proof-oriented conversions like `toBitVec32`/`toBitVec64`. This is an important internal change to support `SymM` without illegal `revert` usage, and it substantially expands the normalization/rewrite infrastructure around fixed-width integers.

### **Term-level `open ... in` and `set_option ... in` now preserve InfoTree context** (85e60ac)
Autocomplete, hover, and other InfoTree-based consumers now see the correct `openDecls` and options inside term-level scoped blocks. This fixes a user-visible tooling bug where completions under `open ... in <term>` or `set_option ... in <term>` were resolved against the outer command context instead of the local one.

### **`cbv` avoids unnecessary type inference in `handleConst`** (009a063)
`cbv`’s constant-handling step now reuses the declared constant type instead of calling `Sym.inferType` up front, with an early syntactic function-type check. That trims redundant work in a hot path and should make constant reduction slightly cheaper.

### **Other misc changes**
- Documentation cleanup: `#eval` docstring clarification, comment-to-docstring conversions, and related wording fixes (2 commits).
- Test updates for the new `autoTry` behavior and InfoTree regression coverage.
