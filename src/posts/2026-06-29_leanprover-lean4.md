---
date: 2026-06-29
repo: leanprover/lean4
size: M
title: "List lemmas land; impossible tactic fixed"
excerpt: "Lean adds round-trip lemmas for `idxOf`, `finRange` ordering facts, and fixes `impossible`/grind goal handling, while reverting a parser tweak."
commits: 5
authors: [kim-em, b-mehta, david-christiansen, nomeata]
commit_authors: {"c81da09": kim-em, "82730f7": kim-em, "bf75564": nomeata}
---

### **Round-trip lemmas for `List.idxOf` and indexing** (c81da09)
Lean now proves that `xs[xs.idxOf x] = x` when `x` occurs in the list, plus the nodup converse `idxOf xs[i] xs = i` for duplicate-free lists. These fill a common gap in core and make list search/index reasoning much smoother.

### **`impossible` no longer cleans up the goal first** (bf75564)
The `impossible` tactic combinator now uses `revertAll` directly instead of running `cleanup` before negating the goal, which avoids erasing the very structure it needs to prove impossibility. The change also moves `revertAll` into `Revert.lean` and adjusts grind’s internal imports, fixing #14201.

### **`finRange` gets monotonicity and `Nodup` facts** (82730f7)
Core now has `pairwise_lt_finRange`, `pairwise_le_finRange`, and `nodup_finRange` for `List.finRange n`. These basic ordering facts should simplify proofs that need to treat `finRange` as an increasing, duplicate-free list.

### Other misc changes
- Made `Nat.ne_of_gt` protected and updated internal references (1 commit).
- Reverted a parser extension change from #14193 (1 commit).
