---
date: 2026-06-30
repo: biomejs/biome
size: M
title: "CSS parser gets SCSS and Tailwind fixes"
excerpt: "Biome improved SCSS media-query parsing, accepted digit-led Tailwind names, and fixed a Svelte a11y false positive."
commits: 6
authors: [denbezrukov, PranavAchar01, henrybrewer00-dotcom, ematipico]
commit_authors: {"6232fcd": PranavAchar01, "34570b5": henrybrewer00-dotcom, "baaf6bb": denbezrukov, "d97fffe": ematipico, "74c1a51": denbezrukov}
---

### **SCSS media queries now parse expression-heavy values** (74c1a51)
Biome can now parse SCSS expressions inside media/container query features, including variables, interpolation, arithmetic, and chained comparisons. This unblocks formatting and parsing of more real-world SCSS and reduces syntax errors around responsive styles.

### **Tailwind `@utility` and `@variant` names can start with digits** (6232fcd)
The CSS lexer now treats digit-leading Tailwind names like `2xl` as a single identifier in the Tailwind utility-name context. That fixes parsing for common breakpoint-style variants and utilities that previously got split into number plus identifier tokens.

### **`noStaticElementInteractions` ignores Svelte special elements** (34570b5)
The a11y rule now skips Svelte special elements such as `<svelte:window>`, `<svelte:document>`, and `<svelte:body>`. These aren’t real DOM nodes, so the change removes a false positive on valid Svelte event handlers.

### **SCSS variables are handled in media feature names and values** (baaf6bb)
The parser/formatter were extended to recognize SCSS variables in query feature names and values, and the existing unknown-media-feature lint logic now treats them as dynamic. This broadens SCSS support for constructs like `$feature: $value` in media queries.

### **`biome check` no longer picks up `.scss` files by mistake** (d97fffe)
The CLI test setup was adjusted to ensure SCSS files aren’t accidentally analyzed when running `biome check`. This appears to be a targeted fix for file-source detection rather than a user-facing language change.

### Other misc changes
- Dependency bump: `jiff` 0.2.28 -> 0.2.31 (2fcf7a5)
