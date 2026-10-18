---
date: 2026-10-17
repo: leanprover/lean4
size: L
title: "grind gets faster and smarter"
excerpt: "Lean’s `grind` gains subtype/eta fixes, mdata-safe intro handling, and a perf win from precomputed normalization theorems."
commits: 8
authors: [leodemoura, robsimmons]
commit_authors: {"e30bfe6": leodemoura, "e0186b9": leodemoura, "56592a1": leodemoura, "40404ef": leodemoura, "3a685e6": robsimmons, "ffc3a4e": leodemoura}
---

**`grind` normalization now eta-reduces lambda arguments first** (e30bfe6)
This fixes a subtle miss in the `Sym.simp`-based normalizer where simplifying the body of `fun x => Nat.succ x` could obscure the eta-redex and leave it unequal to an unapplied `Nat.succ`. The new pre-step preserves more definitional matches and closes goals like `id (fun x => Nat.succ x) = id Nat.succ` again.

**`grind` now handles subtype quantifiers during normalization** (40404ef)
Quantifiers over subtypes are rewritten with `Subtype.forall` and `Subtype.exists`, so hypotheses like `∀ x : {a // p a}, q x` can actually match after `grind` splits the subtype binder. This unblocks proofs that previously lost their usable E-matching pattern on `Subtype.val`.

**`grind` restores implication/forall introduction under `mdata`** (ffc3a4e)
The tactic now erases irrelevant metadata on the goal target before the intro loop, which fixes cases where a `have` wrapped the goal in `Expr.mdata` and hid an implication or universal quantifier from `introNext`. That makes `grind` behave correctly on goals produced through `have`/`noImplicitLambda`.

**`grind` regains two regressions from the `(∀ x, p x) → q` normal form** (56592a1)
The normalizer now rewrites `∀ _ : α, True` to `True` for any `α`, and eager case splits reset the E-matching round counter like other splits. Together these changes recover proofs over inductive predicates that regressed after the earlier quantifier-normal-form change.

**`grind` can load normalization theorems without rebuilding them every time** (e0186b9)
Normalization theorems for `Sym.simp` are now stored in a dedicated environment extension populated at attribute time, avoiding repeated reconstruction during pattern normalization. This should cut a real performance bottleneck in `grind`, especially for workloads heavy on `[grind]` attributes and theorem instantiation.

**Experimental memory-mapped `.ilean.mmap` loading for the watchdog** (3a685e6)
The server watchdog can now optionally load companion `.ilean.mmap` files instead of regular `.ilean` files when `LEAN_EXPERIMENTAL_CHECK_FOR_MEMORY_BACKED_ILEANS=true`. It’s an undocumented experimental path aimed at reducing memory use for reference loading, with fallback to normal loading and non-fatal logging on failures.

### Other misc changes
- Regression tests added/updated for the `grind` fixes and performance work (3 commits).
- Stage0 artifacts regenerated / build metadata bumped (1 commit).
