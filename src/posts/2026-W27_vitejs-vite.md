---
date: 2026-07-05
repo: vitejs/vite
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: M
title: "Vite sharpens CSS, SSR, and build-time import handling"
excerpt: "A patch-heavy week fixing CSS path/preload bugs, SSR stacktraces, shebang injection, and a few performance and bundle correctness issues."
commits: 42
---

### **CSS and build output correctness got a lot of attention**
Vite fixed several stylesheet-related edge cases across dev and build. CSS and Sass `tsconfig.paths` resolution now uses the importing file as the source context, nested dynamic imports get the correct CSS preload marker, and pure CSS chunks are stripped properly when `chunkImportMap` is enabled. The LightningCSS pipeline also got URL and null-byte handling fixes, including preserving `$` in rewritten `@import` URLs.

### **SSR and runtime ergonomics improved**
Server-side stacktraces now report the correct first-line column even with Vite’s injected `"use strict"` wrapper, making SSR errors easier to debug. CSS injection also became shebang-safe, so inline CSS is inserted after a file’s shebang instead of corrupting executable headers.

### **Bundled dev and config handling were hardened**
Bundled dev HMR invalidation now routes through the dedicated invalidator path, avoiding recursion issues when `import.meta.hot.invalidate()` is called. Vite also skips plugin transforms for Rolldown lazy stub modules, and bundled config files now use a `.vite-temp` directory that is ignored for cache fingerprinting.

### **Build and tooling performance got a tune-up**
The HTML plugin’s import-only detection was rewritten to avoid a slow regex path on large inputs, and the preload helper now preserves `import.meta.url` more faithfully. There were also smaller fixes in the Oxc JSX mapping and optimize-deps scanner shutdown behavior.

### **Other misc changes**
Patch releases shipped for Vite 8.1.2 and 8.1.3, along with create-vite 9.1.1. The week also included regression tests, playground updates, docs clarifications, dependency bumps, lockfile churn, and CI/workflow maintenance.
