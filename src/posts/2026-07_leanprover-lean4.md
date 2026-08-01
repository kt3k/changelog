---
date: 2026-07-31
repo: leanprover/lean4
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "Lean 4 sharpens verification, tactics, and kernel safety"
excerpt: "July brought major vcgen/grounding work, faster grind/cbv paths, and several kernel soundness fixes."
commits: 303
---

### Verification and intrinsic `do` syntax got much stronger
**VCGen grew into a more expressive verification engine** — Support landed for conjunctive specs, arbitrary term arguments in `vcgen [...]`, RHS `∀`/`→` splitting, `iInf`, `assert` in `do`, binder-style `requires`/`invariant`, and a dedicated `spec` block in `where finally`. Frame inference was also overhauled toward `@[frameproc]`-driven residual obligations, including support for separation-style operators and footprint-based inference.

**Loop and contract verification became more practical** — `for` invariants were simplified, `def` contracts were renamed from `require` to `requires`, and `vcgen` fixes made recursive specs, deep-embedded programs, and `match h : e` cases behave more reliably. The result is a broader, less brittle intrinsic-verification pipeline.

### `grind`, `sym`, and `bv_decide` saw major solver work
**`grind` expanded from a bitvector tool into a more general automation layer** — The month added `@[grind homo]` / `homo_pred` support, a full core homomorphism library for `BitVec`, `Fin`, `Nat`, `Int`, `USize`/`ISize`, and `List`, plus better handling of BitVec/Fin literals, ring/LIA improvements, and several proof-construction fixes. It also gained safer match-condition handling, better canonicalization, and new configuration knobs like `liaSteps`.

**`sym` became more usable and safer** — The symbolic solver gained `rw`, `case` selection, better unification for offsets and universes, hygienic intro behavior, improved `shareCommon` invariants, and fixes for unresolved instance metavariables and zeta-reduced RHS `let`s. `finish?` replay in symbolic mode was also corrected.

**`bv_decide` and related bitvector normalization were heavily refactored** — Bitvector reasoning was reworked around `IntToBitVec`/`USize`/`ISize`, with new normalization lemmas, better literal canonicalization, and fixes for structures, literals, and `bitVecOfNat := false` cases.

### Kernel and elaborator safety were tightened
**Several soundness bugs were closed** — The kernel now rejects opaque values with free variables, nested inductive parameters are checked more carefully, mutual blocks must share universe parameters, `Prop`-like universes are normalized consistently, and nested inductive declarations are revalidated after elimination. `partial` export stubs also remain unsafe, closing a module-system loophole.

**Elaboration got more deterministic** — `maxRecDepth` now governs recursion failure, `decide` preserves original kernel errors better, `instantiateMVars` was optimized to avoid exponential substitution blowups, and `cbv` was reworked: it dropped unsafe/unstable target handling for a while, then regained safe `at` support at the end of the month.

### Lake, HTTP, and runtime/tooling improvements
**Lake became more robust and better packaged** — Config recovery now tolerates interrupted or unparsable traces, `lake init` avoids generating the wrong template files, module facets were expanded (`presetup`, `depTrace`, `depHash`), SONAMEs were added on Linux, and executable restore/linking behavior was improved across platforms.

**HTTP and async infrastructure matured** — Redirect handling became first-class, replayable bodies were added, bodyless responses and terminal stream errors are now handled correctly, and async selection was reworked for lower overhead and better cleanup.

**Runtime/build behavior was hardened** — Lean now reports OS errors on thread startup failure, respects configured stack size on main execution paths, supports TSan presets/jobs, and fixes initialization for private `Lean` imports and `lean_initialize` idempotency.

### Other misc changes
**Linting, docs, and editor plumbing** — New stateful linters, core-internal namespace linting, unused-variable hints, better deprecated-module warnings, code-action plumbing, and several InfoTree/scoped-context fixes landed. There were also many docstring, namespace, bootstrap, benchmark, and test updates across the tree.
