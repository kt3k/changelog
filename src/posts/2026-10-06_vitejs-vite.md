---
date: 2026-10-06
repo: vitejs/vite
size: M
title: "Patch release tightens server and HTML handling"
excerpt: "Vite 8.3.3 lands with fs-serve safety fixes, HTML URL normalization, and a dependency update."
commits: 5
authors: [sapphi-red]
commit_authors: {"c3e06f9": sapphi-red, "ba8b7ab": sapphi-red, "22fd1d5": sapphi-red, "7dafd8e": sapphi-red}
---

### **Vite 8.3.3 patch release** (fea5b21)
The repo cuts a new patch release, 8.3.3, bundling the day’s bug fixes into the changelog and package version bump.

### **Fix safe-module tracking to store resolved ids, not URLs** (c3e06f9)
Vite now records resolved module ids in `safeModulePaths` instead of URL-derived paths, which avoids incorrectly marking unresolved SSR imports as safe. The accompanying tests cover the regression and the fs-serve playground validates that filesystem-safe and root-relative paths stay separated.

### **Block `?vite-wasm-instance` from fs-serve access checks** (ba8b7ab)
The transform middleware now treats `vite-wasm-instance` like other sensitive resource-query flags when deciding whether a request is allowed through `fs.serve`. This closes an access-control gap and extends the playground matrix with denial cases for both regular files and `.env` targets.

### **Normalize HTML filenames and protocol-relative proxy URLs** (7dafd8e)
`transformIndexHtml` now strips query strings before deriving the HTML filename, and it normalizes protocol-relative HTML paths so inline proxy URLs are generated safely. The new tests verify that `//`-prefixed requests don’t leak through as scheme-relative proxy URLs.

### Other misc changes
- Dependency bump: `launch-editor-middleware` to v2.14.2 (22fd1d5)
- Release bookkeeping: changelog and package version updates (fea5b21)
