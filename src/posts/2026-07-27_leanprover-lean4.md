---
date: 2026-07-27
repo: leanprover/lean4
size: L
title: "Do invariants, linter code actions, and perf"
excerpt: "Lean 4 adds intrinsic do-loop contracts, surfaces linter code actions, fixes deprecated-module warning positions, and ships a parser cache speedup."
commits: 12
authors: [TwoFX, wkrozowski, sgraf812]
commit_authors: {"889846d": TwoFX, "779f04e": TwoFX, "7739f09": wkrozowski, "6832de2": sgraf812, "9ec149e": sgraf812, "76e5ec5": wkrozowski, "8db1810": wkrozowski}
---

**Intrinsic verification for `do` loops and `def` contracts** (6832de2)
Lean now supports loop invariants on `for x in xs do ...` and `require`/`ensures` clauses on definitions, elaborating them into `vcgen`-style proof obligations. This is a substantial new verification feature that expands what can be checked automatically in ordinary Lean code.

**Linter code actions now flow through async info trees** (76e5ec5)
Linters can now contribute code actions by threading info-tree promises through async lint execution and inserting a placeholder hole into the main info tree. This matters for editor integrations: linter results can now surface actionable fixes instead of just diagnostics.

**Deprecated-module warnings are anchored at the right import** (7739f09)
Import deprecation warnings now use the actual import token position from the parsed header, rather than defaulting to the top of the file. That makes warnings much more precise in multi-import headers and improves the developer experience when tracking down offending imports.

**Parser cache comparisons skip array walks on the hot path** (9ec149e)
`CacheableParserContext` now compares `forbiddenTks` by pointer first before falling back to element-wise equality. Because parser cache probes hit this comparison constantly, this is a targeted performance improvement for parsing.

### Other misc changes
- Reenabled the `since`-field check for deprecated attributes after the bootstrapping workaround (889846d).
- Temporary disable/reenable churn around the same deprecation check, plus related test harness updates (779f04e, bb3c22f, 17495bd, 58a8cd7, 23af3ee).
- Refactored parametric-attribute registration into reusable pieces (`registerParametricAttributeExt` / `ForExt`) (8db1810).
