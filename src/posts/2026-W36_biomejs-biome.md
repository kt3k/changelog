---
date: 2026-09-06
repo: biomejs/biome
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Biome broadens lint coverage and speeds up core parsing"
excerpt: "New rules for React, Svelte, CSS, Markdown, HTML, and security, plus parser/type-inference fixes and performance wins."
commits: 67
---

### Major lint coverage expands across web stacks
**New rules landed for modern JS and framework code:** Biome added checks for modern math APIs, flat `Math.min`/`Math.max`, unmodified loop conditions, React naming conventions, `this` outside classes, `^` used like exponentiation, layered styles, unsafe Svelte `{@html}`, and unsafe iframe sandbox settings.

**HTML, Vue, Bun, and markdown get new domain-specific linting:** The week also brought `noInvalidFileInputAccept`, Vue rules for deprecated scoped slots and importing from `vue`, Bun module awareness plus `noBunModules`, and a markdown rule enforcing a single top-level heading.

### Parser and formatter correctness improved in key edge cases
**HTML and template handling got much more accurate:** Biome fixed plain HTML double-curly text, improved Astro template parsing, and preserved adjacent Svelte expressions during formatting.

**CSS/SCSS parsing filled several gaps:** Changes added SCSS `url(...)` interpolation support, better interpolated identifier handling, nesting recovery fixes, and more precise shorthand-property comparisons across blocks.

**Markdown parsing became more robust:** GFM Markdown support now ships in the parser/formatter, and a fenced-code parsing bug that could loop indefinitely was fixed.

### Performance and type analysis saw meaningful wins
**Type inference was trimmed in hot paths:** Biome avoided eager generic expansion and reduced unnecessary work for namespace imports, which should help large codebases and type-heavy linting runs.

**Rowan token traversal and offset lookup got faster:** Dedicated first/last token traversal and more direct offset lookup paths should improve large-file performance across the parser stack.

### Stability, config, and tooling fixes
**Better diagnostics and fewer false positives:** Fixes landed for `noFloatingPromises` in cyclic graphs, `noUnusedVariables` with merged declarations, `noInferrableTypes` highlight ranges, malformed `for...of` recovery, and several CSS/Vue parser and lint edge cases.

**Config/schema and daemon behavior were tightened:** Rule domains are now exposed more explicitly in generated schemas, and CLI daemon log levels are forwarded correctly.

### Other misc changes
- Benchmark coverage and workflow cleanup for Markdown, YAML, SCSS, and parser crates
- Grit parser/plugin fixes for import matching and `function = ...` node args
- Release-note and contributor-doc updates
- Dependency bumps and snapshot/test refreshes
