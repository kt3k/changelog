---
date: 2026-10-04
repo: vitejs/vite
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "Vite 8.3.2 ships with build, dev-server, and Rolldown fixes"
excerpt: "Patch release focused on sourcemaps, worker URLs, preload perf, optimizer fallbacks, and dev-server stability."
commits: 25
---

### **Patch release 8.3.2 with broad bug fixes**
Vite shipped 8.3.2 this week, bundling a set of fixes across build output, dev-server behavior, and optimizer edge cases.

### **Build pipeline gets more correct and faster**
Several build-time issues were tightened up: `renderBuiltUrl` now preserves query/postfix data for asset rewrites, worker asset URLs stay consistent across client and SSR builds with different minifiers, and rolldown minify options now merge with Vite’s defaults instead of overwriting them. Vite also reduced sourcemap work by combining decoded maps directly, and the preload helper avoids quadratic DOM scanning when injecting preloads.

### **Dev server and bundled dev become more stable**
The dev server now reports watcher errors instead of failing silently, clears previous environment graphs after startup to avoid retention across restarts, and only installs timing middleware when debug timing is enabled. Bundled dev also gained sourcemaps for lazy chunks, making those code paths debuggable again.

### **Optimizer and worker/runtime compatibility fixes**
The dep optimizer now handles excluded optional peer `require()` fallbacks and treats `browser: false` mappings as empty modules, reducing noisy warnings and preserving expected package behavior. In parallel, Rolldown runtime coverage and dependency updates were refreshed, and worker playground tests were adjusted to better match bundled-dev support.

### **Other misc changes**
- HTML and CSS asset handling fixes, including encoded `srcset` URLs and query-aware CSS preload URLs.
- Updated playground, workspace, and monorepo test coverage for the new behaviors.
- Release metadata, docs cleanup, and dependency/version bumps.
