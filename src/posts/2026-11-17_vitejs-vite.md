---
date: 2026-11-17
repo: vitejs/vite
size: M
title: "Build watch tests stabilized; preload sourcemaps sped up"
excerpt: "Vite improves build-watch reliability in playground tests and ships a perf optimization for preload-rewrite source maps."
commits: 3
authors: [maschwenk, sapphi-red, mattlewis92]
commit_authors: {"60c260d": maschwenk, "a379269": sapphi-red, "dbce0c6": mattlewis92}
---

**Speed up build preload rewrites by shifting sourcemaps** (dbce0c6)
Vite now shifts source maps during preload URL rewrites instead of re-tracing them, reducing build-time overhead for this path. The change also adds focused tests around `SourcemapEditor` mapping behavior to protect the new implementation.

### Other misc changes
- Stabilized flaky asset build-watch playground tests by waiting for rebuild idle time before asserting results (60c260d).
- Simplified a few CSS/HTML build conditions and removed an unnecessary bundled-client guard in HTML injection (a379269).
