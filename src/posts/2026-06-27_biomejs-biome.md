---
date: 2026-06-27
repo: biomejs/biome
size: M
title: "Windows daemon pipe detection fixed"
excerpt: "Biome CLI now finds daemon pipes on Windows again after switching to the correct service prefix."
commits: 1
authors: [WaterWhisperer]
commit_authors: {"a918af0": WaterWhisperer}
---

### **Fix Windows daemon pipe discovery** (a918af0)
Biome CLI now looks for `biome-service*` pipes on Windows instead of the old `rome-service*` prefix, restoring detection of running daemon instances. This fixes `biome rage` on Windows when it needs to connect to the Biome daemon.

### Other misc changes
- Patch release note added for the Windows daemon pipe fix.
