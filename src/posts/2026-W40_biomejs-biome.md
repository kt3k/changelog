---
date: 2026-10-04
repo: biomejs/biome
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "Biome sharpens SCSS, type inference, and lint coverage"
excerpt: "A week of parser/formatter expansions, safer autofixes, faster type-aware linting, and several new rules across JS, CSS, Vue, Svelte, Astro, and HTML."
commits: 84
---

### **Parser and formatter coverage expanded across styles and markup**
Biome broadened SCSS/CSS support in several directions: interpolation now works in more containers and property names, `url()` accepts conditional `if()` expressions, `@root` and `@supports` heads handle richer dynamic forms, and legacy vs modern `if()` syntax is distinguished more accurately. On the markup side, HTML parsing now rejects mismatched or stray closing tags, the formatter preserves spacing when joining inline content, and Vue slot props plus Svelte snippet formatting were tightened up for real-world component syntax.

### **Type inference and type-aware linting got noticeably more robust**
The type system picked up multiple correctness fixes, including preserving generic bindings during member lookup, resolving mapped `keyof` types, and avoiding stack overflows in cyclic import graphs. Internal type-info/codegen work also continued to support these changes. In practice, this improves downstream type-aware rules like `noFloatingPromises` and reduces false positives in generic-heavy codebases.

### **New lint rules landed across JS, CSS, Vue, Svelte, Astro, and HTML**
Biome added several new checks this week: `useStrictBooleanExpressions`, `useBigintLiterals`, `noZeroFractions`, `noIteratorProperty`, `noProcessExit`, `noSvelteInspect`, `noVueBooleanDefault`, `noAstroConflictingSetDirectives`, and `noMisplacedListElements`. Existing rules also gained coverage and compatibility updates, such as `noUnknownAttribute` recognizing React 19 transition events, `noDuplicateFontNames` exempting `monospace, monospace`, and `useImportExtensions` extending to HTML-backed Vue/Svelte/Astro modules.

### **Autofixes and diagnostics were made safer**
Several fixes were hardened to avoid producing invalid code: `noUselessReturn` now avoids unsafe removals in unbraced bodies, `noAdjacentSpacesInRegex` skips character classes, and the test-title logic no longer misclassifies ordinary `.test()` calls. Biome also fixed migration metadata and unsupported-rule classification so ESLint-to-Biome conversion output is more accurate and reusable.

### **Performance and stability improvements**
Performance work landed in semantic analysis, callable resolution, promise classification, HTML whitespace scanning, YAML lexing, and JSX attribute matching. The CLI was also hardened against broken pipes, and the Unix daemon socket is now restricted to the current user.

### Other misc changes
- More migration mappings, schema updates, and documentation refreshes
- CI, benchmark, and fixture updates across parser and lint suites
- Internal refactors in rule metadata, type-info generation, and plugin/codegen plumbing
