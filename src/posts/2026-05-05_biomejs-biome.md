---
date: 2026-05-05
repo: biomejs/biome
size: L
title: "Formatter, lints, and imports get sharper"
excerpt: "Big updates to SCSS and Markdown formatting, a new JS lint rule, a misleading return-type fix, and clearer organizeImports diagnostics."
commits: 7
authors: [ematipico, Conaclos, denbezrukov, dyc3, minseong0324, jfmcdowell]
commit_authors: {"3bd2b6a": Conaclos, "c5d7d89": denbezrukov, "0ae5840": dyc3, "2c7d1e1": ematipico, "b565bed": minseong0324, "9b027a6": ematipico, "1f35e1b": jfmcdowell}
---

### **SCSS `@if`/`@else if` formatting gets a major cleanup** (c5d7d89)
Biome’s CSS formatter now handles SCSS control-flow and `@each` headers with more precise syntax structures, which should improve formatting of nested conditions and comma-separated value lists. The change also tightens comment attachment and adds new SCSS fixture coverage, so real-world SCSS should format more predictably.

### **Markdown formatter now fills prose and spaces headers better** (2c7d1e1, 9b027a6, 1f35e1b)
Markdown formatting picked up proper word filling, better header spacing, and parser fixes for lazy emphasis and quoted thematic breaks. Together, these changes improve output quality on common prose and block-structure cases, while also fixing parser behavior that could mis-handle lists, blockquotes, and setext/thematic break ambiguity.

### **New `useThisInClassMethods` lint rule lands for JS** (0ae5840)
Biome adds a nursery rule modeled on ESLint’s `class-methods-use-this`, flagging instance methods, getters/setters, and function-valued instance fields that don’t use `this`. The migration path was updated too, so `biome migrate eslint` can carry over the supported ESLint options instead of dropping them.

### **`noMisleadingReturnType` now catches more false negatives** (b565bed)
The rule now flags union return annotations that include variants never actually returned, and it can suggest a narrower type when the replacement is short enough to render cleanly. That makes the diagnostic more actionable for code that advertises broader return types than it really uses.

### **`organizeImports` diagnostics are more precise** (3bd2b6a)
The import-sorting assist now reports a clearer message and highlights the specific lines involved, rather than a generic “not sorted” notice. Snapshot updates show the safer-fix label was also clarified, improving the UX across multiple file types and reporters.

### Other misc changes
- Dependency/docs/test snapshot updates for the new formatter and lint behavior.
- Minor internal refactors and generated factory updates for SCSS formatting.
- Changeset and CLI migration plumbing for the new JS rule.
