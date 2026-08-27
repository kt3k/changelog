---
date: 2026-08-26
repo: biomejs/biome
size: M
title: "Markdown perf and Vue formatting fix"
excerpt: "Two Markdown parser speedups and a Vue interpolation formatting fix landed, with broader HTML formatter handling for adjacent inline siblings."
commits: 3
authors: [ematipico, dyc3]
commit_authors: {"e4caa37": ematipico, "3270ca4": dyc3, "4816cc5": ematipico}
---

### **Vue interpolations now stay attached to neighbors** (3270ca4)
Biomes HTML formatter now preserves Vue interpolation adjacency at whitespace-sensitive boundaries and around adjacent inline siblings. This fixes cases where `{{ ... }}` could drift away from surrounding content, and ensures some interpolations converge after a single formatting pass.

### **Markdown parser reduces unnecessary lookahead checks** (4816cc5)
The Markdown parser was refactored to skip a lot of block-start probing unless the first non-indented byte can actually match the candidate construct. That should cut parser work on common inputs, especially for lists and other block-level scans.

### **Markdown link-lookahead work was trimmed further** (e4caa37)
A second Markdown performance pass narrows when link-related deferred inline reparsing happens, avoiding extra source scans unless there was an unresolved reference lookup. The surrounding parser and syntax changes further reduce repeated checks across headings, blocks, and inline parsing paths.

### Other misc changes
- Added/updated Markdown parser tests and snapshots for edge cases and performance-related behavior.
- Added a changeset entry for the Vue formatting fix.
