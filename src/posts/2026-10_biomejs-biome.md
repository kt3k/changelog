---
date: 2026-10-31
repo: biomejs/biome
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Biome doubles down on framework linting and parser depth"
excerpt: "October brought a huge Vue/Tailwind/SCSS lint expansion, plus major parser, formatter, and performance upgrades across Biome."
commits: 402
---

### Major lint expansion across frameworks and CSS
Biome shipped a large wave of new nursery rules, especially for Vue, Svelte, Tailwind, CSS, and JavaScript. Vue coverage grew the most, adding checks for deprecated APIs, emits/props conventions, lifecycle timing, render returns, slot casing, `v-for`/`v-model` patterns, and semantic-model-backed analysis. Svelte gained rules for shorthand directives, reactive classes, event dispatch types, internal APIs, and other template gotchas, while Tailwind-focused rules now cover restyling, legacy utilities, variable shorthands, raw colors, arbitrary values, and class sorting. On the JS side, the month added many correctness-oriented rules such as unsafe return values, unsafe unary minus, useless calls, nested template literals, null usage, loop clarity, and more. Most new rules were wired through diagnostics, schemas, docs, and ESLint migration mappings so they’re ready for real adoption.

### Parser and formatter support broadened across CSS, SCSS, Markdown, HTML, and GraphQL
A major theme was deeper syntax support for real-world language edge cases. CSS/SCSS handling expanded for dynamic `@supports`, `@root`, `@at-root`, `attr()` and `if()` variants, computed at-rule names, interpolation in more places, percent values, and safer property sorting. Tailwind parsing and sorting also became much more robust, including v4 ordering and project-specific config reading. Markdown got embedded-language formatting and analysis, plus many fixes for block quotes, lists, frontmatter, and CJK-aware wrapping. HTML/Vue/Svelte parsing improved for processing instructions, bindings, generics, event/directive syntax, and embedded code actions. GraphQL also picked up new sorting assists and better parsing/formatting of descriptions and legacy variables.

### Performance and analysis became noticeably faster
Biome spent a lot of effort cutting overhead in hot paths. The formatter now skips more unnecessary comment work, the analyzer avoids walking irrelevant subtrees, and several lint rules moved to cheaper borrowed-token or indexed lookup strategies. Rowan/tree traversal also saw multiple optimizations, and daemon/server paths were improved for throughput, memory use, and shutdown behavior. These changes should reduce latency in common lint/format/search workflows, especially on large codebases.

### Migration and configuration got more faithful
Migration output became more useful and accurate throughout the month. Biome expanded unsupported-rule reporting, added more ESLint/Stylelint/Prettier mappings, preserved more config nuances during conversion, and improved plugin/config resolution behavior. Notable config fixes included plugin globs resolving relative to the config file, better override/domain interactions, YAML config deserialization support, and clearer `inspect config` / `inspect plugins` behavior. Rule metadata and generation pipelines were also updated repeatedly to keep new rules and taxonomy changes aligned across the CLI and docs.

### Reliability and correctness fixes across the toolchain
The month also included several important bug fixes: safer autofixes for regex and CSS rules, better type inference for mapped and imported types, more accurate control-flow handling, CLI exit-code preservation, improved diagnostic messages, and panic-to-diagnostic surfacing in the analyzer. Vue, Svelte, Tailwind, Markdown, YAML, and JSX all saw targeted correctness fixes that reduced false positives, prevented broken output, or restored expected semantics.

### Other misc changes
- Rule docs and snapshots were refreshed throughout the month.
- Internal refactors touched formatter core, syntax helpers, and rule plumbing.
- Dependency bumps, CI/workflow tweaks, and release housekeeping landed regularly.
- A few previously added items were revised or reverted as follow-up fixes landed.
