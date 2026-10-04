---
date: 2026-10-03
repo: biomejs/biome
size: L
title: "JS/CSS linting, parsing, and type inference land"
excerpt: "Major lint additions and fixes across JS/CSS, plus a type inference upgrade for mapped keyof types."
commits: 13
authors: [dyc3, ematipico, denbezrukov, tionway]
commit_authors: {"2917939": dyc3, "3831986": ematipico, "9db579b": dyc3, "2bb4838": dyc3, "a308196": dyc3, "de453c0": tionway, "a1463aa": ematipico, "08ca501": ematipico, "eb403a5": ematipico, "69fcd9b": denbezrukov, "4db3f58": denbezrukov, "04b05d0": dyc3}
---

### **Add `noIteratorProperty` to catch obsolete `__iterator__`** (9db579b)
Biome now ships a new nursery rule that flags the non-standard `__iterator__` property, which only ever existed in Firefox. It’s wired into the rule metadata, config schema, ESLint migration path, and docs so it can be configured and migrated like other lint rules.

### **Type inference now understands mapped `keyof` types** (2917939)
The JS type inference engine can now resolve properties on mapped types like `{ [K in keyof T]: T[K] }`, including generic aliases instantiated with concrete type arguments. That improves type-aware rules such as `noFloatingPromises`, while mapped types using `as` key remapping remain unsupported.

### **`useImportExtensions` now handles Vue/Svelte/Astro HTML modules** (2bb4838)
This fix teaches the rule to resolve imports inside HTML-backed modules when `html.experimentalFullSupportEnabled` is on, so extensionless relative imports are reported in Vue, Svelte, and Astro files. It closes a gap where those imports could previously slip through.

### **CSS parser and formatter now support expression-based `@root` queries** (69fcd9b)
SCSS `@root` queries were reworked to accept full expressions rather than only simple query lists, with corresponding parser, factory, and formatter updates. That expands supported syntax and keeps formatting/parsing aligned for dynamic `@root` constructs.

### **CSS `if()` parsing now distinguishes legacy and modern forms** (4db3f58)
The parser now treats legacy SCSS `if()` usage separately from the modern CSS form, fixing cases where bare `if` identifiers were parsed incorrectly inside branch values. This also tightened related diagnostics and formatter output around `if()` handling.

### **`noUnknownAttribute` got a faster, cleaner implementation** (04b05d0)
This performance-oriented refactor replaces linear scans with binary searches and simplifies the rule’s internal matching logic for JSX attributes. It also updates the rule to better recognize ARIA attributes and standard tag/prop metadata.

### Other misc changes
- Docs and rule examples updated across multiple lint rules (3831986)
- Migrator rule metadata refreshed, including ESLint scope decisions (a308196)
- Nested empty config migration fix (de453c0)
- Docs skill instructions improved (a1463aa)
- Parser conformance CI split into groups (08ca501)
- Sass spec coverage added to the coverage toolchain (eb403a5)
