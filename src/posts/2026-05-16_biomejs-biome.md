---
date: 2026-05-16
repo: biomejs/biome
size: L
title: "SCSS parsing gets two major fixes"
excerpt: "Biome adds SCSS parent selectors and fixes several Sass/CSS at-rule parsing edge cases, plus a new Tailwind v4 class-sorting scaffold."
commits: 6
authors: [denbezrukov, jiwon79, ematipico, Dotify71]
commit_authors: {"c8b5e2a": denbezrukov, "48f1118": jiwon79, "15fdfdf": denbezrukov, "a9a162c": denbezrukov}
---

### **SCSS parent selectors land in the parser and formatter** (a9a162c)
Biome now understands SCSS parent selectors like `&-foo`, adding new syntax nodes plus formatter support. This also expands nested selector handling and updates fixtures, unlocking correct parsing/printing for a core Sass pattern.

### **SCSS at-rules now accept semicolonless statements** (c8b5e2a)
The CSS parser/formatter now handles semicolonless SCSS statement at-rules such as `@debug`, `@error`, `@return`, `@warn`, and `@content` without misparsing them. This is a practical compatibility fix for real-world Sass code and comes with broad parser/formatter snapshot updates.

### **Plain CSS custom functions are distinguished from Sass `@function`** (15fdfdf)
Biome now routes dashed `@function --name(...)` forms to CSS custom-function parsing instead of treating them as SCSS functions. That closes a parsing gap between Sass and plain CSS syntax and should reduce false positives on modern codebases.

### **Tailwind v4 sorted-classes support is scaffolded** (48f1118)
A new parser-based sort module and extracted Tailwind v4 presets were added for the `useSortedClasses` lint. This is groundwork for v4-aware class ordering, but the implementation is still in scaffold form and not yet a user-facing behavioral change.

### Other misc changes
- VCS config docs tweak and revert (2 commits)
