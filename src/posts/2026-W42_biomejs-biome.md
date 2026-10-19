---
date: 2026-10-18
repo: biomejs/biome
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "Biome expands framework support while speeding up core analysis"
excerpt: "New Vue, Markdown, GraphQL, and SCSS handling landed alongside multiple lint rules and broad performance wins."
commits: 94
---

### Major new language and framework support
**Markdown embeds now format and analyze embedded code** — Biome can now recognize fenced blocks, frontmatter, and HTML blocks as embedded languages, format them with the right formatter, and run lint/assist inside them.
**Vue support got a big upgrade** — New handling for `generic` `<script setup>` blocks fixes linting/formatting around typed components, and new rules cover lifecycle timing, event shadowing, and Svelte/Vue directive patterns.
**GraphQL assists and diagnostics improved** — Biome added sorting assists for arguments, variables, and named definitions, plus clearer duplicate-name diagnostics.

### CSS, SCSS, and HTML parsing got much broader
**SCSS edge cases are increasingly covered** — The parser/formatter now handle computed media features, interpolated `if()` conditions, computed at-rule names, `attr()` units, standalone percent values, and several `@supports` / `@at-root` corner cases.
**HTML and embedded parsing fixed** — Processing instructions now parse in their own context, and embedded code actions work correctly in full HTML support mode.
**Tailwind and CSS fidelity improved** — Raw-color diagnostics can suggest theme colors, shorthand classes preserve semantics, and custom-property URLs are preserved more faithfully.

### Performance and core infrastructure wins
**Formatter and analyzer hot paths got faster** — Comment collection skips comment-free subtrees, reparse work is avoided on already-clean output, and analysis skips walking node kinds no rule cares about.
**Rowan and syntax plumbing were optimized** — Node-range computation and tree building now do less work and avoid unnecessary refcount churn, improving parser/formatter throughput.
**Legacy type inference was removed** — The old `biome_js_type_info` engine and snapshots were deleted, simplifying the codebase.

### Linting and migration coverage expanded
**New rules landed across JS, Vue, Svelte, and HTML** — Highlights include `noUselessCall`, `noVueLifecycleAfterAwait`, `noVueShadowNativeEvents`, `noSvelteClassDirective`, and `noSvelteAddEventListener`.
**Migration fidelity improved** — `biome migrate eslint` now preserves more Vue mappings and `eqeqeq` null-comparison behavior, making config conversion more accurate.
**Diagnostics got clearer** — Multiple lint rules received better messages and snapshots, improving the developer experience across JS, CSS, HTML, and Vue.

### Other misc changes
- Plugin `includes` now resolve relative to the config file.
- `noUnusedImports` handles Svelte stores correctly.
- `biome search` now reports match totals accurately.
- Several docs URL fixes, dependency bumps, and minor refactors/tests landed throughout the week.
