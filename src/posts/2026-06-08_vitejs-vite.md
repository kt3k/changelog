---
date: 2026-06-08
repo: vitejs/vite
size: M
title: "Vite tightens SSR docs and template defaults"
excerpt: "Docs clarified, create-vite templates cleaned up, and an ecosystem CI token workflow gained the right permissions."
commits: 6
authors: [sapphi-red, DucMinhNe]
commit_authors: {"689a066": sapphi-red, "01337ad": DucMinhNe, "dba8297": sapphi-red, "6b498d0": sapphi-red}
---

### **SSR external conditions docs corrected** (01337ad)
Vite’s SSR docs now reflect the actual default for `ssr.resolve.externalConditions`: `['node', 'module-sync']` instead of just `['node']`. This matters for users debugging SSR dependency resolution, since the documented behavior now matches runtime behavior.

### **Env API docs expanded for runners, builders, and runtimes** (6b498d0)
The environment framework/runtime guides were significantly clarified with more precise definitions of `RunnableDevEnvironment`, `FetchableDevEnvironment`, `createServerHotChannel`, and the newer app-build flow. That should make the APIs easier to adopt for framework authors, especially around SSR/HMR and programmatic app builds.

### **create-vite templates drop redundant tsconfig moduleResolution settings** (689a066)
Several TypeScript templates removed `moduleResolution` from `tsconfig.node.json` and switched to `module: "nodenext"` for the Node-side config. This aligns the starter configs with modern TypeScript expectations and reduces template friction for new projects.

### **Ecosystem CI token setup now requests the needed permissions** (dba8297)
The ecosystem CI trigger workflow now passes the GitHub App client ID and explicitly requests pull-request and Actions permissions. That unblocks labeling/commenting workflows and workflow dispatches that the automation needs to operate correctly.

### Other misc changes
- Dependency bumps across repo packages and templates (1 commit)
- Updated `actions/checkout` pin in multiple workflows
- Fixed `create-vite` template tsconfig/package metadata and assorted version bumps
