---
date: 2026-04-01
repo: denoland/deno
size: L
title: "Deno adds prod installs and major Node runtime work"
excerpt: "New install flags, Node timers by default, and deep Node fs/stream refactors headline a busy day."
commits: 12
authors: [bartlomieju, seroperson, tmimmanuel, dsherret]
commit_authors: {"593bb1c": seroperson, "fa5d0a4": bartlomieju, "2ec0845": bartlomieju, "76dc661": bartlomieju, "2c76f45": bartlomieju, "d854112": bartlomieju}
---

### **Production install mode lands** (593bb1c)
`deno install` now supports `--prod` to skip `devDependencies`, plus `--skip-types` to omit `@types/*` packages when used with `--prod`. The flag also changes `--entrypoint` installs to build the graph as code-only, which is a meaningful shift for production deployments.

### **Node fs now returns real OS file descriptors** (2ec0845)
`node:fs` APIs were reworked to use actual OS file descriptors instead of Deno resource IDs. That fixes compatibility issues like `tty.isatty()` on opened files and removes the resource-table indirection from fd operations, which is a substantial runtime behavior change.

### **Node.js timers are now the default** (2c76f45)
Global `setTimeout`/`setInterval` and their clear counterparts now use Node timer APIs by default, and timer IDs are `Timeout` objects instead of plain numbers. This removes the need for `--unstable-node-globals` for timer behavior and tightens Node compatibility across the runtime.

### **Stream wrap internals were redesigned for reentrancy** (fa5d0a4)
The Node stream-wrapping layer was heavily refactored to make callback handling safe across reentrant JS calls. This is foundational work that reduces the risk of subtle lifetime bugs and sets up the TLS rewrite on top of a more stable base.

### **REPL and Jupyter completions drop the embedded LSP** (d854112)
The REPL and Jupyter kernel no longer spin up a full LSP server just for tab completion. They now use CDP-based completion APIs directly, cutting a lot of plumbing and making these interactive tools lighter and simpler.

### **Node/Deno global proxy removed** (76dc661)
The Node global proxy layer was deleted and the CommonJS wrapper was simplified to stop destructuring globals from internal Node state. This trims a large amount of legacy indirection now that timer globals are handled elsewhere.

### Other misc changes
- Release workflow URL/template fix
- CI workflow cleanup and release workflow repair
- Deno version bump to 2.7.11
- `fs.watch` compatibility tweak for immediate writes
