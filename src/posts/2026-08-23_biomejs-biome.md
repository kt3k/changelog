---
date: 2026-08-23
repo: biomejs/biome
size: L
title: "Markdown and parser fixes land"
excerpt: "YAML parsing gets broader coverage, JS arrow parsing is fixed, and markdown lexer/formatter performance is improved."
commits: 7
authors: [dyc3, ematipico]
commit_authors: {"7a111ba": dyc3, "a985c5f": dyc3, "dbed0dc": dyc3, "66b282c": dyc3, "5029a5c": ematipico}
---

### **YAML parser gets coverage and correctness fixes** (5029a5c)
The YAML lexer and parser were updated to handle more block/property edge cases, including tab-indentation reporting and better mapping-start disambiguation. The test matrix and parser conformance workflow were also expanded for YAML, with a large set of new regression cases for anchors, block scalars, and indentation errors.

### **JS parser now disambiguates parenthesized object expressions** (66b282c)
Biome now correctly distinguishes parenthesized object literals from arrow-function parameter lists in tricky conditional/nested-arrow cases. This fixes a real parse bug that previously produced incorrect trees for valid code, and adds a regression test for an unclosed parenthesized object arrow body.

### **Markdown lexer avoids extra whitespace scanning** (7a111ba)
The markdown lexer now scans contiguous spaces/tabs once and reuses that run for ATX closing hashes and hard line break detection. This reduces repeated work in common text paths and should improve lexer performance on markdown-heavy inputs.

### **Markdown formatter speeds up word-group handling** (a985c5f)
`WordGroup` switched from `Vec` to `SmallVec` for its atom storage, optimizing the common small-group case. This is a low-level performance tweak that trims allocation overhead in markdown formatting.

### **Markdown list formatting hoists sibling scanning** (dbed0dc)
The formatter now computes whether to preserve pre-marker indentation once per bullet list instead of repeating the check per item. That removes redundant sibling traversal while preserving list/code-block formatting behavior.

### Other misc changes
- Agent scan workflow removed and replaced with repo agent-scan config (2 commits)
- Cargo.lock and dependency wiring updated for markdown formatter
- YAML parser conformance workflow paths updated
