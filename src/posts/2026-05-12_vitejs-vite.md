---
date: 2026-05-12
repo: vitejs/vite
size: M
title: "Fix CSS worker teardown on server close"
excerpt: "Vite now awaits Sass/Less/Stylus worker shutdown, preventing lingering processes after CSS preprocessing."
commits: 1
authors: [jaknas]
commit_authors: {"b7edcb7": jaknas}
---

### **Await preprocessor worker disposal during teardown** (b7edcb7)
Vite now waits for CSS preprocessor workers to fully stop when the server/build tears down, instead of firing-and-forgetting the close calls. This fixes lingering Sass/Less/Stylus child processes and the related teardown bug reported in #22274.

### Other misc changes
- Added a regression test covering Sass worker cleanup on `server.close()`.
