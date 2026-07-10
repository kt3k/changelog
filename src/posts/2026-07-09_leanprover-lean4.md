---
date: 2026-07-09
repo: leanprover/lean4
size: L
title: "Lean gets faster grind and sturdier runtime"
excerpt: "Performance wins for grind and instance synthesis, plus runtime and elaborator fixes for stack handling, partial_fixpoint, and deprecations."
commits: 13
authors: [Kha, TwoFX, leodemoura, Garmelon, nomeata]
commit_authors: {"4c1cf2f": leodemoura, "804bb12": Kha, "5ae4723": TwoFX, "41ace69": TwoFX, "e599b3e": nomeata, "da19ea0": leodemoura}
---

### **Speed up `grind` instance construction for `IntModule.OfNatModule.Q` (4c1cf2f)**
Lean now constructs and reuses the auxiliary `grind` envelope type’s instances manually instead of paying full typeclass-resolution costs. The new override path skips repeated searches for `IntModule.OfNatModule.Q` and should remove a major Mathlib bottleneck.

### **Assign ground synthesized instances directly (da19ea0)**
`tryResolve` now assigns a metavariable directly once a metavariable-free goal type has already been unified with a candidate instance type, avoiding a redundant `isDefEq` recheck. That removes expensive re-inference work on simple goals while preserving the old behavior when goal types still contain metavariables.

### **Run shell/main on the configured Lean stack thread (804bb12)**
`lean` now applies the configured stack size to its own main execution path, not just to spawned threads, fixing crashes in `--run` and serialization paths. The shell driver also uses the same thread wrapper, so stack-hungry runtime algorithms get the intended headroom consistently.

### **Lint ambiguous `open` statements inside namespaces (41ace69)**
A new linter warns when `open X` inside a namespace does not actually open every candidate namespace ending in `X`, which can hide downstream breakage if new namespaces are added later. This is a compatibility-focused change that helps catch fragile imports and opens before they become user-visible bugs.

### **Reject self-deprecating declarations (5ae4723)**
`@[deprecated]` now errors when a declaration is deprecated in favor of itself, instead of accepting a no-op or confusing attribute. This tightens the deprecation system and prevents misleading metadata from being emitted.

### **Fix `partial_fixpoint` on nested recursive calls (e599b3e)**
`partial_fixpoint` now reports the intended monotonicity error for nested recursive calls like `f (f x)` rather than failing later with an `Unknown constant`-style elaboration error. The fix makes the recursive-call analysis descend properly and improves diagnostics for a class of non-tail-recursive definitions.

### Other misc changes
- Repeated flaky benchmark runs for `compile/incr_header_load` and related benchmark harness updates.
- Stage0/bootstrap updates and bootstrap-option plumbing changes.
- Reduced namespace pollution across core modules.
- CI now includes failed test output in summaries.
- Minor deprecation-attribute/name cleanup in stdlib.
- `LAKE_CACHE_EXTRA_ARGS` support and other small build/tooling tweaks.
