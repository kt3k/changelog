---
date: 2026-09-10
repo: leanprover/lean4
size: L
title: "Release toolchains get new bundled checkers"
excerpt: "Lean 4 bundles nanoda and lean4lean, broadens kernel-reduction support for arrays/vectors, and fixes a goal-view regression plus arity reduction."
commits: 13
authors: [kim-em, Kha, Garmelon, hargoniX, joehendrix]
commit_authors: {"5973177": kim-em, "53823a4": Kha, "1116ca0": hargoniX, "a5886a0": Kha, "645266e": Kha, "843c831": Kha, "587587f": kim-em, "682d26a": kim-em, "575c844": kim-em}
---

### **Release toolchains now bundle nanoda and lean4lean** (53823a4, a5886a0)
Lean release toolchains now ship both external checkers, so users can run them without separate installs. The build and CI pipelines were extended to compile and install each checker, and the new package tests verify they work from the toolchain-provided `bin/` directory.

### **Compiler reduce-arity can now eliminate every unused parameter** (1116ca0)
`ReduceArity` now handles functions whose parameters are all unused by introducing a dummy `void` argument instead of turning the declaration into a constant. That avoids accidentally exposing unreachable code while still letting the compiler shrink arity aggressively when nothing is actually needed.

### **Kernel reduction crosses module boundaries for Array equality** (575c844)
`Array` equality is now exposed so `decide` and `rfl` can reduce nonempty array comparisons across module boundaries. This closes a long-standing gap where downstream code could not fully normalize `Array.instDecidableEq` without inlining internals.

### **Kernel reduction crosses module boundaries for Array.map, modify, and zipWith** (682d26a, 587587f, 5973177)
Several array operations were marked `@[expose]` so their reference implementations remain reducible outside the defining module. That makes `Array.map`, `Array.modify`/`modifyM`, and `Array.zipWith` usable in downstream kernel proofs, with matching `Vector` coverage where appropriate.

### **Nested tactic blocks keep their trailing whitespace in the info tree** (843c831)
A goal-view regression was fixed where the line after a nested `have ... := by` block or bullet could show the enclosing tactic state instead of the nested block's goal. The info-tree logic now preserves the correct trailing whitespace for nested nodes, which keeps interactive goals aligned with where the user is actually typing.

### **Mimalloc was bumped to 3.4.5** (645266e)
This updates the memory allocator version to pick up a Windows leak fix. It’s a targeted runtime bug fix, not a broader allocator change.

### Other misc changes
- Bundled release-toolchain plumbing for `nanoda` and `lean4lean` in CMake and CI.
- Switched a build script to use `${CMAKE_COMMAND}` instead of bare `cmake`.
- Various test additions/updates for array, vector, and interactive server regressions.
- Removed obsolete mathlib PR-testing workflow plumbing.
