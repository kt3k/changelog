---
date: 2026-05-10
repo: vitejs/vite
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: M
title: "Vite 8.0.11 lands with devtools, Rolldown, SSR fixes"
excerpt: "Patch release adds tighter devtools integration, upgrades Rolldown, and fixes SSR, worker target handling, and env config isolation."
commits: 12
---

### **Patch release with deeper devtools integration and engine upgrades**
Vite 8.0.11 shipped this week, with `@vitejs/devtools` pulled directly into the plugin pipeline and builder flow for more consistent dev and build behavior. The release also advances Rolldown to `1.0.0-rc.18`/`1.0.0` across the repo, making this a meaningful internal engine update rather than a routine bump.

### **Reliability fixes for config, SSR, and workers**
`resolveConfig` now deep-clones non-client default environment options before merging, preventing `configEnvironment` mutations from leaking across environments. On the server side, the module runner fixes a concurrent re-export race that could surface partial exports during invalidated HMR chains. Worker builds also now inherit `build.target`, so worker output stays aligned with the app’s configured runtime baseline.

### **Scaffolding and release polish**
`create-vite` now passes `--framework react` to the TanStack Router starter, removing ambiguity during project generation. The week was capped by the 8.0.11 release cut and changelog publication.

### **Other misc changes**
- Async removal refactors across build/config/plugin internals
- Worker sourcemap and HMR test updates
- CI/workflow pnpm action updates
- Dependency refreshes, lockfile updates, and related Rolldown bumps
