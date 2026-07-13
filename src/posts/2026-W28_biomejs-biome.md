---
date: 2026-07-12
repo: biomejs/biome
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "Salsa inference lands alongside formatter and LSP fixes"
excerpt: "Biome added a new Salsa-based inference engine, while tightening CSS/HTML/Markdown formatting and fixing a major LSP deadlock."
commits: 27
---

### **Major analysis infrastructure shift: Salsa-based inference**
Biome introduced a new Salsa-backed type inference engine, replacing the older module-resolution path for typed analysis. This is the week’s biggest architectural change, touching module graph queries, inferred type formatting and interning, benchmarks, and analyzer services to prepare for incremental inference across the JS toolchain.

### **Editor stability and on-type formatting got important fixes**
A high-impact LSP deadlock caused by salsa setters was fixed, preventing workspace requests from hanging when scanning is enabled. Biome also cleaned up format-on-type behavior so it no longer inserts stray whitespace after closing delimiters, and aligned LSP trigger characters with the shared on-type trigger set.

### **Formatter correctness improved across CSS, HTML, Markdown, YAML, and JS**
CSS parsing now rejects SCSS-only constructs in plain CSS instead of accepting them implicitly, closing a correctness gap in mixed-syntax files. HTML formatting was hardened so unquoted attribute values no longer crash check/lint/format runs. Markdown received multiple fixes, including better bullet-list spacing and correct whitespace handling after list markers. YAML formatting expanded support for block properties, and JS formatting now properly wraps curried `test.each`/`it.each`/`describe.each`/`test.for` calls when they exceed line width.

### **Linting and analysis behavior became more precise**
`useDomQuerySelector` gained an `ignore` option for non-DOM receivers, `useSortedClasses` now sorts important-suffix utilities like `flex!`, and a regression in module inference was fixed so data is cloned through the correct path, restoring accurate cross-module analysis.

### **Other misc changes**
- `--profile-rules` now reports plugin time per plugin name instead of a single shared bucket.
- `noCommentText` no longer loops forever during unsafe write fixes.
- Unix daemon startup now removes stale sockets from the cache when they are no longer serving.
- Release workflow, dependency, toolchain, CI, and snapshot/fixture updates were applied throughout the week.
