---
date: 2026-06-21
repo: leanprover/lean4
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Lean 4 sharpens do-notation verification and float semantics"
excerpt: "Major VCGen and `mvcgen` improvements, native float models, safer task/runtime handling, and a few Lake/CI fixes."
commits: 59
---

### Verification and do-notation got a big upgrade
**Weakest-precondition reasoning was generalized** — `WP` is no longer tied to `WPMonad`, so `mvcgen'` can reason about arbitrary program types and deeper embeddings.
**`mvcgen` became more robust and more capable** — match splitting now handles dependent discriminant telescopes, dependent assertion lattices fail cleanly, and `@[spec]` handling was unified, priority-aware, and better at finding reducible-abbreviation specs.
**New spec/support lemmas landed** — `Spec.monadLift_Id`, `Std.Do.Triple.observe`, and the `Triple`/`@[spec]` elaboration refactor fill important gaps for `Id` lifts, partial-correctness bridging, and program-first verification workflows.
**Loop-invariant ergonomics improved** — the invariant API was renamed and abstracted (`WhileInvariant` → `RepeatInvariant`) with a simpler shorthand for repeat/while-style proofs.

### Floats are now backed by logical models
**`Float` and `Float32` gained core logical models** — Lean now models floating-point operations in logic via `Float.Model`/`Float32.Model`, while preserving the fast native runtime path.
**`Float.ofScientific` was rewritten and validated** — the new implementation was reworked against the model side and checked against millions of parsing cases.

### Core tactics and arithmetic became more usable
**`lia` got a dedicated attribute** — the tactic now uses a smaller `@[lia]` lemma set instead of the broader `@[grind]` pool, and `min`/`max` facts are tagged so common goals solve automatically.
**`wait_for_expected_type%` was added** — elaboration can now wait for the expected type to resolve before elaborating expressions, which helps with `outParam`-driven notations.
**`Nat.sqrt` moved into core** — integer square root is now available in `Init` with a small theory file, removing a common Batteries dependency.

### Runtime, compiler, and task handling were hardened
**Task handling became thread-safe** — cancellation and task state access now use atomics, fixing race-prone runtime code.
**Object compaction was rewritten** — the compactor now uses direct recursion, which should improve snapshot and `.olean` serialization behavior.
**Transparency semantics changed** — `instances` and `implicit` transparency are now split, so `@[implicit_reducible]` no longer has typeclass-search side effects.
**Derived `Inhabited` became safer** — generated defaults are now compiled consistently, avoiding a panic in `noncomputable section`s.

### Lake and test infrastructure saw targeted fixes
**Lake cache and package metadata were cleaned up** — cache transfers now deduplicate identical artifacts, `remoteUrl?` reports the right value, and module-system policy can be declared with `requiresModuleSystem` / `allowNonModules`.
**Test runs got faster and more reliable** — header snapshots are reused for common elab tests, and test discovery now ignores stray `_tmp_*` files.
**CI and bootstrap churn was trimmed** — assorted runner, release, and stage0 refreshes landed alongside minor tooling fixes.

### Other misc changes
- Removed an expired idle-thread experiment and reworked worker management back toward persistent task-pool behavior.
- `IntX.ofIntClamp` now clamps positive overflow to the correct max value.
- `import all` docstring lookup works on the command line.
- Several small doc, benchmark, and portability cleanups.
