---
date: 2026-10-20
repo: vitejs/vite
size: M
title: "Bundled dev HMR gets orphan handling"
excerpt: "Vite fixes bundled-dev HMR propagation for orphaned modules and refreshes create-vite templates to TypeScript 6."
commits: 4
authors: [h-a-n-a, sapphi-red]
commit_authors: {"7471e8c": h-a-n-a, "15c85dd": sapphi-red}
---

### **Bundled dev HMR stops bubbling past orphaned modules** (7471e8c)
The bundled-dev HMR client now tracks import edges more explicitly and stops propagation when a module has been orphaned by the latest patch. That avoids updates bubbling through modules that are no longer imported, reducing incorrect HMR reach and unnecessary reload behavior in bundled-dev playground cases.

### **create-vite templates pin TypeScript 6 again** (15c85dd)
Several TypeScript templates were moved back from `~7.0.2` to `~6.0.3`, and the generator no longer hard-codes the TypeScript 6 override in its TS template logic. This keeps new projects aligned with the current compatibility window until the ecosystem is ready for TS 7.

### **create-vite releases 9.3.1** (c76991f)
The `create-vite` package was versioned to 9.3.1 and its changelog was updated for the release.

### Other misc changes
- js-sourcemap playground tests were adjusted to skip bundled-dev-incompatible cases via explicit reasons instead of `skipIf`.
