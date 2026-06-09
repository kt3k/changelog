---
date: 2026-05-31
repo: leanprover/lean4
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "Lean4 strengthens verification, linting, and runtime safety"
excerpt: "This week added new tactic/combinator power, expanded VCGen and grind support, hardened linting, and introduced stricter build/runtime checks."
commits: 43
---

### Verification and symbolic reasoning got broader
**`mvcgen'` became more capable** — It now picks up local `Triple` specs as subgoals appear, can reduce typeclass-method projections like `Add.add`, and composes better with pre-tactics so goals are rebuilt safely after user rewrites.
**`sym =>` and `dsimp` gained more power** — Symbolic reduction now supports `dsimp`-driven workflows, reusable `SymM` variants, better universe-level solving, and a fix for `match` reduction that could leave projections behind.
**`grind` was tuned to be less noisy and more useful** — E-matching around `getElem?` was made less aggressive, BitVec annotations were trimmed to cut false instantiations, and `sym_apply` picked up fixes for tricky universe equalities.

### Linting and diagnostics were tightened up
**`checkUnivs` and `defLemma` moved into the linter framework** — Universe checking is now a first-class builtin linter, and the old def/lemma checker was renamed to `defProp` with clearer messaging and reusable helpers.
**Builtin lint output became more accurate** — `lake lint --builtin-lint` now respects public module-system imports, groups text linter diagnostics by source module, and `recordLints` no longer over-records unrelated tagged diagnostics.
**Error reporting improved in a few places** — Projection failures now surface private inherited fields more reliably, `instances` transparency failures include the underlying type error, and decimal-literal parsing catches escaped identifiers after a dot.

### Tactics and elaboration picked up user-facing changes
**`impossible` was added as a tactic combinator** — `impossible by t` now provides a direct way to prove uninhabited goals, with `try?` suggestions and optional `+levels` abstraction support.
**`simpa using` got stricter by default** — It now closes goals with reducible transparency, with the previous behavior preserved as `simpa using!` for code that depends on the looser lookup.
**`whileM` specs were strengthened** — The loop infrastructure now supports a cleaner ordered-fixpoint unfolding story and more uniform invariant/termination-measure reasoning for verified `do` code.

### Runtime and build safety got stricter
**Lean now rejects unsafe build configurations earlier** — Builds are refused under HWASAN or ARM MTE on 64-bit targets, and also when `FLT_EVAL_METHOD != 0`, preventing runtime behavior that could break pointer packing or floating-point reproducibility.
**Compacted saves can now serialize closures experimentally** — `CompactedRegion.save` gained an opt-in `allowClosures := true` path with a new v3 `.olean` layout, enabling saved functions to be reloaded and invoked when the executable and libraries match.

### Other misc changes
- Removed a flaky `async_sleep` test and updated stage0 artifacts.
- Several grind, VCGen, and parser test/benchmark updates accompanied the behavior changes.
- Documentation and repo hygiene updates landed, including AI contribution policy notes and small docstring polish.
- The `mvcgen'` spec DB migration was fixed to preserve erased `@[spec]` entries.
- Lean advanced toward v4.32.0 with version-bump prep.
