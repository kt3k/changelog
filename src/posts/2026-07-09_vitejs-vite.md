---
date: 2026-07-09
repo: vitejs/vite
size: M
title: "Vite ships 8.1.4 with SSR and legacy fixes"
excerpt: "New legacy minification support lands alongside SSR stacktrace fixes, optimizer race hardening, and a few build/workaround patches."
commits: 9
authors: [sapphi-red, bhagatsaurabh, shulaoda]
commit_authors: {"ab5dafa": bhagatsaurabh, "173a1b6": sapphi-red, "575c32c": sapphi-red, "72a5e21": sapphi-red, "2a8fde0": sapphi-red}
---

### **Legacy plugin now prefers Oxc minification** (ab5dafa)
plugin-legacy can now use Vite’s Oxc minifier when the host Vite version supports it, while falling back to Terser on older versions. The release also updates the README guidance so users only need Terser in the compatibility and explicit-`terser` cases.

### **SSR call stack columns now match Node** (173a1b6)
Vite adjusted SSR source map handling so wrapped imported calls point to the callee start, not the parenthesized call-site column. This tightens stack traces for named export calls and aligns them with Node’s behavior, making SSR errors easier to debug.

### **Optimizer no longer races before server init** (72a5e21)
The dep optimizer now avoids starting a transform-triggered optimize run before `init()` has completed, fixing a crash that could happen when discovery happened between `createServer()` and `listen()`. This hardens startup ordering and prevents metadata from being reset underneath an in-flight prebundle.

### **StackBlitz build workaround added** (575c32c)
Build output now rewrites the generated preload helper to avoid a StackBlitz-specific issue. It’s a targeted compatibility fix for a real-world hosted environment.

### **Windows root unwatch issue fixed** (2a8fde0)
A chokidar patch normalizes paths when adding/removing file closers, which fixes unwatching deleted root directories on Windows. This is a platform-specific correctness fix that prevents watchers from getting stuck.

### Other misc changes
- Release/version bumps for `vite` and `@vitejs/plugin-legacy` (2 commits)
- New regression tests and playground coverage for SSR, optimizer startup, and dynamic import destructuring (3 commits)
- Docs/changelog updates and dependency patch maintenance
