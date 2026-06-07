---
date: 2026-06-06
repo: biomejs/biome
size: L
title: "SCSS formatter and export lint get smarter"
excerpt: "Adds a `useExportType` style option, fixes SCSS bracketed and grid formatting, and tightens a11y/ignore diagnostics."
commits: 8
authors: [denbezrukov, Conaclos, harsha-cpp, dfedoryshchev]
commit_authors: {"4167475": denbezrukov, "3634a3f": denbezrukov, "eb1ed0e": harsha-cpp, "6022c19": denbezrukov, "2ceb4fe": Conaclos, "961f41c": Conaclos, "78075b7": Conaclos, "777bdbf": dfedoryshchev}
---

### **Add `useExportType` style enforcement** (78075b7)
Biome now supports a new `style` option for `useExportType`, letting users choose between `inlineType`, `separatedType`, or `auto`. The rule was expanded to split mixed exports into type-only and value exports, and the config/schema/backend were updated to expose the option.

### **Fix SCSS bracketed expression parsing** (6022c19)
SCSS bracketed expression lists are now parsed as first-class syntax instead of recovering as errors. This unlocks correct formatting for bracketed values and removes a parser hole that previously dropped valid cases in tests.

### **Preserve SCSS string concatenation indentation** (4167475)
The SCSS formatter now indents broken string concatenations more consistently, especially in grouped or parenthesized expressions. This improves readability for multi-line concatenations and aligns output with expected SCSS formatting behavior.

### **Fix grid-template handling in CSS/SCSS formatting** (3634a3f)
Biome now recognizes SCSS grid-template rows correctly and avoids treating unrelated `grid-template-*` properties as grid-area declarations. This prevents malformed formatting around grid values and fixes a correctness bug in the grid-area linter.

### **Stop `useAriaPropsForRole` false positives on Vue bindings** (eb1ed0e)
The a11y rule now treats Vue `v-bind` shorthand attributes like `:aria-checked` and `:aria-level` as satisfying required ARIA props. That removes noisy diagnostics for valid Vue templates without changing the rule’s intent.

### **Improve `noTsIgnore` diagnostic ranges** (2ceb4fe)
`noTsIgnore` now highlights only the `@ts-ignore` directive instead of a broader chunk of the comment. The rule’s message is unchanged, but the fix range is more precise and easier to act on.

### Other misc changes
- `useExportType` docs and internal refactorings (961f41c)
- SCSS formatter/parser follow-up tests and cleanup (6022c19, 4167475, 3634a3f)
- Comment wording cleanup across formatter crates (777bdbf)
