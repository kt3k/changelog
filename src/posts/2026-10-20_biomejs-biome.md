---
date: 2026-10-20
repo: biomejs/biome
size: M
title: "Formatter fixes and core traversal upgrades"
excerpt: "Bug fixes in JS/CSS formatting, a new rowan preorder skip API, and performance improvements for search and unused-variable analysis."
commits: 6
authors: [dyc3, vidigoat]
commit_authors: {"00771b4": vidigoat, "30bbe61": dyc3, "e55a750": dyc3, "62d69dc": dyc3, "8512f2d": dyc3}
---

### **JSX spread comments no longer duplicate on format** (00771b4)
The JSX formatter now avoids re-printing dangling comments for spread arguments whose own formatter already emits them, fixing an idempotency bug that could duplicate comments on each pass. The new guard covers empty arrays, objects, classes, and arrow functions embedded in JSX spreads.

### **CSS wrapped selectors keep their indent under comments** (e55a750)
A selector-list formatting fix preserves indentation when a rule starts with a comment and the selector wraps across lines. This prevents commented rules from being reformatted into a visually shifted layout.

### **Rowan preorder traversal can now skip subtrees** (30bbe61)
`biome_rowan` now exposes `skip_subtree()` on `preorder_matching` along with a kind-set based matcher API. That gives traversal consumers a cheaper way to prune work while walking syntax trees, which is useful for higher-level analyses and refactors.

### **`noUnusedVariables` now relies on stored reference positions** (8512f2d)
The JS unused-variable rule was reworked to use stored semantic reference positions instead of the previous approach, tightening the rule’s internal logic and likely reducing analysis overhead. The change also updates the test corpus for cases where references appear outside the declaration site.

### **Search uses optimized Grit query execution** (62d69dc)
`biome search` now calls the optimized Grit execution path. This is a targeted performance improvement for repository search queries.

### Other misc changes
- Replaced the GitHub provenance attestation action in release workflows (1 commit).
- Added/updated formatter and analyzer tests and changeset notes.
