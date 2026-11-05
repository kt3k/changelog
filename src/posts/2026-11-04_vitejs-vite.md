---
date: 2026-11-04
repo: vitejs/vite
size: M
title: "Optimizer and build fixes land"
excerpt: "Vite fixes subpath import resolution, stabilizes chunk import map hashes, and reduces noisy task invalidations."
commits: 5
authors: [btea, mandyheg, lifeiscontent]
commit_authors: {"8069835": mandyheg, "7a425e8": btea, "0fdd81e": btea, "95c2daf": lifeiscontent}
---

### **Fix optimizer resolution for package subpath imports** (0fdd81e)
Vite’s dep optimizer now recognizes `#`-prefixed package import specifiers and resolves them through Vite’s resolver. This unblocks dependencies that rely on `package.json` `imports` maps, and the new playground coverage exercises both dev and prod conditions.

### **Make chunk import map hashes stable across build folders** (8069835)
The build now generates chunk import map signatures using stable module IDs rather than paths that vary with the build directory. This prevents identical projects copied into different temp folders from producing different hashed filenames, which avoids needless cache misses and flaky output.

### **Ignore pnpm’s `.modules.yaml` as a task input** (95c2daf)
Vite Task no longer treats pnpm’s generated `.modules.yaml` as a meaningful input, since pnpm rewrites it on install with volatile metadata. That stops installs alone from invalidating cached builds.

### Other misc changes
- Test cleanup for playground symlink copying in temp dirs (7a425e8)
- Dependency bump: follow-redirects 1.16.1 → 1.16.2 (1f60d62)
