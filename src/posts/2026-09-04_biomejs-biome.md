---
date: 2026-09-04
repo: biomejs/biome
size: L
title: "Markdown GFM lands, perf wins stack up"
excerpt: "Biome adds GFM markdown parsing/formatting, plus two performance optimizations and a Grit import fix."
commits: 4
authors: [ematipico, jakeleventhal, denbezrukov]
commit_authors: {"a7f0c48": ematipico, "20e513a": jakeleventhal, "23aad6d": ematipico, "ea20e5a": denbezrukov}
---

### **GFM Markdown parsing and formatting added** (a7f0c48)
Biome now supports GitHub Flavored Markdown in its markdown parser, formatter, and generated syntax/node factories. That unlocks structured handling for GFM features like strikethrough, tables, and task list items, making Markdown support much broader and more standards-aligned.

### **Type inference avoids eager generic expansion** (20e513a)
The type-inference path no longer fully infers imported generic declarations just to apply type arguments, which should materially improve lint performance on large type-heavy libraries. The commit also adds regression coverage for several affected rules and issue cases.

### **Token lookup by offset is faster** (ea20e5a)
Rowan’s offset lookup now uses a more direct green-tree-based path instead of scanning child elements, with new tests covering boundary and zero-width cases. This improves linting performance, especially for large CSS and JSON files.

### **Grit named import matching fixed** (23aad6d)
Grit plugins can now capture and inspect multiple named import specifiers correctly. This fixes a regression where queries over imports could miss or mishandle matched specifier lists.

### Other misc changes
- Dependency bump: `unicode-width` updated to 0.2.2.
- Markdown parser configuration gained a `gfm` toggle defaulting to enabled.
- Console replacement-character handling now treats control characters as invalid graphemes.
- Formatter-development guidance and review checklist were expanded.
- Added/updated regression tests and snapshots for the above fixes.
