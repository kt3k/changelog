---
date: 2026-08-20
repo: leanprover/lean4
size: L
title: "Security, API, and verifier refactors"
excerpt: "Lean tightened kernel/runtime safety, required newer GMP, and landed major VCGen and do-notation elaborator changes."
commits: 17
authors: [sgraf812, Kha, leodemoura, FawadHa1der, Rob23oba, TwoFX]
commit_authors: {"ae12a79": sgraf812, "bd73cfb": Rob23oba, "95b54b7": leodemoura, "56674f8": sgraf812, "de315cf": sgraf812, "8df768b": Kha, "298de3b": sgraf812, "4cf8a3b": sgraf812, "5fe9994": TwoFX, "abbc001": sgraf812, "44a3664": leodemoura}
---

**Kernel now rejects oversized Nat numerals** (44a3664)
The kernel added a configurable `LEAN_NAT_MAX_SIZE` limit and now refuses to reduce or typecheck Nat numerals whose in-memory representation would exceed it. This blocks pathological inputs from blowing up memory/time during kernel reduction.

**Reference counting overflow is now memory-safe** (8df768b)
Lean’s runtime now freezes objects that overflow or underflow their 32-bit reference counts instead of letting them wrap into corruption. That closes a serious use-after-free path in the official kernel and makes the runtime resilient to extreme RC stress.

**Lean now requires GMP 6.3.0 by default** (95b54b7)
The build now fails if it finds an older GMP, because earlier versions can make Lean produce unsound results in corner cases. There is an explicit `FORCE_GMP` escape hatch, but it comes with a clear warning and is not recommended.

**`Decidable` is now Bool-backed** (bd73cfb)
`Decidable p` was redefined to carry a `Bool` alongside the proof, giving many more definitional equalities and simplifying downstream reduction behavior. This is a broad foundational change that touches core, tactics, compiler internals, and many tests.

**`vcgen` frame procedure protocol was reworked** (4cf8a3b)
The VCGen framing API was split into a two-phase protocol: first decide whether to frame, then prove the split with the chosen spec target. This is a substantial internal refactor that changes how frame procedures interact with solver candidates and backtracking.

**Exception postconditions are now products, not bespoke stack nodes** (ae12a79)
The old `EPost.Nil`/`EPost.Cons` representation was replaced with tuple-based products, so exception postcondition stacks now use the regular `Prod` API. This also reshapes `vcgen`/`Std.WP` around simpler base postconditions for `Except` and `Option`, and updates notation and pretty-printing accordingly.

**`constructor` now warns on ambiguous matches** (5fe9994)
The tactic now emits a warning when more than one constructor fits the goal instead of silently picking the first. A new `constructor!` preserves the old behavior, making the tactic safer without removing the shortcut.

**`vcgen` now handles closed goals during initialization** (56674f8)
A failure mode where initialization could close the goal and leave `vcgen` reporting “No goals to be solved” is fixed. This makes the tactic succeed on inconsistent contexts instead of treating the closed goal as an error.

**Do-notation loop annotations and `assert` now elaborate without extra imports** (de315cf)
`invariant`, `decreasing`, and `assert` inside `do` blocks now open the needed scoped `Std.WP`/`Lean.Order` instances automatically, matching contract clauses. That removes a brittle `open Std.WP` requirement for users writing verified loops and assertions.

**Contract annotations now bind like function arguments** (298de3b)
`ensures` no longer supports the old match-alternative form and instead elaborates like a `fun` telescope, including tuple patterns. This simplifies the contract syntax and makes clause binding behavior consistent across `requires`/`ensures`/loop annotations.

**VCGen frames clauses are now consumed per goal, not per candidate** (abbc001)
Matching a `frames` clause moved earlier in the solver so a pinned frame survives failed spec candidates and is only consumed once the actual goal/frame application lands. This fixes an important backtracking bug in framed verification.

### Other misc changes
- Stage0 updates (4 commits)
- Mimalloc dependency bump
- Misc test and doc updates for the new VCGen, contract, and constructor behavior
