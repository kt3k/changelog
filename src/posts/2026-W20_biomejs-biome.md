---
date: 2026-05-17
repo: biomejs/biome
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Biome deepens SCSS support and tightens Markdown parsing"
excerpt: "A week of parser/formatter work expanded SCSS coverage, added experimental YAML formatting, and fixed several Markdown, HTML, and lint edge cases."
commits: 41
---

### SCSS becomes much more complete
**SCSS parser/formatter support expanded across core syntax** — Biome added support for `@include ... using`, parent selectors, semicolonless statement at-rules, interpolated attribute selectors, interpolated dashed identifiers/properties, keyframes selectors, and raw string interpolation. These changes also wired through new syntax nodes, factories, generated types, and formatter paths so Sass-heavy code should parse and print far more faithfully.

**CSS/SCSS analysis got more accurate** — Interpolated SCSS pseudo selectors are now recognized instead of flagged too early, and plain CSS custom functions are distinguished from Sass `@function` declarations. That reduces false positives and closes several parser/linter gaps between CSS and SCSS syntax.

### Markdown parsing was tightened in several edge cases
**List and block container handling improved** — Multiple fixes landed for tab-indented lists, sibling markers, ordered sublist continuation, and list continuation after quote prefixes. Together they make CommonMark-style nested lists and blockquotes behave more reliably and reduce parser/serializer drift.

### YAML formatting is starting to take shape
**Experimental YAML formatter plumbing landed** — Biome now has YAML-specific config wiring, service/file-handler integration, and formatter test coverage. The formatter remains disabled by default, but the groundwork for first-class YAML formatting is now in place.

### Other notable changes
**Tailwind and Svelte parsing got sharper** — Tailwind arbitrary values now distinguish numbers from percentages, `useSortedClasses` got scaffolding for Tailwind v4 presets, and Svelte function bindings are parsed more precisely to avoid incorrect diagnostics.

**Linting and diagnostics improved** — `useDestructuring` now mirrors ESLint’s configurable contexts, `noUnusedFunctionParameters` reports the actual parameter name, and `biome rage --linter` now includes domain-enabled rules in its output.

**HTML and tooling fixes** — HTML formatting no longer produces invalid output when comments split tags, React Native deep-import migration source mapping was corrected, and the repo also saw benchmark removal plus assorted dependency, CI, and docs cleanup.
