---
date: 2026-08-16
repo: leanprover/lean4
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Lean4 ships faster proofs, safer kernel checks, and VCGen refactors"
excerpt: "This week improved grind/vcgen performance, tightened kernel and instance search soundness, and added richer loop verification support."
commits: 59
---

### Verification tooling gets a major upgrade
**Loop contracts in `do` code**: `repeat`, `while`, and `for` now accept `invariant` and `decreasing` clauses, and `vcgen`/`mvcgen` split `cond` into per-branch VCs. This makes intrinsic verification much smoother and reduces manual proof plumbing.

**`vcgen` becomes a more general, better-documented API**: the tactic moved into `Lean.Elab.Tactic.VCGen`, gained a real docstring, and the weakest-precondition infrastructure was split into generic and monadic layers. The order/frame-closure machinery also moved out of `Do`, setting up the verification stack for non-monadic program types.

**`vcgen` and `grind` handle harder specs more robustly**: continuation-variable specs, schematic postconditions, and parallel elaboration for `@[spec]` all got fixes or speedups. `grind` also learned loop-measure reasoning, iterator invariants, and homomorphism-based simplification sets for arithmetic/bitvector-heavy proofs.

### Solver and preprocessing performance improved
**`grind` case splits are much faster**: `cases`, `cases?`, and `cases_next` now drain raw facts before splitting, avoiding repeated preprocessing across subgoals and fixing the no-split behavior of `cases_next`.

**Bitvector workflows got faster and more incremental**: `bv_decide` now uses a better AIG-to-CNF encoding for ITE/XOR/XNOR patterns, can reuse preprocessing via `bv_decide_push`, and backs off more responsively while polling SAT. The incremental preprocessing changes also align `bv_decide` with the updated grind pipeline.

**`grind` preprocessing and diagnostics improved**: `lift_lets` flattens target-side lets/haves, e-matching cost diagnostics can now explain blowups, and nested-subsingleton marking was tightened to avoid unnecessary work.

### Kernel, elaboration, and runtime soundness fixes
**Stricter kernel and instance-search checks**: inductive declarations are now rejected when recursive occurrences are non-uniform, and instance search now verifies metavariable assignments against the expected type, which is a breaking but safer change.

**Definitional equality and kernel timeouts were improved**: Lean now defers certain stuck exceptions more intelligently during `isDefEqApp`, and `Grind.nestedDecidable` became an abbreviation to avoid kernel timeout issues in generated proof terms.

**Mutable state and runtime bugs were fixed**: `ST.Ref` was tightened into a real take/put protocol to close remaining soundness holes, the IR interpreter fixed a borrowed-scalar leak, and `String.extract`/`String.Pos.Raw.extract` were split into safe and fast paths to remove a runtime/model mismatch.

### Lake and core library updates
**Lake cache and macOS builds got cleaner semantics**: cache commands are now package-aware, `put-staged` replaces a legacy `--rev` flow, and macOS deployment targets are threaded through build/link logic for more reproducible outputs.

**Core lemmas and metadata were polished**: `Nat.div_lt_div_right` was generalized, deprecation warnings now distinguish type-changing aliases, `Expr.getUsedConstants` includes projection type names, and iterator support was extended to tree-map iterators.

### Other misc changes
- CI/build and release-script tweaks, including cache-upload handling and fsanitize exclusions.
- Diagnostic typo fixes across compiler/elaborator/linter/widget messages.
- Smaller lemma, doc, and test cleanups across `Init`, `Std`, and `grind`.
