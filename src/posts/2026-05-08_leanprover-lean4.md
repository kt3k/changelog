---
date: 2026-05-08
repo: leanprover/lean4
size: M
title: "Lake config hoisted; CI unblocked"
excerpt: "Lake now stores compiled configs in workspace-local paths, while CI pins a broken action tag to restore builds."
commits: 3
authors: [tydeu, TwoFX, kim-em]
commit_authors: {"41eccce": tydeu, "819f454": TwoFX, "85d46c3": kim-em}
---

### **Lake hoists compiled configs to the workspace** (41eccce)
Lake now writes compiled configuration artifacts into the workspace’s `.lake/config/<pkgIdx>` instead of each package’s own `.lake/config`. This avoids contention when multiple workspaces share a dependency and makes config caching less collision-prone.

### **CI pins test-summary to a stable SHA** (85d46c3)
The build template stops using the broken floating `test-summary/action@v2` tag and pins the action to the immutable v2.4 commit SHA. This unblocks the shared CI template after upstream retagging removed the expected `index.js` from the `v2` target.

### Other misc changes
- Replaced several remaining `String.length` calls with string-position/byte-size aware checks and emptiness tests for correctness on UTF-8 text (819f454)
- Misc internal string-handling cleanups across pretty-printing, docstrings, matching, semantic highlighting, and time formatting (1 commit)
