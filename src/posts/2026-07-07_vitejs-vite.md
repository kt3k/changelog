---
date: 2026-07-07
repo: vitejs/vite
size: M
title: "PostCSS Modules v9 lands in Vite"
excerpt: "Vite bumps postcss-modules to v9, trims plugin docs, and tweaks an ecosystem CI workflow variable."
commits: 3
authors: [sapphi-red]
---

### **Update postcss-modules to v9** (a9539d6)
Vite now depends on postcss-modules v9 and carries a new patch for its typings, keeping the package compatible with the upgraded release. This is a meaningful dependency update because it affects Vite’s CSS modules pipeline and the surrounding type surface.

### Other misc changes
- Docs: delegated the virtual modules convention explanation to Rolldown docs and simplified the local guidance.
- CI: switched the ecosystem CI trigger workflow to read the GitHub App client ID from `vars` instead of `secrets`.
