---
date: 2026-07-06
repo: vitejs/vite
size: M
title: "Docs fix, build cleanup, and a legacy refactor"
excerpt: "Vite corrected server CORS docs, updated legacy polyfill handling, and cleaned up build/dep churn across the repo."
commits: 8
authors: [btea, dfedoryshchev, sapphi-red]
commit_authors: {"70435b2": dfedoryshchev, "2c4a217": btea, "c581b55": btea, "ea22fb3": btea, "9dddae6": sapphi-red}
---

### **Legacy plugin now loads polyfills more explicitly** (9dddae6)
The legacy plugin was refactored to consistently use `babel-plugin-polyfill-corejs3` and `babel-plugin-polyfill-regenerator` via a shared loader. This changes how polyfills are injected and detected, making the implementation clearer and easier to maintain.

### **Build pipeline drops an extra log hook** (2c4a217)
Vite removed a custom `onLog` handler from the rolldown config, simplifying the build setup. This appears to be cleanup around build logging behavior rather than a user-facing feature.

### **Build config updated for rolldown's newer logging API** (c581b55)
The rolldown config switched from `onwarn` to `onLog`, keeping the warning filter for circular dependencies working with the newer API. This is a small but necessary compatibility adjustment for the build toolchain.

### **Vite CLI and plugin resolution stop doing dynamic imports** (ea22fb3)
The CLI now imports `createBuilder` eagerly, and plugin resolution imports `resolveBuildPlugins` directly instead of loading `../build` on demand. That trims runtime indirection in core startup paths and makes the code path more straightforward.

### **Server CORS docs corrected** (70435b2)
The `server.cors` option’s `@default` documentation was fixed to show the real localhost-matching origin regex instead of `false`. This matters because it clarifies the default behavior for users configuring dev server cross-origin access.

### Other misc changes
- Dependency bumps across docs, Vite, playgrounds, and create-vite
- Ignored a runtime-created glob-import symlink artifact
- Replaced deprecated `onwarn` usage with `onLog` in build config
- Minor create-vite/template package version updates and internal text/license churn
