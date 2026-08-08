---
date: 2026-08-07
repo: microsoft/typescript-go
size: M
title: "Workspace symbols get current-project scope"
excerpt: "Adds workspace/symbol scoping to the active document and fixes a watcher close race that could panic during file watch reconciliation."
commits: 2
authors: [jakebailey, johnfav03]
commit_authors: {"24fabe9": jakebailey, "f630355": johnfav03}
---

### **Workspace symbol requests now carry the active document scope** (24fabe9)
The extension now intercepts `workspace/symbol` requests and injects the current supported document URI as `textDocument`, letting the server scope results to the active project. The server and fourslash coverage were updated to honor this new parameter, including a test that ensures workspace symbols come from the current project instead of unrelated folders.

### **Fix LSP watcher close race during WatchFiles** (f630355)
`WatchFiles` now checks whether the watcher has been closed after acquiring the lock, and cleanly tears down the pending watch instead of racing into a panic. A regression test covers the close-vs-reconcile path to make sure this shutdown race returns an error instead of crashing.

### Other misc changes
- Updated generated LSP protocol types and user preferences helpers for the new workspace symbol parameter.
- Minor baseline/test plumbing changes for fourslash coverage.
