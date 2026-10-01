---
date: 2026-09-30
repo: biomejs/biome
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Biome expands lint coverage, type inference, and SCSS support"
excerpt: "September brought many new nursery rules, major type-system/codegen upgrades, broader SCSS/Markdown/HTML support, and several crash/perf fixes."
commits: 298
---

### Major lint coverage expansion
Biome added a large batch of nursery rules across JS, HTML, CSS, Vue, Svelte, Astro, Tailwind, and markdown. Notable additions include rules for modern math APIs, loop conditions, React naming and object defaults, Promise rejection errors, self-imports, `noReturnInFinally`, `noMeaninglessVoidOperator`, `useStrictBooleanExpressions`, `useBetterDomTraversing`, `noUnsafeIframeSandbox`, `noJsonUnsafeValues`, `useLogicalProperties`, `noTailwindRawColors`, and several framework-specific checks like `noSvelteAtHtmlTags`, `noSvelteAtDebugTags`, `useVueBaseImport`, `noVueUndeclaredDirectives`, and `noAstroConflictingSetDirectives`. Many of these shipped with ESLint migration metadata, config/schema wiring, and autofix support.

### Type inference, codegen, and plugin APIs got much stronger
A major theme of the month was deeper type modeling and analysis. Biome expanded generated global types for builtins like `Promise`, `Math`, `Set`, `Map`, `Date`, `RegExp`, `Symbol`, `Iterable`, and iterator-related declarations, while also adding support for indexed access types, `keyof`, function and constructor signatures, generics, and readonly/const-generic inference. Type-aware linting improved in cyclic module graphs, callback parameter inference, generic aliases, and import resolution, and several stack-overflow/false-positive bugs in rules like `noFloatingPromises`, `noMisusedPromises`, `noUnusedVariables`, and exhaustiveness checks were fixed. In parallel, the JS plugin runtime gained semantic models, rule context, and fix mutations, making plugin authorship substantially more capable.

### Parser/formatter coverage broadened across Markdown, HTML, SCSS, and CSS
Biome added GitHub Flavored Markdown support, markdown suppression handling, and fenced-code language linting, while also fixing infinite loops and HTML-ish embedded suppression bugs. CSS/SCSS support widened notably: interpolation now works in more places, media/container queries and selectors handle richer Sass forms, nested declarations and query values are better supported, and several parsing/formatting edge cases around URLs, `!important`, `@forward`, and interpolated identifiers were corrected. HTML/Svelte/Vue formatting also saw multiple fixes, including better tag classification, safer writebacks for embedded attribute expressions, and improved handling of comments and inline spacing.

### Performance and stability improved in hot paths
Several commits targeted analyzer and formatter hotspots, including faster token lookup, reduced type-inference work for namespace imports and generics, cheaper CSS property/value traversal, and less quadratic behavior in large expressions and dependency walks. The month also included resilience fixes for malformed input and crashes, such as parser recovery for broken `for...of` and `delete` expressions, safer broken-pipe handling, better config error reporting, and fixes for stack overflows and infinite loops in type-aware analysis and markdown parsing.

### Other misc changes
- Bun runtime/module awareness was expanded, including a `noBunModules` rule and fewer false positives on Bun builtins.
- LSP and workspace behavior improved, including scoped file watchers and better code-action targeting in embedded files.
- Git ignore handling, preview release notes, crate publishing workflows, benchmark coverage, and assorted docs/tests were updated.
- Smaller fixes landed for Tailwind parsing/shorthand rules, test-title detection, SVG/HTML attribute checks, and assorted formatter/linter edge cases.
