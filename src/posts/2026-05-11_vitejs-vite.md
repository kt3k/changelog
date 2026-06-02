---
date: 2026-05-11
repo: vitejs/vite
size: M
title: "Worker fix and Rolldown docs updates"
excerpt: "Vite fixes worker define/target handling, updates config docs to rolldownOptions, and ships create-vite 9.0.7 / vite 8.0.12."
commits: 10
authors: [sapphi-red, btea, lgarron, jaehafe]
commit_authors: {"a4cd63c": sapphi-red, "4dce8b4": sapphi-red, "b675c7b": lgarron, "d4838a0": jaehafe}
---

### **Worker bundles now inherit define and target settings** (d4838a0)
Vite now forwards `define` into the worker bundle transform, fixing cases where worker code would miss compile-time replacements. This should make worker builds behave more consistently with the main bundle.

### **Config and messages renamed to rolldownOptions** (b675c7b)
The repo-wide messaging and docs have been updated to refer to `build.rolldownOptions` instead of the deprecated `build.rollupOptions` in several build and SSR-related paths. That keeps the public guidance aligned with the newer build config surface.

### **Release bumps for vite 8.0.12 and create-vite 9.0.7** (4dce8b4, a4cd63c)
Both packages were versioned and changelogs published, with template package manifests updated to the new Vite release. This is mainly a packaging/release cut, but it also rolls forward the scaffold templates.

### Other misc changes
- Rolldown-related dependency updates (2 commits)
- eslint-plugin-n bumped to v18
- Changelog pruning / release-note housekeeping
- pnpm action pinned to v6.0.6 in CI and release workflows
- Minor help/output text and test expectation updates
