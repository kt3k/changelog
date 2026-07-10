---
date: 2026-07-09
repo: denoland/std
size: M
title: "Import-map cleanup and CI hardening"
excerpt: "Std folded import-map config into deno.json, removed redundant self-maps, and tightened CI/nightly workflows."
commits: 6
authors: [bartlomieju]
commit_authors: {"fb3ed63": bartlomieju, "f74f1ab": bartlomieju, "d6d42f4": bartlomieju}
---

### **Import map consolidation removes redundant self-maps** (d6d42f4)
The root import map was pared down to only non-member tooling dependencies, and the repo-specific `@std/*` self-references were dropped because workspace resolution already handles them. That also lets the project delete the standalone import-map validator and its `lint:import-map` task.

### **Repository config now owns import specifiers** (fb3ed63)
`deno.json` now carries the shared import entries directly, replacing the separate `import_map.json` file. Related workflow and tsconfig references were updated to point at the new source of truth.

### **Nightly workflow is gated to upstream only** (f74f1ab)
The scheduled nightly job now runs only in `denoland/std`, avoiding wasted Actions minutes and fork-only failures. The notify job inherits that skip behavior through its dependency on the test job.

### Other misc changes
- CI switched off canary Deno in the main matrix and retargeted a few jobs to v2.x.
- `no-import-prefix` lint was enabled, with a few inline specifier exceptions/cleanup fixes.
- `fast-check` was declared as a bare specifier in `deno.json`.
- The crypto bench dropped an old FNV comparison against `std/crypto` v0.220.1.
