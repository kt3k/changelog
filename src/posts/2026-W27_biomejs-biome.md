---
date: 2026-07-05
repo: biomejs/biome
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Biome deepens Markdown, CSS, and LSP correctness"
excerpt: "A busy week of parser, formatter, and lint refinements improved Markdown/CommonMark handling, SCSS/Tailwind parsing, and editor responsiveness."
commits: 40
---

### **Editor responsiveness and workspace internals improved**
Biome debounced LSP diagnostics to reduce typing lag in large files, and a workspace/database refactor also improved daemon responsiveness by cancelling stale work and tightening rule enablement behavior.

### **Markdown formatting and parsing saw a major overhaul**
Markdown got the biggest functional push this week: the parser now emits cleaner nodes, HTML blocks are represented more precisely, and the formatter gained much better CommonMark compatibility for lists, blockquotes, links, thematic breaks, fenced code, and nested edge cases. A follow-up refactor further improved list marker and indentation handling to avoid re-parsing surprises.

### **CSS/SCSS and Tailwind support expanded**
The CSS parser became more tolerant of real-world SCSS, including expression-heavy media queries, variables in feature names and values, and hyphen-led interpolated properties. Tailwind parsing also improved so digit-leading utility and variant names like `2xl` are handled correctly, and the parser now recovers more safely from unsupported CSS Modules syntax at EOF.

### **Linting became more precise across JS, HTML, Vue, and Svelte**
Several rules picked up real-world correctness fixes and broader type awareness: `useNullishCoalescing` added an `ignorePrimitives` option, `noUnsafeOptionalChaining` now catches wrapped TS assertions, `noProcessEnv` checks computed access, and `noMisleadingReturnType` reasons more accurately about assertions. HTML a11y rules learned about dynamic attributes, Vue `v-on` shorthand got less brittle, and Svelte-specific patterns were exempted from false positives in `noStaticElementInteractions` and `noUnusedVariables`.

### **YAML and Astro formatting/parsing got targeted fixes**
The YAML formatter now supports sequence mappings, Astro embedded shorthand attributes are parsed correctly, and snapshot/test plumbing was refreshed around these cases. Biome also tightened snapshot redaction so temp-directory masking only happens on real path boundaries.

### Other misc changes
- Dependency and CI/workflow updates, including advisory allowlists and package bumps
- Miscellaneous snapshot refreshes, release housekeeping, and small internal refactors
