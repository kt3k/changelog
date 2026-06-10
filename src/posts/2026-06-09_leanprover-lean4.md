---
date: 2026-06-09
repo: leanprover/lean4
size: M
title: "Lean4 fixes namespace, ABI, and do-elab UX"
excerpt: "Private namespaces now open correctly, WASM bool ABI mismatch is fixed, and do-elaborator diagnostics gain hoverable mutable vars."
commits: 8
authors: [Kha, eric-wieser, emberian, wkrozowski, sgraf812]
commit_authors: {"659e8bb": Kha, "a89d401": eric-wieser, "6291c51": emberian, "d2f48db": sgraf812}
---

### **Private inductives can now be opened as namespaces** (659e8bb)
Lean now registers namespace prefixes from the user-facing name of private declarations, so private inductive/structure names work with `open` right after definition. This fixes a long-standing elab bug and is backed by a regression test.

### **WASM bool constructor ABI mismatch fixed** (6291c51)
`lean_mk_bool_data_value`’s C declaration now takes `uint8` instead of `bool`, matching Lean’s exported ABI. That resolves a `wasm32`/Emscripten LTO initialization trap caused by the previous type mismatch.

### **Do-elaborator mutable vars get hoverable diagnostics** (d2f48db)
The `do` elaborator now threads a richer `MutVar` record through mutable-variable bookkeeping, letting error messages and info leaves attach hover info to the original binding. This improves infoview diagnostics by showing the variable type in places like `mut` reassignments and `for`-loop internals.

### **`CoreM.toIO` reports internal exception names when available** (a89d401)
Internal exceptions are now translated to their names before being surfaced through `CoreM.toIO`, instead of only showing a numeric id. When the name lookup fails, it falls back to the old id-based form.

### Other misc changes
- Turned on `defProp` and `checkUnivs` linters in more core files, with related proof/script adjustments (1 commit)
- CI workflow dependency bumps: `actions/create-github-app-token`, `dawidd6/action-download-artifact`, `marocchino/sticky-pull-request-comment` (3 commits)
- Minor theorem/notation cleanups and deprecated alias removals in `Init` (1 commit)
