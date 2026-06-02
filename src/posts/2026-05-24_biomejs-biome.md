---
date: 2026-05-24
repo: biomejs/biome
size: M
title: "SCSS nested props parsing, promise lint fix"
excerpt: "Biome now parses interpolated SCSS nested properties and fixes a stack overflow in noMisusedPromises on shadowed destructuring."
commits: 2
authors: [denbezrukov, ematipico]
commit_authors: {"ce70f76": denbezrukov, "001f94f": ematipico}
---

### **Parse interpolated SCSS nested properties** (ce70f76)
Biome’s CSS parser and factory now accept interpolated names for SCSS nesting declarations, expanding the grammar beyond plain identifiers. This unlocks proper parsing and formatting for nested custom properties like `--#{$name}: { ... }` and aligns snapshots and generated syntax nodes with the new AST shape.

### **Fix noMisusedPromises scope handling in return statements** (001f94f)
A local inference bug could pass the wrong scope for return statements, which in turn caused `noMisusedPromises` to stack overflow on nested functions with shadowed destructured variables. The patch hardens scope resolution and adds a regression test for the shadowed-destructuring case.

### Other misc changes
- Changeset for the `noMisusedPromises` fix
- Test harness update in `quick_test.rs`
