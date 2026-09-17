---
date: 2026-09-16
repo: biomejs/biome
size: L
title: "Type inference gets faster and more precise"
excerpt: "Biom e improved recursive generic alias inference, added Symbol/WeakMap codegen support, and trimmed JS runtime/codegen size."
commits: 8
authors: [dyc3, siketyan]
commit_authors: {"2b5cd1e": siketyan, "23ba25f": siketyan, "e25d363": dyc3, "2ac64e3": dyc3, "477c7f0": dyc3, "72902f0": dyc3, "d47dc24": siketyan}
---

### **Fix generic type inference through nested aliases** (23ba25f)
Biome now skips non-generic references when applying substitutions, which fixes type inference for nested generic aliases like `Box<Wrapper<T>>`. This unlocks more accurate type-aware linting and avoids slow lookups on recursive aliases used in real-world libraries.

### **Improve codegen for `Symbol` builtins** (477c7f0)
The generated global type model now includes `Symbol` static members and call signatures, expanding Biome’s understanding of the standard library surface. That should improve type inference and lint behavior around `Symbol.*` APIs.

### **Lower generic constraints in generated types** (72902f0)
Codegen now emits generic constraints more faithfully, including updating `WeakMap`’s local type model. This makes the generated type metadata closer to the actual JS/TS declarations and should improve analysis of constrained generics.

### **Deduplicate local types in global codegen** (e25d363)
The global-types generator was refactored to reuse local type entries instead of emitting duplicates. This reduces generated code churn and keeps the type database smaller and easier to maintain.

### **Reduce JS runtime and binary size** (d47dc24)
Biome switched Boa to a slimmer feature set and reworked the JS AST runtime to use shared static field descriptors instead of per-field generated logic. The result is less generated code, a smaller binary, and a cleaner path for plugin AST access.

### Other misc changes
- Docs: replaced retired VS Marketplace badges across README translations (2b5cd1e)
- Release/changeset cleanup for published patch notes (af4365d)
- Added benchmark coverage and test fixtures for type inference regressions (23ba25f, 2ac64e3, 72902f0, 477c7f0)
