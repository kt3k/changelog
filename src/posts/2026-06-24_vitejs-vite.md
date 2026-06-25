---
date: 2026-06-24
repo: vitejs/vite
size: S
title: "Renovate rule fixed for npm release age"
excerpt: "A small CI config fix corrects Renovate’s npm matching so minimum release age is applied as intended."
commits: 1
authors: [sapphi-red]
commit_authors: {"dae9bb1": sapphi-red}
---

### Other misc changes
- CI config fix: Renovate now matches `npm` by datasource instead of dependency type, ensuring `minimumReleaseAge=1440` is applied correctly (dae9bb1).
