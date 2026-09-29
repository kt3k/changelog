---
date: 2026-09-28
repo: biomejs/biome
size: L
title: "Biome ships SCSS support and type fixes"
excerpt: "Major TypeScript inference repair plus multiple SCSS parser/formatter features and a couple of CLI hardening fixes."
commits: 29
authors: [dyc3, ematipico, AlbinoGeek, Netail, denbezrukov]
commit_authors: {"f89dd4f": dyc3, "119da3f": ematipico, "4e74009": ematipico, "8e394ea": ematipico, "58579c6": ematipico, "fa1e420": ematipico, "089bde0": dyc3, "71e6da7": dyc3, "8be0b9e": dyc3, "0015681": dyc3, "db2f714": denbezrukov}
---

### **Type inference now preserves generic bindings** (f89dd4f)
Biome fixed a correctness bug where generic parameters could be lost during member lookup, especially across inherited or recursive types. This should eliminate false positives in conditions that depend on the inferred generic value.

### **SCSS interpolation lands in more places** (fa1e420, 58579c6, 8e394ea, 119da3f)
Interpolation is now supported in SCSS containers, layers, property names, and `attr()` names. These changes expand both parsing and formatting coverage for modern SCSS syntax, reducing parse errors and preserving valid source more reliably.

### **SCSS declaration blocks and query values are more complete** (4e74009, db2f714)
The parser/formatter now accepts nested declarations in keyframe-like blocks and handles unary expressions in media/container query values. That improves parity with real-world SCSS and fixes formatting/recovery for a broader set of at-rules.

### **Biome adds a new `useStrictBooleanExpressions` lint rule** (089bde0)
A new JavaScript lint rule was added along with config, migration, and diagnostics plumbing. It broadens Biome’s correctness checks by flagging loose boolean usage patterns.

### **CLI output and daemon handling are hardened** (8be0b9e, 0015681)
Biome now avoids crashing on broken pipes, and its Unix daemon socket is restricted to the current user. That makes the CLI safer in pipelines and closes off unintended cross-user socket access.

### **Type info/codegen refactor improves generated global handling** (71e6da7)
The type-info generation path was reworked to remove hard-coded lowering references and improve how generated globals are represented. This is a substantial internal refactor that underpins the type-system changes above.

### Other misc changes
- Broken CI fix in type coercion handling
- Minor lint fixes and rule adjustments
- Dependency bumps and workflow updates
- Added benchmark fixtures for type-inference stress testing
- Package lockfile and renovate-generated updates
