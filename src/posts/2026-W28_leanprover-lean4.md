---
date: 2026-07-12
repo: leanprover/lean4
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "Lean 4 sharpens grind, fixes bitvectors, and tightens APIs"
excerpt: "A week of solver and elaboration improvements, with key grind fixes, stricter kernel behavior, better IDE/lint UX, and Lake init changes."
commits: 76
---

### **`grind` got faster and more correct across arithmetic, bitvectors, and divisibility**
The week’s biggest theme was solver hardening. `grind` picked up several fast paths and cache-friendly optimizations for instance construction and equation-lemma lookup, plus a pointer-equality shortcut in symbolic matching. More importantly, correctness fixes landed for zero-divisibility constraints and bitvector literals: `0 ∣ p` now normalizes to `p = 0`, and `BitVec` literals are canonicalized consistently so proofs don’t get rejected or loop.

### **Symbolic mode is becoming a more capable proof workflow**
`sym =>` now supports `rw` on the goal, with conditional rewrite premises split into subgoals automatically, and `finish?` now emits replayable preprocessing steps in symbolic mode. Under the hood, `shareCommon` and related sym machinery were adjusted to preserve `SymM` invariants, and `int_toBitVec` was split into separate SymM/MetaM APIs to support the new workflow.

### **Kernel and elaboration behavior became stricter and more predictable**
The kernel’s recursion failure now follows `maxRecDepth` instead of native stack size, making deep-recursion errors deterministic and configurable. Lean also tightened metavariable assignment by enabling stricter transparency checks by default, improved diagnostic fallback in `decide`, and made `partial_fixpoint` report nested recursion errors more cleanly. In `do`-notation, bare `return` now works in dependent `match` branches.

### **Editor, lint, and replay UX improved**
The language server regained go-to-definition and references for `mut` variables threaded through `for` loops. Tactic replay is now less fragile when only trailing whitespace changes, and lints got more actionable hints: unused variables suggest `_` prefixing, and unused `simp` args render cleaner edits. A new lint also warns about ambiguous `open` statements inside namespaces.

### **Lake and runtime/tooling got safer and more convenient**
`lake init`/`lake new` now avoid generating or overwriting library files for `exe` templates, and Lake gained new dependency-trace facets plus a convenience API for locating the shared dynamic library. Lean’s runtime stack handling was also fixed so the configured stack applies consistently to `--run` and serialization paths, reducing crash risk in stack-hungry code.

### **Other misc changes**
- VC generation became more robust against metadata-wrapped terms.
- `vcgen`/`grind` benchmark coverage was expanded with a Verina corpus suite.
- Several public API and namespace cleanups landed, along with deprecation tightening and doc/test fixes.
- CI/build plumbing saw multiple updates, including bootstrap/stage0 churn and test harness tweaks.
