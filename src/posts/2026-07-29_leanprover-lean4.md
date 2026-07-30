---
date: 2026-07-29
repo: leanprover/lean4
size: L
title: "Contracts grow spec blocks; cbv is narrowed"
excerpt: "Lean4 adds `where finally | spec` discharge blocks and generalizes `withSetOptionIn`, while tightening `cbv` and warning on useless init visibility."
commits: 4
authors: [Vtec234, marcelolynch, sgraf812, wkrozowski]
commit_authors: {"7830144": marcelolynch, "f696c46": Vtec234, "9f011df": sgraf812, "9bda387": wkrozowski}
---

### **Contract verification can now be discharged in `where finally | spec`** (9f011df)
`def` contract proofs can now use a dedicated `spec` subsection inside `where finally` to finish off residual verification conditions that `vcgen` leaves open. This makes contract proofs more expressive and practical, especially for cases where automated VC generation needs a few extra tactic steps.

### **`withSetOptionIn` now works with arbitrary result types** (7830144)
`withSetOptionIn` was generalized from `CommandElab`-only to any command-syntax function returning `CommandElabM α`. That unblocks reuse in tools like stateful linters that need to return computed values, without changing existing call sites.

### **`cbv` no longer supports `at` locations** (9bda387)
The `cbv at ...` form was removed after it violated internal `SymM` invariants and behaved inconsistently across tactic modes. `cbv` is now target-only, which simplifies the implementation and makes its behavior uniform with the other call sites.

### **Unnamed `initialize` blocks now warn on useless visibility modifiers** (f696c46)
Lean now warns when `public` or `private` is attached to an unnamed `initialize` block, since those modifiers have no effect there. This should help users avoid a confusing no-op in declaration syntax.

### Other misc changes
- `cbv` docs and internal implementation updated to reflect target-only behavior.
- Added/updated tests for contract formatting, intrinsic verification, `withSetOptionIn`, and `cbv` target behavior.
- Removed unnecessary `public` from some builtin-initialize declarations in tests and library code.
