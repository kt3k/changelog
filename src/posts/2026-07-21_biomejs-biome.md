---
date: 2026-07-21
repo: biomejs/biome
size: M
title: "React hook lint and type inference sharpened"
excerpt: "Biome fixed a forwardRef hook false positive and refactored type inference and return-type linting for safer partial-type handling."
commits: 6
authors: [ematipico, BTF-Kabir-2020]
commit_authors: {"c9acb25": BTF-Kabir-2020, "de8c2af": ematipico, "9cb044c": ematipico}
---

### **Fix forwardRef named components in hook lint** (c9acb25)
`useHookAtTopLevel` now recognizes named `forwardRef` components that take a `ref` parameter, avoiding false positives on valid hook usage. The React component detection logic was expanded to distinguish wrapped components from ordinary one-parameter functions.

### **Refactor return-type lint to avoid partial-type false positives** (9cb044c)
`noMisleadingReturnType` was split to use dedicated analysis code and now suppresses diagnostics when return-type comparison, normalization, substitution, or generic constraint handling cannot complete. This makes the rule less eager and avoids suggesting misleading fixes from incomplete type information.

### **Separate raw type collection in inference** (de8c2af)
The type-inference pipeline now separates raw type collection from later resolution, with new helpers around global type IDs and raw-type collection interfaces. This is a sizeable internal refactor that should make inference code easier to evolve and reason about.

### Other misc changes
- Release metadata cleanup from the CI release run
- Dependency bumps: anyhow, @changesets/cli
