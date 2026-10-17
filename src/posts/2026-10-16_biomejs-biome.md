---
date: 2026-10-16
repo: biomejs/biome
size: L
title: "Biome lands parser, formatter, and perf fixes"
excerpt: "Major refactors and fixes across linting, YAML/CSS formatting, HTML/Svelte bindings, and JSX/Astro parsing."
commits: 10
authors: [dyc3, ematipico, denbezrukov, Netail, florian-lefebvre]
commit_authors: {"7369938": denbezrukov, "f447e08": dyc3, "c2cc18d": dyc3, "fd19c59": dyc3, "d5ab928": dyc3, "c80f28c": ematipico, "60211cb": ematipico, "8b0d774": ematipico, "7380ff2": Netail, "eca05e8": florian-lefebvre}
---

### **Type inference legacy engine removed** (8b0d774)
Biome deleted the old `biome_js_type_info` implementation and its associated snapshots, leaving only the active type-inference architecture. This is a large internal cleanup that reduces dead code and clarifies the current module boundaries.

### **YAML plain-scalar parsing now preserves trailing blanks correctly** (d5ab928)
The YAML lexer was updated so trailing blank trivia is excluded from plain scalar tokens, fixing a class of parsing edge cases around implicit keys, document markers, anchors/tags, and flow collections. This is a user-visible correctness fix for YAML input that previously tokenized or errored incorrectly.

### **YAML formatter keeps flow-map comments on the key line** (fd19c59)
The YAML formatter now preserves comments attached to flow mapping keys without moving them off the key line. It also introduces a new boundary-group primitive in the core formatter, which changes how line-break expansion is contained during pretty-printing.

### **CSS custom-property URLs are preserved more faithfully** (7369938)
CSS/SCSS formatting and parsing now handle `url(...)` nodes inside custom properties instead of dropping or reshaping them incorrectly. The fix improves fidelity for custom-property values, especially in SCSS and encoded URL-heavy cases.

### **Core config domains and overrides now interact correctly** (60211cb)
Biome fixed how linter domains behave when combined with overrides: explicitly enabled override rules stay enabled, and domains configured as `none` remain disabled unless the override truly opts them back in. That closes a configuration correctness gap that could silently change which rules run on matched files.

### **Astro shorthand attributes accept expressions** (eca05e8)
The JSX/Astro parser now accepts shorthand attributes that contain any expression, not just bare identifiers, so constructs like `{object?.something}` parse cleanly. This required updates across parsing, factories, formatting, runtime types, and related lint logic.

### **`noTsIgnore` is faster on files without directives** (c2cc18d)
The `noTsIgnore` rule now scans borrowed tokens and only materializes diagnostics when it finds a matching comment, significantly reducing work on files that do not contain `@ts-ignore`. It also broadened test coverage for block comments, repeated directives, and end-of-file cases.

### **`noIrregularWhitespace` is faster on clean files** (f447e08)
Both the JS and CSS versions of `noIrregularWhitespace` were optimized to scan borrowed tokens and short-circuit earlier, cutting overhead on files with no irregular whitespace. This is a performance-focused change with updated tests for the new scan path.

### **HTML/Svelte formatting fixes for bindings** (c80f28c)
Biome tightened HTML formatter handling for Svelte bindings and attribute initializers, improving output for a compatibility edge case. This is a targeted formatter correctness fix.

### **Other misc changes**
- Removed an unused advisory ignore from `cargo deny` (7380ff2)
