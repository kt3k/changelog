---
date: 2026-06-19
repo: biomejs/biome
size: L
title: "Biome tightens LSP, lint, and codegen"
excerpt: "Workspace config loading is fixed, lint docs get clearer diagnostics, and global type codegen lands."
commits: 6
authors: [Conaclos, ematipico, minseong0324, dfedoryshchev]
commit_authors: {"7499979": dfedoryshchev, "5941df2": Conaclos, "888515b": Conaclos, "b6e1146": minseong0324, "f719af6": ematipico, "ef2373f": ematipico}
---

### **Workspace config loading is fixed for multi-root LSPs** (ef2373f)
Biome now records configuration status against the correct project after loading workspace folders, instead of applying a global status that could suppress diagnostics elsewhere. The new regression test covers a broken config in one folder not disabling lint/assist in another.

### **Global type codegen scaffolding lands in js type info** (b6e1146)
This adds a new `xtask` codegen pipeline for generating global type data from TypeScript sources, along with generated resolver hooks and builder wiring in `biome_js_type_info`. It also updates CI/workflow triggers and introduces generated test fixtures, paving the way for replacing hand-maintained global type metadata.

### **`useExportType` is deduplicated and shares list-splitting utilities** (888515b)
The rule was refactored to reuse new generic helpers in `biome_analyze`, reducing duplicated AST list-manipulation code across export/import type handling. This kind of cleanup lowers maintenance cost and makes future rule fixes easier to implement consistently.

### **`useFlatMap` diagnostics now explain the performance win** (5941df2)
The `useFlatMap` rule now includes a note that `.flatMap()` avoids creating an intermediate array, both in rule docs and in emitted diagnostics. The snapshot updates reflect the clearer guidance, making the suggestion more actionable for users.

### **`xtask` rules check gets simpler JSON member construction** (f719af6)
The rules-check helper refactor extracts JSON member creation into a reusable helper and adjusts synthetic option-building code. This is an internal cleanup with no user-facing behavior change.

### **JS API docs wording is corrected** (7499979)
Minor JSDoc wording fixes in the JavaScript API clarify two method descriptions. No runtime behavior changes.

### Other misc changes
- Dependency bumps and lockfile updates.
- Small internal utility refactors in `biome_analyze`.
- Test snapshot/doc-only updates tied to the lint and LSP changes.
