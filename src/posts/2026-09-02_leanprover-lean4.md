---
date: 2026-09-02
repo: leanprover/lean4
size: M
title: "Lean adds mergeSort lemmas and quieter termination hints"
excerpt: "New mergeSort lemmas and an opt-out for redundant termination warnings headline the day; a couple docs/process nits round it out."
commits: 4
authors: [kim-em, Rob23oba, ia0]
commit_authors: {"19c7959": Rob23oba, "c632a0a": ia0, "6778cc8": kim-em, "3facd36": kim-em}
---

### **Add `mergeSort` lemmas for balanced splits and pairs** (6778cc8)
Lean now exposes `mergeSort_append` and `mergeSort_pair`, giving direct lemmas for sorting a list built from a balanced split and for the 2-element case. This makes `List.mergeSort` easier to use without depending on internal split machinery, and the pair lemma is marked `@[simp]` for convenience.

### **Allow suppressing redundant termination warnings** (19c7959)
`TerminationHints` gains a `warnIfRedundant` flag, and `TerminationHints.ensureNone` now skips emitting warnings when it is set to `false`. That matters for generated pre-definitions via `addPreDefinitions`, where redundant hints can be intentional and noisy warnings would otherwise get in the way.

### Other misc changes
- Doc typo fix in the `List.lex` example (`c632a0a`)
- CLAUDE.md update to forbid process narrative in PR descriptions (`3facd36`)
