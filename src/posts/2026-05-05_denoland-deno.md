---
date: 2026-05-05
repo: denoland/deno
size: L
title: "Deno adds hoisted npm, faster HTTP, and Node fixes"
excerpt: "Major npm/runtime work lands alongside Node compat fixes, an HTTP perf win, and a TypeScript 6.0.3 upgrade."
commits: 13
authors: [bartlomieju, divybot, crowlbot, nathanwhit]
commit_authors: {"0969789": divybot, "c238866": bartlomieju, "c5eb105": bartlomieju, "6d28e29": bartlomieju, "01ea663": divybot, "9c23f62": bartlomieju, "50c5338": crowlbot, "d7e0210": bartlomieju, "d340bbc": bartlomieju, "c2366ea": bartlomieju, "0c69465": nathanwhit, "88320d6": bartlomieju, "3eaa2fb": bartlomieju}
---

### **Hoisted npm installs land as a new linker mode** (d7e0210)
Adds `--node-modules-linker=hoisted`, letting npm packages install in a flat layout instead of Deno’s default isolated/symlinked mode. This is a big new dependency-management option, and it requires `nodeModulesDir=manual` to avoid reinstall issues with dynamic imports.

### **`module.register()` now works for Node ESM hooks** (c238866)
Implements Node’s `module.register()` on top of the existing hook bridge, including async hook loading, `initialize(data)` support, transfer lists, and LIFO chaining with correct ordering relative to sync hooks. This meaningfully expands Node compatibility for loader customization.

### **HTTP request handling gets a direct dispatch fast path** (0c69465)
Deno’s HTTP server now dispatches requests straight into the JS handler instead of bouncing through the previous queue/polling path. The change reduces overhead in the hot path and produced a large throughput win in the benchmark shown in the commit message.

### **Compile-bundled VFS files now work with `node:fs`** (6d28e29)
Fixes `deno compile` binaries so `node:fs` can open, read, and access virtual files that don’t have real OS file descriptors. It does this by assigning virtual fds for VFS-backed files and reporting sensible file modes so `fs.access()` checks succeed.

### **Node’s `module.registerHooks()` now intercepts ESM imports** (d340bbc)
Extends the earlier hook API so async loader hooks can participate in ESM `import()` as well as CommonJS resolution. This tightens the Rust/JS loader bridge and unlocks broader hook-based module interception.

### **SIMD ASCII fast path speeds up `op_decode`** (50c5338)
Adds an ASCII-only shortcut that skips BOM checks and V8’s UTF-8 validation when input is pure ASCII. That should help common cases like `Response.text()`, `File.text()`, and form parsing.

### **Hoisted npm linker wiring reaches the CLI and resolver** (d7e0210)
Beyond the new flag, the change threads hoisted-linker support through config, CLI parsing, installer logic, and resolver behavior. It’s a substantial internal plumbing update to make the new install mode usable end to end.

### **Other misc changes**
- Node HTTP request timeout compat fix: support `connectionsCheckingInterval` and emit 408 on timeout (0969789)
- Watcher fix: apply `--watch-exclude` to file change events (c5eb105)
- `spawn()` now tolerates an unlinked cwd (01ea663)
- npm catalog override parsing now handles workspace object ფორმs (9c23f62)
- Lazy-load conversion expanded to 62 more ext/node polyfills (88320d6)
- dprint-plugin-typescript bumped to 0.96.0 and `deno-fmt-ignore-file` cleanup (3eaa2fb)
- TypeScript updated to 6.0.3, including large generated lib file refreshes (c2366ea)
