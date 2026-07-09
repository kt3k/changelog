---
date: 2026-07-08
repo: denoland/deno
size: L
title: "TS fork removed, native checks tightened"
excerpt: "Deno switched to stock TypeScript, fixed node type loading, and made several check/permission behaviors stricter."
commits: 17
authors: [bartlomieju, denobot, Hixie, crowlKats]
commit_authors: {"8959589": bartlomieju, "72edd4f": bartlomieju, "23847c9": bartlomieju, "34d5929": bartlomieju, "1d4e6c1": bartlomieju, "7d0a481": bartlomieju, "95407f0": Hixie, "f323745": bartlomieju}
---

### **Deno drops its TypeScript fork for stock TS** (34d5929)
Deno now runs on upstream `typescript@6.0.3` instead of its forked compiler, removing the patched `00_typescript.js` bundle and several `ts.deno.*` host hooks. This is a major internal shift that simplifies future TS upgrades, but it also changes some LSP/check behavior to match stock TypeScript.

### **Unix socket access now requires net permission too** (f323745)
Connecting to `node:net` Unix sockets now requires `--allow-net=unix:<path>` in addition to filesystem access. The new shared permission helper also handles abstract Linux sockets and tightens the security model around local IPC endpoints like Docker and dbus.

### **`deno check` now errors on `export =` in ES modules** (23847c9)
TS1203 is no longer downgraded to a warning, so `export =` in ESM surfaces as a hard error. That brings Deno in line with stock TypeScript and removes a long-standing compatibility exception.

### **Deno serves a single `@types/node` copy in type-checking** (1d4e6c1)
When a project has its own `@types/node`, Deno now points `lib.node.d.ts` at that resolved file instead of also loading the built-in copy. This avoids duplicate node declarations in the program and unblocks the single-global-table behavior needed by the TypeScript un-fork.

### **Transitive `@types/node` dependencies are detected** (72edd4f)
If `@types/node` is only present transitively, Deno now finds that installed copy and serves it to `tsc` instead of loading both the built-in and nested versions. This fixes duplicate-identifier failures for packages like Express/Koa that bring node types in indirectly.

### **Web-platform globals now defer to DOM typings when present** (8959589)
Deno's bundled `lib.deno_*.d.ts` files were reshaped so globals like `Request`, `Performance`, `navigator`, and `CustomEvent` can reuse DOM definitions when `lib.dom` is loaded. This reduces conflicts between Deno's libs and stock TypeScript's DOM globals as the fork is removed.

### **Packument cache now records fetch format** (7d0a481)
`fast-registry-json` and npm cache metadata now track `_deno.packumentFormat`, letting Deno distinguish a full registry packument from an abbreviated one. That fixes cache behavior when registries omit publish-time data and prevents unnecessary re-fetches.

### **Coverage now counts branch junction lines more accurately** (95407f0)
A line shared by both branch arms is now considered covered if either arm runs. This improves LCOV/reporting accuracy for single-arm branch execution.

### **Docker socket-style permission checks are enforced consistently** (f323745)
Unix-socket path checks were factored into `ext/net` so both native socket ops and node-compat paths use the same validation logic. The change also preserves abstract socket handling on Linux-style abstract addresses.

### Other misc changes
- Release/promotion workflow fixes, including a `@deno/patchver` bump to handle macOS binaries and removal of Google Cloud auth.
- Re-enabled and adjusted LSP/check tests for the TypeScript un-fork.
- `deno desktop --hmr` enabled for Vite/Nuxt-based frameworks.
- NPM registry and workspace/refactor cleanups, plus assorted test updates and minor maintenance.
