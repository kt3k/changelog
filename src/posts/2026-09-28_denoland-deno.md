---
date: 2026-09-28
repo: denoland/deno
size: M
title: "Android errno handling fixed in core TTY layer"
excerpt: "Deno now uses the correct errno accessor on Android bionic, avoiding platform-specific failures in core TTY compat code."
commits: 1
authors: [hax0r31337]
commit_authors: {"1b48a20": hax0r31337}
---

### **Fix Android bionic errno lookup in TTY compat** (1b48a20)
Deno’s core TTY compatibility layer now calls `__errno()` on Android instead of falling through to the non-Linux fallback. This closes a platform-specific gap for Android bionic builds and should prevent errno-related breakage there.

### Other misc changes
- None
