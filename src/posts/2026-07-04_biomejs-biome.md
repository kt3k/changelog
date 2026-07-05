---
date: 2026-07-04
repo: biomejs/biome
size: M
title: "Markdown list formatting gets a major refactor"
excerpt: "Biome tightened Markdown list/code-block formatting and documented a CSS lint exception."
commits: 2
authors: [ematipico, dfedoryshchev]
commit_authors: {"dec3c22": ematipico, "cd15baa": dfedoryshchev}
---

### **Markdown list and code-block formatting refactor** (dec3c22)
Biome’s Markdown formatter got a substantial rewrite around list markers, code content folding, and indentation handling. The changes aim to keep adjacent parsed lists distinct after formatting and to avoid Markdown re-parsing surprises, while also improving coverage for tricky blockquote/list and fenced-code cases.

### Other misc changes
- Docs update for `noMissingVarFunction` ignored properties to include `container-name` (cd15baa).
