---
date: 2026-07-15
repo: leanprover/lean4
size: L
title: "Lean adds trace storage, better grind, and incremental tactics"
excerpt: "Big day for automation and solver work: new trace postprocessing/storage, BitVec and cutsat fixes, plus incremental `set_option` elaboration."
commits: 14
authors: [leodemoura, Kha, datokrat, Garmelon, TwoFX, wkrozowski]
commit_authors: {"1f3dcc9": leodemoura, "ee0963c": leodemoura, "171f24d": Kha, "062e2d4": leodemoura, "39e35f1": TwoFX, "47cd72d": datokrat, "d3b9c57": datokrat, "6e88acc": datokrat, "4dbad69": Garmelon, "4ee6ea0": Garmelon, "47212d8": Kha, "3c8321c": wkrozowski, "a4b639c": leodemoura}
---

### **Trace postprocessing gets in-memory storage** (6e88acc)
Lean now supports `store_traces_as ... in cmd`, letting commands save their trace trees in memory for later inspection with `#postprocess_traces`. This makes it much easier to debug long-running elaborations without rerunning them every time.

### **`grind` gains BitVec literal evaluation** (a4b639c)
`grind` can now propagate and evaluate a range of `BitVec` operations on literals, including extraction operations and related structural reasoning. That broadens the tactic’s ability to close bitvector goals automatically instead of leaving them to manual proof steps.

### **Cutsat proof construction fixes a kernel mismatch** (1f3dcc9)
The integer cutsat pipeline now preserves expression structure when building `eq_def` proofs, avoiding a kernel rejection caused by `Poly.denote'` simplifying away details like trailing `+ 0`. This fixes a real soundness-facing proof construction issue in `lia`/`grind` on certain internalized integer expressions.

### **`Sym.simp` now treats target metavariables as opaque** (ee0963c)
Rewriting and matching in `Sym.simp` no longer tries to assign metavariables that already occur in the target term. That fixes failed rewrites on open targets and prevents unsound matching behavior in nonlinear patterns.

### **`set_option ... in` becomes incremental** (47212d8)
The tactic now participates in incremental elaboration, so edits inside the tactic block can reuse unchanged prefix work instead of re-running everything. This should improve responsiveness in editor workflows, with a special guard to avoid under-reporting diagnostics.

### **WHNF caching is restored for sub-default transparency** (47cd72d)
Lean’s WHNF matcher now keeps using the cache even when unfolding at reducible/instance/implicit transparency, which addresses a performance regression in configuration elaboration. The change splits out a cacheable unfolding mode from the custom predicate path to preserve correctness and speed.

### Other misc changes
- `mimalloc` upgraded to v3 (171f24d)
- `String.toList` made semireducible (d3b9c57)
- `preprocessType` in `SymM` no longer zeta-deltas by default (062e2d4)
- `String.charactersIn` optimized for faster ASCII matching (39e35f1)
- `logLintExt` persistence moved to server level (3c8321c)
- New `BitVec`/cutsat internal congruence helpers and proof-carrying support (1f3dcc9, a4b639c)
- New changelog-label workflow guard and cycle prep (4dbad69, 4ee6ea0)
