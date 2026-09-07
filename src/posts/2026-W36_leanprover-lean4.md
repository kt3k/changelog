---
date: 2026-09-06
repo: leanprover/lean4
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Lean4 week: runtime fixes, faster elaboration, and Lake polish"
excerpt: "Lean4 landed runtime crash fixes, elaboration and allocation speedups, new core lemmas, and finer-grain Lake precompile controls."
commits: 25
---

### Runtime stability and performance
**Crash fix in `lean_apply_m` over-application** — Lean closed a runtime bug where applying more than 16 arguments to certain closures could hit the wrong calling convention and crash.

**Faster allocation and leaner core state** — The runtime now inlines mimalloc’s fast path into the allocator, while elaboration moved cold `Core.Context` fields out of the hot path to cut reference-count traffic. Meta-programming also avoids rebuilding transparency context when nothing changes.

**Removed an obsolete runtime path** — The long-deprecated `LEAN_LAZY_RC` option and its runtime/build plumbing were deleted, simplifying object handling.

### Core language and library improvements
**Better sorting and arithmetic lemmas** — `List.mergeSort` got more usable lemmas for balanced splits and 2-element lists, `Int.tdiv` gained a zero-characterization simp lemma, and Dyadic negated-order lemmas were renamed to match their meanings.

**New conditional decidability support** — Lean now provides `Decidable (bif c then t else e)`, filling a gap alongside `if` and `ite`.

**More ergonomic `Repr` output** — `Vector` now renders as `#v[...]`, making inspected values much easier to read.

### Parser, linting, and diagnostics
**Sharper source attribution for linters** — New `Lean.Linter.Util` helpers let code-quality checks map syntax back to the declaration they belong to, improving diagnostic precision.

**Parser infrastructure filled in missing nodes** — Previously unregistered builtin node kinds for field indices, hex numbers, and interpolated strings were added, along with a small layout tweak for `macro`/`elab` bodies.

### Lake and build workflow
**Finer-grain precompilation controls** — Lake split `precompileModules` into `precompileImports` and `precompileLibrary`, giving package authors more control over what gets precompiled and when.

**Server options now apply consistently in packages** — `moreServerOptions` now reaches package modules too, fixing an inconsistency with scratch/external modules.

### Other misc changes
- Added symmetry lemmas for empty intersections across `Std` maps, sets, and dependent variants.
- Added a flag to suppress redundant termination warnings for generated pre-definitions.
- Updated templates, workflows, docs, and tests across the repo.
