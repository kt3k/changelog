---
date: 2026-06-12
repo: vitejs/vite
size: M
title: "Config loading now tracks native deps"
excerpt: "Vite adds dependency tracking for native config imports and updates team page metadata."
commits: 2
authors: [sapphi-red]
commit_authors: {"2012930": sapphi-red, "a7e2da8": sapphi-red}
---

### **Config loading with native imports now tracks dependencies** (a7e2da8)
Vite’s native config loader now uses `fresh-import` when available so it can return the config module’s dependency list instead of always reporting none. That makes config reload behavior more accurate for native loading paths and should reduce stale-config edge cases.

### Other misc changes
- Docs team page updated: added sapphi-red, moved Dominik G. to emeriti, and refreshed a few team org details. (2012930)
- Added `fresh-import` to `packages/vite` dependencies and its license entry. (a7e2da8)
