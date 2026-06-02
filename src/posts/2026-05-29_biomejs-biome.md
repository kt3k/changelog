---
date: 2026-05-29
repo: biomejs/biome
size: L
title: "Svelte, linting, markdown, and YAML fixes"
excerpt: "Major parser and lint rule improvements landed, plus markdown/YAML correctness fixes and automation workflow updates."
commits: 6
authors: [Mokto, IxxyDev, jfmcdowell, siketyan, pkallos, ematipico]
commit_authors: {"0c03ee3": Mokto, "24e51d6": IxxyDev, "f54d5a2": jfmcdowell, "6d0e473": siketyan, "ff635a9": pkallos}
---

### **Svelte await blocks now allow omitted bindings** (0c03ee3)
Biome’s HTML/Svelte parser and formatter now accept `{:then}` and `{:catch}` without a binding variable, including the shorthand `{#await expr then}` and `{#await expr catch}` forms. This removes a parser error and brings the AST/codegen in line with valid Svelte syntax.

### **`noUnnecessaryConditions` now catches more redundant checks** (24e51d6)
The lint rule was expanded to use type information for a much wider set of always-true/always-false conditions, including optional chaining, nullish coalescing, logical operators, null/undefined comparisons, and impossible `switch` cases. That meaningfully increases the rule’s coverage and should surface more dead or misleading conditionals.

### **Markdown list parsing now preserves loose lists after empty items** (f54d5a2)
The markdown parser was fixed so an empty list item followed by a blank line can still belong to the same list when the next item continues with the same marker. This aligns Biome with CommonMark behavior and avoids incorrectly splitting list structure.

### **YAML anchor/tag lexing works before sequences** (6d0e473)
The YAML lexer now correctly handles anchor/tag properties that are followed by a block sequence, fixing mis-lexing in several parser/formatter cases. This resolves a class of YAML inputs that were previously reported as parse errors or formatted incorrectly.

### **`useNullishCoalescing` gains `ignoreMixedLogicalExpressions`** (ff635a9)
A new option was added to suppress `||`/`||=` suggestions when they appear in expressions mixed with `&&` in the same tree. This gives teams finer control over when the rule fires in complex boolean logic.

### **Other misc changes**
- CI/issue automation workflows updated to use a new stale-issue script and safer GitHub Actions steps.
