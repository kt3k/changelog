---
date: 2026-08-01
repo: biomejs/biome
size: L
title: "Big CSS and linting push"
excerpt: "Biome adds CSS property syntax support, a new nursery lint, and several performance and correctness fixes across JS and module graph analysis."
commits: 11
authors: [ematipico, dyc3, saberoueslati, minseong0324, AkashNaickar]
commit_authors: {"26c23d9": saberoueslati, "550b22d": ematipico, "217f8ad": dyc3, "c4fc6a9": dyc3, "4d3ff76": ematipico, "6ee17ea": dyc3, "45919cd": ematipico, "e63354c": AkashNaickar, "4c20298": ematipico}
---

### **CSS property codec and semantic model land** (4c20298, 45919cd, 550b22d)
Biome added first-class support for CSS registered custom properties: a new `biome_property_codec` crate, a CSS property semantic model, and module-graph traversal to surface `@property` definitions and property references. This is foundational work that enables richer CSS analysis and fixes incomplete-value crashes while editing CSS property syntax.

### **New nursery rule: noExtendNative** (e63354c)
A new lint now reports classes extending built-in prototypes like `Object` or `Array`, which can create global side effects and compatibility bugs. The change also wires the rule into config, diagnostics metadata, ESLint migration, and the public schema.

### **noFloatingPromises gets a union/optional fix** (26c23d9)
`noFloatingPromises` no longer flags already-awaited optional promise values incorrectly. The fix tightens promise inference around instance wrappers and unions, reducing false positives in async-heavy code.

### **Module graph now tracks CSS properties and cleaner CSS imports** (550b22d)
CSS module traversal was expanded beyond classes to follow property-related information through the graph, and CSS imports were reworked to preserve duplicate occurrences by source range. This improves correctness for downstream consumers that need precise CSS dependency and symbol visibility data.

### **Deprecated ambient imports are detected** (4d3ff76)
`noDeprecatedImports` now catches deprecated ambient declarations that are exported separately, closing a gap in import deprecation checks. That makes the rule more reliable for TypeScript codebases that re-export ambient symbols.

### **Profiling and console printing get faster** (c4fc6a9, 6ee17ea, 217f8ad)
Rule profiling now uses thread-local collectors and merges at the end to reduce contention in multi-threaded runs, while console output batches writes instead of emitting one character at a time. `noFloatingPromises` also short-circuits assignment handling to avoid unnecessary work.

### Other misc changes
- RegExp global type generation migrated in xtask/codegen (1 commit)
- Benchmark workflow updated to cover console benchmarks (1 commit)
- Minor profiler/config wiring and test snapshot updates (2 commits)
