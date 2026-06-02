---
date: 2026-05-10
repo: biomejs/biome
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "Biome adds a wave of Vue lint rules and parser upgrades"
excerpt: "A busy week of new Vue/JS lint rules, major YAML/SCSS/Tailwind parser work, and formatter fixes across Markdown, HTML, Astro, and imports."
commits: 51
---

### New lint rules expand Vue and JS coverage
Biome shipped several new nursery rules this week: **`noBaseToString`** for unsafe object stringification, **`useThisInClassMethods`** for unused instance methods, **`useTestHooksInOrder`** for ordered test lifecycles, and multiple Vue checks including **`noVueVOnNumberValues`**, **`useVueNextTickPromise`**, **`noVueImportCompilerMacros`**, and **`useVueValidVFor`**. Most of them were wired end-to-end through config, schemas, docs, and ESLint migration support, making them immediately usable for existing projects.

### Parser and syntax support widened across markup and data formats
The biggest parsing work landed in YAML, where Biome now handles properties, block tags, anchors, and trickier mapping/flow combinations more reliably. Markdown parsing also tightened around fenced code blocks and block-structure edge cases, while HTML/Svelte/Vue parsing fixed keyword handling, missing expressions, and standalone interpolation behavior. Astro got two important fixes too: frontmatter is preserved exactly in write mode, and diagnostics now report the correct embedded offsets.

### Formatter quality improved in SCSS, Markdown, and core printing
SCSS formatting saw the most churn, with better handling for `@if`/`@else if`, `@each`, maps, trailing commas, parenthesized expressions, `url()` interpolation, and ratio parsing. Markdown formatting was improved for word wrapping, header spacing, and trailing spaces in lists. Separately, the core printer fixed an indentation leak after alignment blocks, which should prevent subtle formatting drift in downstream output.

### Performance and assist behavior got sharper
`organizeImports` now reports more precise diagnostics, and several lint rules narrowed their queries to reduce analysis overhead. Biome also fixed a false positive in a readonly-class-property case and improved `noMisleadingReturnType` so it catches more bad annotations while offering better fix suggestions when possible.

### Tailwind and CSS parsing kept pace with real-world syntax
Tailwind arbitrary values are now parsed as CSS, including functions, math, URLs, numbers, ratios, and parenthesized expressions. CSS/SCSS work also improved duplicate-selector detection performance and tightened interpolation handling, helping Biome round-trip more stylesheets correctly.

### Other misc changes
- Release bookkeeping and changeset cleanup after publishing
- Dependency and runtime updates, including the Rust toolchain bump and CI fixes
- Minor docs, comments, and test snapshot maintenance
