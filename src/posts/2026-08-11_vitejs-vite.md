---
date: 2026-08-11
repo: vitejs/vite
size: M
title: "Optimizer bundle cleanup lands"
excerpt: "Vite fixes Rolldown bundle lifecycle issues in optimizer and define transforms, plus docs clarify middleware mode and server typing."
commits: 6
authors: [btea, Chanjeong, teamleaderleo, dogledogle]
commit_authors: {"b4d66fe": btea, "9c75eb1": btea, "2c485d6": Chanjeong, "8fb7675": teamleaderleo, "a0cfcf7": btea, "0cba7fe": dogledogle}
---

### **Close Rolldown bundles after optimizer export analysis** (8fb7675)
Vite now ensures the temporary Rolldown bundle used while analyzing custom `optimizeDeps.extensions` is closed after `generate()`. This prevents leaked resources and makes optimizer-only `closeBundle` hooks run reliably.

### **Close the define-plugin bundler after generation** (b4d66fe)
The define plugin test now closes its bundler in a `finally` block after generating output. This guards against resource leaks in the transform path and matches the lifecycle the optimizer fix is enforcing elsewhere.

### **Other misc changes**
- Docs: correct `server.middlewareMode` type and note WebSocket proxy server requirements (9c75eb1)
- Docs: fix grammar/highlight-line tweaks in SSR and Vite 5.1 blog post (2c485d6, 0cba7fe)
- Chore: fix TypeScript errors in a build test case (a0cfcf7)
