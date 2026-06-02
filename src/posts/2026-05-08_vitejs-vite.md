---
date: 2026-05-08
repo: vitejs/vite
size: M
title: "Vite tightens SSR and worker behavior"
excerpt: "Rolldown 1.0.0 lands, workers now honor build targets, create-vite passes React to TanStack CLI, and SSR HMR race handling is hardened."
commits: 4
authors: [shulaoda, jaehafe, WaryaWayne, schiller-manuel]
commit_authors: {"3c93fde": jaehafe, "18f0f90": WaryaWayne, "f5a22e6": schiller-manuel}
---

### **Module runner fixes concurrent re-export race** (f5a22e6)
Vite’s SSR module runner now detects circular in-flight request chains more precisely, preventing a partial-exports race when concurrent imports hit invalidated re-export graphs. The new regression test fixture covers the HMR re-export scenario so the fix is locked in.

### **Worker bundles now respect `build.target`** (3c93fde)
The worker bundling path now forwards the app’s `build.target` into rolldown’s transform step, so worker output matches the configured browser/runtime target. This closes a mismatch where workers could be compiled with different assumptions than the main build.

### **create-vite passes the React framework to TanStack CLI** (18f0f90)
The TanStack Router starter command now explicitly passes `--framework react` when scaffolding. That should generate the correct project shape without requiring users to infer or repair the framework choice later.

### Other misc changes
- Rolldown bumped to 1.0.0 across repo packages (1 commit)
- Added/updated module-runner HMR race test fixtures
