---
date: 2026-08-24
repo: leanprover/lean4
size: L
title: "Lean 4 adds recall, bitvec clamp, and coinductive monotonicity"
excerpt: "New core syntax and bitvec APIs land alongside Nat.log2 evaluation, a Lake import fix, and several performance/robustness tweaks."
commits: 12
authors: [hargoniX, tydeu, Kha, wkrozowski, kim-em, yhx-12243]
commit_authors: {"1dbcfb1": hargoniX, "5c6bce1": hargoniX, "923390e": Kha, "dd9cb93": tydeu, "7169e05": hargoniX, "15e960e": wkrozowski, "b182d58": hargoniX, "b464d03": hargoniX, "8b6143a": kim-em, "19260e8": yhx-12243, "04b67f7": tydeu}
---

### **New `recall`/`recall?` commands for checked restatements** (8b6143a)
Lean now has built-in commands for verifying that a written declaration restates an existing one definitionally, without changing the environment. `recall?` also suggests the canonical form, which should make expository proofs and documentation-style code easier to write and check.

### **`coinductive` gains an explicit `monotonicity_by` clause** (15e960e)
The predicate elaborators now accept a manual tactic block for proving functor monotonicity when automatic search fails, including in mutual blocks with `coinductive` members. This gives users a direct escape hatch for a key proof obligation in the fixpoint machinery.

### **`BitVec.ofNatClamp` adds a saturating conversion API** (1dbcfb1)
A new `BitVec.ofNatClamp` conversion returns the maximum representable bitvector when the input natural is too large, generalizing the existing clamped `UIntX` family. The change comes with a substantial lemma suite and simproc updates, and it sets up future refactors around `bv_decide`.

### **Ground evaluators now reduce `Nat.log2`** (5c6bce1)
Both `Sym.simp` and `Meta.simp` can now evaluate `Nat.log2` on ground naturals, plus a new builtin simproc for `simp`/`seval`. This expands literal reduction coverage for arithmetic-heavy proofs without requiring manual rewriting.

### **Lake fixes a `meta import`/`import all` interaction** (04b67f7)
Lake now tracks `import all` and `meta import` reachability separately, preventing an `import all` visit from suppressing a later meta revisit of the same module. That closes a setup-generation bug where transitive meta dependencies could be dropped from the build graph.

### **`Sum` gets lawful derived `BEq` instances** (19260e8)
`Sum` now exposes its derived `BEq` and derives `ReflBEq`/`LawfulBEq`, so equality on sums reduces cleanly across module boundaries. This fixes a proof-automation hole where obvious `==` facts on sums were previously harder or impossible to discharge by `rfl`/`decide`.

### **Other misc changes**
- CI/workflow tweak to reuse the Lake artifact cache in non-release builds (923390e)
- Lake `--fail-fast` test cleanup for Windows CI stability (dd9cb93)
- BitVec e-matching made less aggressive in two separate perf tweaks (7169e05, b464d03)
- `mdata` robustness fix in VC generation for `do` notation (b182d58)
- Stage0 update (71a4d9a)
