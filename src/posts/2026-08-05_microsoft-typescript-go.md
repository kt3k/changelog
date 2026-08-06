---
date: 2026-08-05
repo: microsoft/typescript-go
size: M
title: "Variance computation now handles circular types"
excerpt: "TypeScript Go updates variance inference to track work by associated symbol, improving circular generic analysis and related tests."
commits: 1
authors: [ahejlsberg]
commit_authors: {"86cc476": ahejlsberg}
---

### **Variance computation ordered by associated type symbol** (86cc476)
The checker now tracks variance computation on a stack keyed by the associated symbol instead of a single global in-progress flag. This lets it restart safely around circularities and avoid recomputing work incorrectly, which matters for generic variance inference on self-referential types.

The change also adds focused regressions for circular variance cases, so the new ordering behavior is exercised and locked in.
