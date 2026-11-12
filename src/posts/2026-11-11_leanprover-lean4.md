---
date: 2026-11-11
repo: leanprover/lean4
size: L
title: "Lean adds HTTP fixes, deprecation lint upgrades"
excerpt: "Major HTTP/server bug fixes land alongside a broad deprecation-linter overhaul, new async watchdogs, and a big simp/instance import perf win."
commits: 30
authors: [TwoFX, algebraic-dev, Kha, hargoniX, wkrozowski]
commit_authors: {"1d5d352": hargoniX, "3d2ac8c": Kha, "d83d57b": TwoFX, "a7646f3": algebraic-dev, "8b3c627": algebraic-dev, "f5ed2cf": wkrozowski}
---

### **HTTP/1 server behavior and teardown hardened** (a7646f3)
Lean’s `Std.Http` stack now handles several framing and lifecycle edge cases correctly: `CONNECT` responses, `Connection: close`, HTTP/1.0 framing, request-target limits, and chunked-body EOF behavior were all tightened up. The changes also improve server teardown and backpressure handling, which should make the HTTP server more robust under malformed or stalled clients.

### **Deprecation linter now catches many more automation paths** (d83d57b)
The deprecation linter now warns when deprecated declarations are tagged with automation attributes like `simp` and `grind`, so automation can no longer quietly keep using obsolete lemmas. The warning includes targeted removal suggestions, which matters because this is a common source of “hidden” deprecations.

### **Simp/instance imports get much cheaper** (3d2ac8c)
Lean now stores per-module simp sets and instances in olean data and merges them lazily on import instead of inserting every imported entry one by one. This is a notable compile-time win: the PR reports an 18% drop in module import time while preserving theorem/instance ordering semantics.

### **`Std.Async.Watchdog` adds deadline enforcement for waits** (8b3c627)
A new watchdog abstraction enforces deadlines over a sequence of waits using one background timer and cancels a `CancellationContext` with `.deadline` when a wait overruns. This gives async code a reusable way to implement timeouts without per-wait timer churn.

### **`bv_decide` gains substitution for reified bitvector expressions** (1d5d352)
The bitblast layer now includes substitution support for internal `bv_decide` expression forms, with constant folding during reconstruction. That gives the tactic more internal simplification power while it rewrites bitvector formulas.

### **`cbv` now discharges overlap hypotheses for match equations** (f5ed2cf)
`cbv` can now reduce some `match` equations by solving their overlap hypotheses instead of falling back immediately to the slower `whnf` path. This should improve both performance and reliability on matches with literal and constructor patterns.

### Other misc changes
- Updated stage0 snapshots and build metadata.
- Moved verification proofs into a new `tests/verif` Lake package.
- Added and refined several deprecated-name warnings across syntax, patterns, `open`, quotations, config syntax, deriving, `vcgen`, and theorem commands.
- Added `Core.checkDeprecatedAt` and refactored deprecation-hint plumbing.
- Misc performance cleanup in the deprecation linter and related tactics.
- Bumped libuv to 1.53.0.
