---
date: 2026-08-05
repo: leanprover/lean4
size: L
title: "Lean 4 adds BVDecide type filtering, fixes SymM bugs"
excerpt: "New BVDecide type restrictions and several SymM/unifier fixes land alongside safer String.extract and contract/invariant elaboration improvements."
commits: 9
authors: [sgraf812, hargoniX, leodemoura]
commit_authors: {"c4e6b62": leodemoura, "16fafca": leodemoura, "4c29de6": hargoniX, "6c50efd": sgraf812, "e5a38df": sgraf812, "82a131b": sgraf812, "752b791": hargoniX, "42a1d76": sgraf812, "3a47eb5": hargoniX}
---

### **BVDecide now accepts explicit type filters** (3a47eb5)
`bv_decide`, `bv_normalize`, `bv_decide?`, and `bv_check` can now take `types [T₁, ..., Tₙ]` to restrict enum/structure analysis to selected inductives. This gives users a way to rein in preprocessing on large goals where only a few complex types matter.

### **SymM discrimination trees now see assigned metavariables and `mdata`** (c4e6b62, 16fafca)
The SymM matching/rewrite pipeline was taught to resolve assigned metavariables during discrimination-tree lookup, and to ignore `Expr.mdata` wrappers in both matching and unification. This fixes missed matches and confusing failures in simp/rewrite-style workflows when goals contain metadata or metavariables assigned after goal creation.

### **`bv_decide` embedded constraints now handle negated booleans** (752b791)
The preprocessing pass for embedded constraints now recognizes hypotheses of the form `(!a) = true` as well as `a = true`, and rewrites them through a dedicated boolean lemma. That lets `bv_decide` simplify a slightly larger class of boolean constraints before SAT solving.

### **Contract and loop-invariant elaboration accepts clearer binder forms** (6c50efd, 82a131b)
`requires`/`ensures` clauses now preserve type ascriptions on their binders, and `for ... invariant` now supports destructuring binders while giving better errors when the container lacks the needed `PureForIn` instance. This makes verification scripts more expressive and moves diagnostics to the clause that actually needs fixing.

### **`String.extract` no longer hits a use-after-free on gigantic slices** (4c29de6)
A runtime bug in `String.Pos.Raw.extract` was fixed for very large slice limits. The patch addresses the memory-safety issue behind the reported crash, though the separate semantic divergence noted in the PR remains.

### **Separation-logic VCGen tests grew an in-place append and allocator-backed stack** (42a1d76, e5a38df)
The `vcgenSepLogic` demo was extended with an in-place append proof and a stack model with an explicit allocator/free-store resource. These additions exercise more demanding frame inference and ramified specs, but they are test-only changes.

### Other misc changes
- Separation-logic demo documentation and helper lemmas expanded.
- BVDecide normalization/interactive plumbing updated to thread the new `types` syntax.
- Small SymM/Do VCGen internal refactors to use the current metavariable context.
- Additional regression tests for metadata handling, assigned mvars, embedded constraints, and intrinsic verification.
