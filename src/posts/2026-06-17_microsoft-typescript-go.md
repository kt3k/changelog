---
date: 2026-06-17
repo: microsoft/typescript-go
size: L
title: "Watch build overhaul and packaging notice fix"
excerpt: "Build mode was reworked around fswatch, and native preview packages now ship NOTICE.txt correctly."
commits: 2
authors: [jakebailey, johnfav03]
commit_authors: {"241df12": jakebailey, "2fb5d4c": johnfav03}
---

### **Rebuilt build mode around `fswatch`** (2fb5d4c)
Build watching was substantially refactored to use the new `fswatch`/watchmanager plumbing instead of the older timestamp-tracking approach. This changes how build mode detects file changes, config updates, and watcher races, and it ships with a broad set of updated watch-mode baselines to cover the new behavior.

### **Include NOTICE.txt in native preview packages** (241df12)
The packaging scripts now copy `NOTICE.txt` into the main native preview package and ensure it is listed in the packaged files. This fixes license/compliance metadata so downstream consumers actually receive the notice that was previously omitted.

### Other misc changes
- None beyond the two high-impact commits.
