---
date: 2026-06-30
repo: leanprover/lean4
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Lean4 ships major tactic, snapshot, and float-model upgrades"
excerpt: "June brought faster incremental loading, a major VCGen overhaul, float modeling, and big do/grind/lint improvements."
commits: 221
---

### Major proof automation and `do` changes
**`do` elaboration became more powerful and defaulted to the new path** — Lean switched the new extensible `do` elaborator on by default, then extended it with `do←` effect forwarding and richer nested `doElem` parsing. That made wrapper functions participate in `return`/`break`/`continue` flow and broadened the syntax that can appear after `←`, while keeping the legacy mode as an escape hatch.

**`mvcgen`/`vcgen` saw a major overhaul** — The weakest-precondition stack was reorganized around the newer `Std.Internal.Do` theory, renamed from `mvcgen'` to `vcgen`, and expanded with frames, `until`, better spec registration, dependent-match support, and cleaner error handling. The tactic now handles more program/spec shapes, has better matching performance, and is being repositioned as the core VC generation engine for verified `do` code.

**`grind` and `lia` both got sharper** — `grind` fixed several soundness and metavariable bugs around generalized patterns and `match` conditions, gained `cbv` support in `sym =>` mode, and improved its handling of locals and suggestions. Separately, `lia` gained its own `@[lia]` attribute and a smaller lemma set, plus better `min`/`max` support and avoidance of expensive hypothesis-generated instances.

### Snapshots, incremental builds, and compiler/runtime performance
**Incremental snapshot loading got much faster** — June added experimental `--incr-save`/`--incr-load` support, parallel dependency loading, and a `.deps` manifest, then layered on faster dep-region handling and test-suite reuse of prebuilt header snapshots. Together these changes significantly reduce cold/warm import times for large projects and open the door to broader snapshot reuse workflows.

**Compiler and runtime hot paths were tightened** — Lean gained `PersistentHashMap.alter`, faster `DiscrTree` insertion, more constant folding for `USize`, `Bool`, `Nat.reprFast`, and bitwise ops, and tail-recursive runtime replacements for bounded-quantifier decision procedures. Runtime work also included faster refcount cleanup, task-safety fixes, and object-compaction/snapshot serialization improvements.

**Task and concurrency handling became safer** — The month fixed atomicity issues in task cancellation and task state access, corrected deadlock-prone selector behavior, and briefly experimented with idle worker expiration before reverting it. The net effect is safer runtime bookkeeping around async work and task pools.

### Floats, bitvectors, and core APIs
**Float support moved into the logic** — `Float` and `Float32` were given logical models, `ofScientific` was reimplemented, `DecidableEq` became bit-pattern-based, and matching on float literals was enabled. That is a major step toward reasoning about floating-point values inside Lean while preserving compiled performance.

**Bitvector tooling and theorem support expanded** — `bv_decide`/`bv_check` were reorganized, `reflectBV` was exported, `BitVec.flattenList` landed with a fast runtime path, and several width/popcount/bitvector conversion lemmas were added. Symbolic simplification also learned more ground bit-vector evaluation.

**Core library and API cleanup continued** — Lean upstreamed `Nat.sqrt`, added `List.idxOf` round-trip and `finRange` lemmas, improved `Std.Time` with a new `DateTime` API, and deprecated `Lean.Data.RBMap`/`RBTree` in favor of `Std` collections. The month also brought `ModuleLinter` support, first-class builtin linter sets, better docstring handling, and parser option propagation fixes for scoped parsing.

### Build, Lake, and tooling
**Lake picked up several workflow and cache improvements** — Highlights include `LAKE_RESTORE_ARTIFACTS`, `--no-overwrite`/`--force-overwrite` cache behavior, deduplicated cache transfers, better dependency/version modeling, `InputVer`, runtime-only dynamic dependency tracking, and more accurate `remoteUrl` handling. Lake tests and CI also got a series of portability and flakiness fixes.

**CI, docs, and release automation were hardened** — June added downstream adaptation PR automation, improved release scripts, reduced flaky async tests, made linting faster and parallel-safe, and tightened various GitHub Actions and stage0/update workflows. Docstring tooling also advanced significantly, especially around Verso/Markdown rendering and parse-site consistency.

### Other misc changes
- `Sym.dsimp` gained ground evaluation and fixed binder telescope expansion.
- `rcases`, `impossible`, and several InfoView/debug paths got UX and correctness fixes.
- OpenSSL was linked into the runtime/tooling, with initialization made lazier later in the month.
- Numerous small API renames, deprecations, and test expectation updates across core, Std, and Lake.
