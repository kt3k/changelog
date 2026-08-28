---
date: 2026-08-27
repo: leanprover/lean4
size: L
title: "SAT APIs, better `rwa`, smaller leanchecker"
excerpt: "Major CNF/LRAT refactor expands SAT APIs, `rwa` gets sane goal handling, and `leanchecker-paranoid` is slimmed down."
commits: 6
authors: [hargoniX, TwoFX, kernelpanic888, wkrozowski, Kha]
commit_authors: {"f3c6b84": hargoniX, "b66d310": TwoFX, "459d430": kernelpanic888, "61bb565": wkrozowski, "e991a05": Kha}
---

### **New CNF API and LRAT checker overhaul** (f3c6b84)
Lean’s SAT/CNF infrastructure was heavily refactored: the public CNF API was expanded with entailment, negation, unit clauses, RUP/RAT, and a more memory-efficient clause representation. On top of that, the LRAT checker was rewritten from scratch, now runs a bit faster, and can handle bounded variable addition.

### **`rwa` now rewrites the right goal, predictably** (b66d310)
`rwa` is no longer just a thin `rw; assumption` alias. It now focuses the first goal, rewrites it, and only uses `assumption` on the rewritten goal and its side goals, which avoids the old “wrong goal got closed” behavior and improves error messages.

### **`leanchecker-paranoid` now initializes only what it needs** (e991a05)
The paranoid checker binary no longer pulls in the entire Lean library at startup, cutting its size dramatically. This keeps the binary focused on the core modules it actually uses, which matters for distribution and startup footprint.

### **`Fin.foldl` no longer exposes its runtime loop** (459d430)
`Fin.foldl` was split into a kernel-friendly structural definition plus a separate tail-recursive runtime implementation. That preserves reductions like `by decide` and `simp` behavior without exposing the well-founded loop, while still compiling to the efficient version.

### **`lake lint --code-quality` now reports persisted entries** (61bb565)
Code-quality entries recorded by linters are now read back and emitted by `lake lint --code-quality`, with proper attribution for entries tied to a specific linter. This makes lint output more complete and lets `--lint-only` filtering behave as expected.

### Other misc changes
- Stage0 update (1 commit)
- Small internal plumbing around tactic parsing and CNF/LRAT refactors
