---
date: 2026-09-13
repo: biomejs/biome
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Biome hardens plugins, types, and CSS/HTML edge cases"
excerpt: "This week brought major plugin API expansion, richer type analysis, new lint rules, and many parser/formatter fixes across CSS, HTML, and JS."
commits: 79
---

### **Plugin API expands significantly**
Biome’s plugin runtime now exposes semantic models and per-rule context, and plugin actions carry precomputed edits with code-fix mutation support. This is a major step up for plugin authors and unlocks richer lint/fix workflows.

### **Type analysis and generated JS type info improve**
The analyzer now propagates callback parameter types from call signatures, resolves generic methods in their own scope, and catches more promise-related cases. Biome also filled in global JS type info for `Promise` and broadened global-type lowering to cover more declaration shapes.

### **New lint coverage lands across test, HTML, Markdown, and Svelte code**
Biome added nursery rules for `useBetterDomTraversing`, `useValidTestTitle`, `noObsoleteTags`, `noReturnInFinally`, and `noSvelteAtDebugTags`, plus a Markdown rule for fenced code blocks without language tags. Existing rules were also extended, including React 19.3-aware `noUnknownAttribute` support and better exhaustiveness, floating-promise, and DOM-lint behavior.

### **CSS/SCSS parsing and formatting were hardened**
A large portion of the week went into making CSS and Sass handling more correct: Biome now accepts more SCSS at-rule and media-query forms, preserves Sass function syntax better, handles tricky `!important`/URL/interpolation cases, and improves property-name and selector formatting. Several formatter hot paths were also optimized to avoid redundant scans and quadratic behavior.

### **HTML, embedded content, and editor fixes improve reliability**
Embedded fixes now apply correctly inside HTML attribute expressions, suppression handling works better across embedded snippets, and HTML tag classification was corrected for Vue, Svelte, and Astro. Biome also fixed code actions in embedded HTML-ish files and broadened support for framework directives in analyzer rules.

### **Other misc changes**
- `suite()` aliases are now recognized in test analysis
- `useSimplifiedLogicExpression` preserves trivia more safely
- Git ignore negation handling was fixed for nested `.gitignore` files
- Several correctness fixes landed for `noUnusedVariables`, `noUnusedPrivateClassMembers`, `noUselessConstructor`, `noFloatingPromises`, and `useExhaustiveSwitchCases`
- Performance work also improved line counting, HTML formatting, and large-expression lexing
