---
date: 2026-05-31
repo: vitejs/vite
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: S
title: "Rolldown refresh and docs polish land this week"
excerpt: "Vite bumped Rolldown to 1.0.3, refined plugin docs, and cleaned up a few error messages and contributor instructions."
commits: 4
---

### **Bundler sync: Rolldown 1.0.3**
Vite, the docs app, and the playground were bumped to Rolldown 1.0.3, with the lockfile refreshed. This keeps the repo aligned with upstream bundler updates.

### **Docs improvements for plugins and contributors**
The plugin API docs now recommend `enforce: 'post'` in the CSS metadata example, making the guidance better match real-world plugin behavior. CONTRIBUTING.md was also updated to reflect pnpm’s current `overrides` docs and the correct `pnpm-workspace.yaml` placement for testing Vite against external packages.

### Other misc changes
- Polished a few error messages in Vite server/optimizer paths for capitalization and spacing.
