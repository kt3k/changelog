---
date: 2026-11-18
repo: vitejs/vite
size: M
title: "Plugin errors, optimizer fixes, Solid 2 templates"
excerpt: "Vite improved plugin error reporting, fixed optimizer tsconfig/hash edge cases, and updated Solid templates for Solid 2."
commits: 5
authors: [btea, imryanthedev, materwelonDhruv, brenelz]
commit_authors: {"760a953": imryanthedev, "d7dfe9b": btea, "40475e5": materwelonDhruv, "3c22583": btea, "3dfda24": brenelz}
---

### **Plugin hook errors now include plugin context** (40475e5)
Vite now wraps failures from several plugin hooks with the plugin name and hook, so error messages are easier to trace back to the source. The change also preserves existing `plugin` metadata when present and rethrows non-Error values unchanged.

### **Optimizer respects the top-level tsconfig setting** (760a953)
The dependency scanner and optimizer now honor the project-level `tsconfig` option instead of accidentally picking up a nested `src/tsconfig.json`. This avoids failed scans/bundles in setups with linked packages or missing inherited configs, and the config hash now reflects that top-level choice.

### **Lockfile hashing detects in-place patch edits** (d7dfe9b)
The optimizer’s lockfile hash now includes individual `.patch` file mtimes under patch-enabled lockfile formats, not just the patches directory mtime. That means editing an existing patch file invalidates the cache correctly instead of being missed.

### **Solid templates switched to Solid 2 packages** (3dfda24)
`create-vite`’s Solid templates now use `solid-js` 2.x, `@solidjs/web`, and `@solidjs/vite-plugin` instead of the older `vite-plugin-solid` setup. New projects generated from these templates will start on the current Solid stack.

### Other misc changes
- Build plugin cleanup: skip the license plugin earlier when `build.license` is disabled (3c22583)
