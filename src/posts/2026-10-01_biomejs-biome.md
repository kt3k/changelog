---
date: 2026-10-01
repo: biomejs/biome
size: M
title: "Biome expands migrate metadata and fixes two rules"
excerpt: "Migration metadata got richer, unsupported-rule reporting improved, and Biome fixed a regex autofix plus a GritQL backtracking bug."
commits: 5
authors: [dyc3, santichausis]
commit_authors: {"33e4118": dyc3, "d13d1ba": dyc3, "a4e6528": santichausis, "846007b": dyc3, "8724a5d": dyc3}
---

### **Migration metadata now classifies more unsupported rules** (33e4118, d13d1ba, 846007b)
Biome expanded its unsupported-rule catalog with more reasons and more upstream rule mappings, then moved that metadata into `biome_analyze` and added JSON export support for codegen. This improves ESLint-to-Biome migration output and keeps the rule metadata reusable across the CLI and tooling.

### **GritQL `contains` now backtracks correctly when later conditions fail** (8724a5d)
A fix in the Grit pattern compiler makes `contains` try every matching node when it is followed by additional conditions, instead of getting stuck on the first match. That matters for `biome search` and GritQL plugins, where patterns could previously miss valid matches or rewrites.

### **`noAdjacentSpacesInRegex` avoids unsafe fixes inside character classes** (a4e6528)
The regex lint now tracks character-class depth and skips its space-compression autofix inside `[...]`, where turning runs of spaces into a quantifier changes the regex’s meaning. The rule still fixes consecutive spaces outside character classes as before.

### Other misc changes
- Added more ESLint/Svelte/Vue migration mappings and scope metadata updates.
- Improved unsupported-rule reporting with new `NotApplicable` and `Deprecated` categories.
- Minor test and snapshot updates for the migration and lint fixes.
