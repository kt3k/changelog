---
date: 2026-10-07
repo: vitejs/vite
size: M
title: "Bundled dev client and watcher fixes land"
excerpt: "Vite updated bundled-dev client plumbing, fixed a watcher path bug, and refreshed dependencies and docs."
commits: 5
authors: [h-a-n-a, btea]
commit_authors: {"182f5b2": h-a-n-a, "5afc5a8": h-a-n-a, "12bb28c": btea}
---

### **Bundled dev now serves the client entry correctly** (5afc5a8)
Vite’s bundled-dev mode now explicitly serves `/@vite/client` and stubs `@vite/env`, with new aliasing/import handling wired into the server and plugin pipeline. This fixes the client-side runtime path in bundled dev and tightens how memory files are exposed.

### **CSS HMR in bundled dev now imports from `/@vite/client`** (182f5b2)
The bundled dev client stops relying on internal HMR plumbing for CSS updates and instead imports the public CSS HMR helpers from `/@vite/client`. That makes the bundled-dev path closer to the normal dev client and reduces special-case behavior.

### **Watcher now normalizes paths before root checks** (12bb28c)
`ensureWatchedFile` now normalizes file paths before deciding whether they are inside the project root, preventing native-path separators from causing incorrect watcher additions. This fixes a cross-platform bug where files inside the root could be treated as out-of-root on Windows.

### Other misc changes
- Non-major dependency bumps across the repo, including rolldown and oxc-parser updates (2 commits)
- Documentation formatting/type-signature cleanup
- Semgrep container image refresh
