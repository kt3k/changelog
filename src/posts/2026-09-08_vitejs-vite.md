---
date: 2026-09-08
repo: vitejs/vite
size: M
title: "Preload path gets faster in build output"
excerpt: "Build preload logic now skips settling undefined deps, trimming unnecessary Promise work and slightly changing sourcemap output."
commits: 1
authors: [StirStudios]
commit_authors: {"e6f6b3e": StirStudios}
---

### **Build preload performance improved** (e6f6b3e)
The build-time preload helper now filters out `undefined` entries before calling `Promise.allSettled`, avoiding extra `Promise.resolve` overhead for deps that are already skipped. This is a small but meaningful performance tweak in the generated preload path, with the test fixture updated to reflect the resulting sourcemap shift.

### Other misc changes
- None
