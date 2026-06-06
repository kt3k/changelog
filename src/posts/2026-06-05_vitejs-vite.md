---
date: 2026-06-05
repo: vitejs/vite
size: M
title: "ESLint rules simplified across Vite"
excerpt: "A config cleanup removes a lot of custom ESLint exceptions, tightening defaults and refactoring node-side lint targeting."
commits: 1
authors: [sapphi-red]
commit_authors: {"2292140": sapphi-red}
---

### **ESLint config cleanup tightens rules and removes special cases** (2292140)
Vite’s ESLint setup was simplified by dropping several custom allowlists and redundant exceptions, including extra import/require exclusions, some TypeScript rule overrides, and a dedicated globals block. The node-package lint rules were also rewritten to use simpler path matching and direct restrictions, which should make the config easier to maintain and less prone to drift.

### Other misc changes
- Test cleanup in `utils.spec.ts`
- Playground fixture update for optional peer dep handling
