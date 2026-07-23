---
date: 2026-07-22
repo: vitejs/vite
size: L
title: "Beta release with HMR and rolldown updates"
excerpt: "Vite ships v8.2.0-beta.0 with bundled-dev HMR changes, a prune-data HMR fix, config performance work, and new resolve/path tests."
commits: 7
authors: [sapphi-red, btea]
commit_authors: {"428bda3": sapphi-red, "d8cd388": sapphi-red, "34af7b7": sapphi-red, "961643a": sapphi-red, "be96316": sapphi-red, "18535d1": btea}
---

### **Bundled-dev HMR now uses a client-side entry** (960e9ef)
Vite splits the bundled-dev HMR runtime into a separate client entry so `client.mjs` no longer carries full-bundle-mode HMR code. This comes alongside rolldown-related dependency bumps, which makes the bundled-dev build path cleaner and sets up the new HMR client flow.

### **HMR prune now clears hot data after callbacks** (be96316)
`import.meta.hot.data` is now explicitly cleared after `dispose`/`prune` handlers run when a module is pruned, so stale state does not leak if the module is imported again later. The HMR docs were updated to describe the per-module-path data lifecycle more precisely.

### **Config loading skips native-compat work when warnings are ignored** (18535d1)
Vite now avoids running the native config compatibility check when `VITE_CONFIG_NATIVE_IGNORE_WARNING` is set, removing unnecessary work in that path. That trims config-load overhead without changing the warning behavior for normal runs.

### **Config loader supports CJS module vars in ESM fixtures** (d8cd388)
A new test covers `__dirname`/`__filename`-style module variables in an ESM config fixture, validating that config loading preserves the expected values. This helps lock in behavior for mixed module-format configs.

### **tsconfig path resolution is covered for `import.meta.glob`** (428bda3)
A new resolve playground test exercises `import.meta.glob` with tsconfig path aliases, ensuring eager glob imports resolve through the alias map correctly. This protects a real-world path-resolution edge case in the resolver.

### Other misc changes
- Released `v8.2.0-beta.0` and bumped `packages/vite` version (34af7b7)
- Removed `@experimental` from `resolve.tsconfigPaths` JSDoc (961643a)
- Dependency bumps: rolldown, oxc-minify, tsdown, rolldown-plugin-dts
