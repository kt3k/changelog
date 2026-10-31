---
date: 2026-10-30
repo: biomejs/biome
size: L
title: "Big lint and formatter drop"
excerpt: "Biome adds several new lint rules, fixes markdown and JS formatting bugs, and improves LSP capability handling."
commits: 12
authors: [dyc3, vibbix, ematipico, nhedger, vidigoat]
commit_authors: {"c973fed": dyc3, "bbffb43": dyc3, "1db7c0d": vibbix, "a0160a4": vibbix, "f1eb303": dyc3, "10db33d": dyc3, "6d23980": ematipico, "69187a9": dyc3, "e87ec37": nhedger, "397b0eb": ematipico, "86be8b8": vidigoat, "1df6d85": dyc3}
---

### **New Tailwind variable shorthand lint** (c973fed)
Biome adds `useTailwindVariablesShorthand` for JavaScript and HTML, flagging Tailwind classes that use `bg-[var(--...)]`-style syntax and auto-fixing them to the newer shorthand. It also wires the rule into config, diagnostics, and ESLint migration support, so users can adopt it consistently.

### **New SCSS interpolation lint** (1db7c0d)
The new `noMissingScssInterpolation` rule catches Sass variables and function calls in custom property values that should be wrapped in `#{}`. This matters because Sass otherwise emits the raw text into CSS, and the unsafe fixer now wraps those values for you.

### **New functional pseudo-class selector lint** (a0160a4)
Biome now reports pseudo-elements used inside `:is()`, `:where()`, `:not()`, and `:has()`, plus related invalid selector forms. The rule is added across CSS config, diagnostics, rule options, and editor tooling, making invalid selectors easier to catch before they silently stop matching.

### **New Vue `nextTick` usage lint** (f1eb303)
A new `useVueValidNextTick` rule flags Vue `nextTick` calls that are used incorrectly, such as ignoring the returned Promise or not actually calling `nextTick`. The change also updates Vue-specific framework handling and migration support so the rule is available in the Vue domain.

### **Markdown formatter now handles blank-line and quote/list edge cases** (6d23980, 69187a9, 1df6d85)
Biome tightened markdown formatting around block quotes, lists, and consecutive blank lines, fixing several cases where structure was being rewritten incorrectly. These changes reduce churn and prevent markdown docs from being reformatted into subtly wrong layouts.

### **JS formatter preserves optional-chain parentheses when needed** (86be8b8)
The JavaScript formatter no longer strips parentheses that are required when an optional chain is followed by `!`, type arguments, template tags, or assignment contexts. This fixes output that could change runtime behavior or even become unparsable.

### **Editorconfig glob brace alternates now parse correctly** (e87ec37)
Biome’s EditorConfig glob support now handles nested brace alternates and treats malformed brace groups more sensibly. That improves section matching for real-world `.editorconfig` files with more complex patterns.

### **LSP dynamic capability registration is more stable** (397b0eb)
The language server now avoids redundant dynamic capability registration churn, which was causing duplicate watched-file notifications in some editors. The session and test harness were updated to track unregister events as well.

### Other misc changes
- Added oxlint rule source metadata support (bbffb43)
- Readme formatting cleanup (10db33d)
