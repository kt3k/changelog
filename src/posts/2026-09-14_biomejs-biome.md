---
date: 2026-09-14
repo: biomejs/biome
size: L
title: "Biome adds JSON, Vue, and iterator upgrades"
excerpt: "New lint rules for unsafe JSON, consistent object keys, and Vue directives; plus broader type inference and several bug fixes."
commits: 21
authors: [dyc3, Netail, ematipico, saberoueslati]
commit_authors: {"02ea438": Netail, "fc69047": dyc3, "8ea8b4a": dyc3, "64fd314": Netail, "a9c4aa0": saberoueslati, "a6daf0f": dyc3, "edaf3e3": dyc3, "00fbe94": dyc3, "70b7354": dyc3, "4b7aa1f": ematipico, "1fc17e3": Netail, "d37f24b": ematipico}
---

### **New JSON safety rule: `noJsonUnsafeValues`** (02ea438)
Adds a nursery rule that flags JSON values unsafe to round-trip across tools and languages, including infinities, lone surrogates, subnormal numbers, and unsafe integers. This is a meaningful correctness safeguard for JSON-heavy workflows.

### **New JSON rule: `useConsistentObjectKeys`** (64fd314)
Introduces a nursery rule that enforces a consistent Unicode normalization form for JSON object keys. That helps avoid hard-to-spot mismatches when different systems normalize text differently.

### **New Vue directive rule: `noVueUndeclaredDirectives`** (a9c4aa0)
Adds HTML/Vue analysis for custom directives that are used but never declared via `<script setup>`, a component `directives` option, or the rule’s `globals` setting. The commit also updates embedded Vue directive tracking so aliased imports are recognized correctly.

### **`useIncludes` now catches more existence checks** (1fc17e3)
Expands the lint rule beyond `indexOf()` to also catch `lastIndexOf()` comparisons and `some()` callbacks that are just strict-equality membership tests. This broadens an existing correctness/style fix and helps standardize on the clearer `includes()` pattern.

### **`useConsistentTestIt` now fixes renamed test imports** (8ea8b4a)
Improves the autofix so renamed test helpers are updated consistently when converting to `test`/`it` usage. This reduces broken or incomplete rewrites in real-world test code.

### **Import-extension fixes and JS/CSS lint corrections** (d37f24b, fc69047)
Fixes `useImportExtensions` so it handles JSX imports with declarations and resolves aliases from referenced TypeScript projects. Also corrects `noDescendingSpecificity` behavior across cascade layers and tightens the `useConsistentArrowReturn` fix to avoid generating invalid code.

### **Codegen and type-inference upgrades for built-in globals** (edaf3e3, 00fbe94, a6daf0f, 70b7354)
Improves generated global type data for `Set`, `Map`, `Date`, `RegExp`, `WeakMap`, and iterator-related declarations, including class members and instance members. These are deeper type-system changes that should improve inference and rule accuracy across JS analysis.

### **Grit import-pattern matching now works** (4b7aa1f)
Fixes pattern compilation so Grit import patterns match as expected. That matters for users relying on import-aware transformations and searches.

### Other misc changes
- Dependency bumps across Rust, JS, and GitHub Actions tooling (8 commits)
- Documentation/config updates and generated artifact refreshes
- Minor migration-table updates for ESLint rule mapping
