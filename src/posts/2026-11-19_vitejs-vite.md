---
date: 2026-11-19
repo: vitejs/vite
size: M
title: "Vite tightens startup, load, and HTML side-effect handling"
excerpt: "Startup failures now close servers cleanly, overlapping loads preserve module graph state, and HTML entry scripts keep their side effects."
commits: 3
authors: [materwelonDhruv, btea, h-a-n-a]
commit_authors: {"c732677": materwelonDhruv, "b516bc2": btea, "ef295d5": h-a-n-a}
---

### **Server startup now closes cleanly on failure** (c732677)
Vite now makes sure the dev server is closed if startup blows up in hooks like `configureServer`, `buildStart`, `options`, or `createEnvironment`. This prevents half-initialized servers and leaked resources when plugin initialization fails.

### **Overlapping module loads no longer drop valid work** (b516bc2)
The dev server’s load pipeline was adjusted so a successful load is retained even if a concurrent overlapping load fails, and vice versa. This fixes a subtle race in `transformRequest`/`load` handling that could otherwise discard module graph state on the first request.

### **HTML entry scripts keep their side effects when loaded indirectly** (ef295d5)
When an HTML entry script is already being loaded through another importer, Vite now also marks the module info as having side effects, not just the immediate `this.load` call. That keeps entry-script execution semantics correct in overlapping load scenarios.

### Other misc changes
- Added regression tests for startup-failure cleanup and overlapping-load behavior.
- Misc server/plugin-container test coverage and playground updates around `this.addWatchFile` handling.
