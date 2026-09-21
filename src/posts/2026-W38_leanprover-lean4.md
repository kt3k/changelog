---
date: 2026-09-20
repo: leanprover/lean4
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "Lean4 ships verifier extensions and major performance wins"
excerpt: "This week adds exception-aware specs, new float and modular arithmetic primitives, Lake tooling upgrades, and several elaboration/compiler speedups."
commits: 57
---

### Verification and spec language gains
**Exception-aware weakest preconditions and contracts** — `Std.WP` framing now preserves exceptional postconditions too, and `def` contracts can spell this out with new `throws e => R` clauses. The WP API also saw a naming cleanup (`EPosts`, `WP.trans`, `wp_monotone`), with deprecated aliases kept for compatibility.

### Performance work across elaboration, recursion, and replay
**Several quadratic-ish paths were tightened** — Lean now avoids unnecessary type checks in closure construction, uses persistent arrays for per-command frontend state, and replays environment extensions proportionally to new entries instead of whole-map size. Structural recursion elaboration also skips redundant checks when tracing is off, and recursive application syntax no longer retains source strings that caused repeated hashing overhead.

### Arithmetic and float primitives expand
**New `Nat`/`Fin` modular exponentiation and float FMA** — The kernel gains fast `Nat.powMod`, backed by GMP when available and reused by `Fin` exponentiation. Lean’s float API also now exposes `Float.fma` and `Float32.fma` with native single-rounding implementations and corresponding logical models.

### Lake and tooling improvements
**Lake gets better dependency and profiling workflows** — Path dependencies can now be copied into `packages/`, and a new `lake samply` command replaces the old profiling scripts with an end-to-end workflow for Firefox Profiler. `lake check`/`lake comparator` can also consume prebuilt export NDJSON, and comparator gained paranoid and expert sandboxing controls.

### Internal metadata, docs, and build plumbing
**Elaboration metadata and build internals were cleaned up** — Choice resolution is now recorded in the InfoTree, `InfoTree`/`SnapshotTree` helpers moved into elaboration internals, and `leanir` was split into its own build job. The week also included a docstring parser overhaul, `erased` do-notation parsing cleanup, release-toolchain fixes for bundled Rust checkers, and assorted CI/build updates.

### Other misc changes
- `grind` arithmetic instance plumbing was unified and optimized.
- libuv/networking fixes hardened cancellation, accept, and receive paths.
- `BVDecide` counterexample recovery moved to generic AIGs.
- Tests and docs were updated across the new behaviors and toolchain changes.
