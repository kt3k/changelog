---
date: 2026-05-06
repo: biomejs/biome
size: L
title: "Vue lint rules land; HTML/Svelte parsing fixed"
excerpt: "Two new Vue nursery rules shipped, plus parser fixes for HTML/Svelte edge cases and SCSS formatter improvements."
commits: 11
authors: [dyc3, denbezrukov, jfmcdowell, solithcy, Netail]
commit_authors: {"1110256": dyc3, "e0a54cc": dyc3, "4faf8ea": denbezrukov, "5c022dd": denbezrukov, "91ed677": dyc3, "04e22a1": dyc3, "9ee6c03": solithcy, "0e067d8": jfmcdowell, "ab4fa00": denbezrukov, "7f7419c": Netail, "7b41f1c": jfmcdowell}
---

### **Added `useVueNextTickPromise` to enforce Promise-based `nextTick`** (e0a54cc)
A new nursery lint rule now flags Vue `nextTick` calls that use a callback instead of Promise syntax. This plugs into Biome’s config, migration helpers, and diagnostics so the rule is discoverable and configurable end-to-end.

### **Added `noVueImportCompilerMacros` to stop importing Vue compiler macros** (1110256)
This new recommended nursery rule warns when compiler macros like `defineProps` are imported from `vue`, since they’re automatically available in SFCs. It also updates migration support and rule metadata so ESLint users can map the rule cleanly.

### **Fixed Svelte template parsing for missing expressions** (9ee6c03)
Svelte templates with missing expressions were being misparsed as `HtmlBogusElement`; the parser now re-lexes these cases correctly instead. The fix also adjusts whitespace handling so leading spaces aren’t incorrectly folded into the expression literal.

### **HTML parser now treats `of` as text in text contexts** (04e22a1)
The HTML parser’s keyword detection was expanded so `of` is no longer misclassified outside directive contexts. This reduces false parsing of ordinary content and extends the keyword set used by HTML/Svelte/Vue text parsing.

### **Improved SCSS formatting for maps, parenthesized expressions, and trailing commas** (5c022dd, ab4fa00, 4faf8ea)
Biome’s CSS formatter got a substantial SCSS overhaul: map layout/comment handling, parenthesized expressions, include arguments, and trailing-comma behavior were all refined. This should produce more stable, prettier output for real-world SCSS, especially around nested maps and function-like syntax.

### Other misc changes
- Updated transient `rustix` dependency to fix CI (91ed677)
- Markdown parser regression cases promoted to `.md` fixtures (0e067d8)
- Small docstring grammar fix and markdown parser refactor (7f7419c, 7b41f1c)
