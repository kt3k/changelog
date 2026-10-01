---
date: 2026-09-30
repo: leanprover/lean4
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Lean 4 hardens verification and supercharges arithmetic tactics"
excerpt: "September brought sandboxed project checking, major `grind`/`Sym.simp` upgrades, and several runtime and elaboration performance wins."
commits: 252
---

### Verification and sandboxing get much stronger
**`lake check` / `comparator` mature into external-verification workflows** — Lean gained project export checking, then moved challenge/comparator execution into a tighter sandboxed `leanchecker` flow with support for prebuilt export NDJSON, paranoid modes, and bundled external checkers in release toolchains. This substantially strengthens build auditing and isolation.

**Release toolchains bundle more checkers** — `nanoda`, `lean4lean`, `con-leche`, and `con-ron` are now shipped with release toolchains, making the verification stack available out of the box and better integrated into CI/build packaging.

### Arithmetic automation makes a big leap
**`Sym.Arith` / `grind` gain a reflected polynomial normalizer** — A new normalization pipeline can now turn ring and semiring terms into polynomial normal form, extend to relations, fields, non-commutative structures, and characteristic-aware goals, and power the new arithmetic simproc. This also brought many homomorphism-rule improvements for bitvectors, masks, shifts, rotations, and signed operations.

**`grind` gets materially stronger and more predictable** — The tactic learned better binder/literal indexing, improved negation and control-flow handling, more robust goal normalization, and safer interaction with `Sym.simp`/`Sym.dsimp`. A temporary `grind_norm` probe was added to compare the legacy and new normalizers while the migration settles.

### Runtime, compiler, and elaboration performance improve
**Hot-path elaboration and compiler work are faster** — Lean reduced reference-count traffic in `Core.Context`, sped up command/frontend state handling, trimmed repeated environment replay, improved recursion elaboration, and fixed several quadratic or overly eager checks. `ctorIdx` also became O(1) in generated code.

**Memory/runtime safety was tightened** — The month removed obsolete runtime paths, added linearness markers for arrays, byte arrays, strings, vectors, and hash maps, hardened RC overflow handling, and fixed multiple libuv async/socket lifetime and cancellation bugs.

### Language and standard library grow in useful directions
**Core language gains new expressive features** — Lean added erased variables in `do`, exception postconditions in `def`/`vcgen`/`WP`, inline parameters for `lia` and `grobner`, `Float.fma`, `Nat.powMod`, and broader `for`/range parsing and inference support.

**Std and core APIs fill important gaps** — Notable additions include better order infrastructure for `Fin`, `Int`, `Nat`, and `UIntX`/`IntX`, more container lemmas, improved `mergeSort`, `List`/array preprocessing theorems, and cleaner `leanchecker`/export tooling.

### Other misc changes
- Parser, info-tree, and goal-display fixes for nested tactics, holes, whitespace, and antiquotations.
- Lake workflow refinements for package-scoped outputs, copied path deps, comparator config defaults, profiling via `lake samply`, and cancellation tracking.
- Several deprecations and API cleanups, including `withPtrEq`, old `Std.Do` proof-mode paths, and some legacy runtime/options plumbing.
