---
date: 2026-07-08
repo: biomejs/biome
size: L
title: "Biome fixes on-type formatting and YAML"
excerpt: "LSP on-type formatting no longer inserts stray whitespace, while YAML and class-sorting gains expand formatter behavior."
commits: 7
authors: [ematipico, johncarmack1984, tidefield]
commit_authors: {"13c4966": johncarmack1984, "1ed54f9": ematipico, "9e1999f": ematipico, "0b0fd8d": ematipico, "d6bc447": ematipico}
---

### **Fix format-on-type whitespace and trigger chars** (d6bc447)
Biome now avoids inserting stray whitespace when on-type formatting runs after closing delimiters like `)`, `]`, and `}`. The LSP capability list also now uses the shared on-type trigger set, keeping client/server behavior aligned.

### **Improve YAML block-property formatting** (1ed54f9)
The YAML formatter starts handling basic block properties instead of falling back to verbatim output in several nodes. This lays groundwork for formatting documents, anchors, aliases, tags, and block-in-block content more consistently.

### **Sort important-suffix utility classes** (13c4966)
`useSortedClasses` now treats important-suffix utilities such as `flex!` as sortable keys instead of leaving them unsorted. Important variants are compared after their plain equivalents, which should make class ordering more predictable.

### **Release workflow and package version adjustments** (0b0fd8d, 9e1999f)

### Other misc changes
- Markdown formatter fixture updates and prettier snapshot refreshes (1 commit)
- Release metadata / changelog generation from the CI release run (1 commit)
- Temporary release workflow tweak to skip `cargo audit` on linux-x64-musl (1 commit)
