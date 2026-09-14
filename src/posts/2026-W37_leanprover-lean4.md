---
date: 2026-09-13
repo: leanprover/lean4
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Lean hardens verification and expands core runtime features"
excerpt: "Weekly Lean4 update: external checker sandboxing, new runtime linearity markers, richer syntax/tactic ergonomics, and several kernel/runtime fixes."
commits: 64
---

### Verification pipeline hardened
**External checkers moved out of process and into sandboxes** — `lake check`/`challenge` now run the kernel via a separate `leanchecker`, with export flow switched to path-based temp files and `lake challenge` tightened further using `bubblewrap`. `lake check` also gained project-export verification, rejecting non-standard axioms and replaying exports through the kernel directly.

**Release toolchains now bundle the external checkers** — `nanoda`, `lean4lean`, and `con-leche` are now shipped with release toolchains, with CI/build plumbing and tests updated so they work from the bundled `bin/` directory.

**Lake workflow gains more control over package outputs** — `lake build` and `lake cache put` can now target a specific package via `--package`, and `lake cache put-staged` now requires an explicit `--rev`. `lake comparator` also defaults to `comparator.json`, and the old `challenge` command was renamed accordingly.

### Runtime and compiler correctness
**Linear-use tracking expands across core containers** — Lean added `markLinear`/`propagateMark` support to `Array`, `ByteArray`, `FloatArray`, `String`, `Vector`, `HashMap`, and `DHashMap`, with optional abort-on-nonlinear behavior to catch accidental sharing bugs.

**Compiler side-effect and arity handling were tightened** — `floatLetIn` no longer floats lets across side-effectful `ST.Out`/`EST.Out` cases, and `ReduceArity` can now eliminate even completely unused parameter lists by introducing a dummy `void` argument instead of collapsing to a constant.

**Core reduction and order infrastructure filled in** — Array equality and several array operations (`map`, `modify`, `zipWith`) now reduce across module boundaries, `Fin` gained missing `Min`/`Max` and lawful order packages, and `Int`/`Nat` plus `UIntX`/`IntX` picked up additional order instances.

### Syntax, tactics, and tooling improvements
**`do` notation and automation became more expressive** — Erased variables are now supported in `do` blocks, and `lia`/`grobner` accept inline parameter lists like `grind`.

**Editor and server goal display got several fixes** — Hover/info metadata now survives through postponed holes, nested `by` blocks show the right goal state, and trailing whitespace handling was corrected so nested tactic contexts display consistently.

**Ranges and `for` loops are more ergonomic** — Range syntax now has sensible precedence, and `for` loops can infer range element types from context, reducing the need for annotations on literals and `Fin`-typed ranges.

### Runtime/library fixes
**libuv refcounting and shutdown behavior were fixed** — Signal/TCP/UDP paths now balance ownership correctly across threads, and shutdown/error reporting is clearer and more consistent for sockets.

**HTTP keep-alive cleanup was improved** — Idle connections now close after timeout, preventing stalled servers from holding slots indefinitely.

**Misc correctness updates landed in the kernel/runtime** — Constructor layout validation was fixed, `pullInstances` stopped hoisting `Decidable` computations, `Fin.addNat?` reductions were exposed across module boundaries, and a mimalloc bump picked up a Windows leak fix.

### Other misc changes
- Export/checker refactors and new regression tests around export checking, arrays, vectors, tactics, and server behavior
- Small deprecations and order-theory plumbing updates
- CI/build workflow cleanup, stage0 syncs, and assorted internal refactors
