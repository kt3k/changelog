---
date: 2026-09-07
repo: biomejs/biome
size: L
title: "Biome ships a batch of parser and linter fixes"
excerpt: "Performance wins in formatter/CSS, plus fixes for imports, Unicode bindings, Astro/Vue headings, and CSS/Sass parsing."
commits: 12
authors: [ematipico, dyc3, denbezrukov, fredrikblau]
commit_authors: {"e7b3b95": dyc3, "15e47d7": denbezrukov, "e3beef5": dyc3, "49485ed": ematipico, "e322040": ematipico, "5341b3f": ematipico, "fd8fc74": ematipico, "64d4b3c": denbezrukov, "2d7a3a2": ematipico, "ed4bfa4": fredrikblau, "c1dd37a": denbezrukov}
---

### **Analyzer suppressions now work through embedded snippets** (49485ed)
Astro template suppression comments can now suppress matching HTML diagnostics across embedded content when full HTML support is enabled. The analyzer was refactored to parse and track native plus embedded suppressions in source order, which also broadens support across HTML, CSS, GraphQL, and related hosts.

### **CSS formatter gets faster property-name and value-list handling** (15e47d7, c1dd37a, e7b3b95)
Several formatter hot paths were optimized to avoid repeated scans and redundant text extraction, including token coverage validation, CSS property name reuse, and value-range layout checks. These changes target quadratic-ish behavior and should help formatting large or comment-heavy stylesheets.

### **Sass `!important` is now accepted in function arguments** (64d4b3c)
The CSS parser/formatter now handles `!important` inside Sass function arguments instead of rejecting it. This fixes a real parsing edge case and updates the formatter output to preserve these constructs correctly.

### **`noUnusedVariables` now understands Unicode escapes** (5341b3f)
The JS semantic model now treats escaped identifier spellings and their decoded names as the same binding, fixing false positives in `noUnusedVariables`. This closes a correctness gap for code that mixes escaped and unescaped identifier forms.

### **`noUselessConstructor` no longer flags forwarding constructors** (e322040)
The rule now exempts TypeScript forwarding constructors, addressing a lint false positive. New valid/invalid coverage was added for constructors that simply forward parameters to `super()`.

### **`noUnusedPrivateClassMembers` now recognizes `this` usage** (fd8fc74)
A correctness fix updates private-member usage tracking so references through `this` are counted properly. That prevents valid private members from being reported as unused.

### **`useHeadingContent` ignores content-rendering Astro and Vue directives** (ed4bfa4)
Headings that render their text via Astro `set:html`/`set:text` or Vue `v-html`/`v-text` are now treated as having content. This removes false positives for empty-looking headings that are actually populated by framework directives.

### **Import bindings are classified more accurately** (e3beef5)
Semantic analysis now marks import declarations using declaration metadata instead of relying on node shape, which improves how imported bindings are detected. Tests were added to cover regular imports, type-only imports, `import =` forms, and malformed imports.

### **CSS property-name extraction is more robust** (15e47d7)
The CSS formatter’s property-name logic now handles grid-template detection without re-running extraction in the common path, and the new tests cover escaped names, trivia, and custom properties. This is a targeted internal improvement with visible formatting behavior changes in a few edge cases.

### **Other misc changes**
- Review skill behavior docs updated (2d7a3a2)
- Additional formatter/linter tests and snapshots added across CSS, JS, and HTML
- Minor internal refactors and changelog entries for the fixes above
