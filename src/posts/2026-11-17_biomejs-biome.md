---
date: 2026-11-17
repo: biomejs/biome
size: L
title: "Biome adds four new lint rules"
excerpt: "Major lint and type-inference work landed, including new nursery rules and broader narrowing support for TS/Vue/Tailwind."
commits: 15
authors: [ematipico, dyc3, GBra-4-669]
commit_authors: {"8792099": ematipico, "0d70b09": dyc3, "4a21426": dyc3, "dc11dea": dyc3, "37692e2": dyc3, "7c3aa0d": ematipico, "74e546a": dyc3, "069525a": ematipico, "19347d1": ematipico, "7012ad8": ematipico, "65490b4": ematipico, "8e6a1d3": ematipico}
---

### **Added `noUselessBind` to catch pointless `.bind()` calls** (0d70b09)
Biome now flags `.bind()` on functions that don't use `this`, including arrow functions, as a new nursery lint rule. The change also wires the rule into config, diagnostics, and ESLint migration support so it can be enabled and mapped consistently.

### **Added `useConsistentIndexedObjectStyle` for object type syntax consistency** (4a21426)
This new nursery rule prefers `Record<...>` over index signatures and mapped types for object types with arbitrary keys by default. It broadens Biome's style enforcement for TypeScript object shapes and includes migration/configuration plumbing plus extensive coverage.

### **Added `noVueDuplicateVElseIf` to detect dead Vue branches** (dc11dea)
Biome now reports repeated or shadowed `v-else-if` conditions in Vue template chains, including cases covered by earlier conditions. That helps catch branches that can never render, and the implementation extends Vue-specific parsing/condition handling alongside rule registration.

### **Added `noTailwindConflictingClasses` for conflicting utility classes** (37692e2)
A new nursery rule reports Tailwind classes that set the same CSS property on an element, where only one class can actually take effect. This is a practical correctness win for Tailwind-heavy codebases and ships with Tailwind preset/workflow updates plus multi-framework test coverage.

### **Type inference now narrows through aliased and property-based conditions** (069525a, 19347d1, 8792099, 7012ad8, 65490b4, 8e6a1d3)
Biome's narrowing logic was substantially expanded to track aliased conditions, optional-chain receivers, `this` properties, literal element accesses, property paths, and a refactor to identify narrowing subjects by id. This should reduce false negatives in `noUnnecessaryConditions` and other flow-sensitive checks, while the module-graph internals were heavily reworked to support the new behavior.

### **Other misc changes**
- Fixed HTML parser panic on a second CDATA start marker (b359d1)
- Publishing logic now allows recent crate dependencies when releasing (7c3aa0d)
- Dependency/security advisory updates and release version bumps (74e546a, 7f8b14b, 2ada236)
