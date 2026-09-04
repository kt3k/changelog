---
date: 2026-09-03
repo: vitejs/vite
size: M
title: "Bundled dev payload tracking fixed"
excerpt: "Client-delivered lazy chunks now report back to the server, fixing incorrect payload accounting and adding a regression test."
commits: 2
authors: [bluwy, h-a-n-a]
commit_authors: {"07d6570": bluwy, "a6d43bc": h-a-n-a}
---

### **Lazy chunk delivery is now acknowledged by the client** (a6d43bc)
Vite now marks bundled dev payloads as delivered only after the browser evaluates them, instead of when the HTTP response finishes. This fixes a race in lazy compilation where the server could incorrectly assume a client had a chunk and omit factories it still needed.

### Other misc changes
- Docs: removed an example file name from the JavaScript API guide (07d6570).
