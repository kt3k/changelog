---
date: 2026-05-31
repo: biomejs/biome
size: M
title: "SCSS semicolonless rules now parse cleanly"
excerpt: "Biome fixed semicolonless SCSS @use/@forward handling and corrected a CI token used to remove a triage label."
commits: 2
authors: [denbezrukov, ematipico]
commit_authors: {"95e1d8d": denbezrukov, "fb63b8e": ematipico}
---

### **SCSS semicolonless @use/@forward parsing fixed** (95e1d8d)
Biome now accepts semicolonless SCSS module rules such as `@use` and `@forward`, instead of treating the missing semicolon as a parse boundary error. The formatter and generated node builders were updated to make the semicolon optional, while tests cover inline and multi-clause cases.

### Other misc changes
- CI workflow token swapped for label removal in `needs-repro.yml` (fb63b8e)
