---
date: 2026-07-03
repo: oven-sh/bun
size: M
title: "Fix maxBuffer overreads in spawn"
excerpt: "Bun now stops reading as soon as maxBuffer is exceeded, preventing chatty child processes from growing output beyond the limit while the kill catches up."
commits: 1
authors: [robobun]
commit_authors: {"5d76ac6": robobun}
---

### **spawn: stop reading once maxBuffer is exceeded** (5d76ac6)
Bun now stops the pipe reader immediately when `maxBuffer` is crossed, instead of only killing the child and continuing to accumulate output while termination is asynchronous. This closes a memory-overrun gap and brings `spawnSync` behavior in line with Node.js for oversized child output.

### Other misc changes
- Updated child-process docs to explain the new maxBuffer behavior
- Added/updated spawn maxBuffer regression coverage
