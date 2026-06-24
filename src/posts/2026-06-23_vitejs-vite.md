---
date: 2026-06-23
repo: vitejs/vite
size: L
title: "Vite 8.1 lands with bundled dev fixes"
excerpt: "Vite 8.1, create-vite 9.1.0, and plugin-legacy 8.1.0 ship alongside a bundled-dev recovery fix and Rolldown 1.1.2."
commits: 8
authors: [sapphi-red, btea, h-a-n-a, shulaoda]
commit_authors: {"64dfee1": sapphi-red, "1239e94": sapphi-red, "63b1489": sapphi-red, "57f59bc": btea, "9a0dd48": h-a-n-a, "4f008a6": shulaoda}
---

### **Vite 8.1.0 release with bundled-dev recovery and API updates** (63b1489)
Vite core is now officially at 8.1.0, and this release folds in a set of meaningful bug fixes and refactors around bundled dev mode, environment handling, and HTML/config plugin APIs. The package metadata was also refreshed, including updated exports/files fields and the new `rolldown`-aligned types in docs.

### **Bundled dev now preserves and replays build errors more reliably** (9a0dd48)
Bundled dev mode got a substantial resilience fix: build errors are cached and replayed to newly connected clients, and the server now knows when to defer or force a full reload based on whether the failure happened during HMR-stage generation. This should make incremental build failures easier to recover from instead of leaving the dev server in a stale or confusing state.

### **Rolldown updated to 1.1.2 across the toolchain** (4f008a6)
The repo bumps `rolldown` from 1.1.1 to 1.1.2 in the root, Vite core, and playground packages. The change also adjusts bundled-dev and sourcemap expectations to match the newer engine behavior, so it affects both the implementation and its test coverage.

### **Create Vite 9.1.0 ships refreshed templates** (64dfee1)
`create-vite` is released at 9.1.0, and its templates now target `vite@^8.1.0` instead of the older 8.0.x line. The release also includes template and config updates like `moduleResolution: nodenext` handling and optional Oxlint/ESLint support for React templates, which improves the starter experience for new projects.

### **Plugin Legacy 8.1.0 is released** (1239e94)
`@vitejs/plugin-legacy` is promoted to 8.1.0. This is a release-only version bump with no additional code changes shown here.

### Other misc changes
- Docs: Vite 8.1 announcement post and API/plugin docs alignment
- Client refactor: inline `dev-id` in stylesheet selector (57f59bc)
- Package metadata and changelog/version bumps across release artifacts
