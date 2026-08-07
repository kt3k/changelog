---
date: 2026-08-06
repo: leanprover/lean4
size: M
title: "Code-quality lint JSON and matchy ensures clauses"
excerpt: "Lake lint can now emit machine-readable code-quality results, and `ensures` clauses may use match alternatives with prettier formatting."
commits: 2
authors: [wkrozowski, sgraf812]
commit_authors: {"4a37393": wkrozowski, "ddc2f33": sgraf812}
---

### **Lake lint gains `--code-quality` JSON output** (4a37393)
`lake lint` now has a code-quality mode that turns builtin linter output into machine-readable JSON entries instead of human-readable diagnostics. Text-linter warnings are aggregated per module/linter, and environment-linter findings are emitted per flagged declaration, which should make downstream tooling and dashboards much easier to build.

### **`ensures` clauses can now use match alternatives** (ddc2f33)
Def contracts can now write postconditions in a `fun`/match style, so a result-specific spec like `ensures | none => False | some v => ...` is accepted and expanded into the generated spec theorem. The pretty-printer also formats contract clauses on their own lines to match source style more closely.

### Other misc changes
- Added/updated tests for code-quality lint output.
- Added/updated formatting and intrinsic verification tests for `ensures` match alternatives.
