---
date: 2026-07-19
repo: biomejs/biome
size: M
title: "Type inference fix strengthens promise lint"
excerpt: "Biome improved tuple and generic inference for noMisusedPromises, plus two dependency bumps."
commits: 3
authors: [ematipico]
commit_authors: {"4bf9b21": ematipico}
---

### **Promise callback inference now catches tuple-spread cases** (4bf9b21)
The `noMisusedPromises` lint now reports Promise-returning callbacks in calls that use tuple spreads or tuple rest parameters, including generic and deeply nested tuples. It also handles constructor signatures from interface and object types, with a conservative fallback for recursive or overly nested tuple spreads so analysis terminates.

### Other misc changes
- Dependency bumps: `rustc-hash` to 2.1.3, `quote` to 1.0.47
- Added/updated internal agent guidance docs and comments
