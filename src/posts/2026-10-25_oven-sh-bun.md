---
date: 2026-10-25
repo: oven-sh/bun
size: M
title: "Fix console.groupCollapsed indentation"
excerpt: "Bun now treats console.groupCollapsed like console.group, fixing indentation and empty-label behavior plus related tests."
commits: 1
authors: [robobun]
commit_authors: {"449877f": robobun}
---

### **console.groupCollapsed now starts a real group** (449877f)
`console.groupCollapsed()` now behaves like `console.group()`: it opens an indented group, closes it with `console.groupEnd()`, and no longer breaks the enclosing indent. Bun also fixed the empty-call case so a label-less group doesn’t print `undefined`, and updated the type docs to match the actual console API.

### Other misc changes
- Added regression tests for empty `group`/`groupCollapsed` handling in dots output and console logging.
