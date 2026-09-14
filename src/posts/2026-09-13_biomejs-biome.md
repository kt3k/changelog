---
date: 2026-09-13
repo: biomejs/biome
size: M
title: "Parser, formatter, and codegen all get smarter"
excerpt: "Fixed TS class modifier parsing, expanded global type lowering, and improved CSS/SCSS parsing/formatting and selector performance."
commits: 5
authors: [denbezrukov, dyc3]
commit_authors: {"c2542c6": dyc3, "88854dd": dyc3, "69f251b": denbezrukov, "e59aedc": denbezrukov, "04c1f0c": denbezrukov}
---

### **TS class modifiers now validate and parse correctly** (c2542c6)
Biome fixed two related class-member edge cases: `readonly` can now be rejected properly when combined with `accessor`, and `override accessor` parses in the supported order. This tightens TypeScript class modifier handling and resolves precedence issues that previously produced incorrect errors or parse failures.

### **Global type lowering now covers more declaration shapes** (88854dd)
The codegen path for global types was expanded to lower additional type forms, including booleans, nulls, string literals, unions, and local type references. That broadens what can be emitted for generated global declaration tables and should reduce gaps in type-info generation.

### **CSS/SCSS media queries now accept module variables and richer values** (69f251b)
The CSS parser and formatter were updated to handle SCSS module variables inside media queries, along with comparison, range, arithmetic, and `calc()`-style values. This brings query parsing/printing closer to real-world Sass usage and fixes a large class of failures around media-feature values.

### **Sass function adjacency is preserved more faithfully** (e59aedc)
Formatting and parsing were adjusted so Sass function-call boundaries survive cases involving comments, spacing, and escaped identifiers. That helps avoid accidentally rewriting authored function syntax in tricky value contexts.

### **Selector formatting skips unnecessary boundary scans** (04c1f0c)
A small formatter optimization avoids extra comment/context work when there are no selector comments to process. It should make some selector formatting paths cheaper without changing output.

### Other misc changes
- Dependency/changelog updates and test fixture additions for the above fixes.
