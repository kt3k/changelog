---
date: 2026-07-13
repo: biomejs/biome
size: M
title: "Formatter fix leads a dependency-heavy day"
excerpt: "Biome fixed on-type comment placement before `if` statements, plus a handful of dependency and CI updates."
commits: 6
authors: [ematipico]
commit_authors: {"f4fb10e": ematipico}
---

### **Fix on-type formatting so comments stay outside `if` bodies** (f4fb10e)
The formatter now preserves comments that appear before an `if` statement during range/on-type formatting instead of moving them into the statement body. The patch also adds subtree-aware comment placement so partial-document formatting keeps comments attached to nodes that will actually be printed.

### Other misc changes
- Updated `regex` to 1.13.0 and `jiff` to 0.2.32.
- Bumped `pnpm` to 11.11.0 and `@types/node` to 24.13.3.
- Refreshed several GitHub Actions and workflow tool versions.
