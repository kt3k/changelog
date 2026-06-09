---
date: 2026-05-26
repo: leanprover/lean4
size: L
title: "Lean4 adds `sym =>` dsimp and stronger `whileM` specs"
excerpt: "New `dsimp` support in grind/sym, inline `mvcgen'` in `sym =>` blocks, better `whileM` foundations, and improved error notes."
commits: 10
authors: [sgraf812, hargoniX, leodemoura, Kha]
commit_authors: {"417addd": hargoniX, "682029e": leodemoura, "4a75f1d": sgraf812, "3fdc661": leodemoura, "addd448": Kha, "b5f7399": sgraf812, "d26099d": Kha, "170c700": hargoniX, "f3e3c0c": sgraf812}
---

### **`whileM` gets ordered-fixpoint verification support** (f3e3c0c)
`whileM` now has a derivable unfolding lemma from `Lean.Order.MonadTail`, with the public entry point `whileM_eq_of_monadTail`. The refactor also moves and internalizes some `Ensures` machinery, and updates `Std.Do` spec lemmas to use a unified invariant/termination-measure story for stronger, verifiable loop specs.

### **`sym =>` gains `dsimp` plus reusable variants** (682029e, 3fdc661)
Interactive grind/sym mode can now run `dsimp`, including named `SymM` variants registered with `register_sym_dsimp`. The new DSL adds composable pre/post dsimproc chains, giving tactic authors a more structured way to control definitional simplification inside grind.

### **`mvcgen'` now works inside `sym =>` blocks** (4a75f1d)
`mvcgen'` can be used as one step in a `sym => ...` block, and leftover verification conditions continue as subgoals with the accumulated grind state. That makes VC generation compose cleanly with later grind steps instead of resetting context between stages.

### **Projection notation now reports private inherited fields** (addd448)
Projection errors now try harder to surface the real private declaration behind a failed dot-notation access, including through structure inheritance. This removes a confusing blind spot where the hint was previously omitted even though a private base-field name was the actual blocker.

### **`instances`-level typecheck failures include the full error** (d26099d)
The tactic checker and linter now append the underlying typechecking error to their `instances` transparency notes. That should make it much easier to diagnose failures that were previously reduced to a vague "consider marking some declarations reducible" hint.

### **New `do` elaborator behavior around `try`/`catch` is pinned down** (b5f7399)
A regression test captures a breaking change: `try`/`catch` bodies in the new `do` elaborator no longer get accepted just because coercions can bridge the surrounding expected type. This brings `try`/`catch` in line with ordinary `do` and term elaboration.

### **`getElem?` e-matching is made less aggressive** (417addd)
The grind annotation that made `getElem?_pos` fire whenever `c[i]` appeared in the e-graph was removed, reducing unnecessary reasoning about `c[i]?`. The trigger for cases where `c[i]?` is actually in scope remains, so grind still gets nudged toward resolving bounds checks when relevant.

### Other misc changes
- stage0 update
- Benchmark/test fix for a grind failure (170c700)
- Grind lint exception cleanup and test updates around `getElem?`
- Misc grind-indexmap test refactors to accommodate the new matching behavior
