---
date: 2026-05-07
repo: vitejs/vite
size: M
title: "Vite 8.0.11 ships devtools integration"
excerpt: "Rolldown and devtools integration land, with a bug fix for environment config isolation and routine dependency updates."
commits: 8
authors: [sapphi-red, bluwy, webfansplz, shulaoda, grzdev]
commit_authors: {"66f3194": sapphi-red, "3c8bf06": webfansplz, "7c2aa3b": sapphi-red, "3f80524": shulaoda}
---

### **DevTools integration lands in build and runtime** (3c8bf06)
Vite now loads `@vitejs/devtools` integration directly into its plugin pipeline and builder flow, and bumps the package requirement to `^0.1.18`. This shifts devtools from a separate command-style hook to a tighter internal integration, which should make the feature work more consistently during builds and dev sessions.

### **Environment config mutations are isolated per environment** (7c2aa3b)
`resolveConfig` now deep-clones non-client default environment options before merging, so mutations made by one `configEnvironment` hook no longer leak into others. The added tests cover both the isolation fix and the shared-reference behavior for `build.terserOptions.nameCache`.

### **Rolldown 1.0.0-rc.18 is now the default** (3f80524)
Vite updates its Rolldown dependency to `1.0.0-rc.18` across the repo. The accompanying worker sourcemap test adjustment suggests output details changed with the new release, so this is a meaningful engine upgrade rather than a simple bump.

### **Vite 8.0.11 release cut** (66f3194)
The repo version is bumped to `8.0.11` and the changelog is published for the release. This bundles the day’s notable fixes, refactors, and dependency updates into a formal patch release.

### Other misc changes
- Non-major dependency refreshes and lockfile updates (2 commits)
- Additional Rolldown-related dependency bumps
- Async removal refactor across build/config/plugin internals
- CI/workflow pnpm action updates
- create-vite help test tweak
