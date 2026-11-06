---
date: 2026-11-05
repo: biomejs/biome
size: L
title: "MDX parsing lands with JSX and ESM support"
excerpt: "Biome adds MDX JSX tags and ESM block parsing, plus a JS extent refactor that powers embedded-language scanning across HTML and Markdown."
commits: 5
authors: [ematipico, Netail, arendjr]
commit_authors: {"7d1939d": ematipico, "ffbf51d": ematipico, "eac5150": ematipico}
---

### **MDX parsing now handles JSX tags and embedded JavaScript** (7d1939d)
Biome’s Markdown parser now recognizes MDX JSX tags, expanding MDX support beyond plain Markdown and reducing parse errors around embedded components. The change also wires in new parse errors and formatter support so MDX content is handled more consistently end to end.

### **MDX ESM blocks and expressions are now parsed** (ffbf51d)
Biome adds parsing for MDX ESM blocks and expressions, including the logic needed to detect where embedded JavaScript actually ends. This is a major capability bump for MDX users, since imports/exports and inline expressions are core MDX features.

### **JS extent detection was extracted into a shared crate** (eac5150)
The repo splits embedded-JavaScript extent detection into a dedicated `biome_js_extent` crate and updates the HTML parser to use it. That refactor removes a large chunk of lexer-specific code and makes the embedded-language scanning logic reusable across parsers.

### Other misc changes
- README refreshed across multiple locales to mention HTML support and update the rule count messaging.
- Zed skill text edited for syntax-text-handling guidance.
