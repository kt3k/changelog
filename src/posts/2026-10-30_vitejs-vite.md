---
date: 2026-10-30
repo: vitejs/vite
size: M
title: "SSR input, console escaping, and preload fixes"
excerpt: "Vite tightened SSR build config handling, fixed console escape sanitization, and landed a few build/runtime correctness improvements."
commits: 6
authors: [sapphi-red, devjaeyoon, btea, bpuns, L-zeus]
commit_authors: {"90bc034": sapphi-red, "20d355a": btea, "8109efd": bpuns, "175bbeb": L-zeus, "4f340fd": sapphi-red}
---

### **SSR build now inherits top-level input** (90bc034)
When `build.ssr: true` is used during a build, Vite now applies the top-level `input` to the SSR environment. This fixes a config gap where SSR builds could ignore the intended entry, while dev mode remains unchanged.

### **Dev console forwarding now escapes unsafe ANSI sequences** (4f340fd)
`server.forwardConsole` now sanitizes browser log output before sending it to Vite's logger, escaping BEL/C1 controls and unsupported escape sequences while preserving normal SGR styling. This prevents browser-emitted terminal controls from causing side effects in the terminal.

### **Rolldown import-meta transform now emits sourcemaps** (20d355a)
The `import-meta-current-dirname` build plugin now returns source maps for transformed modules and chunk rewrites. That should improve debugging and keep build output better aligned with original sources.

### **Plugin container close now waits on overlapping shutdowns** (175bbeb)
`pluginContainer.close()` now shares the same in-flight close promise across concurrent calls, so overlapping shutdowns don't race or double-run cleanup. The new behavior stays idempotent even when `closeBundle` rejects.

### **CSS preload listeners are cleaned up after settle** (8109efd)
The preload runtime now removes `load` and `error` listeners once a stylesheet preload settles, avoiding lingering handlers on finished links. The accompanying test asserts the listeners are gone after load.

### Other misc changes
- `create-vite` keeps TypeScript 6 when `--eslint` is used for TS templates.
- Updated scaffold and config tests.
- Minor test coverage and build fixture adjustments.
