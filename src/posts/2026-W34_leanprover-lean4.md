---
date: 2026-08-23
repo: leanprover/lean4
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Lean hardens core safety while VCGen and Lake mature"
excerpt: "Kernel and runtime safety fixes landed alongside a Bool-backed Decidable redesign, plus major VCGen, contract, and Lake workflow improvements."
commits: 70
---

### Safety and kernel correctness took center stage
**Order-independent definitional equality caching** and a corrected `is_prop` check removed two kernel soundness hazards, while synthesized recursors are now type-checked before acceptance.

**Runtime and input hardening** added protection against oversized Nat numerals and reference-count overflow/underflow, and Lean now requires GMP 6.3.0 by default to avoid known unsound corner cases.

### Core proof and reduction infrastructure was reshaped
**`Decidable` is now Bool-backed**, giving Lean more definitional equalities and forcing broad follow-up updates across tactics, compiler internals, and tests.

**`sym =>` and `Sym.simp` got more capable**: the new `let_to_have` mode preserves definitional equality for nondependent lets, can unfold definitions passed as parameters, and now handles goal-closing preprocessing more robustly.

**Literal and boolean normalization improved** in `grind` and `Init`, including consistent numeric canonicalization for wrapped integers and kernel-efficient `Bool` operations.

### VCGen and intrinsic verification saw a major cleanup
**Contracts became more expressive and consistent** with `given` clauses for `def` contracts, `ensures`/loop annotations elaborating like function telescopes, and clearer binder naming throughout generated VCs.

**The VCGen protocol was reworked** around two-phase framing, better handling of closed goals, registered `WP` instances, and frame-clause backtracking; meanwhile the older binder-style triple notation was removed in favor of explicit `fun` forms.

**Loop and exception specs were simplified** by switching invariants to a boolean exit flag and replacing bespoke exception-postcondition stacks with ordinary products.

**`mvcgen` is now on the way out**, deprecated in favor of `vcgen`, with experimental opt-in controls and clearer warnings around invariant suggestions.

### Lake and build tooling got sturdier
**Dependency fetching moved to partial clones**, reducing download size and reusing repositories more effectively across URL changes.

**Build reliability improved** with atomic C file writes, fail-fast `lake build` mode, and better tracking of overridden Lean headers so bootstrap rebuilds trigger correctly.

### Other misc changes
- `constructor` now warns on ambiguous matches, with `constructor!` preserving old behavior.
- `lake lint --code-quality` can run package-level checks and emit JSON results.
- Structure/class fields now carry better terminfo for hovers and field lookup.
- Release tooling, deprecations, docs, tests, and Stage0 maintenance were updated throughout the week.
