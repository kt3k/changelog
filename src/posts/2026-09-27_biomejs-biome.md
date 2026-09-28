---
date: 2026-09-27
repo: biomejs/biome
size: M
title: "Resolver gets a salsa-backed overhaul"
excerpt: "Biome refactors module resolution onto salsa, fixes a CI bench setup, and refreshes sponsor lists in docs."
commits: 3
authors: [ematipico, dyc3]
commit_authors: {"6ed93b0": dyc3, "f90bf38": ematipico}
---

### **Resolver now uses salsa for long-running workspace updates** (f90bf38)
Biome’s resolver was refactored to use salsa-backed inputs/tracking, which should make module resolution stay in sync with manifest and TypeScript path-mapping changes without needing to edit the importing file. The changeset calls out a fix for long-running workspaces, so this is a meaningful correctness improvement for incremental workflows.

### **Module graph bench updated for the new resolution path** (6ed93b0)
The integration benchmark/support code was adjusted to build the workspace database differently and resolve imports through the module API instead of older cache/layout plumbing. This looks like a CI/bench maintenance fix to keep the benchmark aligned with the refactored resolver.

### Other misc changes
- Sponsor/README updates across localized package docs (1 commit).
