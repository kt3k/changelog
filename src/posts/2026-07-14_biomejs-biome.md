---
date: 2026-07-14
repo: biomejs/biome
size: M
title: "HTML parser speeds up, a11y rules follow"
excerpt: "Biome optimized HTML tag handling and fixed two accessibility lint edge cases across template syntaxes."
commits: 3
authors: [dyc3, Netail]
commit_authors: {"755c3f2": dyc3, "55ff995": dyc3, "f2799db": Netail}
---

### **HTML parser/tag handling gets a performance-focused refactor** (55ff995)
Biome switched HTML/SVG tag names to keywords throughout the parser and syntax factory, replacing string-style tag checks with explicit token kinds. The change simplifies generated factories and parser paths while improving synthetic benchmark performance.

### **HTML a11y lints now avoid string tag comparisons** (755c3f2)
The HTML accessibility analyzer was updated to use tag-kind matching instead of source-type/string comparisons across many rules, cutting overhead in hot linting paths. This is a broad internal performance cleanup that should make HTML linting a bit faster, especially on larger files.

### **`noLabelWithoutControl` now accepts interpolated text** (f2799db)
`noLabelWithoutControl` now treats text interpolation nodes in Astro, Svelte, and Vue as valid accessible label content. That fixes a false positive where labels containing interpolated text were previously reported as missing control text.

### Other misc changes
- Added a changeset for the parser performance patch.
- Minor test snapshot updates across HTML parser and a11y rule fixtures.
- Small dependency/Cargo manifest adjustments.
