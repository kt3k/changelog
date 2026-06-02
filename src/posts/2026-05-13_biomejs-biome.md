---
date: 2026-05-13
repo: biomejs/biome
size: M
title: "SCSS selector support and rage fix land"
excerpt: "Biome adds SCSS attribute selector interpolation support, fixes `rage --linter` rule reporting, and removes the benchmark repo."
commits: 3
authors: [denbezrukov, dyc3, ematipico]
commit_authors: {"80f0610": denbezrukov, "05c2617": dyc3}
---

### **SCSS attribute selectors now support interpolation** (80f0610)
Biome expands CSS/SCSS parsing and formatting to handle interpolation inside attribute selectors and related modifier/name nodes. This closes a real language-support gap and updates snapshots/tests accordingly, so SCSS selector formatting should now round-trip more correctly.

### **`biome rage --linter` now reports domain-enabled rules** (05c2617)
The CLI’s rage output now merges rules enabled through linter domains into the displayed enabled-rules list instead of omitting them. That makes diagnostics/configuration introspection more accurate for users relying on domain-based rule settings.

### Other misc changes
- Removed the repository benchmark setup and docs, along with the benchmark Dockerfile and scripts.
- Lockfile/workspace cleanup from the benchmark removal.
