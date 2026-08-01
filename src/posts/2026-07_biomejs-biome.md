---
date: 2026-07-31
repo: biomejs/biome
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Biome spent July deepening Markdown, YAML, and type-aware linting"
excerpt: "Major formatter upgrades for Markdown/YAML, a new Salsa-based inference engine, and many tighter lint fixes plus LSP stability improvements."
commits: 175
---

### Formatter and parser coverage expanded a lot
Biome spent most of the month widening language support and fixing long-standing formatting edge cases. Markdown saw the biggest churn, with multiple parser/formatter refactors, prose wrapping, better list/blockquote/code handling, and improved CommonMark compatibility. YAML also got major attention: flow mappings, block scalars, document markers, directives, explicit entries, quote normalization, and comment placement all became more robust. CSS/SCSS and HTML/Svelte/Vue/Astro templates likewise picked up many correctness fixes, including SCSS-only syntax gating, selector/comment placement fixes, verbatim whitespace handling, Angular and Svelte declaration tag support, and more reliable embedded-node parsing.

### Type-aware linting and inference were substantially overhauled
July was a big month for Biome’s typed analysis stack. A new Salsa-based inference engine landed, followed by multiple refactors to module graphs, globals, raw type collection, structural mapping, and import-cycle handling. These changes also improved performance and reduced false positives/negatives in rules like `noMisusedPromises`, `noFloatingPromises`, `useAwaitThenable`, `useNullishCoalescing`, `noMisleadingReturnType`, `noUnnecessaryConditions`, and `noUnresolvedImports`. Several rules gained broader real-world coverage for overloads, tuple spreads, aliased generics, TypeScript wrappers, and incomplete inference results.

### LSP, daemon, and workspace stability got a lot better
There were several high-impact editor/runtime fixes: a workspace/LSP deadlock was resolved, the daemon proxy was hardened so one disconnected client no longer kills shared service sessions, stale Unix sockets are now cleaned up on startup, and workspace/database plumbing was refactored for better correctness. Biome also improved on-type formatting behavior, aligned trigger characters, and made CLI/server workspace writes more stateless to avoid lockups during server-backed formatting and linting.

### New rules and rule options broadened linting
The lint surface grew with `noNegationInEqualityCheck`, `noRestrictedProperties`, and `noTailwindArbitraryValue`, plus new options for existing rules like `useNullishCoalescing`, `useDomQuerySelector`, and `noProcessEnv`. Several HTML accessibility rules were updated to understand dynamic/shorthand attributes across Vue, Svelte, Astro, and Angular, which cut down false positives in template-heavy codebases. Tailwind class sorting also got smarter, especially around v4 signatures, functional utilities, and important/negative variants.

### Performance and CLI output improved
Formatter performance was trimmed with faster width calculation and printer hot-path inlining, and HTML linting got faster by switching to tag-kind matching. Profiling output became more useful with plugin-name split timings and a dedicated inference profiler. The CLI’s `rdjson` output now includes explicit severities, `--stdin-file-path` respects nested config more reliably, and help/reporter docs were polished for clarity.

### Other misc changes
Release automation, dependency bumps, snapshot refreshes, benchmark plumbing, and assorted small bug fixes across CSS, HTML, Markdown, Svelte, Vue, and YAML.
