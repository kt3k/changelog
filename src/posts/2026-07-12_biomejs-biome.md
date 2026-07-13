---
date: 2026-07-12
repo: biomejs/biome
size: L
title: "Salsa-powered type inference lands"
excerpt: "Biome adds a new Salsa-based inference engine and cleans up stale Unix daemon sockets from older versions."
commits: 2
authors: [ematipico]
commit_authors: {"01bba12": ematipico, "01a85f0": ematipico}
---

### **Salsa-based inference engine added** (01bba12)
Biome now ships a new type inference engine built on Salsa, replacing the previous module-resolution path for typed analysis. The change is large and foundational: it touches module graph queries, inferred type formatting/interning, benchmarks, and analyzer services, setting up incremental inference across the JS toolchain.

### **Unix daemon now purges stale sockets on startup** (01a85f0)
Biome will now scan the cache for older Unix daemon socket files, verify they’re actual sockets, probe them briefly, and remove stale ones when they’re no longer serving. This reduces startup friction and avoids dead socket buildup across version upgrades.

### Other misc changes
- Changeset for the socket cleanup patch
- Dependency/lockfile updates (1 commit)
