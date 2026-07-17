---
date: 2026-07-16
repo: biomejs/biome
size: L
title: "Parser fixes and lint refactors land"
excerpt: "Biome added Angular attribute parsing, fixed Vue and CSS formatting/parser bugs, and sped up several type-aware lint rules."
commits: 9
authors: [ematipico, dyc3, Socialpranker, denbezrukov, Netail, dfedoryshchev]
commit_authors: {"cf263c4": dyc3, "89b6af4": ematipico, "e62f6b6": ematipico, "68c10e6": Socialpranker, "794ccd0": denbezrukov, "98a5f94": Netail, "48a4abb": ematipico}
---

### **Angular attributes are now parsed and formatted** (98a5f94)
Biome now recognizes Angular-specific attributes like property bindings, event bindings, structural directives, template refs, and two-way bindings. This expands HTML parsing and formatter support for Angular templates, which should unlock correct handling across the parser, syntax, and formatter stack.

### **Vue `:="props"` shorthand no longer crashes the parser** (68c10e6)
The HTML/Vue parser now accepts argument-less `v-bind` shorthand and its longhand form instead of panicking while reporting a missing argument. Related analyzers were updated to treat this syntax consistently, so Vue attributes sort and lint correctly too.

### **CSS comments now format correctly before `!important`** (794ccd0)
Comment placement around declarations was adjusted so block comments between a value and `!important` stay attached to the declaration and render in the expected position. This fixes a visible formatter bug in both CSS and SCSS output.

### **`noThenProperty` is faster and handles commented tokens better** (cf263c4)
The lint rule was rewritten to use typed syntax tree traversal and token text helpers, improving performance by about 50%. It also now correctly catches `Object.fromEntries`, `Object.defineProperty`, and `Reflect.defineProperty` cases even when comments interrupt the tokens.

### **Type-aware lint rules were ported to the newer inference APIs** (89b6af4)
Several behavior-sensitive rules were refactored to use the newer inferred-type/stringification utilities and shared typed helpers. The change trims older type plumbing and should make these rules more consistent and maintainable, while preserving behavior through added shadowing and overload tests.

### **Direct type-aware lint rules got the same inference cleanup** (48a4abb)
More type-driven rules were migrated to the newer inferred-type APIs, with supporting module-graph and type-info changes. This is a broader internal refactor that also includes a small fix for `useArrayFind` recognizing bigint zero indexes.

### **Type inference no longer drops data in cross-module overload cases** (e62f6b6)
Biome fixed a regression where copying inferred type data could panic or lose information for imported functions with multiple call signatures. This matters for rules like `noFloatingPromises`, which now handle cross-module overload callbacks safely.

### Other misc changes
- Dependency/workflow cleanup: udeps checks were commented out until the tool stabilizes; changeset/docs-only updates.
- Minor docs fix for `useIterableCallbackReturn`.
