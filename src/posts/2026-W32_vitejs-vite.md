---
date: 2026-08-09
repo: vitejs/vite
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "Bundled dev matures, plus build and port fixes"
excerpt: "Bundled dev got runtime, HTML, and sourcemap fixes; build config, port 0, CSS minify, and chunk import map behavior were tightened."
commits: 30
---

### **Bundled dev moves closer to first-class stability**
Vite spent most of the week hardening bundled dev: the client runtime is now injected earlier and managed through a dedicated runtime file, the old lazy-stub workaround was removed, and coverage expanded across HTML, CSS, assets, dynamic imports, and sourcemaps. Together, these changes make bundled dev less coupled to build-time internals and much better tested across edge cases.

### **Build behavior got several correctness fixes**
Build config handling now avoids mutating user-supplied `build.lib` when inferring an entry from top-level input. In the build pipeline, `chunkImportMap` now comes from the client environment so shared-plugin setups with divergent client/SSR config work correctly, and CSS minification no longer reruns Lightning CSS visitors during minify passes.

### **Dev server port and runtime behavior were tightened**
Starting Vite with `port: 0` now picks one stable port and reuses it across interfaces and restarts, removing inconsistent ephemeral-port behavior. The bundled-dev runtime also now injects the dev client before chunk scripts so the runtime is available earlier in serve mode.

### **Performance and maintenance improvements**
CSS chunk lookup was sped up by switching membership checks to a `Set`, and the repo received a broad dependency/tooling refresh. Docs were also cleaned up around Environment API links, Baseline terminology, and static-deploy requirements.

### **Other misc changes**
Legacy and playground tests were adjusted for flaky watch/HMR timing, bundled-dev output paths, and updated expectations; a few docs typos and examples were fixed; and minor config cleanup landed in workspace and deploy docs.
