---
date: 2026-05-29
repo: vitejs/vite
size: S
title: "Rolldown bump, docs tweak, error polish"
excerpt: "Vite updates rolldown to 1.0.3, clarifies a plugin docs example, and cleans up a few error strings."
commits: 3
authors: [shulaoda, RonGamzu]
commit_authors: {"646dbed": shulaoda, "85a0eff": RonGamzu}
---

### **Rolldown updated to 1.0.3** (646dbed)
Vite, the docs app, and the playground all move to rolldown 1.0.3, alongside the lockfile refresh. This keeps the repo aligned with the latest bundler release and may pick up fixes from upstream.

### **Plugin docs now recommend `enforce: 'post'`** (c2d1082)
The API plugin guide adds `enforce: 'post'` to the CSS metadata example. That makes the example more accurate for plugins that need to read final bundle output.

### Other misc changes
- Error message capitalization and spacing cleanup in a few Vite server/optimizer paths (85a0eff).
