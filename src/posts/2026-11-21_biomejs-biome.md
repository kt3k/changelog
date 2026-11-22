---
date: 2026-11-21
repo: biomejs/biome
size: L
title: "Parser fixes and big CLI path cleanup"
excerpt: "Svelte snippet type parameters now parse/format, path handling was refactored across the CLI, and GritQL got two performance wins."
commits: 6
authors: [Jayllyz, dyc3, ematipico]
commit_authors: {"c071912": dyc3, "b9fdaba": ematipico, "60da8a9": Jayllyz, "eb51fdb": Jayllyz}
---

### **Svelte snippet type parameters now parse and format** (c071912)
Biome now handles `{#snippet}` blocks with type parameters in Svelte, including formatting and linting invalid signatures without panicking. The parser, formatter, and test fixtures were updated to recognize the new snippet shape end-to-end.

### **CLI path handling was refactored for correctness** (b9fdaba)
The CLI’s file/path plumbing was reworked so workspace-aware paths are carried consistently through inspect, search, migrate, and file processing. This also tightens VCS ignore behavior and fixes VS Code untitled-document handling, nested ignore precedence, and other path-related edge cases.

### **GritQL match processing got faster on large queries** (60da8a9)
This change stops copying match-history data on every state clone, avoiding quadratic slowdowns when a plugin reports many matches. It should materially improve GritQL performance on large files with lots of matches.

### **GritQL binding-to-range conversion now caches line indexes** (eb51fdb)
Biome now caches line-start information for Grit target trees instead of rebuilding it for every binding conversion. That reduces repeated source rescans and speeds up GritQL plugins, especially in large files.

### Other misc changes
- Dependency bumps (2 commits)
- Diagnostic fix-preview alignment tweak
- Minor formatter snapshot updates and test adjustments
