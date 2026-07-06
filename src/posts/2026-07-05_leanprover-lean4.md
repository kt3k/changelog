---
date: 2026-07-05
repo: leanprover/lean4
size: M
title: "Lake config recovery gets more robust"
excerpt: "Lake now flushes config traces before truncation and falls back to reconfiguration when the trace is unreadable or invalid."
commits: 2
authors: [kim-em]
commit_authors: {"ecf55de": kim-em, "357167b": kim-em}
---

### **Recover from interrupted config writes** (357167b)
Lake now flushes the compiled-configuration trace before truncating the file and starting the slower elaboration step. That closes a window where an interrupted `lake` process could leave behind a zero-length placeholder, making later runs unrecoverable.

### **Reconfigure on unparsable config traces** (ecf55de)
If Lake can’t parse the saved configuration trace, it now treats that the same as a stale or missing trace and reconfigures automatically instead of aborting with an error. This makes startup more resilient when the trace is corrupted or partially written.

### Other misc changes
- None.
