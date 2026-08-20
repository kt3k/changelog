---
date: 2026-08-19
repo: biomejs/biome
size: L
title: "JS plugins and parser fixes land"
excerpt: "Biome adds AST-querying JS plugins, fixes incomplete Svelte/JS parsing, and patches workspace cache eviction."
commits: 8
authors: [Netail, ematipico, siketyan, dyc3]
commit_authors: {"a51eff7": dyc3, "405dedb": ematipico, "7dbf9d8": siketyan}
---

### **JS plugins can now query AST nodes by kind** (7dbf9d8)
Biome’s JS plugin API now exposes a way to ask for AST nodes by syntax kind, and the plugin runtime/codegen were expanded to support it. This reduces plugin dispatch overhead and gives plugin authors a more direct, type-safe way to target node shapes.

### **Biome no longer crashes on incomplete Svelte declarations** (a51eff7)
Parsing incomplete `let`/`const` declarations inside Svelte files now falls back more gracefully instead of crashing. The fix adds new bogus declaration handling and updates formatter/parser snapshots so malformed input is recovered consistently.

### **Workspace DB eviction now clears parsed file cache** (405dedb)
The LSP workspace database now evicts cached parsed sources when files or whole paths are unloaded, fixing a memory leak over long editor sessions. Tests were added to verify that cache eviction actually shrinks the stored source set.

### Other misc changes
- Replaced `cargo audit` with `cargo deny` in CI and added the new deny config.
- Split the `just test-lintrule` helper into per-language commands.
- Added more CSS rule sources for `biome migrate eslint`.
- Updated sponsor sections in translated READMEs.
