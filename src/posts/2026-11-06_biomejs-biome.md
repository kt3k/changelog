---
date: 2026-11-06
repo: biomejs/biome
size: L
title: "Biome lands a wave of new nursery rules"
excerpt: "Major lint coverage and a few parser/perf fixes, including embedded CSS, regex safety, and CSS semantic memoization."
commits: 30
authors: [dyc3, siketyan, ematipico, vibbix, dor-sr, ashokram-si]
commit_authors: {"ec0142b": siketyan, "bd0988e": siketyan, "60f4695": dor-sr, "e1ef913": ematipico, "014b976": ematipico, "fedcaee": dyc3, "cc929af": dyc3, "1b21232": dyc3, "6b73fcf": dyc3, "1cd7520": dyc3, "da0422e": dyc3, "cd9e10f": dyc3, "d47fcfd": dyc3, "e954f55": dyc3, "2987b54": ashokram-si, "5a06df5": vibbix}
---

### **New lint rule: noNegatedArrayPredicate** (e954f55)
Adds a nursery rule that flags negated `some()`/`every()` calls and suggests moving the negation into the callback. It also wires the rule into config, diagnostics, and ESLint migration support.

### **New lint rule: noConstantComparisons** (cd9e10f)
Introduces a nursery rule for impossible or redundant `&&`/`||` comparisons, such as contradictory numeric bounds or checks that cancel each other out. This catches a class of always-true/always-false conditions that are usually logic bugs.

### **New lint rule: noArrayMethodsOnArguments** (da0422e)
Adds a nursery rule that reports array methods called on `arguments`, which is array-like but not an actual array. The rule is hooked into Biome’s rule metadata and config validation so it’s available end to end.

### **New lint rule: noSubtractionComparison** (d47fcfd)
Adds a nursery rule that flags subtracting two values just to compare the result against zero, and recommends comparing the operands directly. This is a readability and correctness win, especially for migrated ESLint setups.

### **New lint rule: noSharedBranchCode** (1cd7520)
Adds a nursery rule for duplicated code at the start or end of every `if` branch, suggesting it be hoisted out of the conditional. This reduces repetition and makes future edits less error-prone.

### **New lint rule: noUninvokedArrayCallback** (6b73fcf)
Adds a nursery rule that detects callback-based array methods used on sparse arrays created with `Array(n)`, where the callback never runs. It helps catch a subtle bug where code appears to build values but actually leaves empty slots.

### **Embedded CSS now covers `styled.a.attrs()` and fixes root-declaration linting** (ec0142b, bd0988e)
Biome expands embedded CSS parsing to recognize `styled.a.attrs()` snippets, improving analysis inside styled-components patterns. Related CSS linting now resolves root declarations correctly in embedded snippets, so rules like `noMissingVarFunction` and duplicate-property checks behave more accurately there.

### **`useUnicodeRegex` no longer suggests unsafe `u`-flag fixes** (60f4695)
The regex rule still reports patterns that need attention, but it now avoids autofixing cases that would become invalid or change meaning under Unicode mode. That prevents Biome from proposing fixes for patterns like `/{/` or `/[\d-z]/` that would break after adding `u`.

### **CSS parser fixes SCSS negative interpolation list items** (2987b54)
SCSS parsing now treats negative interpolation list items as separate values instead of misreading them as subtraction. That corrects both parsing and formatting for cases like `margin: -#{$s} -#{$s} -#{$s} auto;`.

### **CSS semantic model memoizes upward selector traversal** (014b976)
Selector traversal in the CSS module graph is now memoized, reducing repeated work during upward walks. The change is substantial enough to warrant a performance-focused refactor across the module graph query path.

### Other misc changes
- Missing plugin now emits an explicit error (e1ef913)
- Rule index overflow guard in configuration (cc929af)
- Rule metadata update (1b21232)
- `useGenericFontNames` skips `@font-palette-values` (5a06df5)
- Release/CI bookkeeping and sponsor README cleanup (09ee04d, fedcaee)
- Dependency bumps: libc, schemars, jiff, globset, happy-dom, vite (5 commits)
