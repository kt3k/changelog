---
date: 2026-08-16
repo: biomejs/biome
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Biome week: Tailwind gets smarter, HTML/CSS parsing tightens"
excerpt: "New lint rules, Tailwind v4 support, and a run of HTML/CSS parser and formatter fixes, plus a Windows ARM64 crash mitigation."
commits: 34
---

### Major additions
**New Markdown and accessibility rules**: Biome added `useTopLevelHeading` for Markdown documents and `useControlLabel` for HTML/JSX controls without accessible labels. It also broadened `noSvgWithoutTitle` and `useExpect` to handle boolean `aria-hidden` and Vitest `expect.element()` correctly.

**Tailwind support expanded across parser, sorter, and linting**: Tailwind v4 handling grew significantly with support for container-query and child variants, bare modifiers, variant ties, and custom-property ordering. Biome also added `useTailwindShorthandClasses` to suggest compact utilities like `size-4`.

### Formatting and parser correctness
**HTML formatting became less lossy and more width-aware**: Multiple fixes improved how the formatter handles fallback elements, touching text, closing tags in wrap calculations, and meaningful blank lines. These changes reduce surprising whitespace shifts in HTML, Svelte, and Vue output.

**CSS parsing and selector formatting were hardened**: Comment placement inside functional pseudo selectors is now preserved, bogus declarations recover more gracefully, and Tailwind `@variant` container-query names are parsed correctly. CSS linting also now accepts `math` as a generic font name.

**Markdown inline HTML modeling was refactored**: Inline HTML comments are now tokenized differently, requiring parser, syntax, and formatter updates to better handle edge cases around embedded HTML in Markdown.

### Stability, performance, and analysis fixes
**Windows ARM64 crash mitigation and promise-analysis speedup**: Biome pinned `mimalloc` back to avoid a Windows ARM64 access-violation crash, and fixed a performance regression in `noMisusedPromises`/`noFloatingPromises` when deep type paths are involved.

**Several lint false positives and autofix safety issues were corrected**: `noExtraBooleanCast` now preserves grouping in conditional expressions, `noComponentHookFactories` stops flagging non-function values, embedded Svelte/Vue script exports are shared correctly, and JSX/Astro false positives were reduced.

### Other misc changes
- Projects moved into the salsa-backed DB and the embeds crate was renamed to `biome_embeds`.
- CLI help text and release automation wording were refreshed.
- Dependency bumps, workflow updates, snapshots, and test coverage additions across HTML, CSS, Markdown, Tailwind, and analyzer paths.
