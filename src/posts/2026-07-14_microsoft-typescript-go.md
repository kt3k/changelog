---
date: 2026-07-14
repo: microsoft/typescript-go
size: M
title: "Checker fix stops spurious ref resolution"
excerpt: "A TypeScript-Go checker fix broadens ancestor checks to avoid resolving nodes that normal checking skips, eliminating several false diagnostics."
commits: 1
authors: [weswigham]
commit_authors: {"448614f": weswigham}
---

### **Checker now avoids resolving unchecked nodes** (448614f)
`markLinkedReferences` was expanded to recognize more contexts where the checker intentionally does not perform semantic resolution, including `with` blocks, invalid decorator positions, non-generator `yield` operands, malformed `for-in/of` RHS cases, computed property names, and heritage clauses. This should prevent a cluster of spurious diagnostics and unused-reference mishandling across real-world code and the updated baselines.

### Other misc changes
- Added `FindManyAncestors` helper for walking multiple ancestor predicates in one pass.
- Updated compiler/conformance baselines for the checker behavior change.
