---
date: 2026-09-11
repo: biomejs/biome
size: L
title: "Bug fixes land across lint, format, and LSP"
excerpt: "Highlights include new markdown linting, test-suite alias support, and several important fixes for analyzers, formatters, and editor actions."
commits: 12
authors: [dyc3, ematipico, Netail, m1handr, FoundDream, saberoueslati, denbezrukov]
commit_authors: {"1534885": ematipico, "4968415": saberoueslati, "7030068": dyc3, "b7e3559": dyc3, "39da887": Netail, "1dd1fc4": dyc3, "9bd70c7": ematipico, "f047985": m1handr, "43cdaad": dyc3, "22e9966": FoundDream, "c7c4e2b": ematipico, "05950a7": denbezrukov}
---

### **Markdown lint rule for fenced code languages** (4968415)
Biome now ports markdownlint’s MD040 rule, flagging fenced code blocks that omit a language tag. This adds a new markdown analyzer rule plus formatter/parser support so code fences and their info strings are handled consistently.

### **Support `suite()` as a test alias** (f047985)
Test analysis and formatting now recognize `suite`, `fsuite`, `xsuite`, and `test.suite` as describe-style blocks. That broadens coverage for Jest-like test APIs and avoids false negatives in rules that depend on test structure.

### **`noFloatingPromises` now follows generic method signatures** (b7e3559)
The analyzer can now detect unhandled promises returned through generic methods, including patterns used by Playwright fixtures. This closes a class of false negatives where promise-returning callbacks were previously missed.

### **`useExhaustiveSwitchCases` handles `for...of` bindings correctly** (7030068)
Switch-exhaustiveness analysis now infers types for loop bindings such as destructured `for...of` variables. That lets the rule report missing union cases in code paths that were previously analyzed too loosely.

### **Template closing brace indentation is preserved** (22e9966)
The JS formatter no longer disturbs the indentation of closing braces in template literals. This is a targeted formatting fix that improves stability for oddly indented template content.

### **SCSS at-rules can omit a final semicolon** (05950a7)
CSS/SCSS parsing and formatting were updated to accept final semicolon omission in several at-rule forms. The change also adjusts generated node builders and related formatter logic, so valid SCSS no longer gets misparsed or reformatted incorrectly.

### **`useSimplifiedLogicExpression` preserves trivia** (1534885)
The simplification fix now keeps line breaks and comments intact in multiline conditions, preventing the right-hand side from being accidentally commented out. The same commit also adds editor suppression support for `noDynamicNamespaceImportAccess` and restores Grit plugin code actions.

### **Code actions use the right offsets in embedded HTML-ish files** (1dd1fc4)
Biome fixed a bug where code actions could target the wrong range inside Vue, Svelte, and Astro files when full HTML support is disabled. This matters for editor reliability: organizing imports and similar actions now apply to the intended embedded section.

### **Various analyzer bugs fixed** (c7c4e2b)
This patch bundle fixes several correctness issues across JS and HTML analysis, including `noUselessStringConcat`, `useReadonlyClassProperties`, `noNoninteractiveElementInteractions`, and `useHookAtTopLevel`. It also includes a large internal semantic-class refactor to support those fixes.

### **Resolve generic method signatures in their own scope** (b7e3559)
Type inference now resolves generic method signatures in their own scope, which improves callback parameter analysis and promise detection. That makes type-driven rules behave correctly in nested generic contexts instead of leaking or mis-resolving bindings.

### Other misc changes
- Lint rule umbrella relationship maintenance (39da887)
- Miscellaneous bug-fix bundle and snapshot updates (9bd70c7)
- Case-insensitive binary search utilities and benchmark scaffolding (43cdaad)
- CSS formatter/parser adjustments for at-rule endings and semicolon handling (05950a7)
- LSP and service test expansions for simplification/code-action regressions (1534885, 1dd1fc4, b7e3559)
