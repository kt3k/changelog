---
date: 2026-07-17
repo: biomejs/biome
size: M
title: "Workspace sync fix lands with parser cleanup"
excerpt: "Biome tightens workspace syncing and logging, fixes a namespace-import inference bug, and refactors token-text usage across analyzers."
commits: 3
authors: [dyc3, qzwxsaedc, ematipico]
commit_authors: {"a2589f9": dyc3, "ceee4f4": qzwxsaedc, "72d309b": ematipico}
---

### **Workspace sync and logging hardened** (72d309b)
Biome improved workspace database synchronization and cleaned up CLI logging to reduce noisy output. The logging filter now treats Salsa differently, only showing warn+ events there while preserving the existing behavior for Biome crates and dependencies.

### **Fix inference for default namespace imports** (ceee4f4)
A type-inference bug was fixed so members of default type-only namespace imports are resolved correctly. This removes a false positive in `noUnnecessaryConditions` for discriminated unions accessed through a default import, which could previously flag valid code.

### **Discourage `Text` in favor of `TokenText`** (a2589f9)
Biome added Clippy guardrails and updated several CSS/JS analyzers and formatters to avoid the old `Text` API where a token-level text API is preferred. This is a broad internal refactor that should make token handling more precise and reduce misuse in future changes.

### Other misc changes
- Workspace DB implementation refactor and related synchronization plumbing
- Logging and lint test updates
- Dependency lockfile and changeset updates
