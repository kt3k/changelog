---
date: 2026-05-14
repo: biomejs/biome
size: L
title: "Major parser and CSS/Svelte support land"
excerpt: "Markdown list parsing, SCSS interpolation/keyframes, and Svelte bind parsing all got more precise, alongside a clearer JS lint diagnostic."
commits: 7
authors: [denbezrukov, dfedoryshchev, jfmcdowell, jjroush, dyc3, Netail]
commit_authors: {"5727678": denbezrukov, "8d0adfb": dfedoryshchev, "f96a778": jfmcdowell, "95907e1": jjroush, "7fdc054": denbezrukov, "950247c": dyc3, "0a58eb0": Netail}
---

### **Markdown ordered sublists now continue correctly** (f96a778)
The markdown parser was reworked to handle ordered sublist continuation and nested list indentation more faithfully, including explicit continuation-indent CST nodes and better detection of ordered markers after whitespace. This closes a class of CommonMark list edge cases and updates many snapshots, so list-heavy docs should parse and render more reliably.

### **SCSS interpolated dashed identifiers and properties are supported** (5727678)
Biome’s CSS parser/formatter/analyzers now understand interpolated dashed identifiers in SCSS, which means interpolated custom-property-style names and related declarations can be parsed, formatted, and linted correctly. This also wires the new syntax through generated factories and the `no_unknown_property` logic so SCSS doesn’t get misclassified as plain CSS.

### **SCSS keyframes selectors can now be parsed and formatted** (7fdc054)
This adds first-class parser/formatter support for interpolated SCSS keyframes selectors, plus the generated syntax/node plumbing needed to recognize them. It expands CSS/SCSS coverage for a syntax that previously produced bogus nodes, reducing formatter/parser failures around keyframe rules.

### **Svelte function bindings are parsed more precisely** (950247c)
Svelte `bind:value={get, set}`-style function bindings now have dedicated syntax nodes, so the HTML parser no longer treats them too generically. That fixes false positives from `noCommaOperator` and improves embedded-node handling for Svelte templates.

### **`noUnusedFunctionParameters` now names the unused parameter** (0a58eb0)
The JS analyzer’s diagnostic now includes the actual unused parameter name instead of only saying “parameter.” This makes the lint output more actionable without changing the rule’s behavior.

### Other misc changes
- YAML linting panic fixes with snapshot updates (95907e1)
- Duplicate-word typo/comment cleanups in docs and suppression code (8d0adfb)
- Changeset/config and test snapshot maintenance for the above fixes (2 commits)
