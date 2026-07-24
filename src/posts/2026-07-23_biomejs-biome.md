---
date: 2026-07-23
repo: biomejs/biome
size: L
title: "Major parser, formatter, and linter upgrades"
excerpt: "Biome added a new ESLint port, fixed several parser/formatter edge cases, and shipped YAML and type-inference improvements."
commits: 12
authors: [ematipico, dyc3, denbezrukov, Zelys-DFKH, Mokto, johncarmack1984]
commit_authors: {"781d68d": dyc3, "89c27c6": ematipico, "ede869c": dyc3, "623dbbb": ematipico, "22ec076": denbezrukov, "50a9bd8": Zelys-DFKH, "2a708ce": denbezrukov, "aa87885": ematipico, "0abb620": Mokto, "0e4b03b": ematipico}
---

### **Added `noRestrictedProperties` with migration support** (781d68d)
Biome now ships a new nursery lint rule that ports ESLint’s `no-restricted-properties`, flagging restricted member access and destructuring patterns. The CLI migration path and config schema were updated so `biome migrate eslint` can preserve rule options instead of dropping them.

### **Improved SCSS parent-selector parsing** (2a708ce)
SCSS selector parsing was tightened to handle hyphen boundaries around interpolations and parent selectors more correctly. This fixes a class of invalid parses/formatting issues around nested selectors like `&--`, `&#{...}--`, and hyphen-adjacent interpolation.

### **Fixed ternary consequents with nested destructured arrows** (50a9bd8)
Biome now correctly parses curried arrows inside ternary consequents when the inner arrow’s parameters use object or array destructuring. This removes a parser regression that could misread the `:`/`=>` boundaries in these nested forms.

### **Fixed import-cycle handling in type inference** (aa87885)
Type inference now detects strongly connected components and falls back to blocking only cyclic imports instead of failing outright. That lets Biome keep inferring types outside the cycle while avoiding recursive Salsa query loops.

### **Formatter performance improved across the board** (89c27c6)
The formatter got a fast path for printable ASCII text width calculation plus inlining on hot printer paths. The project reports up to ~7% formatter speedups, which should be noticeable on larger codebases.

### **Added YAML flow-mapping support** (ede869c)
YAML formatting gained support for flow mappings, including comment handling and explicit-entry formatting rules. This is a broad formatter feature that changes how a meaningful chunk of YAML input is rendered, especially around comments and multiline layout.

### **Fixed SCSS commented function arguments** (22ec076)
The CSS/SCSS formatter now indents commented function arguments correctly instead of flattening them into awkward layouts. This resolves a visible formatting bug in both plain CSS comments and SCSS examples.

### **Fixed Svelte leading-comment duplication** (0abb620)
The HTML/Svelte formatter stopped duplicating leading comments before `{@const}` and `{@debug}` blocks. This was a correctness fix for Svelte output stability.

### **Fixed inference regression in `noMisusedPromises`** (0e4b03b)
The linter now avoids repeatedly re-running type inference on expressions that can be classified earlier, reducing a performance regression in `noMisusedPromises`. This should make typed linting of affected files materially faster.

### **Added benchmark coverage for lint rules in CI** (623dbbb)
Biome added e2e benchmark plumbing and a new service benchmark target for pull diagnostics. This improves performance visibility for lint-rule changes, but it’s primarily infrastructure.

### Other misc changes
- Dependency bumps and lockfile updates (2 commits)
- Docs/changelog entries and config/schema plumbing around new rules
- Misc skill/agent cleanup (`chore: tidy up skills`)
- Minor internal lint/parser/formatter test updates
