---
date: 2026-05-07
repo: leanprover/lean4
size: L
title: "Lean4 adds verifiable loops and mvcgen'"
excerpt: "Major proof-engine upgrades landed: verifiable while/repeat loops, a new SymM-based mvcgen' tactic, plus deprecation-warning cleanup and runtime speedups."
commits: 8
authors: [wkrozowski, sgraf812, TwoFX, nomeata, Kha, hargoniX]
commit_authors: {"9151360": nomeata, "a416b90": wkrozowski, "422920f": sgraf812, "049b7eb": sgraf812, "355dca6": hargoniX}
---

### **Verifiable `repeat`/`while` loops land** (049b7eb)
Lean now models `forIn` via a new `whileM` API with unfolding and specification theorems, making these loops amenable to verification without changing user syntax. This is a substantial step for `mvcgen`-style reasoning about control flow and loop invariants.

### **Experimental `mvcgen'` introduces a much faster SymM-based VC generator** (422920f)
A new `mvcgen'` tactic is added as a drop-in experimental replacement for `mvcgen`, built on the newer `SymM` symbolic-evaluation framework. The implementation is promoted into the main source tree, suggesting the old benchmark-only prototype is becoming a supported part of the tactic stack.

### **Deprecation warnings are now suppressed inside deprecated definitions** (a416b90)
Lean no longer emits redundant `Linter.deprecated` warnings for references that appear inside code already marked `@[deprecated]`. This cleans up noisy diagnostics and matches the rule that those references are going away with the declaration itself.

### **Runtime reference-count teardown gets a cold-path optimization** (355dca6)
`lean_dec_ref_cold` was tightened by splitting out the cold path and using a smaller header write on 64-bit builds. This is low-level performance work that can reduce overhead in reference-counted object destruction.

### **Hover now preserves the target symbol for `fun_induction`** (9151360)
`fun_induction` now resolves the function target with info preserved, so editor hover shows the actual function name instead of losing symbol context. That improves interactive ergonomics for proof development.

### Other misc changes
- Reduced `String.length` usage across the codebase, including a new dedicated string-length module and some API reshuffling.
- Refactored `cbv` to use `SymM` primitives in a few congruence-heavy paths.
- Removed an old `printDecls` test.
