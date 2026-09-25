---
date: 2026-09-24
repo: vitejs/vite
size: M
title: "Vite patches watcher, optimizer, sourcemaps"
excerpt: "Bug fixes for shutdown, config merging, and sourcemap injection land alongside a release and docs refresh."
commits: 10
authors: [sapphi-red, vjymisal0, btea, murugu-21, h-a-n-a]
commit_authors: {"931ad65": sapphi-red, "f68c0d5": vjymisal0, "6f831f9": sapphi-red, "e5d9af2": btea, "04fc30a": murugu-21, "5f89433": sapphi-red, "6e09961": h-a-n-a, "63567c7": sapphi-red}
---

### **Watcher shutdown no longer reinitializes on late add** (6f831f9)
Fixes a regression where calling `watcher.add()` after the dev server is closed could kick the watcher back into an active state. The new tests cover add-after-close and close-in-flight scenarios, tightening shutdown behavior for server watchers.

### **Sourcemap content injection now skips remote sources** (04fc30a)
`injectSourcesContent()` now leaves maps alone when `sourceRoot` is an external URL and avoids injecting content for external source paths. This prevents Vite from trying to resolve remote sources as local files and adds regression coverage for package-boundary and remote-source cases.

### **Optimizer close now unblocks pending dep processing** (5f89433)
Closing the dep optimizer now clears pending debounce work and resolves queued processing promises even if init never ran. This fixes a shutdown hang when a dependency was discovered before the server started listening and a warmup request was left waiting on unresolved processing.

### **`mergeConfig` handles `server.ws: false` with HMR merges** (f68c0d5)
`mergeConfig` no longer crashes when a config disables `server.ws` and a later merge touches `server.hmr`. The fix preserves the `ws` flag and makes the HMR merge path resilient to missing property descriptors.

### **Release and docs updates for ViteConf 2026** (39ddf7c, 931ad65)
The repo cut `v8.3.1`, and the docs banner/sidebar were updated to point to ViteConf 2026 with a new event link and messaging. This is mostly release housekeeping plus a visible marketing refresh.

### Other misc changes
- Refactor: `create-vite` switches from `cross-spawn` to `tinyexec` (e5d9af2)
- Test-only bundled-dev playground coverage adjustments (6e09961)
- Debug logging added for optimizer waits (63567c7)
- Dependency bumps and lockfile/workflow updates (e8990c4)
