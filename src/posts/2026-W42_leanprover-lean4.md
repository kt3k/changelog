---
date: 2026-10-18
repo: leanprover/lean4
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "Lean 4 tightens core semantics and overhauls grind"
excerpt: "This week brings safer recursion, stricter JSON/string behavior, faster runtime paths, and a large wave of `grind` and VCgen improvements."
commits: 58
---

### Core language and runtime get stricter and faster
**Bigger constructors, cleaner release pipeline, and safer recursion** — Lean now supports constructors with more than 255 object fields, releases are built from stage2 binaries, and well-founded recursion was reworked to avoid eliminating `Acc` into data. The recursion change adds new `Acc`-based helpers for cases that still need non-`Prop` elimination.

**String and JSON semantics are tightened** — `String` ordering now follows UTF-8 lexicographic order, `String.fromUTF8Lossy` was added, and a long-standing string conversion leak was fixed. JSON parsing now rejects duplicate object keys, and the parser’s exponent cap was tightened.

**Runtime and libuv cleanup** — `String.push` got an inline fast path, async TCP/UDP sends and receives now reject oversized buffers instead of wrapping lengths, and libuv request handling was refactored to use owned references rather than manual refcount juggling.

### Proof automation and VC generation saw the biggest push
**`grind` gets safer, broader arithmetic support** — The tactic picked up numerous fixes across symbolic normalization, ring reasoning, order handling, and field/inverse cases. Notable changes include a new distributivity switch, better handling of `LawfulOrderLT`, improved treatment of inequalities and inverse facts, safer arithmetic normalization for `simp +arith`, and several regressions fixed around `-0`, canonical numerals, and dependent-forall loops.

**`grind` performance and matching improved** — Normalization theorems are now cached in an environment extension instead of being rebuilt repeatedly, and several matcher/intro-path bugs were fixed for `Subtype` quantifiers, metadata-wrapped goals, eta-redexes, and nested `∀`/`∨` forms.

**VCgen gained stronger termination automation** — `vcgen ... with finish` can now prove lexicographic decreases for tuple and nested-pair measures, reducing the need for arity-specific helper lemmas.

### Metaprogramming, names, and order infrastructure
**Private names, discrimination trees, and pattern matching were corrected** — Private-name queries were made consistent, `DiscrTree` can now return entries with matching keys, and `fun_cases`/`induct` now handle named literal patterns without kernel errors.

**Ordering and comparison support expanded** — Lean added order instances and lemmas for string slices, byte arrays, lists, arrays, and string extraction-based reasoning, plus dependent short-circuiting combinators for `Bool` and `Ordering`.

**Name resolution and recursion edge cases were fixed** — Auxiliary declarations from `let rec`/`where` now resolve more like their globals, and structural recursion now handles recursive match discriminants correctly.

### Other misc changes
- `lake shake` can now inject downstream imports via `--add-downstream` and `--add-public-downstream`.
- `WPMonad.withFrameClosure` is now universe polymorphic.
- `BitVec.ofNat` normalizes better under symbolic widths, and missing simprocs were added for `UIntX`/`IntX` bitwise ops.
- Public API cleanup, linter enablement, stage0 updates, docs/test tweaks, and assorted refactors.
