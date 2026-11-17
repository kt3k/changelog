---
date: 2026-11-16
repo: biomejs/biome
size: L
title: "Parser, type-inference, and plugin API upgrades"
excerpt: "Major performance work plus new JS plugin trivia APIs and multiple type-inference improvements for narrowing behavior."
commits: 15
authors: [dyc3, ematipico]
commit_authors: {"5332189": dyc3, "69121ae": dyc3, "8c63009": dyc3, "f126262": dyc3, "721c183": dyc3, "6e5efa0": ematipico, "664b29c": ematipico, "c600794": ematipico, "dc01f55": ematipico, "028cbb2": ematipico, "f8f025e": ematipico}
---

### **Faster parsers and rowan internals**
`perf(rowan)` and `perf(parser)` commits landed on multiple hot paths: green tree construction, sibling batch mutation, red-node allocation, and identifier lexing. Together they reduce per-item copying and tree allocation overhead, and the repo notes call out measurable wins on large projects (up to ~3% for linting and ~1.7% for parsers).

### **JavaScript plugins can now inspect trivia**
The JS plugin runtime gained trivia APIs on nodes and tokens, plus richer diagnostics targeting. Plugins can now access leading/trailing trivia and comments, detect comment pieces, and point `registerDiagnostic()` at a token or trivia element instead of only a node, which makes comment-aware rules much easier to write (f126262).

### **Type inference narrowing got significantly smarter**
Several commits expanded narrowing behavior to match TypeScript more closely: unsupported statements are treated as opaque regions, narrowing now survives patterns/class expressions/logical assignments, and it also behaves better around `eval`, `arguments`, and falsy branches. These changes directly improve lint precision for rules like `noUnnecessaryConditions` and reduce false positives in real code (6e5efa0, 664b29c, c600794, 028cbb2, f8f025e).

### **Batch mutation application was optimized**
`BatchMutation` now commits sibling changes in a single pass instead of repeatedly shifting inserted text mutations, cutting quadratic behavior in common multi-edit cases. That should make large mutation-heavy updates noticeably cheaper, especially when many sibling nodes are modified together (5332189).

### **Other misc changes**
- Upgraded `syn` to v2 and declared external crate versions in the workspace (8c63009)
- Updated `jiff` to 0.2.43 (1fef1e2)
- CI/build metadata refresh for weekly CSS baseline updates (721c183)
- Docs/comments/test snapshot cleanup around rowan and narrowing behavior (69121ae, dc01f55)
