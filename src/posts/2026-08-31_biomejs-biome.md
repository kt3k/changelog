---
date: 2026-08-31
repo: biomejs/biome
size: L
title: "Parser fixes and new lint rules land"
excerpt: "Major HTML, Astro, CSS, Markdown, and config updates: parsing bugs fixed, new rules added, and schema autocomplete improved."
commits: 11
authors: [dyc3, ematipico, Princesseuh, Netail, saberoueslati, denbezrukov]
commit_authors: {"3c6412e": dyc3, "b88f1ea": Princesseuh, "18a0e1f": Netail, "ee69e0e": ematipico, "f5d7896": dyc3, "966139a": saberoueslati, "753e955": ematipico, "28b8e9c": denbezrukov, "124fdaa": ematipico}
---

### **HTML double-curly text now parses as plain text** (3c6412e)
Biome no longer flags `{{ ... }}` in regular HTML as unsupported interpolation, and the formatter preserves adjacent curly-brace text correctly. This fixes a common false positive/parse failure path for vanilla HTML while keeping Vue/interpolation handling distinct.

### **Astro template expressions now match Astro's own syntax** (b88f1ea)
The JS/HTML parser was updated to read Astro template expressions more faithfully, covering many previously rejected constructs like JSX text quotes, raw `<script>/<style>` contents, HTML comments, unquoted attributes, and template-literal attributes. The change also includes parser and formatter support for Astro-specific edge cases and should eliminate a broad class of false parse errors.

### **Added `noInvalidFileInputAccept` for HTML/JSX file inputs** (f5d7896)
Biome now lints invalid `accept` values on `<input type="file">` in both JSX and HTML, catching malformed extensions, MIME types, and wildcard forms. It also includes normalization logic and migration support so teams can standardize file-input filters more reliably.

### **Markdown now enforces a single top-level heading** (966139a)
A new nursery rule ports markdownlint's MD025, helping keep documents consistent by requiring one primary heading at the top level. It accounts for front matter, nested headings, and other layout details so the rule stays focused on actual document titles.

### **`noShorthandPropertyOverrides` now scopes comparisons correctly** (124fdaa)
This CSS lint fix stops the rule from comparing declarations across unrelated blocks, which eliminates false reports in `@supports` queries and improves handling of nested, `@keyframes`, and `@page` blocks. That makes the rule much more precise in real-world stylesheets.

### **SCSS `url(...)` interpolation support added** (28b8e9c)
The CSS parser/formatter gained support for interpolated SCSS URL values, including new syntax nodes and formatter handling. This closes a parsing gap for SCSS code that builds URLs dynamically.

### **Configuration schema now exposes rule domains properly** (ee69e0e)
Biome's generated config schema and backend typings now enumerate valid linter domains explicitly, which improves editor autocomplete and schema validation. This should make configuration authoring less error-prone and more discoverable.

### **`noInferrableTypes` diagnostics now highlight only the type** (18a0e1f)
The JS style rule's diagnostic range was tightened so the warning points at the inferred type itself instead of the leading punctuation and surrounding trivia. That makes the message cleaner and the suggested fix easier to apply.

### **Daemon logging level is now forwarded correctly** (753e955)
The CLI now passes the chosen log level through to the daemon, aligning background behavior with the foreground command. This should make daemon logging output more predictable when users adjust verbosity.

### **HTML parser now treats interpolation-disabled cases more consistently** (3c6412e)
The HTML parser/formatter behavior around interpolation-disabled content was adjusted, including several snapshot updates and error-to-ok case transitions. This appears to be a targeted fix for HTML text-expression handling rather than a broad feature change.

### Other misc changes
- Markdown/analyzer test and schema wiring updates
- CSS lint rule test coverage and visitor/query refactors
- CLI and parser snapshot refreshes
- Dependency bumps and changefile additions
