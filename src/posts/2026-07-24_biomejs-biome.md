---
date: 2026-07-24
repo: biomejs/biome
size: M
title: "Biome YAML formatter learns block scalars"
excerpt: "Added YAML literal/folded block scalar formatting, including header comments, indentation handling, and new snapshots/tests."
commits: 1
authors: [dyc3]
commit_authors: {"c50a853": dyc3}
---

### **YAML block scalar formatting lands** (c50a853)
Biome’s YAML formatter now handles literal (`|`) and folded (`>`) block scalars instead of leaving them verbatim. The new logic preserves scalar content while reflowing indentation, respecting chomping/indent indicators, and placing header-line comments as dangling comments so they print in the right spot.

This is a meaningful formatter feature because block scalars are common in real YAML, and support here closes a noticeable formatting gap with dedicated parsing, formatting rules, and updated test coverage.

### Other misc changes
- Formatter crate dependency wiring updated for YAML block-scalar work.
- Added/updated YAML formatter snapshots and line-ending tests for block scalar cases.
