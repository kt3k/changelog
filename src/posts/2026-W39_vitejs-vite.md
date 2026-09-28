---
date: 2026-09-27
repo: vitejs/vite
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: M
title: "Vite hardens dev shutdowns, SSR traces, and optimizer flow"
excerpt: "This week fixed watcher/optimizer shutdown edge cases, SSR stack traces with spaces, and improved create-vite template routing."
commits: 25
---

### **Dev server and optimizer shutdown got more robust**
Vite fixed several edge cases where closing the dev server or dep optimizer could leave background work hanging or accidentally re-activate watchers. Late `watcher.add()` calls after shutdown no longer reinitialize the watcher, and optimizer teardown now clears pending work so queued dep processing can resolve cleanly.

### **SSR debugging and sourcemaps are more reliable**
SSR-evaluated modules now encode `sourceURL` values safely, which fixes stack traces and source-map lookup for paths containing spaces. Sourcemap injection also skips external URLs and remote sources, preventing Vite from trying to treat remote files like local ones.

### **Import scanning and config merging caught correctness bugs**
The optimizer scan regex was tightened so imports whose names start with `type` are no longer misread as TypeScript type-only imports, avoiding missed dependencies during pre-bundling. Vite also hardened `mergeConfig` so `server.hmr` merges no longer crash when `server.ws` is explicitly disabled.

### **create-vite template routing was clarified**
TanStack Start was split out from TanStack Router in `create-vite`, with new Start entries for React and Solid and router-only commands now passing `--router-only`. This should make the starter selection match user intent more closely.

### **Other misc changes**
- Rolldown dev runtime now serves from the installed package, reducing path/layout assumptions
- Forwarded console payloads are capped and object pretty-printing is more constrained
- `create-vite` switched from `cross-spawn` to `tinyexec` in a few paths
- Docs clarified defaults like `server.sourcemapIgnoreList` and `preserveEntrySignatures`
- ViteConf 2026 site/banner updates and `v8.3.1` release housekeeping
- Small refactors, test updates, CI tweaks, dependency bumps, and typo fixes
