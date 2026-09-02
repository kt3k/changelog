---
date: 2026-09-01
repo: leanprover/lean4
size: M
title: "Dyadic order lemmas fixed; templates updated"
excerpt: "Dyadic comparison lemmas were renamed for correctness, and lake’s generated templates now use a newer checkout action."
commits: 2
authors: [kt3k, plp127]
commit_authors: {"5527550": plp127, "0f52346": kt3k}
---

**Rename Dyadic order negation lemmas to match their meanings** (5527550)
The `Dyadic.not_lt` and `Dyadic.not_le` lemmas were swapped so the names now align with their statements: `¬ x < y ↔ y ≤ x` and `¬ x ≤ y ↔ y < x`. This brings Dyadic in line with the corresponding lemmas for `Nat`, `Int`, `Rat`, and mathlib, reducing confusion and making simp behavior more predictable.

### Other misc changes
- Updated `actions/checkout` from v5 to v7 in `lake new` / `lake init` templates (0f52346).
