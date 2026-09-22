---
date: 2026-09-21
repo: leanprover/lean4
size: L
title: "Lean gets faster, safer, and more SAT-capable"
excerpt: "Big perf work, a new CaDiCaL FFI, better defeq errors, and a fix for unsafe pointer-equality code."
commits: 10
authors: [hargoniX, Kha, TwoFX, tydeu, datokrat, leodemoura]
commit_authors: {"43cdd17": Kha, "89c497e": Kha, "fd0afd8": hargoniX, "2faa1f2": hargoniX, "dd867da": TwoFX, "7236bfb": tydeu, "ca39d2b": datokrat, "95f6bfb": leodemoura}
---

### **Lean core caches option flags for hot paths** (43cdd17)
`isDefEq` and `whnf` now read a packed `OptionFlags` word from `Core.Context` instead of repeatedly looking up boolean options. This trims overhead on a very hot path and lays groundwork for later typeclass-caching work.

### **CaDiCaL is now available through the Lean FFI** (fd0afd8)
This adds a native FFI wrapper and runtime support for CaDiCaL, plus build-system changes to compile/link it correctly across supported platforms. It gives Lean's `Std.Sat` API a real backend instead of a stubbed integration.

### **`withPtrEq` is removed after miscompilation bugs** (dd867da)
The unsafe `withPtrEq` helper is deleted because it could trigger unsound behavior when erased data was involved. This closes off a known source of theorem-proving unsoundness; `withPtrEqUnsafe` remains for explicit low-level use.

### **Definitional-equality error messages are more accurate** (ca39d2b)
Several tactics that report defeq failures now generate their “show the mismatch” explanations under the right configuration, so the exposed term differences match what the checker actually saw. That should make `rfl`, `change`, `apply`, and related failures easier to diagnose.

### **`grind` now reuses `Sym.Arith` ring classification** (95f6bfb)
The ring solver was refactored to share classification, caches, reification, and denotation with `Sym.Arith` instead of maintaining a parallel copy. Besides a major cleanup, this changes when and how often types are classified, which should reduce repeated work across goals and tactics.

### **`Environment.realizationEnvContains` adds a new realization-scope check** (89c497e)
Lean can now tell whether one constant’s realization environment can see another constant, which matters when a `realizeConst` callback depends on multiple declarations. This tightens the rules around choosing the right `forConst` target and adds tests for the new behavior.

### **Lake now tracks cached `.ltar` outputs more reliably** (7236bfb)
Lake's module build cache handling now preserves and reuses cached `.ltar` artifacts across more partial-unpack cases. That should reduce redundant rebuilds and make cached module reuse more robust.

### **ExplicitRC only keeps derived borrows in the current scope** (2faa1f2)
The compiler's derived-value analysis was changed to avoid carrying around derived children from irrelevant control-flow branches. This cuts excess traversal work in the explicit reference-counting pass and should improve compile-time performance.

### **Boolean-option resolution is centralized for elaboration and meta code** (43cdd17)
A number of option-dependent meta paths were updated to use the new precomputed flag word, including definitional equality, unfolding, and diagnostics. The functional behavior should stay the same, but the option checks are cheaper everywhere they are used.

### Other misc changes
- New benchmark for structure updates
- Small perf tweak: derived values can come from any relevant let (1 commit)
- Minor refactors and test updates across `grind`, `realizeConst`, and build scripts
