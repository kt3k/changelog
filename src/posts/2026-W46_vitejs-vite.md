---
date: 2026-11-15
repo: vitejs/vite
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "Vite adds bundled SSR dev, safer config, and faster builds"
excerpt: "This week Vite shipped bundled SSR dev mode, new Wasm/CSS capabilities, stricter process/file safety, and several perf and config fixes."
commits: 60
---

### **Major runtime and SSR advances**
Vite landed bundled SSR dev-mode support in the module runner, a substantial runtime overhaul that touches HMR, fetch plumbing, source-map retention, and SSR execution flow. This is the biggest infra change of the week and sets up a new dev path for SSR apps.

Vite also improved error stacks in the module runner to better match V8 formatting, making async and method frames more faithful during debugging.

### **Wasm, CSS, and asset handling expanded**
Wasm support grew with `import source` / `import.source(...)` for `.wasm`, returning a `WebAssembly.Module` instead of auto-instantiating. On the CSS side, `url()` resolution now understands package subpath imports, including nested Sass cases, and SSR CSS imports stay internal instead of being externalized by default.

Asset and manifest handling also got smarter: build manifests now include worker chunks, inline workers emit assets during dev HMR loads, and bundled dev/preview fixed several wasm and lazy-chunk path issues. Failed CSS preloads are now retried instead of being permanently skipped.

### **Safer config loading, process locking, and file access**
The config-loader compatibility checks now ignore type-only imports, reducing false warnings for TypeScript-only references. The CLI’s `--configLoader` surface was cleaned up to the stable `bundle` and `native` modes.

Vite also added project-specific process locks for `vite`, `vite build`, and `vite preview`, with a `--bypass-lock` escape hatch for advanced workflows. File access controls were tightened and expanded with per-environment safe-module tracking, a new `environment.addSafeModule()` API for plugins, and an extended `server.fs.strict: 'extended'` mode.

### **Build and dev performance improvements**
Several hot paths got faster: Sass modules are now imported once per worker, Windows UNC realpath resolution avoids unnecessary startup work, and Yarn config probing on Windows no longer flashes a console window. The build pipeline also fixed rolldown metadata preservation when injecting SSR flags, rejected invalid CSS entrypoints earlier when CSS splitting is disabled, and stopped emitting empty CSS files.

### **Ecosystem and scaffolding updates**
`create-vite` gained first-class Vite+ package-manager support plus an opt-in DevTools flow. Build environments can now read `environment.manifest` directly, and the repo updated its docs and config around dev sourcemaps (`dev.sourcemap` replacing `css.devSourcemap`).

### **Other misc changes**
- Rolldown and related dependency bumps across the workspace.
- Tests and helpers migrated from `execa` to `tinyexec`.
- Multiple fixes for escaped import/specifier handling in build and dep optimization paths.
- CI, lint, release, and playground maintenance, plus minor Windows and sirv patch fixes.
