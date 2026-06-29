---
date: 2026-06-28
repo: biomejs/biome
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Biome tightens parsing, linting, and CLI reliability"
excerpt: "A week of parser/formatter fixes, smarter lint rules, better LSP/CLI behavior, and a notable internal feature-gating refactor."
commits: 37
---

### Parser, formatter, and analyzer correctness improvements
**HTML, CSS, Markdown, and GritQL parsing got a round of fixes.** Biome now recognizes HTML processing instructions, accepts valid CSS nesting with trailing `&`, parses mixed space/tab nested Markdown lists correctly, and allows positional GritQL call arguments. The formatter was updated to preserve these cases without changing meaning, including keeping inline comments in CSS selector/import lists and retaining parentheses around `await`/`yield` instantiation targets.

**Several lint rules were made more precise across languages.** `useNullishCoalescing` gained an `ignoreBooleanCoercion` option, `noFloatingPromises` now respects the selected overload, and `useValidAutocomplete` was tightened. Vue `v-bind` shorthand, chained `test.each` variants, and HTML/Astro `is:global` styles are also handled more accurately, reducing false positives.

**Svelte, Vue, and Astro template analysis is improving.** `noUnusedImports` and `noUnusedVariables` now account for bindings referenced only in embedded template regions when full HTML support is enabled, and a new Svelte nursery rule, `noSvelteUnnecessaryStateWrap`, flags redundant `$state()` wrapping.

### CLI, LSP, and output reliability
**The CLI and language server became less error-prone.** Go-to-definition no longer fails on unresolved `node_modules` imports, `rage` now honors custom config paths, Windows daemon pipe discovery works again, and JSON reporters now correctly escape backslashes in file paths. `biome migrate` also preserves trivia when rewriting deprecated `recommended` config.

### Core refactors and platform groundwork
**Biome’s internals were reworked for lower overhead and cleaner optional builds.** Workspace settings now use `Arc<Settings>`, the rule-doc tooling gained a diagnostics writer abstraction, semantic/db plumbing saw a salsa-tracked refactor, and feature gating was reorganized around language-specific flags like `lang_html`, `lang_js`, `lang_json`, and `lang_css`.

### Other misc changes
- Vue directive helper cleanup and other HTML analyzer refactors
- Performance work in the CLI crawler/handler path
- CI/toolchain and dependency bumps, plus minor cleanup
