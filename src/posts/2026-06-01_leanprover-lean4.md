---
date: 2026-06-01
repo: leanprover/lean4
size: L
title: "Lean4 stabilizes do, bv_decide, and suggestions"
excerpt: "A major cleanup day: new do elaborator becomes default, bv_decide is refactored, and suggestion interspersing gets endpoint fixes."
commits: 11
authors: [sgraf812, kim-em, hargoniX, wkrozowski, Kha, JOSHCLUNE]
commit_authors: {"3393240": sgraf812, "8a8dd7f": kim-em, "b8c3439": hargoniX, "475ab77": wkrozowski, "ceba293": sgraf812, "af04825": Kha, "bad63c0": sgraf812}
---

### **New do elaborator is now the default** (bad63c0, 3393240, ceba293)
Lean now defaults to the new extensible `do` elaborator by flipping `backward.do.legacy` to `false`, while still allowing the old behavior via an option. The rename from `liftMethod` to `nestedAction` is also carried through the parser/helpers, with the old name left as a temporary alias until the next stage0 update.

### **`bv_decide`/`bv_check` are split into clearer modules** (b8c3439)
The bitvector decision tactic was reorganized to match Lean’s module layering: frontend code, normalization, tracing, and checking were moved into more explicit `Meta`/`Elab` modules. This is a substantial refactor that should make the API surface clearer, improve maintainability, and make the `UnsatProver` interface more visible.

### **`intersperse` now respects ratios at the endpoints** (8a8dd7f)
The suggestion combiner now clamps `ratio` to `[0, 1]` and chooses the next item by comparing the two possible next states, fixing the edge cases where `ratio = 0` or `ratio = 1` previously leaked one item from the wrong selector. That makes the documented behavior actually hold at the extremes.

### **Deprecated warnings now survive `grind` proofs** (475ab77)
Warnings for deprecated declarations are now emitted even when the deprecated use appears inside a `grind` proof or another deprecated definition. This restores expected diagnostics and prevents deprecations from being silently masked.

### **Lake tests stop `git init`-ing in tracked directories** (af04825)
The Git-backed Lake tests now run in a separate untracked `work/` directory instead of creating nested repositories inside the checked-in tree. That avoids spurious file removal/dirty-state issues during test execution.

### Other misc changes
- Stage0 updates (3 commits)
- Removed the temporary `liftMethod` parser alias after the rename (ceba293)
- Minor test expectation updates and internal cleanup around `do` elaboration
