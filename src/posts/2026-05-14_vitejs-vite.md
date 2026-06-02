---
date: 2026-05-14
repo: vitejs/vite
size: L
title: "Bundled dev gets lazy loading"
excerpt: "Vite adds lazy bundling for dev, tightens SSR rewriting, and fixes several build/runtime edge cases."
commits: 13
authors: [sapphi-red, cyphercodes, camc314, artemxknpv, lyzno1, ChrisJr404, sheremet-va, shulaoda]
commit_authors: {"f3a0bc9": cyphercodes, "d9b18e0": camc314, "4f0949f": sapphi-red, "158e8ae": artemxknpv, "47071ce": lyzno1, "a576326": sheremet-va}
---

### **Bundled dev now supports lazy bundling** (4f0949f)
Vite’s bundled dev mode can now trigger on-demand compilation for modules instead of relying solely on the initial full build. The client now tags module-loaded events with a client ID, and the full-bundle environment uses that ID to track module registration and kick off lazy bundling safely after the initial build completes.

### **`isBundled` becomes per-environment** (a576326)
Bundling is no longer treated as a single global switch; it’s now resolved per environment. This is a foundational config change that lets dev/build behavior differ by environment and makes bundled-dev and worker/client setups more precise.

### **Plugin-legacy stops injecting modulepreload in legacy-only builds** (f3a0bc9)
The legacy plugin now strips `modulepreload` links when modern output isn’t generated, fixing broken or unnecessary preload tags in legacy-only HTML. The new regex and tests make the cleanup more targeted and reduce the chance of leaving preload hints behind.

### **SSR transform avoids clobbering labels** (d9b18e0)
SSR rewriting now skips identifiers that are actually label declarations or `break`/`continue` targets, preventing accidental import collision rewrites. This fixes a subtle correctness bug that could break valid control-flow syntax during SSR transforms.

### **Optimizer plugin converter passes through build-result fields** (47071ce)
The esbuild-to-rolldown plugin bridge now provides a more realistic `BuildResult` to `onEnd` callbacks, including the expected fields such as `metafile`, `mangleCache`, and `outputFiles` in write mode. That improves compatibility for plugins that inspect esbuild’s end-of-build payload.

### **Build output now copies `public/` correctly after `write=false`** (158e8ae)
A build regression is fixed where a prior `write=false` build could prevent a later write-enabled build from copying the public directory into the output. The new test covers the rebuild sequence and guards against missing assets like favicons.

### **Other misc changes**
- Release/versioning updates for `vite`, `plugin-legacy`, and repo release scripts.
- Rolldown dependency bump to 1.0.1.
- CSS asset naming compatibility fix for deprecated fields.
- CI hardening with zizmor workflow/config additions.
- Changelog cleanup and related release notes.
