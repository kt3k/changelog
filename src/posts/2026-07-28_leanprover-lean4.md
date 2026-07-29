---
date: 2026-07-28
repo: leanprover/lean4
size: L
title: "Kernel fix, cbv upgrade, and CI guardrails"
excerpt: "Lean4 patches a kernel soundness bug, teaches cbv stacked dependent projections, silences deprecated-syntax noise, and hardens rebootstrap CI."
commits: 5
authors: [wkrozowski, leodemoura, tydeu]
commit_authors: {"a39eab6": leodemoura, "b1722ad": wkrozowski, "dfeeb61": wkrozowski, "7f7ecd7": wkrozowski, "aa89d27": tydeu}
---

### **Kernel now type-checks nested inductive parameters** (a39eab6)
Lean now validates the parametric arguments of nested inductive applications after the inductives are available, closing a soundness hole where ill-typed nested parameters could slip past kernel checking. This fixes a real acceptance bug for nested inductives and includes regression tests for the malformed declaration.

### **cbv can reduce stacked dependent projections in one go** (b1722ad)
`cbv` now handles projection spines where the composite projection is non-dependent even if the intermediate steps are dependent. That lets reductions succeed on cases that previously got stuck, improving normalization for nested projections and dependent record access.

### **Deprecated syntax warnings are suppressed inside deprecated defs** (7f7ecd7)
Lean now avoids emitting deprecated-syntax warnings from within definitions that are themselves marked `@[deprecated]`, matching the existing suppression behavior for deprecated constants. This reduces noisy warnings while preserving them for fresh code.

### **CI rebootstrap exits early when stage0 is unchanged** (aa89d27)
The rebootstrap workflow now skips the expensive rebuild when `update-stage0` produces no stage0 tree ცვლილation, avoiding stale-olean failures triggered by empty commits that only change `Lean.githash`. It also propagates the rebuilt stage0 hash into the test environment so stage1 tests use the right `LEAN_GITHASH`.

### Other misc changes
- Added basic code-quality linter infrastructure data types and exports (dfeeb61)
- Minor CMake comment fix (aa89d27)
- cbv/deprecated-syntax regression test updates (2 commits)
