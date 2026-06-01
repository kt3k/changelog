---
date: 2026-04-20
repo: microsoft/typescript-go
size: M
title: "Declaration emit and auto-imports improved"
excerpt: "JS declaration emit now remaps type nodes more accurately, auto-import realpaths follow symlinked deps, and rename ranges are tighter."
commits: 7
authors: [jakebailey, andrewbranch, auvred]
commit_authors: {"98f57c9": jakebailey, "59360d9": jakebailey, "5a4e6db": jakebailey, "27b6dd1": andrewbranch, "dfa7a1d": auvred}
---

### **JS declaration emit now remaps JS type nodes** (74841e4)
Declaration emit now tries to convert JS type nodes back into TypeScript-construct equivalents before falling back to full serialization. This fixes a class of `.d.ts` output issues for JS sources, including cleaner emitted types in the updated baselines.

### **Auto-import realpath resolution now follows symlinked packages** (27b6dd1)
The module auto-import path mapping was expanded to handle symlinked dependencies reached through `node_modules`, caching per-package directory realpaths instead of repeatedly resolving every file. That prevents duplicate cache keys for the same physical file and avoids the memory blowups seen in barrel/re-export-heavy projects.

### **`prepareRename` now returns a more accurate range** (dfa7a1d)
Rename handling now starts from the node's true start position instead of the raw node position. This makes the LSP `prepareRename` response line up better with what users actually need to rename.

### Other misc changes
- Added submodule triaged baseline support and existence checks; reorganized accepted/triaged baseline handling (59360d9, 98f57c9)
- Switched small CI jobs to `ubuntu-slim` and bumped GitHub Actions dependencies (5a4e6db, 76ce739)
