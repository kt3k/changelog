---
date: 2026-11-20
repo: vitejs/vite
size: M
title: "Vite trims build overhead and fixes Windows paths"
excerpt: "Build-time optimizations skip unnecessary hooks and terser setup, while Windows realpath handling now preserves drive-letter case."
commits: 3
authors: [camc314, btea]
commit_authors: {"3567471": btea, "1a06564": camc314, "3bde8ed": camc314}
---

### **Preserve Windows drive-letter case in `safeRealpathSync` (3567471)**
Vite now keeps the input drive letter’s casing when resolving local Windows paths, matching how `process.cwd()` and `import.meta.url` may spell them. This avoids subtle path mismatches in downstream path-derived logic.

### **Skip import-analysis hooks for unaffected build chunks (1a06564)**
The build import-analysis plugin now splits preload-hash bookkeeping from the modern-flag replacement path, so chunks that don’t need preload hashing avoid extra work. This narrows the render-time overhead in builds without changing the emitted modern/legacy behavior.

### **Avoid loading terser unless it can actually minify output (3bde8ed)**
The terser plugin now only applies when `build.minify` is `terser`, or when legacy-chunk minification specifically needs it. That cuts unnecessary plugin setup for non-terser builds and keeps legacy support intact.

### Other misc changes
- Windows path resolution tests added
- Terser plugin coverage expanded
- Build-time plugin refactor for preload hash handling
