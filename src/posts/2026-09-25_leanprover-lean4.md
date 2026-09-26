---
date: 2026-09-25
repo: leanprover/lean4
size: L
title: "Lean adds tc cache validation and fixpoint speedups"
excerpt: "New cache-dependency tracking powers a debug cache-hit validator, while partial fixpoint unfold lemmas get much faster."
commits: 9
authors: [Kha, ejgallego, nomeata, jcreedcmu]
commit_authors: {"fcecee3": Kha, "3018bdc": Kha, "feec14b": ejgallego, "904eaf4": Kha, "78cb841": Kha, "13b1c7a": nomeata, "0530cec": jcreedcmu}
---

**Typeclass synthesis now records option dependencies and can validate cache hits** (904eaf4, fcecee3)
Lean now tracks which options a recorded typeclass search actually reads, and `debug.synthInstance.checkCacheHits` can rerun every cache hit and panic if recomputation differs. That catches missing dependency recording and is explicitly aimed at hardening the path toward safe cross-command caching.

**Partial fixpoint unfold theorems are much cheaper to generate** (13b1c7a)
The unfold lemmas for large mutual `partial_fixpoint` blocks now derive from a shared fixpoint equation instead of re-deriving the whole block per function. This cuts repeated kernel re-checking and is reported to speed up large blocks dramatically.

**Empty `grind =>`, `sym =>`, and `impossible by` now preserve the goal view** (3018bdc)
The tactic UI no longer shows a misleading “no goals” state after an empty block in these three cases. The info-node placement was adjusted so the goal state remains visible where users expect it.

**Verso metadata blocks can nest inside directives again** (feec14b)
The docstring parser removes the restriction that `%%% ... %%%` metadata blocks must be top-level. This restores behavior needed by clients like Verso Blueprint that embed metadata inside directives.

### Other misc changes
- Added `wf_preprocess` theorems for `List.any`/`List.all` and the array analogues (0530cec)
- Avoided an order-dependent `grind` proof in a benchmark/test (78cb841)
- Updated stage0 (b52f991)
