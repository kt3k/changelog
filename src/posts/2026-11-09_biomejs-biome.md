---
date: 2026-11-09
repo: biomejs/biome
size: L
title: "New lint rules and parser fixes land"
excerpt: "Biome added a batch of new JS/CSS/Markdown lint rules, plus fixes for Svelte generics, CLI fs diagnostics, and parser crashes."
commits: 38
authors: [dyc3, ematipico, GBra-4-669, deepsingh132, latin-1, ninglinLiu]
commit_authors: {"7638393": GBra-4-669, "d9267a5": ematipico, "78c744a": ematipico, "478e056": dyc3, "24734a8": ematipico, "fb6bd9d": ematipico, "ace98cf": deepsingh132, "d33e56e": dyc3, "ae0e186": dyc3, "e24da6f": dyc3, "739440f": dyc3, "c6feec1": dyc3, "9b6b9f4": dyc3, "d7d755b": dyc3, "0b8f429": dyc3, "48e3572": dyc3, "a4d1b0f": dyc3, "b3375d2": dyc3, "5b00387": dyc3, "8d33c85": dyc3, "37d9f41": dyc3, "0668c8f": dyc3, "7252cbd": dyc3, "6c15027": dyc3, "a968e1a": dyc3, "f16842e": dyc3, "e781bc3": dyc3, "6a25d72": dyc3, "c198be2": dyc3, "71ab61b": dyc3}
---

### **New JS/CSS/Svelte lint rules expand coverage**
Biome shipped a large set of new rules across JavaScript, CSS, Vue, and Svelte, including checks like `useAtomicUpdates`, `noUselessSpread`, `useConsistentBooleanName`, `noInvalidFetchOptions`, and several type- and import-related rules. These additions broaden lint coverage substantially and introduce new configuration/schema entries and migration mappings for users adopting them. (d33e56e, ae0e186, e24da6f, 739440f, c6feec1, 9b6b9f4, d7d755b, 0b8f429, 48e3572, a4d1b0f, b3375d2, 5b00387, 8d33c85, 37d9f41, 0668c8f, 7252cbd, 6c15027, a968e1a, f16842e, e781bc3, 6a25d72, c198be2, 71ab61b)

### **Rowan gains navigation APIs for tree traversal**
Rowan now ports upstream navigation helpers, adding new cursor/syntax traversal primitives such as tree-top lookup, directional token walking, and children filtering by kind. This is a foundational refactor that simplifies consumers and unlocks more direct AST navigation across the codebase. (fb6bd9d)

### **Svelte generics now parse and format correctly**
Biome fixed handling of Svelte `<script generics>` attributes with object type constraints so they parse and format as TypeScript type parameters. The CLI regression test shows the formatter now normalizes spacing inside the generics attribute instead of misparsing it. (d9267a5)

### **CSS parser no longer panics on invalid `composes` values**
The CSS parser now gracefully reports a diagnostic when `composes` contains non-identifier tokens like `composes: 1px;` instead of panicking. The fix also advances past unexpected tokens so the enclosing list can continue parsing safely. (7638393)

### **CLI file-system errors get cleaner diagnostics**
Biome’s CLI now classifies missing-path and I/O failures under dedicated `fs/*` diagnostics rather than generic/internal messaging. It also distinguishes traversal errors from other errors, which should make filesystem-related failures easier to understand and less noisy for users. (78c744a)

### **Markdown formatter fixes several layout bugs**
Multiple markdown formatting issues were corrected, including alignment of table rows inside blockquotes and blank-line handling after blockquotes that end list items. These changes tighten output fidelity for common Markdown edge cases. (478e056, ace98cf, 24734a8)

### Other misc changes
- Dependency bumps: Rust 1.99.1, `notify`, `smallvec`, `jiff` (4 commits)
- Minor docs typo fix in HTML formatter comments (1 commit)
