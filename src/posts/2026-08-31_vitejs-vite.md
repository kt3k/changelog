---
date: 2026-08-31
repo: vitejs/vite
size: S
title: "Dependency refresh with rolldown updates"
excerpt: "Updated key build tooling and security workflows, plus a broad non-major dependency refresh."
commits: 2
---

### **Build tooling refreshed for rolldown ecosystem** (b882566)
Vite’s core and playground dependencies were bumped around rolldown, including `rolldown` itself and `rolldown-plugin-dts`. The new `shims.d.ts` workaround also hints at a type-compatibility issue in `rolldown-plugin-dts`, so this change likely keeps the TypeScript build moving while upstream catches up.

### Other misc changes
- General non-major dependency updates across root, docs, templates, and playgrounds (238ad81)
- CI/security workflow action and container updates in GitHub workflows (238ad81)
- Minor `create-vite` template dependency/version refreshes (238ad81)
- `oxc-parser` bump in the JS sourcemap playground (b882566)
