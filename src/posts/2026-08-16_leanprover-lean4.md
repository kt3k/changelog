---
date: 2026-08-16
repo: leanprover/lean4
size: L
title: "Lean grind gets a major case-split speedup"
excerpt: "`grind`/`sym` now drain queued facts before splitting, cutting a worst-case `cases_next` benchmark from 5.9s to 0.11s."
commits: 1
authors: [leodemoura]
commit_authors: {"79c4cd0": leodemoura}
---

### **`grind` case splitting is dramatically faster on large goals** (79c4cd0)
`cases`, `cases?`, and `cases_next` now drain pending raw facts before performing a split, so internalized facts are preprocessed once up front instead of once per subgoal. This removes a major source of overhead in `grind`/`sym` on large terms and fixes the failure behavior of `cases_next` when no split candidate exists.

The same commit also tightens nested-subsingleton marking with new quick classification logic for result types, helping avoid unnecessary work when analyzing applications during preprocessing.

### Other misc changes
- Added a regression benchmark and updated the expected output for `grind_cases_next`.
