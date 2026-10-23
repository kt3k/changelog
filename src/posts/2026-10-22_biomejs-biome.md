---
date: 2026-10-22
repo: biomejs/biome
size: L
title: "Biome adds a wave of new lints"
excerpt: "Major lint coverage expands across JS, CSS, HTML, JSON, Vue and formatting, plus several formatter and rule fixes."
commits: 21
authors: [dyc3, vidigoat, latin-1, jelly, vibbix, Netail, ff1451]
commit_authors: {"9520907": latin-1, "7d3e8a1": vidigoat, "0be8d10": dyc3, "438997f": vidigoat, "62ad123": vibbix, "e59a324": Netail, "372af2a": dyc3, "208730e": latin-1, "470018b": dyc3, "dbcdab1": dyc3, "1c2cac0": dyc3, "f01ebb0": dyc3, "34b520d": dyc3, "9e875a4": dyc3, "cf61682": dyc3}
---

### **New JS lint: noUnsafeReturn** (0be8d10)
A new nursery rule flags returning `any` from functions, helping catch unsafe type leakage before it spreads through APIs. It also lands ESLint migration support and rule/config plumbing, so it’s ready for adoption.

### **New JS lint: noBooleanSortComparator** (cf61682)
This rule detects sort comparators that return booleans instead of numbers, which can leave arrays incorrectly ordered. The implementation is wired into rule metadata and config generation, so it’s available for migration and configuration immediately.

### **New JS lint: noUnreadableForOfExpression** (372af2a)
Biome now flags `for...of` loops that iterate over overly complex expressions instead of a clear variable or simple access. That should make iterator code easier to read and less error-prone, especially in async loops.

### **New CSS lint: noSelfNestedLayer** (62ad123)
A new CSS nursery rule warns when a cascade layer nests another layer with the same name, which silently creates a sublayer rather than extending the original layer. This helps prevent subtle cascade-order mistakes in layered stylesheets.

### **New HTML lint: noObsoleteAttributes** (34b520d)
Biome adds a rule for obsolete HTML attributes, with guidance on what to use instead. This broadens HTML correctness coverage and should help modernize legacy markup.

### **New HTML/Vue lint: noVueVTextVHtmlOnComponent** (f01ebb0)
This rule disallows `v-text` and `v-html` on Vue components, where those directives overwrite the component root rather than populating its slot. It closes a common template footgun in Vue codebases.

### **New JSON lint: usePackageJsonValidCpu** (9e875a4)
Package metadata validation expands to `package.json`’s `cpu` field, ensuring it contains recognized processor types. That catches invalid publish metadata before it reaches consumers.

### **New CSS lint: useConsistentLightnessNotation** (1c2cac0)
Biome now enforces consistent lightness formatting in modern color functions like `lab()` and `oklch()`. The commit also adds Stylelint migration support, making cross-tool adoption smoother.

### **Fix formatter edge cases in TypeScript parentheses** (7d3e8a1, 438997f)
Two formatter fixes preserve parentheses around instantiation expressions in more operator contexts, avoiding accidental syntax changes in TS output. This improves correctness for a tricky corner of the printer/parser interplay.

### **Fix CSS property sorting in keyframes and preserve formatting details** (9520907, 208730e)
Property-sorting logic now handles keyframe steps correctly and preserves semicolons and line comments when reordering declarations. These fixes make the CSS assist safer to use on real-world stylesheets.

### **Improve markdown blockquote/list formatting** (470018b, dbcdab1)
Markdown formatting now keeps quote markers after empty quote-only lines and preserves the blank line between a paragraph and a following list. The result is more stable, less surprising markdown output.

### **Improve noIdenticalTestTitle diagnostics** (e59a324)
Biome refines diagnostics for duplicate test titles, making the rule more useful when spotting repeated names in test suites. The update also includes adjusted fixtures for the new messaging.

### Other misc changes
- Rule metadata and generated config updates for newly added rules and docs links.
- Additional ESLint/Stylelint migration mappings for the new rules.
- Minor internal rule/refactor adjustments and test fixture updates.
