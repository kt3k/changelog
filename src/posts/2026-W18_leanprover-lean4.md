---
date: 2026-05-03
repo: leanprover/lean4
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: L
title: "Lean4 fixes docs, instances, Lake builds, and grind"
excerpt: "This week tightened docstring error reporting, instance visibility, Lake module setup ordering, and several grind correctness issues."
commits: 16
---

### **Better correctness and diagnostics across elaboration**
Lean now catches leaked metavariables from Verso and module docstrings before rolling back state, so docstring failures are reported earlier and more consistently. Tactic diagnostics also got sharper: goals are now checked at `.instances` transparency to explain failures that only appear after unfolding, and public elaboration no longer lets privately imported default instances leak into exported signatures.

### **Lake module setup and artifact handling are more reliable**
Lake’s build pipeline now waits for `extraDep` targets before header processing, ensuring dependency-driven setup changes are respected instead of racing ahead. It also includes transitive `meta import` artifacts in setup data, fixing missing `.ir` files and the resulting cache/setup errors.

### **`grind` got a broad round of soundness and stability fixes**
Several `grind` paths were tightened: derived tactics like `lia`, `linarith`, `cutsat`, `order`, and `ring` now stop enabling model-based theory combination by default, avoiding slow or timeout-prone behavior; internalization and propagation were reordered to prevent cast/heq errors; and congruence, injectivity, projection, and AC invariant handling all received fixes to eliminate stale-table, proof-shape, and invariant-checking failures. Instance wrapping and `SymM` universe matching also became more robust in the process.

### Other misc changes
- Additional regression tests for docstring metavars, Lake setup, and `grind`
- Minor documentation and internal refactors
- One flaky interactive server test was disabled
