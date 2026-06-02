---
date: 2026-05-11
repo: biomejs/biome
size: L
title: "SCSS includes, Tailwind values, and Markdown fixes"
excerpt: "Added SCSS `@include using` parsing, split Tailwind numeric/percent values, and fixed tab-indented Markdown sibling lists."
commits: 12
authors: [jfmcdowell, dyc3, denbezrukov]
commit_authors: {"d50546a": jfmcdowell, "3f02f4a": dyc3, "26de751": denbezrukov}
---

### **SCSS `@include ... using` clauses are now parsed and formatted** (26de751)
Biome now recognizes the SCSS `using` clause on `@include` rules, updating the parser, syntax factories, formatter, and generated node types to carry the new structure. This expands SCSS support for a real language feature and should improve both correctness and emitted formatting.

### **Tailwind parser now distinguishes numeric and percentage values** (3f02f4a)
Tailwind class parsing was extended to treat bare numbers and percentages as separate value kinds, with new lexer handling for `%` and new syntax nodes for number/percentage values. That makes arbitrary values more precise and reduces ambiguity in class parsing, especially for gradients, ratios, and other numeric-like forms.

### **Markdown parser fixed tab-indented list sibling handling** (d50546a)
The Markdown parser now handles tab-indented sibling list items correctly instead of misclassifying them during paragraph interruption checks. This fixes a real formatting/parsing edge case in nested lists and aligns behavior more closely with CommonMark.

### Other misc changes
- Dependency bumps and toolchain updates (7 commits)
- CI/workflow image and action digest refreshes (2 commits)
- Changelog/docs cleanup
