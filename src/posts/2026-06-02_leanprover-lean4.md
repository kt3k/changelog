---
date: 2026-06-02
repo: leanprover/lean4
size: L
title: "DSimp gets ground evaluation; compiler and tactics tighten"
excerpt: "Lean4 adds ground-term evaluation for `Sym.dsimp`, fixes `rcases` info, and hardens the compiler and codegen against edge cases."
commits: 8
authors: [Kha, leodemoura, Garmelon, berberman, hargoniX, tydeu]
commit_authors: {"7490891": leodemoura, "9987781": hargoniX, "d07c9fa": Garmelon, "79aaa74": berberman, "03aeb71": Kha, "d547ba7": Kha, "50e882b": tydeu}
---

### **`Sym.dsimp` can now evaluate ground terms** (7490891)
Lean’s `Sym.dsimp` simplifier now has an `evalGround` post-simproc for builtin numeric and bitvector-like terms, so ground expressions can reduce directly instead of relying on slower generic simp machinery. This should improve both coverage and performance for simplification-heavy tactic workflows.

### **Compiler now persists inductive info up front** (03aeb71)
The LCNF compiler moves trivial-structure/inductive metadata from lazy caches to eager environment extensions, and `compileDecls` now precomputes inductive info before compiling those modules. This is a meaningful compiler refactor that prepares Lean to handle public types with private constructors more reliably and avoids dangling references in later stages.

### **Code generator no longer panics on noncomputable recursive defs** (d547ba7)
`checkComputable` now also checks the `_unsafe_rec` auxiliary for recursive definitions, which means noncomputability is detected even when the user-facing declaration looks computable. That turns a compiler panic into a clean error in mixed computable/noncomputable contexts, while still accepting fully noncomputable sections.

### **`rcases` records substituted expressions before InfoView metadata** (79aaa74)
The tactic now applies fvar substitution earlier when recording term/local-var info, fixing stale free-variable references that caused InfoView errors like “unknown free variable” inside patterns. This is a user-visible tooling fix for `rcases`, `rintro`, and related pattern tactics.

### **Runtime shared-value tracing now covers all non-linear cases** (9987781)
`dbgTraceIfShared` now prints its message whenever an object is non-exclusive, not just when reference count is greater than one. That aligns the debug trace with Lean’s broader notion of non-linearity and makes the runtime diagnostic more accurate.

### **Lake version parsing gives better errors** (50e882b)
Lake’s version/comparator parser now reports clearer syntax errors when users omit the `git` keyword or otherwise provide incomplete version comparisons, and the `require` docstring now documents the `git` form. This is a small but practical UX improvement for dependency management.

### Other misc changes
- Release script fixes and downstream repo updates (d07c9fa)
- Stage0 refresh (5fc7470)
