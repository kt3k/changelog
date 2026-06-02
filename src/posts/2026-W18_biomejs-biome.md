---
date: 2026-05-03
repo: biomejs/biome
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: M
title: "Biome adds deeper SCSS support and sharper parser fixes"
excerpt: "SCSS parsing/formatting expanded across interpolation, @each, selectors, and functions, alongside markdown, HTML, and lint rule improvements."
commits: 30
---

### SCSS support keeps expanding across parser and formatter
Biome landed a cluster of SCSS improvements: interpolation now works in values, media queries, selectors, and `nth-*` arguments, while spaced function heads and `@each` headers are parsed and formatted more robustly. Formatting also picked up better handling for maps, parenthesized lists, spacing, and trailing separators, closing several real-world Sass gaps.

### Linting and import validation got stricter
A new nursery rule, **noExcessiveNestedCallbacks**, flags callbacks nested beyond a configured depth and includes ESLint option migration support. Biome also fixed `useReadonlyClassProperties` to catch writes from arrow callbacks, and `organizeImports` now errors on unknown predefined groups instead of silently accepting invalid config.

### Markdown and HTML parsing/formatting became more accurate
Markdown saw a run of correctness fixes around quoted ordered lists, lazy continuations, lazy link references, and empty reference paragraphs, including better handling when references appear near thematic breaks, lists, or blockquotes. HTML parsing and formatting were tightened too, with clearer diagnostics for void-element closing tags, better text relexing, and preservation of multiline whitespace around non-text children.

### Other misc changes
- `noStaticElementInteractions` now excludes custom elements
- `noThisInStatic` no longer reports `new this()`
- CI release/changelog metadata updates and small docs fixes
