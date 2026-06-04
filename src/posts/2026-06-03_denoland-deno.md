---
date: 2026-06-03
repo: denoland/deno
size: L
title: "Deno hardens LSP, npm, and web compat"
excerpt: "Major refactors in web geometry and Node polyfills, plus several LSP, npm, and Jupyter fixes with user-visible behavior changes."
commits: 19
authors: [divybot, crowlbot, bartlomieju, nathanwhitbot, nathanwhit, denobot]
commit_authors: {"8875139": nathanwhit, "e032939": nathanwhitbot, "5bfb235": nathanwhitbot, "c7f97e5": nathanwhitbot, "4acfa5d": divybot, "9935b92": divybot, "085be0b": denobot, "f4be8bc": crowlbot, "d23528d": crowlbot, "d325319": crowlbot, "a984e2d": divybot, "c4e2dcd": bartlomieju, "49bdca6": bartlomieju, "5921c21": crowlbot, "b6c0d09": bartlomieju, "ee3040e": bartlomieju, "279285c": divybot, "85cb7ae": divybot, "f07b46d": divybot}
---

### **Web geometry drops nalgebra for local math** (c7f97e5)
Deno’s `deno_web` geometry implementation now uses in-tree vector/matrix helpers instead of `nalgebra`, trimming the dependency graph and keeping DOMMatrix/DOMPoint behavior local to the module. This is a sizable refactor with direct impact on bundle size, build complexity, and future maintenance.

### **Node polyfills are migrated to primordials** (9935b92)
The entire `ext/node/polyfills/` layer was converted to use primordials, removing the old lint suppression and aligning the Node compatibility surface with Deno’s hardened runtime patterns. This is a broad internal refactor across dozens of files that reduces reliance on mutable globals.

### **Jupyter kernel handshake is fixed for real ZMTP peers** (49bdca6)
The JS Jupyter kernel now speaks a libzmq-compatible ZMTP handshake, including the correct greeting format, READY framing, and single-write frame emission. This unblocks real editors and clients like VS Code and JupyterLab from failing at kernel info / message delivery.

### **npm tarball auth now falls back for same-origin registries** (c4e2dcd)
Tarball fetching now reuses scoped registry credentials when the tarball is served from the same origin as the registry, even if the tarball path doesn’t match the auth scope prefix. That fixes installs against registries like GitLab instance-level npm endpoints where tarballs live under a different path.

### **Workspace lifecycle scripts now run for npm package members** (4acfa5d)
The installer now treats workspace members as lifecycle-capable install roots, including members without package metadata, and orders scripts so transitive workspace dependencies still run first. This changes npm workspace install behavior in a user-visible way and adds coverage for the new execution order.

### **LSP request serialization is tightened for positional TSC calls** (5921c21)
Several TypeScript server requests now serialize through `ToV8` instead of generic serde paths, with primitive tuples encoded more directly and integers wrapped explicitly as JS numbers. This is a correctness-focused refactor in the LSP transport layer that reduces conversion ambiguity.

### **LSP fixes notebook diagnostics and workspace scoping** (85cb7ae, e032939, f07b46d)
Notebook and untitled/in-memory documents are now associated with the workspace root, avoiding bogus scope resolution and suppressing spurious library redeclaration diagnostics in Jupyter cells. In the same area, the document cache was refactored away from `weak-table`, and the LSP parent-process checker now avoids killing the server when the editor PID isn’t visible inside a container or private PID namespace.

### **PerformanceObserver buffered entries now replay correctly** (d23528d)
`PerformanceObserver.observe({ buffered: true })` now replays already-recorded entries into the observer buffer as the spec requires. This fixes a user-visible API bug where buffered observers missed earlier performance entries.

### **MessageEvent.ports is now frozen** (d325319)
`MessageEvent.ports` is now exposed as a frozen array, matching the spec’s `FrozenArray<MessagePort>` semantics. Code that mutates the ports array will now fail as it should instead of silently succeeding.

### **Local-file fallback handles import-map folder name conflicts** (b6c0d09)
When import-map resolution points at an npm package path that doesn’t exist, Deno now retries the original `{package}/{subpath}` as a local file if present. This fixes `deno run` cases where a folder name matches an import-mapped package name.

### Other misc changes
- Version bump to 2.8.2 and release metadata updates (085be0b)
- Differential tests for geometry matrix math (8875139)
- Regression specs for non-executable entrypoints, workspace symlink cycles, and import-map rename behavior (f4be8bc, a984e2d, 279285c)
- Reverted the descriptive `__proto__` accessor error due to Playwright incompatibility (ee3040e)
- Minor npm/LSP/doc cache refactors and cleanup (e032939, 5bfb235, 5921c21, f07b46d)
