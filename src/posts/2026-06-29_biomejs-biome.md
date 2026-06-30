---
date: 2026-06-29
repo: biomejs/biome
size: M
title: "LSP typing gets smoother"
excerpt: "Biome debounces LSP diagnostics on rapid edits, while also refreshing snapshots and bumping a few dependencies and workflows."
commits: 4
authors: [ematipico]
commit_authors: {"dd1429c": ematipico}
---

### **Debounced LSP diagnostics to avoid editor lag** (dd1429c)
Biome now schedules diagnostics after edits instead of running them immediately, so typing in large files should feel much less blocked. The change also closes pending diagnostics when a document is shut, and the new test coverage verifies that rapid successive changes only publish the latest diagnostics.

### Other misc changes
- Updated `anyhow` to 1.0.103.
- Refreshed CLI snapshots for config-extending and monorepo-related cases.
- Bumped several GitHub Actions and release workflow pins, plus Node.js in beta workflows.
- Other CI/dependency maintenance updates (1 commit).
