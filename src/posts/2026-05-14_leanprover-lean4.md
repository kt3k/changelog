---
date: 2026-05-14
repo: leanprover/lean4
size: L
title: "Lean gains faster configs and richer diagnostics"
excerpt: "Major config-eval refactor plus new lints, better instance errors, recursion-fix regression coverage, and structure-instance hover upgrades."
commits: 5
authors: [kmill, wkrozowski, MoritzBeroRoos, nomeata]
commit_authors: {"047f6aa": kmill, "f459c14": wkrozowski, "48729ab": MoritzBeroRoos, "80a85cd": nomeata, "803553a": kmill}
---

### **Efficient tactic config elaboration and new configurable `#reduce` syntax** (047f6aa)
Lean replaces its tactic configuration path with a much faster configuration evaluator, cutting config evaluation cost dramatically on a benchmark. It also makes config syntax more extensible, and `#reduce` now accepts a general `reduceConfig` block instead of only the old hard-coded `(proofs := true)` / `(types := true)` flags.

### **Upstreamed `unusedDecidableInType` linter** (f459c14)
A new linter from mathlib is now part of core Lean, catching `Decidable` arguments that are present in a type but never actually used. This should help users trim unnecessary assumptions and surface a class of type-level clutter earlier.

### **Better `checkImpossibleInstance` and `checkNonClassInstance` diagnostics** (48729ab)
Instance synthesis now detects more “impossible” arguments and reports them with clearer binder-level error messages. The check also skips entirely when the declaration contains `sorry`, avoiding noisy failures for incomplete code.

### **Structural recursion failure reporting now respects fixed-parameter reordering** (80a85cd)
Lean fixes a regression in structural recursion analysis when fixed and varying parameters are interleaved. Error messages now point at the right parameter, and nested-inductive recognition no longer silently inspects the wrong argument position.

### **Structure instance notation gets richer field info and cleaner traces** (803553a)
Hover/completion metadata for compound fields like `x.fst` is now split across the full path instead of being attached only to the root field, improving editor feedback. The trace class was renamed to `trace.Elab.structInst`, and the formatting/diagnostic plumbing for structure instance views was reworked to better display nested field paths.

### Other misc changes
- Added `Lean.Elab.ConfigEval` and related imports/public exports.
- Exposed some config defaults and added a `ReduceConfig` structure.
- Misc refactors and test additions across config, linter, and structural-recursion code.
