---
date: 2026-11-10
repo: biomejs/biome
size: M
title: "GraphQL/JS/JSON sort fixes stop corrupting nests"
excerpt: "A source-action bugfix prevents sorted keys/selection sets from rewriting nested structures incorrectly in the editor."
commits: 1
authors: [ematipico]
commit_authors: {"bd9faae": ematipico}
---

### **Source-action sort fixes now skip nested subtrees** (bd9faae)
Biome fixes a corruption bug where editor source actions for `useSortedKeys` and `useSortedSelectionSet` could rewrite nested objects or GraphQL selection sets incorrectly. The new suppression logic skips descendant subtrees during analysis, preventing unsafe fixes from being applied inside already-nested structures.

### Other misc changes
- Added regression coverage for the GraphQL selection-set sort fix.
- Updated JSON sort snapshots to reflect the nested-subtree behavior.
- Extended LSP server tests for source-action behavior.
- Patch changeset added.
