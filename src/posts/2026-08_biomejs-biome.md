---
date: 2026-08-31
repo: biomejs/biome
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Biome’s August: big language coverage, stronger analyzers"
excerpt: "August brought Markdown and YAML support, major CSS/HTML/Astro/Vue fixes, new lint rules, and faster core analysis."
commits: 204
---

### Major language and formatter expansion
**Markdown support landed end-to-end** — Biome added a dedicated Markdown analyzer, parser work for frontmatter and deferred inline parsing, formatter performance improvements, and multiple new Markdown lint rules including top-level heading enforcement and consistent heading levels.

**YAML parsing got much more robust** — The YAML parser gained better error recovery, broader conformance coverage, and benchmark wiring, making YAML a first-class and actively tuned language path.

**HTML, Astro, Vue, and Svelte handling improved substantially** — The month included many parser/formatter fixes for embedded scripts/styles, interpolation edge cases, comments, blank lines, void elements, and framework-specific syntax. Stdin analysis also gained fuller Astro/Svelte/Vue support when experimental full support is enabled.

### CSS and Tailwind got deeper semantic support
**Registered custom properties are now understood semantically** — Biome added `@property` parsing, validation, semantic queries, module-graph tracking, and a new lint for invalid `initial-value` declarations. It also added `noUndeclaredCustomProperties` and improved CSS analysis around custom property references.

**SCSS and CSS parsing/formatting became more capable** — Support expanded for partial combinator selectors, interpolated media queries, SCSS `url(...)` interpolation, bogus declaration recovery, and more stable comment/selector formatting.

**Tailwind sorting rules were expanded and refined** — The sorter now handles container-query variants, child/descendant variants, bare modifiers, legacy `!` syntax, and custom-property ordering more accurately, while also adding a new shorthand-classes lint.

### More lint coverage across ecosystems
**New safety and accessibility rules landed** — Highlights include `noExtendNative`, `noNonScalableViewport`, `useControlLabel`, `noAstroSetHtmlDirective`, `noUnsafeTypeAssertion`, `useNamedLayer`, `noInvalidFileInputAccept`, and several framework-specific false-positive fixes.

**Existing JS/TS rules got smarter and faster** — `noFloatingPromises`, `noMisusedPromises`, `noUndeclaredVariables`, `noUnusedImports`, `noUnusedVariables`, `useStrictMode`, and others saw inference fixes, fewer false positives, and performance wins on class-member and dependency-heavy code.

### Core architecture, plugins, and performance
**Plugin and runtime support expanded** — JS plugins can now query AST nodes by kind, TypeScript plugins are supported, and WASM builds can opt into JS plugins. GritQL handling also improved for snippets, exports, and byte offsets.

**Internal analysis and storage were refactored** — The project moved toward salsa-backed project storage, reworked analyzer settings and deserialization for better sharing and lower code size, and cleaned up legacy type-inference machinery.

**Several hot paths got faster** — Performance work landed in markdown parsing/formatting, import-cycle detection, promise analysis, rule profiling, workspace scanning, and LSP cache eviction, with multiple benchmark additions to keep regressions visible.

### Other misc changes
- CLI/help/documentation wording and daemon logging fixes
- CI, workflow, dependency, and release-tooling updates
- Many test, snapshot, and codegen refreshes across CSS, HTML, JS, Markdown, YAML, Vue, Svelte, and Grit
