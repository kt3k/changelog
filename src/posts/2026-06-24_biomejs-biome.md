---
date: 2026-06-24
repo: biomejs/biome
size: L
title: "Biome lands Svelte, nullish, and parser fixes"
excerpt: "Notable lint, parser, and performance work shipped, including a new Svelte rule, smarter overload handling, and embedded-language fixes."
commits: 12
authors: [ematipico, Mokto, dinocosta, xsourabhsharma, IxxyDev, BangDori, pkallos, PranavAchar01]
commit_authors: {"3617094": IxxyDev, "5a2e65b": dinocosta, "53c6efc": ematipico, "f3d4c00": Mokto, "03c4767": ematipico, "13ee358": xsourabhsharma, "f62fb8b": ematipico, "d9b5133": Mokto, "d6d55d0": BangDori, "f458028": pkallos, "8f9dec8": ematipico, "8f073a7": PranavAchar01}
---

### **New Svelte nursery rule flags unnecessary `$state()` wraps** (f3d4c00)
Biome adds `noSvelteUnnecessaryStateWrap`, catching redundant `$state()` usage around already-reactive `svelte/reactivity` classes like `SvelteMap`. The change also wires the rule into config, migration helpers, and test coverage so it can be enabled and migrated cleanly.

### **`noUnused*` now tracks embedded template bindings in Svelte/Vue/Astro** (d9b5133)
This fixes false negatives in embedded template regions by treating bindings used only in templates as referenced when `html.experimentalFullSupportEnabled` is on. It tightens linting across Svelte, Vue, and Astro, especially for unused imports, variables, and type-only imports.

### **`useNullishCoalescing` gains `ignoreBooleanCoercion`** (f458028)
A new option lets `||` and `||=` pass when they’re intentionally used inside `Boolean(...)` coercions, avoiding noisy suggestions in boolean-check patterns. The rule and schema were updated alongside targeted tests and backend config plumbing.

### **`noFloatingPromises` now respects the selected overload** (3617094)
Biome fixes a false positive where overloaded functions could be flagged as floating promises even when the chosen overload returned a non-পromise value. This makes the rule more precise for generic and arity-based overload resolution.

### **Markdown nested list parsing is fixed for space+tab indentation** (13ee358)
The Markdown parser now correctly treats mixed space/tab-indented sublists as nested items instead of flattening or mis-parsing them. Formatter snapshots were updated accordingly, so nested list rendering should now match author intent.

### **JSON well-known-file detection for Zed is corrected on macOS/Windows** (5a2e65b)
Biome now resolves Zed’s global settings path from the platform-correct location, fixing misclassification of `settings.json` as JSONC in those environments. This makes well-known-file detection behave consistently across operating systems.

### **CSS nesting accepts trailing `&` in compound selectors** (8f073a7)
The CSS parser was updated to allow a trailing ampersand in nested compound selectors, matching valid nesting syntax that previously errored. The semantic and formatter layers were adjusted too, so the new syntax round-trips correctly.

### **`useValidAutocomplete` validation was tightened** (f62fb8b)
Autocomplete attribute validation now catches more invalid cases, improving the rule’s usefulness for accessibility correctness. The accompanying test expectations were refreshed to reflect the stricter checks.

### **`noFloatingPromises` overload fix required type-data plumbing** (3617094)
The overload-selection fix also touched core type-flattening logic, indicating a deeper change in how Biome derives expression types for analysis. That should reduce related edge-case misreports beyond the covered regression.

### **`noUnusedImports`/`noUnusedVariables` Svelte-Vue-Astro support expanded** (d9b5133)
These lint rules now better understand template-only references and embedded snippets, reducing spurious “unused” diagnostics in component files. It’s a meaningful quality-of-life improvement for users working in multi-language single-file components.

### Other misc changes
- Performance work in the CLI crawler/handler path to reuse file-feature data and avoid redundant lookups (8f9dec8).
- Core semantic/db refactor to salsa-tracked functions with workspace DB extraction and dependency updates (53c6efc).
- CI tweak to reduce Windows disk usage (03c4767).
- Minor dead-code/comment cleanup in CLI and formatter code (d6d55d0).
