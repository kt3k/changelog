---
date: 2026-09-13
repo: vitejs/vite
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "Vite 8.3 ships with DevTools integration and key perf fixes"
excerpt: "This week brought DevTools support, a faster proxy path, and fixes for CRLF handling and node_modules detection in Vite 8.3."
commits: 17
---

### **DevTools integration expands across dev and build**
Vite’s new DevTools integration landed in beta and is now supported in both the dev server and build pipeline. The work also split inspection/analyzer functionality into separate packages and tightened plugin lifecycle rules so `devtools` must be declared in user config.

### **8.3 release bundles notable bug fixes and speedups**
Vite 8.3.0 shipped midweek, rolling up the week’s main improvements: a faster proxy matching path, more accurate `node_modules` detection, and better handling of CRLF line endings in code frames and diagnostics.

### **Build and request paths got a bit leaner**
The build preload helper now skips `undefined` entries before `Promise.allSettled`, trimming unnecessary promise work. On the server side, proxy context matching is precompiled at startup instead of re-parsed on every request, reducing overhead in proxy-heavy setups.

### **Docs and SSR guidance improved**
The SSR docs now include a concrete example for invalidating SSR-only modules and forcing a client reload, covering a common edge case for custom frameworks and integrations.

### **Other misc changes**
Shortcuts error handling was made safer, the repo picked up dependency and workflow updates, lint cleanup, and release/changelog maintenance, plus some minor docs and type-definition tidy-ups.
