---
date: 2026-07-19
repo: biomejs/biome
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Biome tightens type inference, expands CSS/HTML support"
excerpt: "A week of parser, formatter, and lint upgrades, led by new CSS custom media support and several TypeScript inference fixes."
commits: 37
---

### **CSS and HTML capabilities expanded**
Biome added end-to-end support for CSS `@custom-media`, including parsing, formatting, linting, and AST updates. HTML also got a meaningful boost with Angular attribute parsing/formatting, Vue shorthand stability fixes, better HTML/SVG tag handling, and a few a11y refinements.

### **Type inference and promise/lint accuracy improved**
A large share of the week focused on Salsa/type-aware infrastructure. Biome hardened inference across overloads, aliases, default namespace imports, and cross-module cases, which fed directly into better diagnostics for rules like `noMisusedPromises`, `noFloatingPromises`, `noUnnecessaryConditions`, and `useIncludes`.

### **Formatter and parser bugs were fixed in several languages**
The formatter now keeps comments in the right place for on-type formatting, CSS declarations before `!important`, and partial-document cases. Markdown block quotes, Vue parsing, and a handful of HTML/CSS edge cases were also corrected to avoid crashes and misformatted output.

### **New and updated lint behavior**
Biome introduced `noNegationInEqualityCheck` to catch precedence bugs like `!foo === bar`, and rewrote `noThenProperty` for both speed and better token/comment handling. Several existing type-aware rules were migrated onto newer inference APIs, improving consistency while preserving coverage through added tests.

### **CLI, workspace, and internal cleanup**
`process_file` was refactored to work statelessly with workspace writes and avoid a type-aware deadlock risk, while workspace sync and logging were hardened. The codebase also saw internal API cleanup (`Text` -> `TokenText`), resolver improvements, and various dependency/workflow updates.

### Other misc changes
- Dependency bumps and lockfile refreshes across the week.
- Snapshot, docs, and changeset updates for the new parser/lint behavior.
- Minor release automation, test, and tooling maintenance.
