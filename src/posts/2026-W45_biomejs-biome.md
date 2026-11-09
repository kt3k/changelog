---
date: 2026-11-08
repo: biomejs/biome
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: L
title: "Biome adds MDX support and a big batch of new lint rules"
excerpt: "MDX parsing, React/Vue/Svelte coverage, faster traversal, and many new nursery rules landed alongside several parser and formatter fixes."
commits: 118
---

### Major lint coverage expansion
Biome spent most of the week broadening its rule set across JavaScript and frameworks. New nursery rules landed for React direct state mutation, negated array predicates, constant comparisons, array methods on `arguments`, subtraction-based comparisons, shared branch code, uninvoked array callbacks, and more, with matching config, diagnostics, and ESLint migration plumbing. Vue, Svelte, HTML, and Playwright also picked up new and refined rules, making the linter noticeably more opinionated across common frontend patterns.

### MDX and embedded-language support grew up
MDX support moved from basic Markdown handling to real embedded syntax support: JSX tags, ESM blocks, and expressions are now parsed, with formatter and error handling wired in. In parallel, embedded-language infrastructure was refactored by extracting JS extent detection into a shared crate, which also benefited HTML parsing and sets the stage for more reuse across parsers.

### Performance and traversal work
A few targeted performance improvements landed for large codebases. Lint walks now skip childless nodes and avoid extra segment copying, the service resizes file-view maps more efficiently, disabled rules avoid timer overhead, and CSS selector traversal is now memoized. These changes should trim some analysis cost without changing behavior.

### Parser, formatter, and rule-fix correctness
Several fixes tightened correctness in real-world code: Tailwind arbitrary values parse dashed names properly, SCSS multi-value declarations and negative interpolation lists format more like expected output, markdown emphasis wrapping is more prose-aware, and embedded CSS inside styled-components handles more cases. Biome also fixed a few lint edge cases, like `useUnicodeRegex` avoiding unsafe autofixes, `noSwitchDeclarations` no longer flagging `var`, and `useWhile` recognizing `for (;;)` and converting it to `while (true)`.

### Plugin/runtime and CLI improvements
Plugin support became more capable and more reliable. JavaScript plugins gained `tokenKinds()` and `nodeKinds()` APIs plus GritQL-based `grit()` queries, while plugin failures now surface as real errors so failing rules correctly break `lint` and `check`. The CLI also moved to injectable environment access, improving testability and making CI/color behavior more deterministic.

### Other misc changes
Additional updates included new Vue rule coverage, Playwright callback signature support, Svelte typed `{@const}` parsing, a top-level grit config fix, array type inference cleanup that improved switch exhaustiveness and promise misuse detection, dependency bumps, snapshot/test refreshes, and assorted CI/release housekeeping.
