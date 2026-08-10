---
date: 2026-08-09
repo: leanprover/lean4
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Lean4 sharpens bv_decide, vcgen, and Lake tooling"
excerpt: "This week brought faster and more flexible bitvector automation, richer vcgen specs/termination, plus sturdier Lake lint and cache handling."
commits: 29
---

### **Bitvector automation got faster and more flexible**
`bv_decide` saw the biggest churn this week: its SymM preprocessing was moved onto a faster pipeline, type-filtering was added to limit preprocessing to selected inductives, and it can now run inside `sym =>` while also reusing `grind`/`sym` equivalence classes. Along the way, preprocessing learned a few more boolean and metavariable cases, and `bv_normalize` was split out as a preprocessing-only entry point.

These changes should make large rewriting-heavy goals faster and broaden the range of interactive workflows where BVDecide can participate, but they also include some behavior changes around normalization that may require proof updates.

### **VCGen and spec syntax became more expressive**
The verification-condition generator picked up a more unified loop-spec story for effect-free containers, so `for ... invariant` now works across maps, sets, ranges, slices, iterators, and similar containers without bespoke per-type specs. It also now keeps searching if a `@[spec]` theorem doesn’t apply, which avoids false misses when a more specific theorem exists later.

On the language side, `requires`/`ensures` binders preserve type ascriptions, `for ... invariant` accepts destructuring binders with clearer errors, and `ensures` clauses can now be written with match alternatives like `| none => ... | some v => ...`. Termination measures were generalized too: `Spec.repeatM` now accepts any `WellFoundedRelation` and can depend on monadic state, enabling lexicographic or custom decreases instead of only `Nat` measures.

### **SymM and grind fixed several matching and elaboration bugs**
SymM now elaborates polymorphic theorems correctly in more cases, including proposition-valued conclusions that previously missed universe levels. Matching also became more robust by resolving assigned metavariables during discrimination-tree lookup and ignoring `mdata` wrappers, which fixes a class of missed rewrites and confusing failures in simp-style workflows.

`grind` was improved as well: it now beta-reduces canonicalized types, which helps it recognize definitional equalities that were previously left syntactically distinct.

### **Lake lint and cache handling were cleaned up**
`lake lint` got a new internal mode split and a `--code-quality` JSON output mode, making builtin lint results easier to consume from tooling and dashboards. That pairs with the new explicit builtin-lint mode flag from earlier in the week, which keeps the CLI internals more structured.

Lake’s cache and test infrastructure also got sturdier: curl lookup is now more configurable, cache tests rely less on external network/secrets, cache lookup failures are downgraded under failure-tolerant runs, and invalid cache JSON now errors out cleanly. The `leanExit` test harness was also stabilized so exit-code reporting is deterministic.

### **Runtime and compiler polish**
A hot object-deletion loop in the runtime was optimized by keeping the free-list worklist in a register, and LCNF constant folding now reduces literal `UInt*.ofNatLT` calls to plain literals more often. There was also a serious `String.extract` use-after-free fix for huge slices.

### Other misc changes
- Loop-spec universe bounds were relaxed for `Std.Internal.Do`.
- `Range.size` gained a `grind` attribute and several container `PureForIn`/`ForIn.toList` lemmas were added.
- Separation-logic VCGen demos/tests were expanded, along with assorted regression, formatting, and documentation updates.
- Stage0 refreshes landed twice during the week.
