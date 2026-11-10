---
date: 2026-11-09
repo: oven-sh/bun
size: M
title: "CSS layer ordering and macro security fixes"
excerpt: "Bun fixes rare CSS layer-order bugs and blocks macros from data: URL modules, plus Windows bun run/bin safety checks."
commits: 2
authors: [dylan-conway, alii]
commit_authors: {"af566a3": dylan-conway, "cd40cef": alii}
---

### **Fix CSS layer ordering in rare bundling cases** (cd40cef)
Bun now preserves layer order when imports are hoisted or when an import resolves to something that is not a stylesheet, avoiding cases where the wrong CSS rule could win. The fix covers four edge cases left behind by the previous CSS layering work and adds regression tests.

### **Block macros in `data:` URL modules** (af566a3)
Macro expansion is now denied not just in `node_modules`, but also in `data:` URL modules. This closes a security/consistency gap in both parse paths that handle `with { type: "macro" }`.

### Other misc changes
- `bun run` / `bunx` on Windows now rejects cmd.exe metacharacters when launching `.cmd`/`.bat` bins.
- Added tests for Windows bin argument validation and macro handling in data URLs.
