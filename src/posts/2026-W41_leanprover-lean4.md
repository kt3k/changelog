---
date: 2026-10-11
repo: leanprover/lean4
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "Lean4 adds HTML syntax, speeds imports, and hardens proofs"
excerpt: "HTML snippets become first-class, while grind, vcgen, runtime, and import paths pick up correctness and performance fixes."
commits: 71
---

### **New HTML syntax and elaborator land in core**
Lean gained `Lean.Data.Html.Syntax` plus an elaborator into `Lean.Data.Html`, making HTML snippets first-class with parser/printer support, character-reference decoding, and tests.

### **Proof automation and VC generation got much more capable**
`grind` saw a steady stream of fixes around ring reasoning, canonicalization, binder rewriting, and multi-goal replay scripts, which removed several internal errors and broadened support for bitvectors, propositions, and ground facts. `vcgen` also became more expressive and predictable: it now splits more conjunctive/existential/precondition forms, handles framed resources under the ambient precondition, and better matches `∧`/`⊓`-style specs.

### **Import and compiler paths were sped up**
Lean cut overhead in several hot paths: imported module names are now cached in the environment header, module imports reuse extension entries outside the LSP, symbol-cache access and IR interpreter lookups were streamlined, and postponed codegen startup became significantly cheaper. Export/import bookkeeping also got leaner by avoiding unnecessary empty IR arrays and proof-only export artifacts.

### **Runtime, libuv, and HTTP behavior were hardened**
The libuv layer was refactored for safer RAII-style locking and handle management, while timer/signal callbacks were made re-entrancy-safe. HTTP date formatting now follows RFC 9110 strictly, random-request bounds checking was tightened, and several IO/error-path bugs were fixed.

### **Core language and metaprogramming fixes**
Equation lemmas no longer depend on caller options, `String.toList` moved fully into Lean, reducibility reads no longer wait on theorem proofs, and various export/parser edge cases were corrected, including stricter JSON validation for export data.

### Other misc changes
- `sym`/`Sym.simp` and `bv_decide` gained several smaller correctness fixes and new supported forms.
- Lake fixed partial facet key resolution and cleared stale IR artifacts before `leanir` runs.
- Documentation, test updates, nightly/CI adjustments, and small cleanup refactors across core, runtime, and tooling.
