---
date: 2026-06-06
repo: vitejs/vite
size: M
title: "Vite tightens pnpm fs handling and deps"
excerpt: "Fixes pnpm global store access, bumps devtools peer range, and cleans up a few broken docs/playground links and comments."
commits: 4
authors: [Kushagra963-lab, Dotify71, jnoordsij, btea]
commit_authors: {"d2c2bc0": jnoordsij, "092320b": btea}
---

### **pnpm global store paths are now allowed in fs restrictions** (092320b)
Vite now reads `node_modules/.modules.yaml` to detect pnpm's virtual store directory and adds it to the filesystem allowlist when needed. This fixes projects using pnpm GVS so Vite can serve files that live outside the workspace root.

### **Devtools peer dependency range is updated** (d2c2bc0)
The `@vitejs/devtools` peer dependency was bumped from `^0.1.18` to `^0.3.0`, aligning Vite with the newer devtools package release.

### Other misc changes
- Fixed broken docs links in the Vite 5.1 announcement and features guide.
- Cleaned up Tailwind playground comments.
