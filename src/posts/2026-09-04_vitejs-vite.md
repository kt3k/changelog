---
date: 2026-09-04
repo: vitejs/vite
size: M
title: "Vite fixes package root and asset URL handling"
excerpt: "Important fixes improve nested package detection, preserve hashed asset URLs in build hooks, and stop inlining preload links."
commits: 4
authors: [btea, kakiuwang-ui, sapphi-red]
commit_authors: {"8492422": btea, "12e709c": kakiuwang-ui, "e8d6a4d": sapphi-red}
---

### **Fix package root detection for nested manifests** (8492422)
Vite now resolves the real package root even when it encounters nested `package.json` files inside pnpm stores, hoisted layouts, scoped packages, and Yarn PnP zip paths. This prevents license/package metadata from being attributed to the wrong manifest and avoids missing the package version in those layouts.

### **Stop inlining preload/modulepreload links** (12e709c)
HTML handling now treats `modulepreload`, `preload`, and `prefetch` links as non-inlineable, so Vite keeps their targets as URLs instead of turning them into base64 data. That matters for correctness and browser behavior: preload links should remain fetchable references, not embedded assets.

### **Preserve hash placeholders in `resolveFileUrl`** (e8d6a4d)
The asset pipeline now unescapes encoded hash placeholders after URI encoding, so external plugins that emit preliminary chunk URLs still get their `!~{hash}~` markers resolved correctly. This fixes emitted worker/chunk URLs across multiple base-path configurations and ensures the referenced chunk still loads.

### Other misc changes
- Enabled `minimumReleaseAgeStrict` in the pnpm workspace config (1 commit).
