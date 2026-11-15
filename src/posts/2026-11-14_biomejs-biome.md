---
date: 2026-11-14
repo: biomejs/biome
size: L
title: "Big lint-and-fix wave for Vue, tests, and HTML"
excerpt: "Added several new nursery lint rules, fixed Vue/HTML formatter edge cases, and improved lint/perf behavior across analysis and rule migration."
commits: 18
authors: [dyc3, Punisheroot]
commit_authors: {"4cea5c6": dyc3, "68e6887": dyc3, "e506ff1": dyc3, "e1556ae": dyc3, "998797e": dyc3, "e3ab04d": dyc3, "746c421": dyc3, "4d81f0d": dyc3, "3fdc987": dyc3, "c1c8c85": dyc3, "be58f67": dyc3, "a68137d": dyc3, "058d7a1": dyc3, "cf5b1a6": dyc3, "acfeaf9": dyc3, "6aad75f": dyc3, "d4e90c8": dyc3}
---

### **New Vue and test lint rules broaden coverage** (746c421, 4d81f0d, 3fdc987, c1c8c85, be58f67, a68137d, 058d7a1, cf5b1a6, acfeaf9, 6aad75f, d4e90c8)
Multiple new nursery rules landed for Vue, tests, Node APIs, and YAML, including checks for async computed properties, invalid exports in `<script setup>`, unsafe namespace imports, top-level `require()`, deprecated `Buffer()` constructors, spy-on usage, and several Jest/Vitest expectation patterns. These additions expand Biome's coverage in areas that commonly hide bugs or portability issues, and they also wire the new rules into configs, diagnostics, and ESLint migration support.

### **HTML/Svelte formatter fixes comment placement** (e1556ae, 4cea5c6)
The HTML formatter now preserves comments that appear after opening tags and block delimiters, including Svelte-specific cases. This avoids reformatting output that could move or detach comments from the markup they annotate.

### **Analysis and lint performance improved** (68e6887, e506ff1)
Analysis now skips the suppression-token pass in files that don't contain suppression comments, reducing unnecessary work during linting. Separately, `noRedeclare` was optimized to find binding nodes closer to the query node, which should make that rule cheaper on large scopes.

### **Tailwind class location fix for unquoted object keys** (e3ab04d)
Tailwind-related class detection now handles unquoted object keys correctly, so class ranges are identified more accurately in those structures. That improves the reliability of Tailwind diagnostics and fixes.

### Other misc changes
- Renovate config updated to ignore `js-sys` (998797e)
