---
date: 2026-10-01
repo: vitejs/vite
size: M
title: "Vite 8.3.2 lands with perf and server fixes"
excerpt: "Patch release adds worker URL, sourcemap, and watcher fixes, plus smaller perf wins and docs updates."
commits: 10
authors: [BPScott, btea, ShMcK, Tiancheng-Xu, auroraxo, hanityx, Rohan5commit, remcohaszing, kingmakeruix]
commit_authors: {"24bd331": BPScott, "94d0080": btea, "89574f6": ShMcK, "5a3a010": Tiancheng-Xu, "6894f5c": kingmakeruix}
---

### **Patch release: Vite 8.3.2** (1003321)
Vite shipped 8.3.2, pulling in the day’s bug fixes and performance improvements. The release also updates the package version and changelog.

### **Worker URLs now stay aligned across client and SSR with terser** (24bd331)
This fixes a hash mismatch that could appear when building worker URLs under different minifier setups, especially with terser. The change broadens test coverage across default, oxc, and terser client minifiers so client and SSR builds keep generating the same worker asset URL.

### **Sourcemap combination avoids needless encoding work** (89574f6)
Vite now uses decoded intermediate sourcemaps when combining maps during build and SSR transforms, instead of always re-encoding them first. That should reduce overhead in sourcemap-heavy builds while preserving identical output.

### **Dev server now logs watcher errors instead of crashing silently** (6894f5c)
File watcher `'error'` events are handled explicitly during server setup and reported through the logger. This makes filesystem/watch problems visible to users instead of risking an unhandled failure during environment initialization.

### **Previous environments are released after server initialization** (5a3a010)
The dev server now clears `previousEnvironments` once initialization completes, preventing old server graphs from being retained across restarts. That should help avoid memory leaks in long-running or repeatedly reloaded sessions.

### **Time middleware is only registered when debug timing is enabled** (94d0080)
Vite now checks a dedicated debug flag before wiring up request timing middleware, instead of keying off `process.env.DEBUG` directly. This trims unnecessary middleware setup on normal runs.

### Other misc changes
- Release metadata: changelog and version bump for 8.3.2
- Docs fixes and troubleshooting guidance updates
- Minor typo/link corrections in environment API docs
- Additional tests around sourcemaps, watcher errors, and dev server cleanup
