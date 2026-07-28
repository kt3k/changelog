---
date: 2026-07-27
repo: biomejs/biome
size: M
title: "Tailwind sorting and inference profiling land"
excerpt: "A Tailwind class-ordering fix and structured type-inference profiling headline the day, with a WeakMap type-codegen cleanup."
commits: 8
authors: [ematipico, minseong0324, johncarmack1984]
commit_authors: {"1258023": minseong0324, "4fb9d39": ematipico, "55c2427": ematipico, "669a96f": johncarmack1984}
---

### **Tailwind v4 sorting now uses property signatures** (669a96f)
The `useSortedClasses` v4 sorter now compares candidates by Tailwind’s property signature, not just property index/count. That aligns Biome’s ordering with Tailwind’s own tie-break rules for broader utilities and arbitrary-property cases, reducing mis-sorts in the v4 preset.

### **Structured type-inference profiling added to `biome check`** (55c2427)
The CLI now wires in a dedicated type-inference profiler path alongside existing rule profiling, with a new check-command option and execution hooks to collect and drain snapshots. This makes it possible to measure inference work separately, which should help diagnose performance regressions and hotspots more precisely.

### **WeakMap global type is now generated, not hand-maintained** (1258023)
`WeakMap` was migrated into generated global type data, keeping its `T, U` type parameters and adding generator validation to enforce the expected shape. This reduces manual divergence in the predefined globals model and makes future codegen changes safer.

### Other misc changes
- Fixed a bench build issue in HTML handling (4fb9d39).
- Dependency bumps: `regex`, `proc-macro2`, `libc`, `jiff`.
- Minor docs and internal cleanup around HTML embeds and codegen fixtures.
