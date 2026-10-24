---
date: 2026-10-23
repo: leanprover/lean4
size: L
title: "Lean4 lands faster grind and import plumbing"
excerpt: "Big performance work for `grind`, plus deprecation-syntax code actions and several core refactors/fixes."
commits: 13
authors: [TwoFX, leodemoura, Kha, joehattori, sgraf812]
commit_authors: {"2659c69": leodemoura, "b9f8063": leodemoura, "0a33d23": Kha, "1c7f66b": leodemoura, "63e5128": TwoFX, "51c2c9e": Kha, "7cc389e": sgraf812, "af481a2": TwoFX}
---

### **`grind` becomes quieter by default and faster on hard failures** (2659c69)
`grind` now opts out of verbose diagnostics unless you pass `+verbose`, and failures tell you how to re-enable them. That trims a large chunk of overhead on easy failing goals while keeping the full debug trace available when you need it.

### **Cutsat proof sharing speeds up `grind` case splits** (b9f8063)
`lia`/cutsat now reuses proofs across `grind` case splits instead of rebuilding them in every branch. The PR reports up to 2.8× faster elaboration and dramatically faster kernel checking on split-heavy goals.

### **Lean imports get cheaper with per-module constant tries** (0a33d23)
Imported constants are now stored as per-module prefix trees in `olean` files and merged lazily on demand. This substantially reduces import time and memory use on large projects like Mathlib, at the cost of slightly larger `olean`s.

### **Deprecated syntax can now suggest replacements as code actions** (af481a2)
`deprecated_syntax` can define a replacement transformation, and Lean will surface it as an editor code action. This extends deprecation handling beyond warnings, giving users a direct migration path for old syntax forms.

### **Deprecation warnings are now suppressed for deprecated syntax rules** (63e5128)
Rules attached to deprecated syntax no longer get linted for the deprecated constants they reference. That keeps the warning focused on user-written uses, matching the behavior already expected for deprecated declarations.

### **`collectFVars` / `collectMVars` switch to pointer-based visitation** (1c7f66b)
Visited-term tracking now uses pointer equality instead of structural equality, avoiding expensive comparisons on large expressions. The state API also changes slightly, with the old `visitedExpr` replaced by a private pointer-keyed set.

### **Heartbeat counting is fixed for shared thunk evaluation** (51c2c9e)
Forcing a thunk that is shared between threads, or comes from the imported environment, no longer consumes the heartbeats of whichever thread happens to evaluate it first. This removes nondeterministic `maxHeartbeats` failures while preserving heartbeat accounting for thread-local thunks.

### **`vcgen` no longer panics on equation substitution under debug tracing** (7cc389e)
A panic in `vcgen` when substituting preconditions like `x = t` has been fixed. The bug only showed up under `set_option sym.debug true`, but it could break proof generation for affected goals.

### Other misc changes
- Stage0 updates (2 commits)
- Deprecation-check refactor to `Core.Context`
- `macro_rules` / `elab_rules` elaboration plumbing refactor
- Small grind internal refactors and updated tests
