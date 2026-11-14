---
date: 2026-11-13
repo: leanprover/lean4
size: L
title: "Lean gets faster match equations and CI coverage"
excerpt: "Performance work speeds up equation generation, while CI now builds lean-beam on every Linux run and Lake’s build store is mutex-backed."
commits: 6
authors: [leodemoura, nomeata, Kha, TwoFX, tydeu]
commit_authors: {"62e0cf0": leodemoura, "0fb927c": leodemoura, "1452acb": TwoFX, "7c0fa59": tydeu}
---

### **Faster match equation generation for tricky patterns** (62e0cf0)
Lean’s match-equation prover now uses a custom contradiction path tailored to equation goals, avoiding the expensive all-pairs hypothesis search in the general tactic. This should materially speed up large matches with nested literals and constructor patterns.

### **String-literal match equations avoid `String.decEq` overhead** (0fb927c)
Equation generation now skips converting `String` literals to constructor form during `rfl`/definitional-equality checks when that conversion would be wasteful. That prevents heartbeat blowups on large `match`es over string literals and makes these generated lemmas much cheaper to prove.

### **Lake’s build store now uses a mutex instead of shared mutable refs** (7c0fa59)
The build-store plumbing was refactored to use `Std.Mutex` and a new `BuildStoreRef` abstraction instead of `IO.Ref`, changing the internal concurrency model of Lake’s recursive build machinery. This is a substantive refactor for correctness under concurrent mutation and affects the build/fetch/job monad interfaces.

### **All `csimp`-optimized definitions are made noncomputable** (1452acb)
A broad internal cleanup marks definitions that will later be replaced by `csimp` lemmas as `noncomputable`, ensuring Lean does not accidentally use the slow executable versions. The change touches many core datatypes and algorithms, and is backed by a regression test for the performance guarantee.

### **Other misc changes**
- CI now builds and tests `lean-beam` on every Linux run, not just release builds.
- External checker pins updated for `con-leche` and `con-ron`.
- Minor build/test and internal refactor updates related to the Lake/Lean CI plumbing.
