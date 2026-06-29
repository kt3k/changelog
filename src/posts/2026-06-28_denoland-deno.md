---
date: 2026-06-28
repo: denoland/deno
size: M
title: "Linux desktop launcher env fix"
excerpt: "Deno’s Linux app launcher now exports LAUFEY_RUNTIME_PATH before exec, fixing desktop packaging issue #35578."
commits: 1
authors: [sigmaSd]
commit_authors: {"d3c7a73": sigmaSd}
---

### **Linux desktop launcher now sets LAUFEY_RUNTIME_PATH** (d3c7a73)
The Linux app launcher script now exports `LAUFEY_RUNTIME_PATH` to the packaged dylib before starting the desktop binary. This fixes a packaging/runtime issue on Linux so the launcher can locate the correct runtime path reliably.

### Other misc changes
- None
