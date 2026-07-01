---
date: 2026-06-30
repo: leanprover/lean4
size: M
title: "Lean adds core Dynlib APIs and list lemmas"
excerpt: "Lake gains richer shared-library metadata and preloading support, while List.Perm picks up two useful nodup lemmas and CI gets adaptation fixes."
commits: 7
authors: [Garmelon, tydeu, kim-em, joneugster]
commit_authors: {"28b99ec": tydeu, "5fd17df": tydeu, "f73fc3a": kim-em, "d910a95": kim-em}
---

### **Lake models core shared libraries as Dynlib sets** (28b99ec)
Lake now exposes the full set of Lean core shared libraries, not just a single path, and distinguishes the primary `libleanshared` from the supporting split libs. This matters for platforms where the shared libraries depend on each other differently, especially Windows, and should make installation metadata and downstream tooling more accurate.

### **Lake can track runtime-only dynamic dependencies** (5fd17df)
`Dynlib` gains a `runtimeOnlyDeps` field, and Lake’s module build logic now walks those dependencies when preparing precompiled elaboration. This is important for libraries that are loaded at runtime via `dlopen` but should not be linked directly.

### **Two new `List.Perm` lemmas for nodup lists** (f73fc3a, d910a95)
Lean adds `List.Nodup.length_le_of_subset` and `List.perm_ext_iff_of_nodup`, filling useful gaps in the core list permutation API. Both are especially handy for reasoning about duplicate-free lists without depending on Batteries.

### **Other misc changes**
- CI/adaptation workflow fixes and option updates (2 commits)
- Docstring cleanup for several core declarations (1 commit)
