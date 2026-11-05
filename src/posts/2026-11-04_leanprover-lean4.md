---
date: 2026-11-04
repo: leanprover/lean4
size: L
title: "Lean4 lands major tactic and runtime fixes"
excerpt: "New safe pointer-equality helpers, VCGen and `grind` robustness fixes, plus HTTP URI/query handling and arithmetic normalization corrections."
commits: 15
authors: [leodemoura, nomeata, TwoFX, hargoniX, sgraf812, paulbutcher, SkanderBog, treiher, ejgallego]
commit_authors: {"decf7fb": leodemoura, "ab4676c": leodemoura, "92016b6": nomeata, "35bc1b1": nomeata, "817bd56": TwoFX, "34e7c5b": sgraf812, "c029d91": leodemoura}
---

**Safe `withPtrEq` and compiler support for pointer-equality fast paths** (817bd56)
Lean now exposes a safe `withPtrEq` wrapper that the compiler only accepts when it can prove the type cannot hide erased data. The compiler lowers accepted uses to `withPtrEqUnsafe`, enabling optimized pointer-based equality checks without sacrificing soundness.

**`withPtrEq` is now integrated into LCNF codegen** (817bd56)
The compiler’s computability checks and LCNF lowering were updated so `withPtrEq` is treated as a special noncomputable primitive rather than a normal definition. This keeps the new safe API usable in optimized code while preserving the type-safety check at compile time.

**`withIsExclusive` adds a safe runtime sharing test** (92016b6)
A new safe wrapper around `isExclusiveUnsafe` lets code branch on whether a value is uniquely owned, with a proof obligation ensuring the logical behavior stays sound. This is useful for optimizations like skipping caching when a value has only one owner.

**`withPtrEq`-powered `DecidableEq` support was expanded** (817bd56)
The core pointer-equality helper used by generated `DecidableEq` instances was refactored to match the new safe API. This makes the fast path available more broadly while keeping the underlying polymorphic helper honest about its limitations.

**VCGen now reduces assigned metavariables in goal heads** (34e7c5b)
`vcgen` now head-reduces assigned metavariables when instantiating goals, so goals are no longer fully instantiated at every step just to discover the head shape. This should reduce redundant work on verification conditions and changes some goal-splitting behavior accordingly.

**VCGen’s entailment reduction was centralized and streamlined** (34e7c5b)
The separate `Prod.fst` RHS reduction path was removed and folded into the main head-reduction machinery. That simplifies the solver pipeline while preserving the same overall normalization power, now with metavariable substitution handled in one place.

**`grind` now skips literals in its congruence-table checks** (ab4676c)
`grind.debug` no longer assumes every application appears in the congruence table, which fixes a panic on signed fixed-width integer literals like `-1`. The invariant checker now explicitly ignores literal applications, matching how `internalize` already treats them.

**Equation-lemma generation now keeps equations realized during type computation** (35bc1b1)
Lean now generates equation theorems in a single realization pass, so constants created while computing equation types are not lost before the theorem is added. This fixes kernel errors in cases where the equation statement itself introduces match equations or similar auxiliary constants.

**`sym` tactics now see through assigned metavariables** (c029d91)
Several `sym`-based procedures, including `simp`, `dsimp`, `intro`, `apply`, and local instance registration, now expand assigned metavariables on demand. That fixes cases where tactics previously stalled or failed on goals whose shape only became visible after other goals were solved.

**The `grind` arithmetic normalizer now leaves characteristic-1 terms unchanged** (decf7fb)
`Sym.simp`’s arithmetic normalizer skips characteristic-1 structures entirely, avoiding invalid certificates on degenerate rings like `Fin 1`. This trades a tiny bit of normalization coverage for correctness in a case the ring solver already handles.

### Other misc changes
- HTTP URI/query fixes: decode query keys by name and preserve literal `+` in form encoding (2 commits).
- BitVec normalization performance work to avoid expensive `rfl`-based cast elimination (1 commit).
- Runtime executable lookup now uses `/proc/self/exe` in container/PID-namespace setups.
- `Std.CancellationContext` state types were made private.
- A handful of regression tests and CI/build tweaks were added or updated.
