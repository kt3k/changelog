---
date: 2026-10-15
repo: biomejs/biome
size: M
title: "Formatter fixes and lint diagnostics improved"
excerpt: "JavaScript and CSS/SCSS got correctness fixes, while many lint rules now emit richer diagnostics and metadata updates."
commits: 6
authors: [Netail, dyc3, florian-lefebvre, denbezrukov]
commit_authors: {"57e1e62": Netail, "9361d23": florian-lefebvre, "49bc11c": dyc3, "d6bed5e": Netail, "7af89a1": denbezrukov}
---

### **CSS/SCSS support expands for interpolated at-rules** (7af89a1)
Biome now accepts interpolated names in SCSS at-rule preludes, with parser, factory, formatter, and test updates to cover the new syntax. This fixes diagnostics and formatting around rules like `@page`, `@font-palette-values`, and related at-rules so SCSS constructs are handled more accurately.

### **Returned and thrown sequence expressions are now parenthesized** (9361d23)
The JS formatter now emits `return (a, b);` and `throw (a, b);` instead of leaving sequence expressions bare, matching Prettier and preserving intended semantics more clearly. The change also updates parentheses handling so the formatter treats `throw` like `return` in this context.

### **Lint diagnostics got a broad readability upgrade** (57e1e62, d6bed5e)
A large set of lint rules received clearer messages that explain both the problem and the suggested fix, covering everything from JS/TS correctness to accessibility and security rules. Several snapshots were updated too, indicating user-facing diagnostics changed across CLI output and rule behavior details.

### **ESLint/Vue rule migration mappings were expanded** (49bc11c)
The migration helper now maps additional Vue ESLint rules onto Biome equivalents, including `vue/no-empty-pattern`, `vue/no-implicit-coercion`, and `vue/no-template-target-blank`. This improves `biome migrate` coverage for Vue projects and helps users bring more existing configs across cleanly.

### **Other misc changes**
- Rule metadata/source mappings updated for a few lint rules.
- YAML formatter test suite snapshots refreshed.
- Diagnostic snapshots adjusted for CSS, HTML, GS, Vue, and config handling.
