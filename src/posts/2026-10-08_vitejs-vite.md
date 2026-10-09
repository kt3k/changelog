---
date: 2026-10-08
repo: vitejs/vite
size: M
title: "HMR, build, and dev-server fixes"
excerpt: "Vite adds bundled-dev partial HMR acceptance and lands several fixes across dev restarts, preload, HTML, static aliases, and optimizer scans."
commits: 16
authors: [sapphi-red, h-a-n-a, Companion, xyrolle, nulluid, bhumin18, januththedev, hungateJoseph, Cherry]
commit_authors: {"8579189": sapphi-red, "b28db28": Companion, "bc0f21c": h-a-n-a, "2a8c0f0": sapphi-red, "70d56ea": nulluid, "036b745": bhumin18, "15d82f7": hungateJoseph}
---

### **Bundled dev HMR now supports partial export acceptance** (bc0f21c)
Vite’s bundled dev client can now handle `import.meta.hot.acceptExports`, including tracking imported bindings and distinguishing full self-accepts from export-only accept cases. This broadens HMR support in bundled dev and helps avoid unnecessary reloads when only specific exports are accepted.

### **Dev server restarts now correctly queue follow-up requests** (70d56ea)
A restart requested while another restart is already in flight is no longer dropped, and additional requests made during the follow-up restart are also preserved. This fixes a race that could leave the server on stale config after rapid consecutive restarts.

### **Build preloads now wait for in-flight stylesheet loads** (036b745)
The preload helper now de-duplicates concurrent preloads and reuses the same in-flight promise, instead of firing duplicate fetches. That prevents redundant work and fixes timing issues when stylesheets are still loading during build-time preload generation.

### **Static aliases now match on path boundaries** (b28db28)
Static file serving now applies aliases more precisely, avoiding false matches like `/images` accidentally catching `/images-extra`. This makes aliased static assets resolve the way users expect and closes a class of incorrect file lookups.

### **Chunk import maps respect the configured base path** (2a8c0f0)
When `chunkImportMap` is enabled with a non-root `base`, emitted import-map entries and generated entry code now stay aligned. This fixes broken preload/import-map URLs under subpath deployments.

### **Optimizer scans now catch deep imports in custom extensions** (8579189)
Dependency scanning was adjusted so custom HTML-like extensions such as `.svelte` are handled correctly during deep-import discovery. This prevents missed dependencies and resolution errors in optimized deps that rely on non-JS extension chains.

### **CSS preload caching no longer breaks on import cycles** (15d82f7)
Vite now avoids caching a partial CSS dependency list when a chunk is encountered mid-analysis through a cycle. That keeps subsequent entries from inheriting incomplete CSS preload data and fixes incorrect stylesheet ordering/coverage.

### Other misc changes
- Release v8.3.4 (1 commit)
- CSS adopted-style HMR fix for unchanged styles
- HTML watcher root handling fix
- Remove input option unescaping for now
- Skip treating js-like query endings as JS
- Lightning CSS preprocessor import resolution fix
- HMR defaults immutability fix
- Module runner sourcemap cloning perf tweak
- Test-only updates and coverage expansions (several commits)
