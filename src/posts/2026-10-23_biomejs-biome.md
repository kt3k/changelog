---
date: 2026-10-23
repo: biomejs/biome
size: L
title: "Formatter refactor, GraphQL fix, new Vue rule"
excerpt: "Big formatter generic refactor plus GraphQL parsing/formatting fixes, a new Vue lint rule, and several notable correctness/perf updates."
commits: 13
authors: [dyc3, ematipico, jelly]
commit_authors: {"6162922": ematipico, "b62494a": dyc3, "0f534a7": dyc3, "e262362": ematipico, "109ab7f": ematipico, "33e3877": dyc3, "d4ea663": dyc3, "c371520": dyc3, "f5d9485": jelly, "09d2ca8": jelly, "8a5974a": ematipico}
---

### **Formatter crate goes generic and drops implicit Rowan coupling** (109ab7f)
Biome’s formatter core was refactored to be generic, and `biome_formatter` no longer relies on the `biome_rowan` feature by default. This is a major architectural change that broadens formatter reuse and tightens CI coverage by checking the crate without Rowan.

### **GraphQL parsing and formatting now handle descriptions/legacy variables** (6162922)
GraphQL node factories and parser/formatter logic were updated to support executable descriptions and legacy fragment variables more robustly. The fix also aligns formatting around insignificant commas, preventing crashes and incorrect output for affected GraphQL inputs.

### **New Vue rule: `useVueToggleInsideTransition`** (c371520)
Biome adds a nursery rule that requires Vue `<Transition>` children to be conditionally shown with `v-if` or `v-show`, so transitions actually run. The rule is wired into config, diagnostics, and ESLint migration support.

### **`useDomNodeTextContent` now respects type annotations** (d4ea663)
This rule stops flagging `innerText` when the receiver’s annotation clearly isn’t a DOM node, reducing false positives in typed code. The implementation now consults semantic/type information before reporting.

### **`noDescendingSpecificity` compares resolved nested selectors** (e262362)
The CSS specificity rule now evaluates resolved selector tails instead of raw selector text, so nested selectors are compared on their final targets. That makes it stop reporting distinct targets, catch equivalent explicit/nested targets, and deduplicate repeated expansions correctly.

### **Project-root file exclusion bug fixed** (b62494a)
Checking from the project root no longer applies `files.includes` exclusions to ancestor directories above the project. This fixes incorrect file filtering in nested project layouts, including hidden-directory setups.

### **`preorder()` hot paths switched to kind-filtered traversal** (0f534a7)
Several semantic visitors and lint rules were updated to use `preorder_of_kinds()` with explicit visited-kind sets. This is a performance-oriented cleanup that reduces traversal overhead across CSS, GraphQL, JS semantic analysis, and embed handling.

### **Tailwind sorting docs and related rule text updated** (33e3877)
Documentation and snapshots for `useTailwindSortedClasses` were refreshed, along with minor rule text adjustments. No behavior change is indicated beyond docs/test alignment.

### **Migration support added for `react/no-render-return-value`** (f5d9485)
The ESLint migration mapper now recognizes `react/no-render-return-value` and its React DOM variants, mapping them to Biome’s `no_render_return_value` rule. This improves automatic migration coverage for React users.

### **`useLogicalProperties` migration support added** (09d2ca8)
Stylelint migration support was extended for `useLogicalProperties`, with a corresponding rule tweak. This is a small migration-quality improvement rather than a new linting capability.

### **Sponsor README entries updated** (8a5974a)
The sponsor list was updated across translated README files. Purely editorial.

### Other misc changes
- Dependency/config/test updates around formatter and linting work
- Additional snapshot and test maintenance for CSS/HTML/JS/CLI/GraphQL changes
