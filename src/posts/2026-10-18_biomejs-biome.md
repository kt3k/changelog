---
date: 2026-10-18
repo: biomejs/biome
size: L
title: "Vue generics, SCSS percents, and faster rowan"
excerpt: "Biome added Vue `<script setup>` generic parsing, SCSS percent value support, rowan performance gains, and fixes for search counts and LSP actions."
commits: 11
authors: [dyc3, ematipico, denbezrukov, levrik, dfedoryshchev, siketyan]
commit_authors: {"6636760": dyc3, "ef61338": ematipico, "e797750": denbezrukov, "d5ace64": levrik, "0fe3d2b": dyc3, "d2f88a0": dyc3, "02e038f": dfedoryshchev}
---

### **Vue `<script setup>` generics are now parsed and linted** (d5ace64)
Biome now understands the `generic` attribute on Vue setup scripts, including formatting the declaration and feeding those type parameters into lint rules. That fixes false positives in `noUndeclaredVariables`, `noUnusedVariables`, and `noUnusedImports` for generic Vue components.

### **SCSS standalone percent values are supported** (e797750)
The SCSS parser/formatter now handles bare percent values as a first-class syntax node, with new factory, parser, and formatter support plus coverage tests. This closes a real language gap for SCSS expressions like percent literals.

### **`biome search` now counts every match correctly** (ef61338)
The CLI search command’s reported totals now reflect the number of matches, not just the number of files searched. That fixes both the human-readable summary and JSON reporter output.

### **Embedded code diagnostics now get code actions in full HTML support** (6636760)
When `html.experimentalFullSupportEnabled` is on, code actions are now computed using document coordinates instead of legacy embedded-snippet offsets. This restores fixes for diagnostics inside embedded expressions and scripts across Astro, Vue, Svelte, and HTML.

### **Vue `generic` attributes are parsed into the embedded AST** (d5ace64)
Beyond linting, the Vue embedder and related formatter/test paths were updated so the `generic` attribute is recognized end-to-end. That makes Biome’s Vue support behave correctly for both analysis and formatting of typed setup blocks.

### **Rowan trimmed-node-range computation is faster** (0fe3d2b)
Linting now computes syntax node ranges directly from the green tree without allocating edge tokens first. The accompanying parser test updates indicate this is a core performance improvement to tree/range handling.

### **Rowan tree building skips refcount traffic for cached children** (d2f88a0)
Tree construction now reuses cached children more efficiently by avoiding unnecessary reference count churn when assembling nodes. This is a lower-level performance win in the syntax infrastructure that should help parser and formatter throughput.

### **`useNamingConvention` no longer flags declarations in ambient namespaces** (02e038f)
The naming-convention rule now ignores declarations nested inside ambient namespaces, fixing a correctness bug in TypeScript namespace handling. That prevents spurious diagnostics in valid code.

### **Other misc changes**
- Rule metadata updated for several lint rules
- `noUndeclaredVariables` Vue generic snapshot updated
- `rowan` trivia helper refactor across analyzers/rules
- `self_update` dependency upgrade and `reqwest` removal in the CLI
