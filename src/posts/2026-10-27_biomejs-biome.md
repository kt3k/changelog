---
date: 2026-10-27
repo: biomejs/biome
size: L
title: "Big Vue lint wave lands in Biome"
excerpt: "Biome added a large batch of Vue nursery rules plus a markdown parser fix and a few smaller maintenance updates."
commits: 22
authors: [dyc3, Netail, jfmcdowell]
commit_authors: {"b4add2a": Netail, "735d370": jfmcdowell}
---

### **Vue linting expands with many new rules**
Biome landed a substantial set of new Vue rules, covering deprecated APIs and safer patterns around `v-model`, `v-memo`, `v-slot`, `v-show`, `v-if`, props, emits, and computed properties. These additions improve coverage for common Vue misuse and add migration mappings so ESLint users can translate more rules directly.

### **Markdown parser now nests list items by content column**
The markdown parser and formatter were adjusted to better nest list items based on enclosing content column, which should improve handling of indented and nested list structures. This is a behavior-changing parser fix with corresponding fixture updates, so it can affect real markdown output. (735d370)

### Other misc changes
- Docker image digest bump for Rust 1.98.0 workflows (b30a85c)
- Small CONTRIBUTING.md edit (b4add2a)
