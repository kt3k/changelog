---
date: 2026-06-01
repo: vitejs/vite
size: M
title: "Vite hardens fs serving and bumps deps"
excerpt: "Windows path bypasses are blocked, rolldown cleanup is fixed, and the release train rolls forward with several dependency updates."
commits: 11
authors: [sapphi-red, francisjohnjohnston-web, jnoordsij, kb019, bluwy]
commit_authors: {"f94df87": sapphi-red, "dc245c7": sapphi-red, "50b9512": sapphi-red, "8d1b019": sapphi-red, "e3cfb9d": francisjohnjohnston-web, "954cc10": jnoordsij, "6978a9c": kb019, "7bb02a5": bluwy}
---

### **Block Windows path bypass tricks in fs serving** (dc245c7)
Vite now rejects Windows short-name paths containing `~` and any path with `:` that could be used for NTFS alternate data streams. This closes a class of local file-serving bypasses and tightens `fs.strict` enforcement.

### **Close rolldown bundles even when write() fails** (e3cfb9d)
The optimizer now closes the rolldown bundle in a `finally` block after `write()`. That prevents resource leaks and makes failed optimizer runs safer to recover from.

### **Release version updates and dependency hardening** (f94df87, 50b9512, 8d1b019, 2686d7d, e04b317, 3052a67, 954cc10, 6978a9c, 7bb02a5)
The day also includes the v8.0.15 and v8.0.16 release bumps, a launch-editor-middleware patch, a broad non-major dependency refresh, rolldown-related dependency updates, and a CI matrix update to Node 26.

### Other misc changes
- Fixed a small internal `collectAllModules` traversal bug.
- Added the Code of Conduct to docs navigation.
- Pinned docs deployment dependencies.
- Updated release/package metadata and template dependency versions.
