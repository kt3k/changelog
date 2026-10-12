---
date: 2026-10-11
repo: oven-sh/bun
size: M
title: "bun check fixes false positives on complex types"
excerpt: "A large checker refactor fixes three false errors in bun check, improving behavior for immer Draft<this>, ts-pattern, and intersection unions."
commits: 1
authors: [Jarred-Sumner]
commit_authors: {"7c96a12": Jarred-Sumner}
---

### **bun check stops flagging three complex-type false errors** (7c96a12)
This patch adjusts Bun's type-checking internals to use more structured member access throughout the checker, fixing reported false positives around immer's `Draft<this>`, ts-pattern, and unions of intersections. The accompanying differential tests expand coverage for these previously misdiagnosed cases, making `bun check` more reliable on advanced TypeScript patterns.

### Other misc changes
- Type-checker refactor across relation/inference/shape handling to route through structured member helpers
- Differential test additions for false-error regressions
