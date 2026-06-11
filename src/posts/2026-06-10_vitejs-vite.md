---
date: 2026-06-10
repo: vitejs/vite
size: M
title: "HTML import map ordering fix lands"
excerpt: "Vite fixes import map insertion before non-self-closing modulepreload links and updates a few docs/comments and deprecation hints."
commits: 4
authors: [iiio2, mon-jai, shulaoda, sapphi-red]
commit_authors: {"6ebcf6a": iiio2, "4074add": mon-jai, "983b7e3": shulaoda, "e399c89": sapphi-red}
---

### **Fix import map insertion before modulepreload links** (e399c89)
Vite now recognizes `<link rel="modulepreload">` tags whether or not they’re self-closing, so import maps are inserted in the right place. This avoids malformed HTML ordering in cases the previous regex missed.

### Other misc changes
- Updated `create-react-app` source/license links in browser-opening code (6ebcf6a)
- Corrected deprecated `parseAst`/`parseAstAsync` hints to point to the right APIs (983b7e3)
- Updated the Oxc Minifier assumptions reference in the migration guide (4074add)
