---
date: 2026-09-02
repo: biomejs/biome
size: L
title: "Biome adds Bun and Vue lint rules"
excerpt: "Major linting coverage expanded with Bun runtime support, new JS/Vue nursery rules, plus fixes for parser and CSS analyzer edge cases."
commits: 14
authors: [ematipico, dyc3, Netail, denbezrukov]
commit_authors: {"eb44d3f": dyc3, "b19390c": dyc3, "a20f44a": Netail, "1fc42ed": dyc3, "6c7fd27": dyc3, "a689cb5": ematipico, "092a89f": dyc3, "15350fc": denbezrukov, "6586ceb": ematipico, "d4a0716": ematipico, "65742b3": ematipico, "67963b4": ematipico, "b6611dd": ematipico, "c5c8315": Netail}
---

### **Bun runtime and module support expands linting** (c5c8315, a20f44a)
Biome now understands Bun-builtins across import resolution and linting, so rules like `noUnresolvedImports`, `noUndeclaredDependencies`, and the Node-module checker stop flagging Bun runtime modules such as `bun:sqlite` and `bun:test`. A new `noBunModules` nursery rule also lands to explicitly forbid Bun builtins where desired, making runtime-specific module handling much more precise.

### **New `noThisOutsideOfClass` JS rule** (1fc42ed)
Biome adds a nursery lint rule that reports `this` used outside class members, while still allowing TypeScript functions with an explicit `this` parameter. The commit also wires the rule into ESLint migration/configuration metadata and adds full JS/TS coverage.

### **Vue deprecated scoped slots rule added** (6c7fd27)
A new Vue nursery rule flags deprecated `$scopedSlots` usage and can suggest an unsafe `$slots` replacement. This broadens Biome’s framework-specific linting and includes backend/schema wiring plus migration support from ESLint.

### **Malformed `for...of` parsing no longer crashes** (6586ceb)
Biome fixes a parser recovery bug that could crash linting on malformed `for...of` input. The parser now classifies certain broken arrow-like constructs as bogus expressions, improving resilience on invalid code.

### **`noUnusedVariables` now handles merged interfaces correctly** (a689cb5, 65742b3)
Two fixes tighten TypeScript unused-variable analysis around interface merging and namespace merging. That prevents false positives in patterns that intentionally split declarations across multiple interface/namespace blocks.

### **CSS parser/analysis gets several correctness fixes** (15350fc, d4a0716, b6611dd)
Biome fixes SCSS nesting recovery, legacy IE filter parsing/formatting, and duplicate-property detection across nested at-rules. These changes improve both parser robustness and lint accuracy on real-world CSS/Sass edge cases.

### **Grit plugins can now use `function = ...` node arguments** (67963b4)
Biome’s Grit parser and CLI regression coverage were updated so plugins can use `function = ...` in node arguments. This unblocks a parser bug that previously rejected valid plugin patterns.

### Other misc changes
- Align explicit length checks lint rule and related migration/tests (b19390c)
- Fix panic in debug builds in control-flow analysis (eb44d3f)
- Tweak contributing docs and contributor guidance (092a89f)
- Minor rule/config/schema wiring and snapshot updates across new lint additions
