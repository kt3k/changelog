---
date: 2026-11-26
repo: biomejs/biome
size: L
title: "Biome lands a wave of new lint rules"
excerpt: "Major lint-rule expansion plus a CLI performance boost and a few Vue/core refactors; several commands are now noticeably faster."
commits: 21
authors: [dyc3, ematipico]
commit_authors: {"6609054": dyc3, "7012853": ematipico, "9407920": dyc3, "c199c75": ematipico, "0fe67ff": dyc3, "adae706": dyc3, "6bdb1ff": dyc3, "73a0cb6": dyc3, "e7dab31": dyc3, "fae973f": dyc3, "74c72ae": dyc3, "4bcb0ee": dyc3, "3c7e9b5": dyc3, "4b93949": dyc3, "3b85b30": dyc3, "c8e0488": ematipico, "bdb0e21": ematipico, "a98859c": ematipico, "7d6800e": ematipico}
---

### **New project rules catch duplicate exports and pointless re-exports** (adae706)
Biome adds `noDuplicateExports` and `noUselessReExportAll`, both aimed at module correctness in the `project` domain. They detect duplicate exported names, multiple default exports, and `export *` statements that export nothing, helping prevent subtle bundling and module-graph bugs.

### **New style rule enforces `else if` chains** (6bdb1ff)
The new `useElseIf` nursery rule reports back-to-back `if` statements that test the same value against different cases and offers an unsafe fix to convert the second branch into `else if`. This makes mutually exclusive conditionals clearer and less error-prone.

### **Set usage now has a dedicated modern-API rule** (74c72ae)
`useSetMethods` flags `Set` operations that can be replaced with native `Set` methods like `union()`, `intersection()`, `difference()`, `isSubsetOf()`, and `isDisjointFrom()`. It nudges code toward clearer and more efficient collection handling.

### **Negative indexing is now preferred over length arithmetic** (73a0cb6)
Biome adds `useNegativeIndex`, which spots `slice()`, `at()`, `subarray()`, `splice()`, and `toSpliced()` calls that subtract from `.length`. The rule suggests using a negative index directly, making intent more obvious and code shorter.

### **Convex support expands with access-control and index rules** (4bcb0ee, fae973f)
Two new Convex-domain rules were added: `useConvexAccessControl`, which checks exported queries/mutations/actions for missing access-control calls, and `noConvexDuplicateIndexes`, which flags redundant index prefixes on the same table. These rules target real data-access and schema mistakes in Convex apps.

### **Array reduce gets discouraged in favor of clearer alternatives** (9407920)
`noArrayReduce` now warns on `reduce()` and `reduceRight()` patterns that are better expressed with loops or dedicated array methods. It still allows simple accumulator-only reductions, so the rule targets the more complex and harder-to-read cases.

### **Conditional and environment rules broaden Biome's safety net** (e7dab31, 6609054)
Biome now includes `noConvexProcessEnv` and `noConvexQueryFilter`, extending lint coverage for Convex-specific patterns. Both rules add more domain-aware guardrails around environment access and query filtering.

### **Vue semantic model refactors unlock more precise analysis** (3c7e9b5, 4b93949)
The Vue semantic layer was reworked to look up model references, elements, and attributes by syntax node rather than older lookup paths. That should make the Vue-related linters more robust and easier to maintain, while reducing duplicated model state.

### **CLI traversal is faster and processes files earlier** (c8e0488)
Biome's file crawler now evaluates and handles files during traversal instead of doing extra passes, and it skips redundant ancestor ignore checks. The change is aimed at measurable speedups for `biome check`, `biome lint`, and `biome format`, with the changelog claiming roughly 14%–18% improvement.

### **Formatter and core internals get performance work** (a98859c, 7d6800e)
A formatter rewrite around syntax kinds and a memory reduction pass in workspace handling both landed today. Together they point to faster formatting and lower workspace memory use, though the exact user-visible gains depend on repository size and workload.

### Other misc changes
- Scanner dependency fix in core workspace/server code (c199c75)
- Docs tightened for `noConvexTopOfHourCrons` (0fe67ff)
- Minor skill/docs wording update for rule development (3b85b30)
- Lockfile/config tweak for `mimalloc` (bdb0e21)
- Warning cleanup and small test/Cargo maintenance (7012853)
