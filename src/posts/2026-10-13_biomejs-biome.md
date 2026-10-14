---
date: 2026-10-13
repo: biomejs/biome
size: L
title: "Big week for linting, GraphQL, CSS, and HTML"
excerpt: "Major new lint/assist rules landed, plus parser/formatter fixes for CSS, HTML, and performance improvements in formatter and service."
commits: 16
authors: [dyc3, denbezrukov, ff1451, ematipico]
commit_authors: {"31a2fb0": dyc3, "b822e49": dyc3, "e3c5dbf": denbezrukov, "c6b7d55": denbezrukov, "eca082b": dyc3, "914dca7": dyc3, "a3fa0d6": ff1451, "5f8ea6c": dyc3, "b92638b": dyc3, "425ca46": dyc3, "54870c0": ff1451, "61bf51c": denbezrukov, "39d7595": dyc3, "6c6619e": dyc3, "4eadd57": ematipico, "144d853": dyc3}
---

### **Performance: faster formatter comment collection** (31a2fb0)
The formatter now skips comment-free subtrees when gathering comments, reducing unnecessary traversal work. This should speed up formatting on large files, especially those with sparse comments.

### **Performance: avoid reparsing already-clean formatted code** (b822e49)
The service now skips a re-parse step when formatted output has no syntax diagnostics. That trims redundant work in the workspace pipeline and should improve latency on common format-on-save paths.

### **CSS: preserve non-color SCSS hash values** (e3c5dbf)
SCSS hash values that are not actually color literals are now handled correctly instead of being treated like hex colors. The fix spans parser, formatter, and analyzer behavior, so it should close a class of false positives and formatting issues around `#...` values.

### **CSS: support interpolation in modern `if()` conditions** (c6b7d55)
The CSS/SCSS parser and formatter now accept interpolated expressions inside modern `if()` conditions. This unlocks a broader set of valid SCSS syntax and fixes parsing/formatting for conditionals that combine interpolation with `and`, `or`, `not`, and nested calls.

### **Lint: add `noUselessCall`** (914dca7)
Biome gained a new nursery JS rule that flags unnecessary `.call()` and `.apply()` invocations and suggests plain function calls instead. This is a practical correctness/readability win, and it also wires the rule into config, migration, and diagnostics metadata.

### **GraphQL: add `useSortedArguments`** (a3fa0d6)
A new GraphQL assist now sorts arguments in field/directive usages and definitions. It brings a canonical ordering for long argument lists, making schemas and queries easier to scan and review.

### **Lint: add `noVueLifecycleAfterAwait`** (5f8ea6c)
Biome now reports Vue lifecycle hooks registered after an `await` inside `setup()`, which Vue will not run. That makes this a high-value bug-prevention rule for async Vue components, with support added across config, migration, and diagnostics.

### **Lint: add `noVueShadowNativeEvents`** (b92638b)
A new Vue nursery rule flags component events that shadow built-in browser events like `click` or `keydown`. This helps prevent confusing event APIs in component libraries and app code.

### **GraphQL: add `useSortedVariables`** (54870c0)
Biome added a GraphQL assist to sort variables in operations and definitions. It’s another schema/query cleanup action that standardizes ordering and improves readability.

### **CSS: fix SCSS `@supports` handling for computed names** (61bf51c)
The CSS analyzer and formatter now correctly handle computed SCSS `@supports` names, and `!important` is no longer misread as a modifier in support conditions. This fixes both false positives and formatting/parsing issues in a fairly tricky syntax corner.

### **HTML: parse processing instructions in their own context** (4eadd57)
HTML parsing now treats processing instructions like `<?xml ...?>` in a dedicated lexer context, fixing Astro, Vue, Svelte, Angular, and plain HTML edge cases. It also resolves a separate parse error when an attribute named `?` appears right before a tag closes.

### **JS refactor: move syntax helper to the syntax crate** (144d853)
A syntax helper was moved into the JS syntax crate, with related lint code adjusted to use it. This looks like a maintenance-oriented refactor rather than a user-facing behavior change.

### **Other misc changes**
- Fixed docs URLs for `eslint-plugin-package-json` rules (eca082b, 425ca46)
- Tailwind domain activation switched to v4 (6c6619e)
- Minor internal refactors and test updates around `noProto`, CSS support rules, and other rule plumbing (39d7595)
