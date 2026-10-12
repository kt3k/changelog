---
date: 2026-10-11
repo: biomejs/biome
period: weekly
slug: 2026-W41
period_label: "Oct 5–11, 2026"
size: L
title: "Biome ships a large week of linting, Tailwind, and parser upgrades"
excerpt: "Major new nursery rules, Tailwind/CSS parsing fixes, and expanded SCSS/Vue/Svelte support improved coverage across the stack."
commits: 99
---

### Major lint coverage expansion
Biome landed a broad set of new nursery rules across JavaScript, Vue, HTML, Svelte, YAML, and Markdown. Highlights include checks for nested `switch` statements, unsafe unary minus, nested template literals, inconsistent JSON file reads, `arguments.caller`/`callee`, useless assignments, accidental bitwise operators, and several framework-specific rules for Vue and Svelte. Many of these shipped with config/diagnostic wiring and ESLint migration mappings, making them ready for adoption.

### Tailwind support got materially better
Tailwind parsing and analysis saw one of the biggest pushes of the week. Biome added `noTailwindRestyledComponents` and `noTailwindLegacyUtilities`, expanded `noTailwindArbitraryValue` with escape hatches, and fixed a long list of parser edge cases around arbitrary variants, nested parentheses, unary operators, leading digits, dashed utilities, CSS-variable shorthands, and `@theme` syntax. `useTailwindSortedClasses` was also upgraded to respect Tailwind v4 ordering and read imported project config, so class sorting now reflects real design-system state instead of only built-in defaults.

### SCSS, CSS, and selector analysis are much more capable
SCSS moved closer to first-class support: Biome now formats and lints `.scss` files, treats `.module.scss` as CSS Modules, and improved parsing/formatting for empty statements, percentage-template bodies, quoted interpolation in unknown at-rules, keyframes, and modern `if()` branches. CSS selector analysis also got more accurate for nested rules, fixing specificity-related false negatives and improving support for `@container` and `@starting-style` patterns.

### Vue, Svelte, and HTML workflows improved
Several framework-specific fixes and rules landed together. Vue gained rules for consistent event hyphenation, required props with defaults, and cleaner event/directive formatting; Svelte added checks for unsafe text mustaches and fixed directive parsing, shorthand `class:`/`style:` handling, and root-level navigation patterns. HTML also picked up a taxonomy cleanup for `useScopedStyles`.

### CLI, migration, and analysis correctness fixes
The CLI and migration flows got noticeably more polished. `inspect config` now resolves paths without requiring a key, `inspect plugins` produces clearer diagnostics, Prettier migration now preserves default `semi` and `singleQuote` behavior, and ESLint migration explains more unsupported-rule cases. On the analysis side, Biome fixed type inference for plain arrays, control-flow handling for unlabeled jumps in labeled loops, and exit-code preservation in child-process wrappers.

### Other misc changes
- Markdown formatting improved for CJK text and emphasis handling.
- `noSelfAssign`, `useLogicalProperties`, `useImportExtensions`, `noUselessStringConcat`, and several other existing rules were tightened.
- GitHub Actions, test infra, generated metadata, lockfiles, and dependency bumps were updated throughout the week.
