---
date: 2026-06-28
repo: leanprover/lean4
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Lean 4 lands VCGen upgrades, parser fixes, and docstring polish"
excerpt: "This week added VCGen framing and speedups, tightened parser/option behavior, improved Verso docstrings, and shipped several compiler/CI fixes."
commits: 53
---

### VCGen gets faster and more expressive
**VCGen rename and performance work** — The experimental `mvcgen'` tactic was renamed to `vcgen`, and its matching pipeline was optimized by caching internalized spec patterns and sharing table entries to avoid repeated re-internalization. Benchmarks were also adjusted to better reflect realistic runtimes.

**New framing support for verified do-notation** — `vcgen` now supports a `frames` clause, with frame databases and lazy elaboration for preserving state assertions across matched programs. This adds a new framing side-goal and expands the tactic’s verification expressiveness.

### Parser and option handling are more predictable
**`set_option ... in ...` now affects parsing** — Scoped options now propagate into the parser for commands, terms, and tactics, aligning `set_option` with `open ... in` and making local syntax-extension toggles work where they’re needed.

**Parser and import-header fixes** — Lean tightened import parsing around overlapping block-comment terminators, and `doc.verso` propagation was narrowed so only doc-related options affect parsing. Both changes reduce surprising parser state interactions.

### Docstrings and Verso are more robust
**Verso docstrings improved across the board** — Docstring elaboration now handles custom Markdown rendering, escaped line-start content, macro-generated declarations, unbracketed binders, and `_` parameters more reliably. Docstrings are also now interpreted according to the syntax they were parsed from, fixing parse-site vs. use-site mismatches.

### Compiler, build, and runtime fixes
**Compiler visibility and IR rebuild behavior** — Codegen now handles private constructors and private field types more carefully, and incremental `leanir` compilation tracks `.ir.sig` separately to avoid unnecessary rebuilds.

**Async and automation fixes** — `Selectable.combine` was reworked to avoid deadlocks, and Lean added downstream adaptation PR automation in CI to reduce manual release coordination.

### Other misc changes
- `lia` no longer generates instances from hypotheses in its local theorem path.
- `grind`, `exact?`, `apply?`, and `rw?` got several performance and non-blocking local-environment tweaks.
- `Float`/`Float32` now have `DecidableEq`, enabling literal pattern matching on floats.
- Added `⨆`/`⨅` notation and more complete-lattice instances for `Std.Internal.Do`.
- `lean_set_initializing` was exported for C/Python FFI users.
- Several CI, lint, test, and stage0 maintenance updates landed.
