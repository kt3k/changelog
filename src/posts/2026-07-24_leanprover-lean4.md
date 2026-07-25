---
date: 2026-07-24
repo: leanprover/lean4
size: L
title: "vcgen gets smarter; instantiateMVars sped up"
excerpt: "Lean4 tightened vcgen spec priorities and fixes, made Hoare triples universe-polymorphic, and removed a major instantiateMVars blowup."
commits: 11
authors: [sgraf812, TwoFX, Garmelon, nomeata, tydeu]
commit_authors: {"a2c74ef": TwoFX, "366c0a8": sgraf812, "7fc3135": TwoFX, "952e337": sgraf812, "8d96b70": sgraf812, "e2e5e45": nomeata, "22ffba4": sgraf812, "d4584ed": sgraf812, "6c11e48": TwoFX}
---

### **instantiateMVars now caches lifted substitutions to avoid exponential blowups** (e2e5e45)
Lean’s `instantiateMVars` got a substantial performance fix: lifted substitution values are now cached and canonicalized so repeated references don’t keep copying already-lifted expressions. This addresses an exponential time/memory blowup that could turn into OOMs in proof terms built from repeated `assert`/`intro`-style hypotheses.

### **Hoare `Triple` is now universe-polymorphic in assertions** (952e337)
`Std.Internal.Do.Triple` was generalized so the assertion type can live at a universe independent of the program’s value type. That makes `vcgen` work over broader specifications, including ones quantifying over assertion-valued predicates like `σ → Prop`, instead of being tied to a fixed universe setup.

### **vcgen spec ranking now distinguishes named, `*`, and unfold specs** (22ffba4, 366c0a8)
The `vcgen [...]` frontend now assigns call-site specs to explicit priority bands: named specs outrank `*`, which outrank bracketed unfold/equational specs, which in turn outrank ambient `@[spec]` entries. This fixes cases where an unfold spec or term-supplied spec could incorrectly lose to a lower-priority ambient spec on the same program.

### **vcgen fixes several recursive and deep-embedding bugs** (366c0a8, 8d96b70, d4584ed)
`vcgen` now handles recursive unfold/spec interactions more reliably, avoids a panic when equation specs are used for deep-embedded program types, and internalizes hypotheses earlier in `with finish`. Together these fixes close off regressions where verification either failed to find the right spec, crashed, or appeared to succeed while leaving kernel-rejected metavariables behind.

### **`dite`/`ite` and `Bool` naming cleaned up across core** (7fc3135, a2c74ef, 6c11e48)
Lean renamed and reshuffled a broad set of foundational identifiers to prefer `dite`/`ite` over `dif`/`if` spellings in names, moved a few `Bool` helpers into more consistent namespaces, and deprecated `letFun`. These are mostly API- and naming-level cleanups, but they do affect downstream code and lemma names.

### **Other misc changes**
- CI/build updates, including adaptation PR labels and cache reuse tweaks.
- Small namespace/priority refactors for `vcgen` internals and related lemmas.
- Test additions and adjustments for the new `vcgen` behaviors.
- Minor `Bool` helper moves and assorted mechanical rewrites.
