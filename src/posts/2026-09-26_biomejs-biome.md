---
date: 2026-09-26
repo: biomejs/biome
size: M
title: "Module graph benchmarks and loop analysis fix"
excerpt: "Added complex module graph type-inference benchmarks and fixed control-flow analysis for truthy infinite loops."
commits: 2
authors: [dyc3]
commit_authors: {"a62070a": dyc3, "088164f": dyc3}
---

### **Truthy literal loops are now treated as infinite** (088164f)
The `noUnreachable` and `useGetterReturn` analyses now recognize `while` and `do...while` loops with truthy literal conditions as infinite unless the loop body exits. This fixes missed diagnostics around cases like `while (1) {}` and `do {} while ("yes")`, improving correctness in control-flow-based linting.

### **Added complex type-inference benchmarks for module graph** (a62070a)
New benchmark fixtures exercise real-world, deeply nested type inference scenarios for Drizzle, TypeBox, Svelte/Valibot, Zod/TanStack Form, and a type-challenges parser. These workloads help track module-graph inference performance on large declaration-heavy codepaths and make regressions easier to spot.

### Other misc changes
- Added benchmark fixture READMEs, vendored declaration files, and regeneration scripts
- Expanded lint rule tests and snapshots for infinite-loop and getter-return cases
- New changeset for the linting fix
