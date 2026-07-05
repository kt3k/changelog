---
date: 2026-07-04
repo: leanprover/lean4
size: L
title: "Lean4 gets safer sym + faster array maps"
excerpt: "New `sym` tactics and fixes land alongside a kernel-level `Fin.foldl` reduction, array in-place mapping, and key bug fixes."
commits: 9
authors: [leodemoura, kim-em, algebraic-dev]
commit_authors: {"0d9dae1": leodemoura, "8f0e547": leodemoura, "1f0faa6": leodemoura, "94d8a24": leodemoura, "f85303b": leodemoura, "903bf1d": algebraic-dev, "0680117": kim-em, "7d032bb": kim-em, "061fa50": kim-em}
---

### **`sym => apply` now rejects unresolved instance metavariables** (8f0e547)
`Sym` matching now tracks instance arguments that couldn't be synthesized and treats them as failure instead of silently splicing loose metavariables into proof terms. This closes a soundness bug where `sym => apply <rule>` could appear to succeed but later produce kernel-level unresolved-metavariable errors.

### **`sym =>` gains `case =>` goal selection** (94d8a24)
The `sym`/`grind` interactive syntax now supports `case tag => ...` to focus specific `vc<n>` goals, including renaming hypotheses and handling multiple tags. This makes `vcgen` workflows much more scriptable and brings `sym` closer to regular tactic-mode ergonomics.

### **`SymM` intro tactics now honor hygienic naming** (1f0faa6)
`intro`-style helpers in `SymM` now accept a `hygienic` flag, so generated binder names can be either inaccessible or user-visible to match the rest of Lean's tactic behavior. That matters for downstream tactic scripts that rely on predictable name hygiene.

### **`Sym` theorem preprocessing keeps RHS `let`s intact** (0d9dae1)
Equational theorem preprocessing no longer zeta-reduces the right-hand side when building `sym` rewrite theorems, which preserves nondependent `let` binders such as do-notation join points. This fixes a vcgen regression where join points were erased too early for `+jp` handling.

### **`SymM` unification now defers tricky universe constraints** (f85303b)
Universe-level matching in `Sym` now postpones certain `max`/`imax` constraints when they contain universe metavariables, instead of failing too early. This unblocks `apply`-style reasoning in cases where the relevant universe variables only become known after later argument unification.

### **Windows TZ transition calculation rounds up seconds** (903bf1d)
`lean_windows_get_next_transition` now uses `ceil` when converting fractional transition seconds to whole seconds, avoiding off-by-one errors around midnight-style DST boundaries. The associated time-zone tests were also cleaned up to be deterministic.

### **Array mapping by index now maps in place** (0680117)
`Array.mapFinIdxM` got an `@[implemented_by]` unsafe implementation so `mapFinIdx`, `mapIdxM`, and `mapIdx` can preserve in-place behavior like `Array.map`. This is a real performance win for uniquely-owned arrays, avoiding unnecessary copying during indexed mapping.

### **`Array.back`, `back!`, and `back?` are now exposed** (7d032bb)
These array accessors are now `@[expose]`, allowing their definitions to reduce across module boundaries. That fixes downstream `decide`/kernel reductions on expressions like `#[1, 2, 3].back?`.

### **`Fin.foldl` now reduces in the kernel** (061fa50)
`Fin.foldl` was adjusted so the kernel can unfold it during reduction, matching the behavior already available for `Fin.foldr`. This removes a small but annoying reducibility gap for `decide`, `#reduce`, and related proof automation.

### Other misc changes
- Dependency/internal test updates around `sym`, time-zone, array, and `Fin` behavior.
- New regression tests for `sym_simp_zeta`, `sym_apply_univ_issues`, `sym_intro`, `vcgenSymBlock`, `arrayMapIdxInPlace`, `exposeArrayBack`, and `finFoldKernelReduce`.
