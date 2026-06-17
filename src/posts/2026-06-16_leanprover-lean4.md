---
date: 2026-06-16
repo: leanprover/lean4
size: L
title: "Lean 4 tightens Do VCGen and Lake warnings"
excerpt: "A big VCGen refactor lands alongside a new `Id` lift spec, an `IntX` clamp fix, and Lake module-system warnings/options."
commits: 10
authors: [sgraf812, Kha, tydeu, TwoFX]
commit_authors: {"ca85765": tydeu, "7c8494e": sgraf812, "28de11f": TwoFX, "db2f165": sgraf812, "57d872e": Kha, "60256e1": sgraf812, "99683cc": sgraf812}
---

### **mvcgen' gets a major internal VCGen refactor** (99683cc, 60256e1, db2f165)
The `mvcgen'` tactic was ported to the new `Std.Internal.Do` meta theory and then cleaned up with a follow-up refactor: entailment handling is reorganized, exception postconditions are split out, and `solve` now instantiates only the relevant entailment sides instead of the whole target. This should make the tactic more scalable on complex goals while also improving the proof surface for state and exception-heavy do-blocks.

### **Lake adds `requiresModuleSystem` / `allowNonModules`** (57d872e, ca85765)
Lake now tracks whether a package/library is intended for the module system and warns when non-module files import such code. The new TOML schema options make that policy configurable, helping package authors communicate module-system expectations and catch accidental legacy-file usage earlier.

### **`IntX.ofIntClamp` is fixed to clamp correctly** (28de11f)
The signed integer clamp helpers were corrected so out-of-range positive values now return the maximum value instead of the minimum. This is a real correctness fix for `Int8`/`Int16`/`Int32`/`Int64`/`ISize` conversion semantics.

### **`Spec.monadLift_Id` lets `mvcgen` handle raw `Id` lifts** (7c8494e)
A new weakest-precondition spec lemma covers lifting an `Id` computation into transformer stacks. That fills a notable gap for `do`-notation proofs, allowing `mvcgen`/`mvcgen'` to discharge patterns like lifting `pure` values from `Id` into `StateT` without getting stuck.

### Other misc changes
- Removed unnecessary library-search import-cache environment extensions for disk-snapshot compatibility.
- Tidied `mvcgen'` benchmark cases and comments.
- CI tweak to avoid increasing macOS runner usage.
