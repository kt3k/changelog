---
date: 2026-06-30
repo: biomejs/biome
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Biome broadens YAML/SCSS support and tightens editor flow"
excerpt: "June brought major parser/formatter expansion for YAML, SCSS, Tailwind, Svelte, and HTML, plus key lint, LSP, and security fixes."
commits: 153
---

### Parser and formatter coverage expanded across key languages
Biome made its biggest gains in syntax support this month, especially for YAML and SCSS. YAML now has real file handling plus initial formatter support for mappings and sequences, while SCSS gained broader parsing for bracketed expressions, interpolated media/supports conditions, dynamic keyframes, variable-heavy media queries, and more robust formatting for strings, lists, comments, grids, and parenthesized values. CSS/Tailwind parsing also widened with support for `:global()` selector lists, digit-leading utility names, variant expressions, and nested selector edge cases.

### Vue, Svelte, HTML, and Markdown got noticeably more accurate
Framework-aware parsing and linting improved across the board. Biome fixed Vue handler parsing, same-name `v-bind` shorthand, attribute checks, and several Vue-specific a11y/lint false positives. Svelte support improved for `each` destructuring, TypeScript `as const`, embedded template bindings, `{@html}` usage, special elements, and new nursery rules. HTML parsing now accepts processing instructions and literal `\u` text, while Markdown formatting and parsing were reworked to better match CommonMark and Prettier, especially for lists and block quotes.

### Linting became stricter where it matters, and quieter where it shouldn’t
June added several new nursery rules, including `useIncludes`, `useExportType` style enforcement, `useReactFunctionComponentDefinition`, `noRestrictedDependencies`, and `noSvelteUnnecessaryStateWrap`. At the same time, existing rules were sharpened to avoid false positives and false negatives: `noUnusedVariables` and `noUnusedImports` now understand more embedded template usage, `noFloatingPromises` respects overload resolution, `useNullishCoalescing` gained a boolean-coercion escape hatch, `noProcessEnv` catches imported `env`, and multiple Vue/HTML/CSS a11y rules were corrected.

### Performance, LSP, and CLI behavior improved
Biome reduced editor friction with debounced LSP diagnostics, disabled go-to-definition by default to avoid heavy module-graph work, fixed Windows daemon pipe detection, and made multi-root workspace config handling more reliable. Internal performance work removed a salsa DB mutex, switched project settings to `Arc`, improved formatter throughput in some cases, and reorganized language feature gating for cleaner builds. CLI/reporting also got better with cleaner `rage` config loading, safer JSON output, more precise diagnostics, and a fix for `biome migrate` output.

### Security and release updates
The month included security-related dependency bumps, including Vite and git2 updates, plus the v2.5 release and a large promotion of 73 nursery rules to stable. That release also brought several naming changes and schema/config updates that will matter for teams upgrading presets or rule references.

### Other misc changes
- Many snapshot and fixture updates across CSS, SCSS, HTML, Markdown, Svelte, Vue, and CLI tests.
- Ongoing dependency and workflow churn across pnpm, Rust toolchain, GitHub Actions, and assorted crates.
- Smaller internal refactors in module graph, codegen, docs tooling, and configuration schemas.
