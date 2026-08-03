---
date: 2026-08-02
repo: biomejs/biome
size: L
title: "HTML formatting and linting get major updates"
excerpt: "Biome added a new viewport lint, improved HTML formatting for srcset, doctype and quotes, and expanded JS global type info for Array/Map/Set."
commits: 8
authors: [dyc3, minseong0324, denbezrukov, saberoueslati]
commit_authors: {"016bd3c": denbezrukov, "3c55aa9": minseong0324, "9847e68": saberoueslati, "1fbf7a3": minseong0324, "da5c1a5": dyc3, "ad80f57": dyc3, "607afd2": dyc3, "10da30e": dyc3}
---

### **New HTML/JS lint prevents non-scalable viewport settings** (9847e68)
Biome added `noNonScalableViewport`, a nursery rule that flags viewport metadata disabling user zoom via `user-scalable=no`. The change wires it into configuration, diagnostics, ESLint migration, and both HTML/JS analyzers, so it’s immediately usable across supported file types.

### **HTML formatter now handles `srcset` as a structured list** (607afd2)
`srcset` values on `<img>` and `<source>` are now parsed and laid out candidate-by-candidate, with alignment when they wrap. This makes large responsive image declarations much easier to read and matches the formatter’s treatment of the attribute as a real list rather than an opaque string.

### **HTML attribute quoting now chooses the cheaper delimiter** (da5c1a5)
The formatter now counts quote characters in attribute values, including `&apos;` and `&quot;`, before choosing single vs. double quotes. That reduces unnecessary escaping and preserves source mapping better when the value needs to be rewritten.

### **HTML5 doctypes are now lowercased in plain HTML files** (ad80f57)
Biome now emits `<!doctype html>` for standalone HTML5 doctypes in `.html` files, matching Prettier. It deliberately leaves doctypes with DTDs, and doctypes inside Vue/Svelte/Astro files, unchanged.

### **CSS parser/formatter tightened interpolated media-query boundaries** (016bd3c)
Media-query parsing and formatting were updated to better recognize interpolated CSS/SCSS identifiers and preserve the intended boundaries around media types. This also corrected related invalid-case handling and snapshot output, making interpolated media queries more robust across parsing, linting, and formatting.

### **JS type-info generation now treats Array/Map/Set as generated globals** (3c55aa9, 1fbf7a3)
Global type definitions were migrated into codegen for `Array`, `Map`, `Set`, and related Array methods like `filter`, `forEach`, and `map`. This refactor centralizes the generated type metadata and makes the global-type pipeline more complete and maintainable.

### Other misc changes
- Vue SFC custom blocks are parsed as opaque text, fixing formatting/parsing for `<i18n>`, `<docs>`, and non-HTML templates (10da30e)
- Global type codegen/migration cleanup for `Map`/`Set` and `Array` internals
- Test and snapshot updates across CSS, HTML, CLI, and analyzer suites
