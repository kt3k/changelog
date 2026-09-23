---
date: 2026-09-22
repo: vitejs/vite
size: M
title: "Vite fixes import scanning and docs clarifications"
excerpt: "A bugfix tightens dependency scanning for type-prefixed imports, alongside a few docs corrections for config defaults and Rolldown behavior."
commits: 4
authors: [kakiuwang-ui, btea, koriyoshi2041, GhaythBenAbid]
commit_authors: {"1544bb1": kakiuwang-ui, "39330f4": btea, "bd97903": koriyoshi2041, "15569ce": GhaythBenAbid}
---

### **Import scanner now handles bindings starting with `type`** (39330f4)
The optimizer scan regex was tightened so imports like `import typescript from 'typescript'` and `import typeorm from 'typeorm'` are no longer misclassified as `import type`. This prevents missed dependencies during pre-bundling and avoids a subtle false negative in the import scanner.

### **Other misc changes**
- Corrected the documented default for `server.sourcemapIgnoreList` to match path-segment matching, not a simple substring check (1544bb1)
- Documented Vite’s `preserveEntrySignatures` defaults for regular, library, and SSR builds (bd97903)
- Fixed a typo in the plugins guide: “builtin” → “built-in” (15569ce)
