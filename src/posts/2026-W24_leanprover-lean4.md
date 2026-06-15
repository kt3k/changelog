---
date: 2026-06-14
repo: leanprover/lean4
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Lean4 adds faster snapshots, stronger grind, and cache controls"
excerpt: "This week brought big snapshot-loading gains, grind fixes and extensions, new do/mvcgen behavior, and Lake cache overwrite controls."
commits: 59
---

### Performance and workflow jump ahead
**Parallel incremental snapshots** — Lean’s new `--incr-load` path now loads snapshot dependencies in parallel and uses a module-based `.deps` manifest, cutting import load times dramatically for large projects.
**Disk-based elaboration resumption** — Experimental `--incr-save`, `--incr-load`, and `--incr-header-save` flags landed, enabling reusable elaboration state across runs.
**Snapshot loading fast path** — Dependency-region sorting is now deferred unless needed, with an additional cleanup/fixup pass for snapshot metadata handling.
**Worker pool cleanup** — Idle task workers now expire after 5 seconds, reclaiming stack memory and updating shutdown coordination for the larger default worker stacks.

### Tactics and proof automation got substantially better
**`grind` bug fixes** — The tactic now avoids metavariable crashes on delayed generalized patterns and no longer produces invalid proofs for tricky `match` conditions.
**`grind`/`grind?` usability** — `sym => cbv` support was expanded, duplicate `cases` anchors are now disambiguated, and `cbv` handling was tightened so reductions behave more predictably.
**`SymM` reduction improved** — New simprocs and dsimp fixes make bit-vector normalization and binder telescope expansion more reliable, while projection transparency in `cbv` was corrected.

### Core language and compiler changes
**Do-notation and `mvcgen` evolved** — `do` now accepts full `doElem`s after `←` with a legacy compatibility option, and `mvcgen'` gained an `until` clause plus a more unified syntax model.
**Spec infrastructure refactor** — `@[spec]` now supports a new internal WP-based path alongside the legacy `Std.Do.Triple` route, preparing the ground for `mvcgen`-style tooling.
**More constant folding** — The compiler gained additional folding for `USize`, bitwise ops, `Bool.false`, and `Nat.reprFast`, plus a fix for `USize` comparison folding across platforms.
**Runtime and ABI fixes** — A WASM bool ABI mismatch was fixed, `CompactedRegion` became serializable, and OpenSSL initialization was made lazier.

### Lake and linting are more configurable
**Environment linters become option-driven** — Builtin linters can now be toggled per declaration and via `lake lint`, with environment snapshots carrying linter settings consistently.
**Lint recording and cache overwrite controls** — `lake lint --record-exceptions` can write suppressions back into build output, and `lake cache` now distinguishes `--no-overwrite` from `--force-overwrite`.
**Release/CI hardening** — Release scripts, workflow pins, and CI paths were cleaned up to reduce friction and shorten feedback loops.

### Other misc changes
**API and diagnostics polish** — Private inductives can now be opened as namespaces, `CoreM.toIO` reports exception names when available, `Environment.hasExposedBody` was added, and do-elaborator hover diagnostics improved.
**Library and doc cleanup** — `Std.Internal.Do` metatheory was reorganized, `BitVec.flattenList` and new `cpop`/`setWidth` lemmas landed, builtin docstring highlighting was fixed, and various core/Init cleanups and test updates were made.
