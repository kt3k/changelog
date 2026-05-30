---
date: 2026-03-10
repo: nodejs/node
size: L
title: "SEA ESM caching lands; fs cpSync fixed"
excerpt: "Node adds SEA code cache support for ESM entrypoints, fixes Unicode cpSync regressions, and updates SQLite plus other deps."
commits: 8
authors: [nodejs-github-bot, joyeecheung, panva, StefanStojanovic]
commit_authors: {"9ff27fd": joyeecheung, "c96c3da": panva, "95ee87d": StefanStojanovic, "3dff7ef": nodejs-github-bot}
---

### **SEA now supports code cache for ESM entrypoints** (9ff27fd)
Single-executable apps can now bundle and consume code cache for ESM entrypoints, following the existing CJS SEA flow but wired through `SourceTextModule`/`Module::New`. This closes a gap in SEA startup support and should improve launch behavior for ESM-based executables.

### **fs.cpSync no longer breaks on non-ASCII destinations** (95ee87d)
`cpSync()` was adjusted to use the resolved path objects consistently for file removal, copying, and timestamp preservation. That fixes a Unicode destination regression and restores reliable recursive copies to paths containing non-ASCII characters.

### **SQLite updated to 3.52.0** (3dff7ef)
Node pulls in a major SQLite bump with a large amalgamation refresh. This brings in upstream engine changes and new documented/configurable behavior, including a new `SQLITE_DBCONFIG_FP_DIGITS` option.

### **Built-in module path handling was fixed** (c96c3da)
The `--node-builtin-modules-path` build path was corrected so disk-loaded builtins don’t unnecessarily participate in rebuild tracking. This should make custom builtin-path builds more reliable and less noisy in incremental builds.

### Other misc changes
- Updated `amaro` to 1.1.8 and refreshed its generated artifacts.
- Updated `merve` to 1.2.0, including lexer/parser concurrency and error-location work.
- Refreshed WPT fixtures for URL and WebCryptoAPI.
