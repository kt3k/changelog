---
date: 2026-07-22
repo: leanprover/lean4
size: L
title: "Lean 4 gets safer VCgen, float models, and a kernel fix"
excerpt: "A busy day: a kernel soundness fix, VCgen gains new splitting/spec handling, and floats now have logical Int conversions."
commits: 17
authors: [sgraf812, tydeu, hargoniX, wkrozowski, algebraic-dev, wrenna-robson, nomeata, Rob23oba, TwoFX]
commit_authors: {"7346219": nomeata, "8b83b84": algebraic-dev, "cd25632": sgraf812, "1545cc8": Rob23oba, "0de561c": sgraf812, "2065c90": sgraf812}
---

### **Kernel now rejects opaque values with free variables** (7346219)
The kernel’s `add_opaque` path now checks that an opaque declaration’s value contains no free variables, closing a soundness hole where metaprograms could seed the typechecker cache and manufacture a proof of `False`. This is a security-critical fix.

### **VCgen learns to split `∀` on the RHS and `iInf` goals** (cd25632)
VCgen can now decompose right-hand-side `∀`/`→` entailments via a new `le_forall` rule, so `open Std.Internal.Do` is enough for those Hoare-style goals. It also adds built-in support for `iInf` as a lattice connective, improving proof search on indexed meets.

### **`vcgen [...]` now accepts arbitrary term arguments** (0de561c)
The `vcgen` attribute/tactic can register non-identifier arguments such as `show ... from h`, `foo x`, or `@foo` by elaborating them once and classifying the result as either a spec proof or a simp lemma. This makes the API much closer to `simp [...]` and removes a common usability limit.

### **`vcgen [f]` now unfolds root-`match` definitions correctly** (2065c90)
When a spec set contains a definition whose body starts with a `match`, VCgen now uses its unfold theorem and then splits the exposed match just like `simp [f]`. That avoids false “missing spec” failures for opaque discriminants and broadens which definitions can serve as specs.

### **`Selectable.one` is rewritten to be error-safe and composable** (8b83b84)
Async selection now goes through a new `Selectable.combine` helper that multiplexes multiple selectables with fair randomized polling and robust cleanup. Errors during registration are now propagated instead of leaving registrations behind, fixing rare unregistering bugs in async/http machinery.

### **Float-to-int and int-to-Float conversions now have logical models** (1545cc8)
Several `Float`/`Float32` conversions to `IntN` and `ISize`, plus `IntN.toFloat`, were redefined in terms of the existing `Float.Model`/`Float32.Model` machinery. This makes these operations reducible in the kernel and gives them a clearer specification, while keeping efficient runtime implementations where needed.

### **`vcgen` handles RHS `∀`/`iInf` in entailments more cleanly** (cd25632)
The entailment solver now has explicit support for `le_forall` and `iInf` in its lattice-op splitting pipeline, so goals decompose earlier and with less manual guidance. That should reduce failures on structured postconditions.

### **Other misc changes**
- Lake bootstrap/packaging updates, including `Lake.All` importing every Lake module (1 commit)
- CI/cache/build tweaks: stage0 update, cache depth changes, sanitizer/debug-info wiring (4 commits)
- List API cleanup around `Pairwise`/`Nodup` lemmas and deprecations (1 commit)
- `vcgen` spec/lint/error-message fixes and test updates (4 commits)
- `IO` error decoding now avoids non-thread-safe `strerror` and adjusts errno handling (1 commit)
- Minor tooling/test moves and toolchain path fixes (2 commits)
