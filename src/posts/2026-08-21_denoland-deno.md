---
date: 2026-08-21
repo: denoland/deno
size: L
title: "Unix pipe ownership and SQLite sessions fixed"
excerpt: "Core Unix pipe FD ownership was clarified, and node_sqlite now safely invalidates sessions when databases close or reopen."
commits: 3
authors: [nathanwhit, techs-sus]
commit_authors: {"98f9507": nathanwhit, "cc6dd5e": nathanwhit}
---

### **Unix pipe descriptors now have explicit ownership** (cc6dd5e)
The Unix pipe compatibility layer now tracks whether a descriptor is owned by the raw handle, a Tokio stream/listener, or an in-flight connect future, instead of relying on looser FD borrowing. That fixes ownership transitions across connect/accept/listen paths and reduces the risk of double-closing or dangling descriptor use.

### **SQLite sessions are invalidated when the database closes** (98f9507)
`node:sqlite` now tracks active sessions on each `DatabaseSync` and deletes them before the underlying connection is closed. This prevents stale session objects from surviving a reopen and being mistaken for live handles, which avoids hard-to-debug misuse and lifetime bugs. 

### Other misc changes
- Fixed the `nix-update-rusty-v8` script to target the simdutf release artifact (1 commit).
