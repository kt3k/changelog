---
date: 2026-08-11
repo: biomejs/biome
size: M
title: "Markdown lint lands; Windows crash fixed"
excerpt: "Biome adds a new Markdown heading rule, fixes a Windows ARM64 crash, and refreshes CI/tooling dependencies."
commits: 4
authors: [dyc3, Netail]
commit_authors: {"d25d113": dyc3, "d5d75de": Netail}
---

### **Add `useTopLevelHeading` Markdown lint rule** (d5d75de)
Biome now ships a new nursery rule that requires Markdown documents to start with a level-1 heading, while ignoring leading HTML comments and allowing HTML blocks or thematic breaks as the first block. This brings a new public rule into config, diagnostics, and tests, and helps enforce consistent README/document structure.

### **Fix Windows ARM64 access-violation crash** (d25d113)
Biome pins `mimalloc` back to `0.1.48` to avoid a crash seen during analysis on Windows ARM64. The change is explicitly called out as a mitigation for access violations, so it has direct stability impact for affected users.

### Other misc changes
- Updated GitHub Actions and workflow dependencies.
- Release automation and changelog cleanup.
- Minor CI workflow version bumps, including Node.js and pnpm.
