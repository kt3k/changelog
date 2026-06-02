---
date: 2026-06-01
repo: biomejs/biome
size: L
title: "YAML directives and Vue handlers fixed"
excerpt: "YAML directive parsing was expanded, Vue v-on handlers now accept inline statements, and CSS function at-rules gained interpolated names."
commits: 9
authors: [siketyan, dyc3, denbezrukov, ematipico]
commit_authors: {"b55d10f": dyc3, "66e3a53": siketyan, "592a1df": denbezrukov}
---

### **YAML parser now recognizes directives and directive ends** (66e3a53)
Biom e’s YAML lexer now tokenizes `%` directives and `DIRECTIVE_END` in the stream, which removes parse failures on standard YAML directive examples and document separators. This also broadens formatter/parser coverage for real-world YAML files that previously surfaced errors.

### **Vue `v-on` handlers accept multiple inline statements** (b55d10f)
The JS parser now special-cases Vue event handler source so inline statements are parsed the way Vue expects, instead of being rejected or misclassified as plain expressions. This fixes a user-visible parsing mismatch for templates with more complex `v-on` handlers.

### **SCSS function at-rules support interpolated dashed identifiers** (592a1df)
CSS parsing was widened so SCSS `@function` names can include interpolated dashed identifiers like `--#{$name}`. That brings the parser and formatter in line with SCSS syntax used in real stylesheets, avoiding false errors on valid code.

### Other misc changes
- Dependency bumps: `pnpm`, `serde_json`, `jiff`.
- GitHub Actions updates across multiple workflows.
- Removed the CLI benchmark workflow.
