---
date: 2026-10-31
repo: leanprover/lean4
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Lean4 lands a major proof-automation and core performance push"
excerpt: "October focused on making `grind`/`lia`/`vcgen` much stronger, while adding HTML syntax, hardening runtime/IO, and speeding core elaboration."
commits: 385
---

### Proof automation gets a major upgrade
**`grind` becomes significantly stronger, safer, and faster** — Across the month, Lean’s main automation received broad work on arithmetic, bitvectors, orders, `Fin`, subtypes, binders, and heterogeneous terms. It gained better `Sym.simp`-based normalization, more robust suggestion generation, improved soundness checks, fewer internal crashes, and substantial performance wins on hard goals. `lia` and `cutsat` also got better divisibility handling, proof sharing, and kernel-checking speedups.

**`vcgen` expands from simple obligations to richer program proofs** — Verification-condition generation learned lexicographic variant decreases, join-point factoring, better frame handling, pure equality substitution, conjunctive/existential/supremum splitting, and default simplification via a new `@[vcgen_simp]` collection. These changes make `vcgen … with finish` work on a wider range of programs and produce smaller, cleaner goals.

### Core language and compiler capabilities grow
**First-class HTML support lands in core** — Lean now has a core HTML AST, renderer, syntax, and elaborator, making HTML document authoring a supported part of the standard data layer with escaping, raw text handling, and parser/printer coverage.

**Large constructors and well-founded recursion are reworked** — Constructors now support more than 255 object fields via spilled storage, removing a long-standing lowering limit. Well-founded recursion was also redesigned to avoid eliminating `Acc` into data, replacing it with a `FixGraph`-based approach and new `Acc` variants for cases that still need non-`Prop` elimination.

**Namespace, recursion, and pattern-matching correctness improvements** — Auxiliary declarations now resolve more consistently, structural recursion handles recursive match discriminants, `fun_cases`/`fun_induction` fix named literal patterns, and equation-lemma generation is no longer affected by caller options.

### Performance work across elaboration, imports, and runtime
**Elaboration and typeclass search are noticeably faster** — Import loading now reuses environment-extension data more aggressively, imported module names are cached in headers, typeclass resolution gained a persistent/more precise cache, and type inference got a budgeted expression cache. Several hot expression traversals were moved to cheaper native or cached implementations, and kernel hashing/traversal costs were reduced.

**String, bitvector, and numeric primitives get faster and more precise** — `String.toList` reduction is now linear, `String.push` and `String.singleton` get ground evaluation and runtime fast paths, string comparison/order semantics were tightened, and `BitVec`/`Nat`/`Int` gained faster zero-counting and modular arithmetic helpers. JSON parsing/printing and literal classification were also hardened.

**Runtime, async, and build-system plumbing were hardened** — The libuv layer saw a major RAII/ownership refactor, async timers/signals became re-entrancy-safe, oversized buffers/IDs are rejected more carefully, HTTP date formatting was fixed to RFC 9110, and Lake gained more resilient cache transfers, atomic rename support, JSON reports, and better import/build key handling.

### Other misc changes
- New/public APIs: `Lean.Data.UnionFind`, `DiscrTree.getEntriesWithKeys`, `Expr.containsMVar`/`hasAnyMVar`, `ByteArray`/`String.Slice` ordering, `Nat.extendedGcd`, `UInt64.mulMod`/`powMod`/`invMod?`, `Vector.modify`, `MonadMacroAdapter CoreM`.
- Deprecation/syntax tooling improved, including deprecating syntax declarations directly and better replacement/code-action support.
- Docs, linter behavior, stage0/release plumbing, and numerous regression tests were updated throughout the month.
