---
date: 2026-07-29
repo: denoland/deno
size: M
title: "Deno hardens Node APIs and npm packument parsing"
excerpt: "Permission checks now gate process.constrainedMemory on Linux/Android, malformed npm scripts no longer break loading, and config can enable no-legacy-abort."
commits: 4
authors: [bartlomieju, nathanwhit, senamakel]
commit_authors: {"1715647": bartlomieju, "3275653": nathanwhit, "3ee245f": bartlomieju, "41e97d3": senamakel}
---

### **Gate `process.constrainedMemory()` behind `systemMemoryInfo` permission** (3275653)
On Linux and Android, `process.constrainedMemory()` now checks `systemMemoryInfo` before reading cgroup memory-limit files and returns a permission error when access is denied. This aligns the Node-compatible API with other memory-related reads and preserves the previous `0` fallback on non-Linux platforms.

### **Treat malformed npm `scripts` fields as empty** (1715647)
The npm cache now tolerates packuments where `scripts` is not an object, instead of failing to load the whole package metadata. That prevents old or malformed registry data from breaking installs while still detecting valid lifecycle scripts.

### **Other misc changes**
- `deno --help` now links to `deno.com/agents.md` for AI agents (3ee245f)
- `no-legacy-abort` can now be enabled from `deno.json` unstable config (41e97d3)
