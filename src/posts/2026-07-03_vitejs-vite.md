---
date: 2026-07-03
repo: vitejs/vite
size: M
title: "Vite tightens import map and HTML build fixes"
excerpt: "Build output now strips pure CSS chunk imports correctly with chunk import maps, plus HTML import detection and preload URL handling got fixes."
commits: 4
authors: [sapphi-red, TheAlexLichter]
commit_authors: {"648bd04": sapphi-red, "b5868c0": TheAlexLichter, "f1f90ed": sapphi-red}
---

**Fix pure CSS chunk imports when `chunkImportMap` is enabled** (648bd04)
Vite now resolves CSS chunk names through the generated import map before replacing empty chunks, so pure CSS imports are stripped correctly in the final build output. This fixes chunk-import-map builds where CSS-only chunks could leak into emitted code.

**Speed up HTML import-only detection** (b5868c0)
The HTML plugin replaces a backtracking-heavy regex with a token-by-token scanner for import-only module scripts. That keeps the same behavior, but avoids pathological slowdowns on large chunks.

**Preserve `import.meta.url` in the preload helper** (f1f90ed)
The build import-analysis preload helper now keeps `import.meta.url` intact instead of rewriting it in a way that could affect source maps or transforms. A test update reflects the changed sourcemap output.

### Other misc changes
- Test adjustments for `server.ws` config merging and client reload HMR port cases (2 commits)
- Added an ESM fixture for native import config tests
- Package lockfile update
