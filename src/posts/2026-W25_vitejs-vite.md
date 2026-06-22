---
date: 2026-06-21
repo: vitejs/vite
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Vite beta tightens defaults and ships chunk import maps"
excerpt: "This week added experimental chunk import maps, switched React scaffolds to Oxlint, and hardened server, glob, and config edge cases."
commits: 21
---

### **Experimental chunk import maps for better cache reuse**
Vite beta introduced `build.chunkImportMap`, emitting an import map and switching chunk imports to stable IDs so JS chunk caching is less fragile across rebuilds.

### **React scaffolding now defaults to Oxlint**
`create-vite` changed React templates to use Oxlint by default, with `--eslint` as the opt-in path for teams that want ESLint in new projects.

### **Build config and Rolldown compatibility got cleaned up**
The new chunk import map option was renamed into the Rolldown config plumbing, and build options were kept as live proxies so `rollupOptions` and `rolldownOptions` stay in sync across client, SSR, and main builds.

### **Server and dev-time behavior was hardened**
Vite expanded `server.fs.deny` to cover more sensitive files like key/cert variants plus `.npmrc` and `.yarnrc.yml`, while also fixing malformed URI handling in the memory file middleware.

### **Several correctness fixes landed across env, glob, and package resolution**
The optimizer now skips `null` export targets during glob expansion, `import.meta.glob` HMR matching now respects `caseSensitive`, and deprecated `envFile: false` now warns users toward `envDir: false`.

### **Other misc changes**
- Ecosystem CI freshness checks now compare against the PR head commit date
- `perEnvironmentState` correctly caches falsy values
- Import maps only get a nonce when CSP nonce is present
- A few dependency and workspace policy updates, plus small cleanup changes
