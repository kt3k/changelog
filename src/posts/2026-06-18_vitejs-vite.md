---
date: 2026-06-18
repo: vitejs/vite
size: M
title: "Env deprecation warning and glob fix"
excerpt: "Vite now warns on deprecated envFile usage and fixes optimizer glob expansion to skip private null exports."
commits: 3
authors: [SSDWGG, LeSingh1, sanjibani]
commit_authors: {"ed7b283": SSDWGG, "8b9f5cd": LeSingh1, "a2fff21": sanjibani}
---

### **Warn on deprecated `envFile` config** (ed7b283)
Vite now emits a warning when `envFile: false` is used, nudging users to switch to `envDir: false` instead. This improves config migration clarity without changing behavior.

### **Skip null-valued exports in optimizer glob resolution** (8b9f5cd)
The optimizer’s `expandGlobIds` now ignores package export targets that are explicitly `null`, which Node uses to mark private/blocked subpaths. That prevents private package paths from being treated as resolvable glob matches and makes dependency pre-bundling align better with package export semantics.

### Other misc changes
- Docs/blog URL correction for the Vite 6 announcement (a2fff21)
