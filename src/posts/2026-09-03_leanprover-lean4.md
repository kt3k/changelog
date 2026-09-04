---
date: 2026-09-03
repo: leanprover/lean4
size: L
title: "Lean gets faster allocs and new map lemmas"
excerpt: "Heartbeat/mimalloc allocation is fused for speed, lazy RC is removed, and new intersection-emptiness symmetry lemmas land across Std."
commits: 4
authors: [TwoFX, Garmelon, Robertboy18]
commit_authors: {"5877442": Garmelon, "37cf1ea": Robertboy18, "137a88d": TwoFX, "ed9ac09": TwoFX}
---

### **Faster small-object allocation and fused mimalloc path** (ed9ac09)
Lean’s runtime now inlines mimalloc’s fast path into the allocation entry point, with a new `mimalloc.cpp` compiled into the runtime instead of treating mimalloc as a separate library. The change also folds heartbeat counting and the mimalloc thread-local heap into one thread-local variable, aiming to reduce allocation overhead on hot paths.

### **Remove obsolete `LEAN_LAZY_RC` runtime option** (137a88d)
The long-deprecated lazy reference-counting path is deleted from the build and runtime. That simplifies `object.cpp` and configuration plumbing, and it removes an old code path that was no longer intended to be used.

### **Add symmetry lemmas for empty intersections** (37cf1ea)
`Std` now has `isEmpty_inter_comm` (and related `inter_equiv_empty_comm` lemmas) across associative lists, hash maps, tree maps, and sets, including the dependent variants. This makes it easier to prove disjointness symmetrically without unfolding membership or redoing container-specific reasoning.

### Other misc changes
- Adaptation PR workflow message now says it waits for the toolchain, not CI (5877442).
