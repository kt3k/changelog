---
date: 2026-11-15
repo: biomejs/biome
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "Biome ships a major lint expansion with parser and performance fixes"
excerpt: "New JS/Vue/Test rules, stronger type inference, safer parsers, and faster analysis landed across the week."
commits: 121
---

### Major lint coverage expansion
Biome had a very large week for linting: it added a broad batch of new nursery rules across JavaScript, TypeScript, Vue, HTML, Svelte, YAML, Tailwind, and test code. Highlights include new checks for unsafe spread and splice patterns, dynamic `require()`, top-level `describe`/test globals, `Set` construction, nested ternaries, outdated Vue patterns, restricted Tailwind classes, and package.json license validity. Several existing rules were also tightened or renamed, such as the HTML disabled-attribute rule and nullish-coalescing behavior.

### Type-aware analysis got much smarter
The type system and rule engine picked up substantial inference improvements, including overload selection, conditional type evaluation, `infer` handling, and better flow-sensitive narrowing after truthiness, equality, `typeof`, and assertion checks. Destructuring defaults now flow into binding types too, which makes a number of type-aware rules noticeably more accurate and reduces false positives.

### Parsers and formatters were hardened
Biome fixed a series of parser edge cases that previously caused crashes or bad diagnostics, including malformed CSS `composes` values, invalid `import.defer`/`import.source` syntax, Astro comment expressions, Svelte generics, and SCSS hex-color parsing. Formatter fixes also landed for Markdown, HTML, and Svelte so comments, tables, and inline text are preserved more naturally.

### Vue and frontend semantics were refactored
A major Vue semantic-model refactor landed, improving coverage for `setup()` returns, `defineComponent()` usage, emits handling, and native-element detection, while also enabling several new Vue-specific lint rules. Related frontend work also improved Tailwind class detection and query performance across HTML, Astro, Svelte, and Vue sources.

### Performance, diagnostics, and tooling improved
Biome sped up several hot paths, including license lookup, Tailwind syntax queries, suppression-token scanning, and `noRedeclare`. The CLI now emits cleaner filesystem diagnostics, and source-action sorting fixes were made safer by skipping nested subtrees so editor autofixes don’t rewrite the wrong structures. The week also added an internal crate publishing workflow with verification and rate-limited release tooling.

### Other misc changes
- Rowan gained new navigation helpers for AST traversal.
- Plugin suppressions now work end-to-end for `biome lint --suppress`.
- Dependency bumps, release automation updates, docs/comment cleanup, and snapshot churn.
