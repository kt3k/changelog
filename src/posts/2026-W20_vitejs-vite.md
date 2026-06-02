---
date: 2026-05-17
repo: vitejs/vite
period: weekly
slug: 2026-W20
period_label: "May 11–17, 2026"
size: L
title: "Vite tightens worker teardown, bundled dev, and SSR fixes"
excerpt: "Lazy bundled dev lands, workers inherit config correctly, and several teardown, SSR, and build regressions are fixed."
commits: 27
---

### **Bundled dev gets on-demand loading and per-environment config**
Vite’s bundled dev mode now supports lazy bundling, kicking off module compilation only when needed after the initial bundle. This came alongside making `isBundled` resolve per environment, laying groundwork for more precise client/worker/build behavior.

### **Workers and preprocessing now inherit config and shut down cleanly**
Worker bundles now receive `define` and `target` settings, fixing mismatches between main and worker builds. CSS preprocessor workers are also properly awaited during teardown, preventing lingering Sass/Less/Stylus processes when the server closes.

### **Build and SSR correctness fixes**
Several subtle build/runtime bugs were addressed: dependency scanning now honors Rolldown JSX options, SSR transforms avoid rewriting labels and control-flow targets, and build output correctly recopies `public/` after a prior `write=false` run. The legacy plugin also stops injecting `modulepreload` tags in legacy-only builds.

### **Plugin and dev tooling compatibility improvements**
The optimizer’s esbuild-to-rolldown bridge now passes richer build-result fields through to `onEnd`, improving plugin compatibility. Dev console forwarding is also more resilient, handling transport send failures without crashing on the expected pre-connect case.

### **Other misc changes**
- Repo docs/messages were updated from `build.rollupOptions` to `build.rolldownOptions` in affected paths.
- Release/version bumps for Vite, create-vite, and plugin-legacy.
- CI/workflow hardening and dependency updates.
- Changelog/release-note cleanup and small test updates.
