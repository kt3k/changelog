---
date: 2026-09-29
repo: biomejs/biome
size: L
title: "Biome lands Astro, Vue, and parser fixes"
excerpt: "New lint rules and parser correctness fixes headline a day of performance work across HTML, JS, and type inference."
commits: 18
authors: [dyc3, ematipico, jp-knj, adriencaccia]
commit_authors: {"ef0edd4": dyc3, "ad5b362": jp-knj, "4ff83dd": ematipico, "6233eb2": dyc3, "717db8c": dyc3, "eaf45e2": ematipico}
---

### **Biome adds `noAstroConflictingSetDirectives` for Astro** (ad5b362)
Biome now flags Astro elements that mix multiple content sources, such as `set:html`, `set:text`, and child content. This closes a correctness gap in `.astro` files and includes configuration, migration, and diagnostics wiring so the rule is usable in normal lint flows.

### **List items in the wrong container are now linted** (717db8c)
The new `noMisplacedListElements` nursery rule checks that `<li>` elements with an HTML parent live under `<ul>`, `<ol>`, or `<menu>`. That gives HTML/JSX users a direct warning for invalid list structure instead of letting it slip through until runtime or rendering quirks.

### **HTML parser now rejects mismatched and stray closing tags** (6233eb2)
Biome now compares opening and closing tag names fully and case-insensitively, so malformed tags like `<p>two</span></p>` no longer get accepted and misformatted away. It also reports top-level stray closing tags as real parse errors, preventing the formatter from deleting the rest of the file.

### **Vue slot prop types are parsed and formatted correctly** (4ff83dd)
Typed Vue slot props no longer trigger parse errors, and their type annotations are recognized as used by `noUnusedVariables`. This fixes a real-world Vue/TS interoperability bug and improves formatter, parser, and CLI behavior for `.vue` files with typed slots.

### **Test-title linting stops misclassifying ordinary method calls** (ef0edd4)
Biome’s test framework detection now only treats `test`/`it`/`describe` calls as tests when they’re rooted in an identifier, avoiding false positives on things like regex `.test()` calls or chained member accesses. That makes `useValidTestTitle` and related rules much less noisy.

### **SCSS `url()` now handles `if()` expressions** (eaf45e2)
The SCSS parser now accepts conditional `if()` expressions inside `url(...)`, matching valid Sass syntax. That expands parser coverage for real stylesheet patterns and avoids rejecting legitimate code.

### **Performance work across semantic analysis and type inference**
Multiple commits improved hot paths in semantic lookup, generic substitution, callable resolution, and promise classification, while HTML whitespace scanning and YAML lexing also got faster. Together, these changes should reduce allocations and speed up analysis on larger projects.

### Other misc changes
- Vue test fixtures and snapshots updated for the new `<template>` wrapping behavior.
- Benchmark CI / plugin-loader setup tweaks.
- README logo and changeset/chore updates.
- Smaller type-inference and semantic-model internal refactors.
