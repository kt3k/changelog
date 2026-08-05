---
date: 2026-08-04
repo: microsoft/typescript-go
size: M
title: "Fix false symlink mapping in declaration emit"
excerpt: "A targeted compiler fix prevents physical dependencies from being misclassified as symlinks, correcting JS declaration emit in JSDoc import cases."
commits: 1
authors: [platypii]
commit_authors: {"12318e5": platypii}
---

### **Avoid false symlink mappings for physical dependencies** (12318e5)
The compiler now skips symlink-cache processing when a package resolution has no original path, preventing physical dependencies from being treated like symlinked ones. This fixes a declaration-emit bug where unrelated JSDoc imports could be reused and emitted under the wrong package path.

### Other misc changes
- Added regression test coverage for JS declaration emit with JSDoc imports.
- Updated compiler baseline output for the new test case.
