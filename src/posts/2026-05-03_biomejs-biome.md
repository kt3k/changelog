---
date: 2026-05-03
repo: biomejs/biome
size: L
title: "Markdown fix, SCSS parser and formatter upgrades"
excerpt: "Markdown reference parsing was fixed, while SCSS parsing/formatting got several improvements for interpolations, maps, and function calls."
commits: 10
authors: [denbezrukov, jfmcdowell, realknove, dyc3]
commit_authors: {"edb2367": jfmcdowell, "b2d0e7f": denbezrukov, "1a08f89": realknove, "ac30057": dyc3, "a1339fd": denbezrukov}
---

### **Markdown parser keeps empty reference paragraphs** (edb2367)
The markdown parser now preserves empty reference-definition paragraphs and re-lexes after parsing link blocks, fixing cases where link references appear before thematic breaks, inside lists, or in blockquotes. This is a correctness fix that tightens parsing across several block-structure edge cases.

### **SCSS parser now handles spaced function heads** (b2d0e7f)
SCSS parsing was updated to recognize function heads even when whitespace separates the name and `(`, with recovery and error cases adjusted accordingly. That broadens what Biome can parse correctly and prevents misclassification of valid SCSS syntax.

### **Readonly class-property analysis now catches arrow writes** (1a08f89)
The JavaScript analyzer now tracks writes to `readonly` class properties made through arrow callbacks, closing a hole in the `useReadonlyClassProperties` rule. That makes the lint rule more reliable and avoids missed violations.

### **HTML formatter preserves multiline non-text children** (ac30057)
The HTML formatter now keeps newlines around element-only multiline children instead of collapsing them away. This improves formatting stability for Vue/HTML structures where whitespace carries intent and readability.

### **SCSS selectors accept interpolated nth arguments** (a1339fd)
The CSS parser/formatter and analyzer now support SCSS interpolation inside `nth-*` selector arguments, with corresponding AST factory and formatter updates. This is a notable language-support expansion for selector parsing and downstream formatting.

### Other misc changes
- SCSS map formatting improvements across several formatter commits
- Parenthesized SCSS list indentation/expansion fixes
- SCSS interpolated operator operand test coverage
- Various snapshot updates and internal formatter refactors
- Minor docs/changeset additions
