---
date: 2026-08-02
repo: leanprover/lean4
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Lean hardens the kernel while expanding verification syntax"
excerpt: "A week of major verification upgrades, several soundness fixes, and sharper tooling across cbv, lake, and linting."
commits: 55
---

### Verification language gets much richer
**Intrinsic verification for `do` loops and `def` contracts** grew substantially: Lean added loop invariants, `assert` in `do` blocks, binders for `requires`/`invariant`, and `where finally | spec` blocks to finish residual VCs. The contract syntax was also renamed from `require` to `requires`, making the whole story more expressive and closer to `ensures`-style proof workflows.

**VCGen and framing were reworked** around footprint-based inference, with `@[frameproc]` procedures able to discharge split VCs themselves. Loop invariants were simplified to prefix/suffix semantics, and frame inference got a performance pass to keep the new machinery practical.

### Kernel and soundness hardening
**Multiple kernel invariants were tightened** across nested inductives, mutual blocks, projections, binders, quotients, and `Prop` detection. The week fixed acceptance bugs around ill-typed nested parameters, mismatched universe parameters, unsafe assumptions in kernel paths, and cases where `Prop`-like sorts were not recognized correctly.

**Unsafe export and meta-programming holes were closed** by keeping `partial` export stubs marked unsafe, rejecting references to `_nested` auxiliaries, and making several formerly-asserted invariants fail explicitly with kernel errors. These changes collectively reduce the chance of silent unsoundness or hard-to-debug crashes.

### Tactics and normalization improve
**`cbv` was both broadened and restricted**: it now again supports `at` locations safely, including hypothesis/goal reductions, after a brief removal of the old inconsistent form; at the same time, the incompatible `cbv at ...` implementation was cleaned up. `cbv` also gained better support for stacked dependent projections.

**`grind` got more robust literal handling** for bit-vectors and `Fin`, preventing malformed pattern forms from violating E-graph invariants and crashing on quantified goals.

### Tooling, lake, and editor polish
**Linter code actions can now flow through async info trees**, enabling actionable fixes in editor integrations rather than diagnostics alone. A new code-quality benchmark frontend also landed as groundwork for future lint automation.

**Lake’s UX and cache handling were tightened**: `lake update` now rejects unknown package names, error reporting is cleaner when Lean already emitted diagnostics, cache transfers handle curl/IO failures more safely, and missing library-root files now surface directly.

### Performance and misc changes
**Parser and build performance saw targeted improvements** via faster parser-cache comparisons and clearer benchmarking around HTTP/server and VCGen paths. Smaller changes included more precise deprecated-import warnings, suppression of redundant deprecated-syntax warnings inside deprecated defs, and a cleanup removing the old `toCtorIdx` alias.

### Other misc changes
- Reenabled and cleaned up the `since`-field check for deprecated attributes after bootstrapping changes.
- Added/updated regression tests across contracts, cbv, nested inductives, lake update failures, projection comparisons, and HTTP cache paths.
- Minor CMake, build-trace, and docstring cleanup.
