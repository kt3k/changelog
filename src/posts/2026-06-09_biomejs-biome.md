---
date: 2026-06-09
repo: biomejs/biome
size: L
title: "SCSS formatting and keyframe parsing land"
excerpt: "Biome updates SCSS formatting for parentheses and variables, and teaches keyframe parsing/lints about SCSS variable declarations."
commits: 9
authors: [denbezrukov, jfmcdowell]
commit_authors: {"8fa36d9": denbezrukov, "b9d47c7": jfmcdowell, "4636e85": denbezrukov, "dad900e": denbezrukov, "605e45e": jfmcdowell}
---

### **SCSS parenthesized values stay inline when scalar** (8fa36d9)
The CSS formatter now keeps simple SCSS parenthesized scalars inline, while still expanding nested lists/maps and preserving the right trailing-comma behavior for nested map cases. This reduces over-breaking in common SCSS patterns like include arguments and map values.

### **SCSS variable declarations get smarter formatting and comment placement** (4636e85)
Variable-declaration formatting was broadened to handle semicolonless declarations, line comments in values, and comments on the `:`/value boundary more accurately. The change also touches several SCSS layout helpers, so variable-heavy stylesheets should format more predictably.

### **SCSS keyframes now accept variable declarations** (dad900e)
The parser and syntax tree were extended so SCSS variable declarations can appear inside `@keyframes`, with formatter support and generated node updates to match. Lints for duplicate selectors and `!important` in keyframes were adjusted to skip over these SCSS-specific declarations instead of bailing out early.

### Other misc changes
- Markdown paragraph node cleanup: removed the unused `hard_line` slot and updated parser/formatter/generated factories accordingly (605e45e)
- Markdown fuzz corpus expanded to cover loose lists with mixed space-tab sublists (b9d47c7)
- Dependency bumps: pnpm, Rust 1.96.0, GitHub Actions, and `@types/node` (741dc89, 9669424, 5c016d5, 39a9637)
