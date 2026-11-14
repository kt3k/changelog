---
date: 2026-11-13
repo: biomejs/biome
size: L
title: "Big Vue lint rollout and parser fixes"
excerpt: "Biome added several new lint rules, fixed Vue suppression and semantic gaps, improved formatting, and sped up module/type inference and package license checks."
commits: 18
authors: [dyc3, ashokram-si, machadinhos, ematipico, ninglinLiu]
commit_authors: {"8908627": dyc3, "97aa183": dyc3, "67bc9d5": dyc3, "ae251e4": dyc3, "d5da394": dyc3, "ae66383": dyc3, "a54965d": machadinhos, "61924f6": dyc3, "be372b5": dyc3, "dcb1eab": dyc3, "fa4c3c2": dyc3, "84b1ada": dyc3, "3f25900": ematipico, "a788cac": dyc3, "1b350ed": dyc3, "ece0ec5": dyc3, "fb747a0": ninglinLiu}
---

### **New YAML empty-map-value lint** (97aa183)
Biome added `noYamlEmptyMapValues`, a new nursery rule that flags YAML keys with no value. The rule is wired into config/schema generation and ships with fixtures, so it’s ready for user-facing use.

### **New Vue lint for consistent `v-on` handler style** (ae251e4)
A new nursery rule, `useVueConsistentVOnHandlerStyle`, enforces a single event-handler style in Vue `v-on` directives. It also adds ESLint migration support and full config/schema integration, making the rule discoverable and migratable out of the box.

### **Plugin suppressions now work end-to-end** (d5da394)
`biome lint --suppress` now generates suppression comments for plugin diagnostics, not just built-in rules. The same change also tightens plugin-name validation so unsuppressible names are rejected up front, avoiding broken suppression workflows.

### **Vue semantic model refactor fixes and expands rule coverage** (61924f6)
Old Vue rules were moved onto the new Vue semantic model, which is a substantial internal refactor with visible correctness gains. Along the way, several rules picked up better coverage for `setup()` returns and `defineComponent()` patterns, and some false positives/negatives around Vue emits and shadowed `$emit()` calls were corrected.

### **HTML formatter keeps inline text together more often** (ae66383)
The HTML formatter now preserves words after inline elements on the same line in more cases. This should reduce awkward wrapping in HTML/Svelte output and make formatted text read more naturally.

### **Vue lint now recognizes MathML as native elements** (be372b5)
Biome fixed Vue rules that were treating MathML tags like components. Known MathML elements, plus some hyphenated SVG/MathML names, are now handled as native elements, reducing false positives in Vue, Svelte, and Astro files.

### **Tailwind class-string queries got faster** (dcb1eab)
The Tailwind syntax query now implements `visited_kinds()`, simplifying the query path. This is a performance-oriented cleanup that should make class-string analysis more efficient.

### **License lookup became sublinear** (fa4c3c2)
Biome’s SPDX license checks now use direct license metadata lookups instead of repeated linear scans. That makes package license validation significantly faster, especially as the generated license list grows.

### **Module/type inference queries were reworked for performance and profiling** (3f25900)
Type-inference and module-graph queries were wrapped in the shared query profiler/execution path, and several inference internals were reorganized. This is a meaningful performance and observability pass over one of Biome’s more expensive analysis subsystems.

### **`useMathMinMax` handles bigint cases more accurately** (8908627)
The `useMathMinMax` rule now traces bindings further to determine whether arguments are bigints. That improves correctness for bigint-heavy code by avoiding incorrect suggestions when `Math.min`/`Math.max` semantics differ.

### Other misc changes
- New nursery Vue rule: `noVueDeprecatedFilter` (67bc9d5)
- New nursery Vue rule: `noDrizzleDbObjectInsideTransaction` (a54965d)
- `useArrowFunction` fix for `in` bodies in `for` initializers (a788cac)
- `noDistractingElements` unsafe-fix behavior corrected (1b350ed)
- Rust toolchain bumped to 1.100 with release-age config changes (ece0ec5)
- Rule metadata updated; small docs/typo fixes (84b1ada, fb747a0)
