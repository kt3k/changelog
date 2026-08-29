---
date: 2026-08-28
repo: leanprover/lean4
size: L
title: "Sandboxed challenges, BV min/max, cbv fix"
excerpt: "Lean 4 hardens `lake challenge`, adds BitVec min/max support, removes legacy native reduction, and fixes a `cbv` unfolding regression."
commits: 11
authors: [Kha, hargoniX, wkrozowski, TwoFX, plimkilde]
commit_authors: {"b5466a1": Kha, "35cf6e4": hargoniX, "b01c874": Kha, "2a7175c": Kha, "a57be66": hargoniX, "3129eda": hargoniX, "41bdd5d": wkrozowski, "4ad88fe": wkrozowski, "fe1939c": Kha, "424cc73": TwoFX, "4edc42d": plimkilde}
---

**`lake challenge` now resolves dependencies inside the sandbox** (b5466a1)
The challenge workflow no longer evaluates a project's config unsandboxed; dependency resolution is done inside landrun, which closes a security gap and makes git-based challenge projects work reliably. It also relaxes setup by requiring `lake-manifest.json` instead of a prebuilt `.lake` directory.

**`bv_decide` gains `min`/`max` support for `BitVec`, `UIntX`, and `IntX`** (35cf6e4)
Lean now has `Min`/`Max` instances and simplification lemmas for `BitVec`, plus `bv_decide` normalization support for `min`/`max` across the bitvector integer families. This extends bitvector automation to a common pair of operations that previously needed manual handling.

**Lean's legacy in-kernel native reduction is removed** (2a7175c)
The deprecated `reduceBool`/`reduceNat` path and its kernel/interpreter hooks are deleted, along with the related axioms and tests. This trims trusted code and formalizes the newer approach of asserting native evaluations with axioms instead.

**`cbv` stops unfolding partially applied constants** (4ad88fe)
`cbv` now treats partially applied constants as function values instead of eagerly unfolding them, which avoids recursion-depth blowups on large literals and prevents internal helper terms from leaking into stuck goals. The change preserves kernel reduction while making the tactic's behavior more predictable.

### Other misc changes
- LLVM upgraded to 23.1.0 for modest build/runtime improvements (a57be66)
- RAT proof checker fixes (3129eda)
- `deprecated_syntax` warnings now point at macro-generated syntax with `.original` info (41bdd5d)
- Deleted bootstrapping workarounds no longer needed after stage0 update (424cc73)
- BitVec docs clarified for `intMin`/`intMax` two's-complement meaning (4edc42d)
- Added a no-concurrency Lean model of reference counting for tests (b01c874)
- Added `lake challenge` as a `comparator` frontend and supporting export infrastructure (fe1939c)
