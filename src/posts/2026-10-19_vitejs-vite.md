---
date: 2026-10-19
repo: vitejs/vite
size: M
title: "create-vite gets TanStack + TS7 updates"
excerpt: "create-vite adds explicit Vite support for TanStack scaffolds, broadens TS 7 adoption, and ships a 9.3.0 release with dependency refreshes."
commits: 5
authors: [chenjiahan, sapphi-red]
commit_authors: {"467f7ac": chenjiahan, "9df8bbc": sapphi-red}
---

### **TanStack project scaffolds now force Vite** (467f7ac)
create-vite now passes `--build-tool vite` for the TanStack Start/Router templates in both React and Solid flows. That fixes project generation so these presets reliably scaffold with Vite instead of leaving the build tool selection implicit.

### **create-vite 9.3.0 ships with TS 7 rollout and template updates** (2c81dc7, 9df8bbc)
The 9.3.0 release packages the latest create-vite changes, including versioned template and dependency refreshes. Notably, most TypeScript starter templates move to TypeScript 7 where possible, while TS-based Svelte/Vue templates stay on 6.0.3 where needed for compatibility.

### Other misc changes
- Non-major dependency bumps across the repo, including rolldown and tooling/workflow updates (2 commits)
- Updated create-vite internals to bump ESLint and typescript-eslint versions (9df8bbc)
- Refreshed docs/playground package versions and source-map test expectations (77d8373, c2e0418)
