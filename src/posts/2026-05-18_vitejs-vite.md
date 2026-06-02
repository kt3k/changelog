---
date: 2026-05-18
repo: vitejs/vite
size: M
title: "Glob import path handling tightened"
excerpt: "Vite fixed absolute-base glob imports, refreshed glob-import tests, and bumped a couple of related deps."
commits: 4
authors: [shulaoda, cromanenslow]
commit_authors: {"0ae2844": shulaoda, "95975e8": shulaoda}
---

### **Glob imports no longer rewrite paths for absolute base** (0ae2844)
The glob import transformer stops rewriting `importPath` when `base` starts with `/`, which should prevent incorrect URL generation for apps served from an absolute base path. This is a targeted correctness fix for `import.meta.glob` behavior.

### **Glob-import playground moved under a root subdirectory** (95975e8)
The glob-import test fixtures were reorganized into a `root/` subdirectory and the Playwright tests were updated to match. This keeps the playground aligned with how Vite resolves roots and helps cover more realistic path handling.

### Other misc changes
- Dependency bumps: `rolldown-plugin-dts`, `oxc-minify`.
- Docs: updated the pnpm overrides link.
- Test/fixture maintenance for the glob-import playground.
