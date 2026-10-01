---
date: 2026-09-30
repo: vitejs/vite
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Vite 8.3 delivers config, Rolldown, and dev-server gains"
excerpt: "September focused on config ergonomics, Rolldown/build fixes, and dev-server correctness, with 8.3.0 and 8.3.1 releases."
commits: 80
---

### **Config, release, and ecosystem ergonomics improved**
Vite added a top-level `tsconfig` option for project-wide control, tightened native-config compatibility warnings for JSON named imports, and warned when environment plugins return Vite-only hooks that won’t run. Release automation also gained support for publishing from supported `v*` branches, and the repo updated to newer pnpm/trust-policy settings along the way.

### **Dev server correctness got a broad round of fixes**
Several long-tail bugs were addressed around serving and resolving assets: `srcset` parsing now preserves `.5x`-style density descriptors, preload/modulepreload links are no longer inlined as data URLs, hash placeholders survive `resolveFileUrl`, and package root detection works across pnpm stores, hoisted layouts, Yarn PnP zips, and nested manifests. Vite also fixed `node_modules` path detection, CRLF-sensitive code frames, and a lazy bundled-dev delivery race where chunks could be marked “delivered” too early.

### **Bundled dev and sourcemaps became more reliable**
Bundled dev saw multiple fixes: the client now acknowledges lazy payloads only after evaluation, sourcemaps for lazy chunks are served correctly, and the dev runtime is loaded from the installed Rolldown package instead of assuming a bundled layout. Sourcemap handling was also hardened for remote sources and SSR paths with spaces, while watcher shutdown and dep-optimizer teardown were made less likely to hang or restart unexpectedly.

### **Rolldown integration kept maturing**
A recurring theme this month was aligning Vite with Rolldown’s evolving output and runtime shapes. Fixes landed for `output.comments` merging, `output.minify` merging, build config wiring cleanup, and runtime test coverage for multiple Rolldown layouts. Dependency bumps across Rolldown-related packages and playgrounds followed these changes, keeping the integration in sync.

### **Performance and build-path polish landed in several spots**
The month included smaller but meaningful speedups: proxy route matchers are now precompiled at server start, build preload injection avoids repeated DOM scans, and preload helpers skip unnecessary work in the generated path. The optimizer also picked up better handling for `browser: false` mappings and excluded optional peer fallbacks, reducing noisy warnings and preserving expected CJS fallback behavior.

### **Other misc changes**
- DevTools integration expanded to both `serve` and `build`, with config/lifecycle adjustments.
- CLI shortcuts, SSR docs, ViteConf 2026 messaging, and versioned release bumps were refreshed.
- create-vite got template and framework-list updates, including TanStack Start/Router separation.
- Multiple dependency, lint, workflow, and test-coverage updates across the repo.
