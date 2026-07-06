---
date: 2026-07-05
repo: leanprover/lean4
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Lean4 week: smoother proofs, faster internals, sturdier Lake"
excerpt: "Core gains in list reasoning, tactic UX, timezones, and Lake reliability, plus several performance and soundness fixes."
commits: 53
---

### Proof automation and tactic UX improve
**`sym` and `bv_decide` got major fixes** — `sym => apply` now rejects unresolved instance metavariables instead of leaking them, `case =>` goal selection was added, and `SymM` handling was tightened around hygiene, universes, and RHS `let`s. `bv_decide` also saw a substantial refactor for `USize`/`ISize` and a shift to extensionality-based structure handling.

**Lean now offers proactive `try?` hints** — Empty proofs, unsolved goals, and `sorry` sites can now surface automatic `try?` suggestions via new opt-in options, moving the feature into a dedicated post-elaboration path.

**InfoTree-aware scoped blocks and better tactic reduction** — `open ... in` / `set_option ... in` now preserve local InfoTree context for tooling, while `cbv`, `Fin.foldl`, and exposed array accessors gained small but useful reducibility and performance improvements.

### Core library fills in list and array gaps
**List reasoning is much smoother** — Core added round-trip lemmas for `List.idxOf` and indexing, `finRange` monotonicity/nodup facts, and new `List.Perm`/`List.Nodup` lemmas that make duplicate-free list proofs less dependent on external libraries.

**Array operations are faster and more reducible** — Indexed array mapping now preserves in-place behavior for uniquely owned arrays, and `Array.back`, `back!`, and `back?` are now exposed so they reduce across module boundaries.

### Time, timezone, and platform behavior get sharper
**Time formatting was aligned with CLDR/Java patterns** — Lean’s time-format parser now follows the expected pattern semantics more closely, expanding support for standalone fields and fixed-width numeric forms.

**Timezone lookup now extends beyond explicit tables** — POSIX TZ footers in TZif v2/v3 files are parsed to derive recurring future transitions, and Windows transition calculations now round seconds correctly around DST boundaries.

### Lake becomes more robust and more expressive
**Lake now models shared libraries and runtime deps better** — Core shared libraries are represented as full `Dynlib` sets, with a distinction between primary and split libs, and runtime-only dynamic dependencies are now tracked during precompiled elaboration.

**Build artifacts and recovery got sturdier** — Lake added stable `.ltar` output by stripping path-dependent hash data, new sync build/link APIs for custom targets, and safer recovery from interrupted or unparsable config traces.

### Compiler, docs, and infrastructure polish
**A dead-code elimination hotspot was fixed** — `LCNF.ElimDead` switched set representations to avoid a performance trap in large workloads.

**Doc processing was integrated with the linter framework** — Deferred docstring checks now use standard linter plumbing, with related fixes for coinductives and `afterCompilation` handling.

### Other misc changes
- Namespace cleanups and symbol renames to reduce public surface pollution.
- CI, benchmark, test, and docstring wording updates.
- Minor internal refactors and regression-test additions across core, Lake, LSP, and time/date code.
