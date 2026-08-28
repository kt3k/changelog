---
date: 2026-08-27
repo: vitejs/vite
size: S
title: "Vite trims dead plugin-container types"
excerpt: "Removed an unused `PluginContainerOptions` interface and a now-unneeded import from the server plugin container."
commits: 1
authors: [ulrichstark]
commit_authors: {"ee64401": ulrichstark}
---

### Other misc changes
- Removed unused `PluginContainerOptions` from `packages/vite/src/node/server/pluginContainer.ts` and dropped the related `OutputOptions` import (ee64401).
