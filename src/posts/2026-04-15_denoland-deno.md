---
date: 2026-04-15
repo: denoland/deno
size: M
title: "Node require compat tightened; canary test fixed"
excerpt: "Deno’s Node compatibility got stricter around require.resolve, while the canary upgrade spec was made dynamic and Windows-safe."
commits: 3
authors: [bartlomieju]
commit_authors: {"2318a02": bartlomieju, "f0e5513": bartlomieju, "cfae922": bartlomieju}
---

### **Node require.resolve now matches Node more closely** (2318a02)
`Module._resolveLookupPaths` now returns `null` for built-ins, `require.resolve`/`.paths` validate argument types, and `options.paths` entries are checked before use. The patch also fixes a panic with empty parent filenames and adjusts resolution behavior for `node:unknown` and `.`/relative requests, improving compatibility and reducing edge-case crashes.

### Other misc changes
- Fixed the specific canary upgrade test on Windows by using the `.exe` suffix and widening the platform gate. (f0e5513)
- Made the specific canary upgrade test fetch the latest canary hash dynamically and updated its golden outputs. (cfae922)
