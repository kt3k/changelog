---
date: 2026-08-03
repo: vitejs/vite
size: M
title: "Build config fix, perf tweak, and dependency refresh"
excerpt: "Vite fixed lib build config mutation, sped up CSS chunk lookup, and updated several docs, deps, and test fixtures."
commits: 8
authors: [bluwy, latent-9, shulaoda, yoo-minho, sapphi-red]
commit_authors: {"b4bf596": shulaoda, "1331b0b": yoo-minho}
---

### **Fix build config mutation when inferring lib entry** (b4bf596)
Vite now clones `build.lib` before adding an inferred `entry` from top-level `input`, instead of mutating the user-supplied object. This avoids surprising config side effects and keeps the resolved config isolated from caller state.

### **Speed up pure CSS chunk lookup** (1331b0b)
CSS chunk handling now uses a `Set` for pure-CSS chunk membership checks instead of repeated array որոնups. That’s a small but meaningful performance improvement in build-time CSS processing.

### **Dependency and toolchain updates across the repo** (14454fd, 4adc1e7, 9db65ce)
Updated a broad set of non-major dependencies, including docs tooling, create-vite template deps, and several core packages/workflow actions. Also bumped `rolldown-plugin-dts` and `strip-literal` in `packages/vite`, alongside lockfile refreshes.

### Other misc changes
- Removed the Kinsta entry from the static deploy docs.
- Fixed the environment API example to drop a nonexistent `RemoteEnvironmentTransport` import.
- Trimmed test noise and adjusted fixtures/snapshots, including SSR and import-glob tests.
- Updated a license copyright year in `packages/vite`.
