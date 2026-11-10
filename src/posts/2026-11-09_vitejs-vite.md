---
date: 2026-11-09
repo: vitejs/vite
size: M
title: "Perf and config fixes land for Vite"
excerpt: "Sass loading got faster, config native-loader warnings were tightened up, and a few platform and tooling fixes shipped."
commits: 11
authors: [sapphi-red, btea, mattlewis92, magurotuna]
commit_authors: {"db8b119": mattlewis92, "3f6c4cd": btea, "e554294": btea}
---

### **Import Sass once per worker for faster SCSS processing** (db8b119)
Vite now caches the Sass module import inside the SCSS worker instead of re-importing it for every file. That should reduce overhead in Sass-heavy projects and make repeated stylesheet transforms a bit cheaper.

### **Skip native config-loader checks for type-only imports** (e554294)
Native config compatibility analysis now ignores `import type` and type-only re-exports, preventing false warnings for TypeScript-only references. The new tests cover both plain type-only JSON imports and inline type-only specifiers.

### **Hide the console window when querying Yarn config on Windows** (3f6c4cd)
The server now passes `windowsHide: true` to the `yarn config get` subprocess calls used to resolve Yarn cache paths. This avoids flashing a console window on Windows when Vite probes Yarn settings.

### Other misc changes
- Rolldown dependency bump to v1.2.18, with resolve-plugin test coverage added
- Added a wasm test synchronization fix
- Enabled additional lint rules across the repo
- CI and release workflow updates, including Node 26 in CI
- Build tweak to emit sourcemaps in the shim-deps plugin
- Added `pnpm run test-e2e` and associated test harness updates
- Docs update recommending `sass-embedded` for performance
- Release chore for v8.3.7
