---
date: 2026-07-02
repo: vitejs/vite
size: M
title: "Vite 8.1.3 lands SSR and CSS fixes"
excerpt: "Vite 8.1.3 ships with shebang-safe CSS injection and SSR stacktrace column fixes, plus a dependency bump."
commits: 5
authors: [sapphi-red, shulaoda, dogledogle]
commit_authors: {"1534d36": shulaoda, "c4acd69": sapphi-red}
---

### **Shebang-safe CSS injection** (1534d36)
Vite now injects inlined CSS after a file’s shebang line instead of into it, preserving executable script headers. The fix also handles shebang-only files by adding the injected code on a new line.

### **SSR stacktraces now point to the right first-line column** (c4acd69)
The SSR module runner and stacktrace offset logic were updated so the prepended `"use strict";` directive no longer skews first-line column numbers. This makes server-side errors much more accurate and easier to debug.

### Other misc changes
- Release v8.1.3
- Dependency bump: `es-module-lexer` to 2.3.0
- Docs grammar tweak in migration guide
