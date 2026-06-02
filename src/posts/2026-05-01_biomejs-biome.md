---
date: 2026-05-01
repo: biomejs/biome
size: L
title: "Markdown, CSS, HTML, and lint gains"
excerpt: "Two markdown parser fixes, three CSS/SCSS formatter/parser features, HTML diagnostics cleanup, and a new JS lint rule landed."
commits: 15
authors: [denbezrukov, jfmcdowell, dyc3, guney]
commit_authors: {"183c8fa": jfmcdowell, "a2ce50a": jfmcdowell, "eefc5ab": dyc3, "aa055cd": guney, "0cf1458": jfmcdowell, "ae659dd": dyc3, "aa5ccb8": denbezrukov, "c16c085": denbezrukov, "204177e": jfmcdowell, "1cf6d86": denbezrukov, "a6ecd39": denbezrukov, "8a40ef8": dyc3, "75e50f5": denbezrukov, "7b05a89": dyc3}
---

### **SCSS support expands for interpolation, media queries, and formatting**
Biome added parsing and formatting support for SCSS interpolated values and media query interpolation, plus better spacing and trailing-separator handling in SCSS expressions and lists. This closes multiple gaps in SCSS support and improves output fidelity for real-world stylesheets (a6ecd39, c16c085, 1cf6d86, aa5ccb8, 75e50f5).

### **New `noExcessiveNestedCallbacks` lint rule**
A new nursery rule now flags callbacks nested deeper than a configured maximum, with ESLint option migration support added alongside it. This is a meaningful linting expansion for JS codebases that want to keep callback nesting shallow and maintainable (ae659dd).

### **Markdown parser fixes list and reference edge cases**
The markdown parser now handles quoted ordered-list interrupts, preserves lazy link references as text, and stops nested lazy lists from swallowing fenced code blocks. These fixes improve correctness for common CommonMark edge cases and should reduce surprising parse output in nested content (183c8fa, a2ce50a, 0cf1458, 204177e).

### **HTML parser diagnostics are cleaner and more accurate**
Void-element closing tags now produce clearer, single diagnostics, and text-context keyword relexing was improved so HTML text is parsed more reliably. This makes parser errors less noisy and improves handling of mixed markup/text content (eefc5ab, 7b05a89).

### Other misc changes
- `noStaticElementInteractions` now excludes custom elements (aa055cd)
- `noThisInStatic` no longer reports `new this()` (8a40ef8)
- CI release changes and changelog metadata updates (46393e0)
