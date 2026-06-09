---
date: 2026-05-11
repo: leanprover/lean4
size: L
title: "Lean4 adds wall time and fixes elaboration/linting"
excerpt: "New local-time APIs, a safer `withSetOptionIn`, improved empty-`by` suggestions, and several bug/CI fixes land today."
commits: 8
authors: [nomeata, algebraic-dev, tydeu, thorimur, wkrozowski, leodemoura]
commit_authors: {"f67ea44": algebraic-dev, "d055778": nomeata, "f52a18a": tydeu, "48ad840": thorimur, "0c4d264": nomeata, "139e673": wkrozowski, "2229b07": nomeata, "d98f40c": leodemoura}
---

### **Wall-time support lands in `Std.Time`** (f67ea44)
`Std.Time` now distinguishes absolute `Timestamp`s from local civil `WallTime`s, with conversions that explicitly take a timezone offset. The API also drops the old `sinceUNIXEpoch`/`AssumingUTC` naming, which makes the UTC vs local-time semantics much clearer across date/time helpers.

### **`withSetOptionIn` no longer mutates infotrees** (48ad840)
The command/elab path for `set_option ... in ...` was refactored so option elaboration can be done without rewriting infotrees or emitting malformed info nodes. This fixes a real correctness issue for linters that traverse info trees and could previously panic when walking elaboration output.

### **Empty `by` blocks now surface `try?` suggestions** (2229b07)
Empty `by` can now run `try?` in the background and show proof suggestions, gated by the new `tactic.tryOnEmptyBy` option. This makes bare `by` blocks more helpful interactively without changing elaboration semantics, and lays groundwork for making the behavior default later.

### **`grind` gains a separate generation limit for local theorems** (d98f40c)
A new `genLocal` config option caps term generation for hypotheses and other local theorems independently from global declarations. That gives `grind` a tighter default on user-controlled local patterns, which should reduce runaway instantiations in hard search cases.

### **`cbv` is aligned with `SymM` conventions** (139e673)
The `cbv` tactic now propagates context-dependent proof metadata correctly through simp-style steps, and it rejects the inconsistent `@[cbv_opaque]` + `@[reducible]` combination. The refactor also removes `cbv`-specific preprocessing clones in favor of the shared `Sym` framework, simplifying maintenance.

### **Cancellation tests become more reliable** (0c4d264)
The interactive cancellation harness got a real synchronization primitive so tests can wait for a tactic to actually start before triggering reruns. This hardens flaky cancellation coverage against scheduling races in CI and makes the test intent much more deterministic.

### **Miscellaneous test/CI cleanup** (f52a18a, d055778)
Lake tests are re-enabled by default again, while two flaky server-interactive cancellation tests were temporarily deleted. These are important for CI stability, but they’re still test-harness changes rather than user-facing features.
