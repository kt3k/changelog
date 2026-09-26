---
date: 2026-09-25
repo: vitejs/vite
size: M
title: "Rolldown runtime fix and SSR stacktrace cleanup"
excerpt: "Bundled dev now serves rolldown’s runtime correctly, and SSR/sourceURL handling now works with paths containing spaces."
commits: 8
authors: [btea, sapphi-red, h-a-n-a, danielroe, bluwy, hi-ogawa]
commit_authors: {"bc598a6": h-a-n-a, "bbc8812": danielroe, "e64a587": hi-ogawa}
---

**Serve rolldown’s dev runtime from the installed package** (bc598a6)
Bundled dev now loads `rolldown/experimental/runtime` from the locally installed rolldown instead of expecting it to be bundled. This adds a dedicated `@rolldown` served path and tests to ensure every runtime import is actually available, preventing browser 404s when the runtime layout changes.

**Fix SSR sourceURL and stacktrace handling for paths with spaces** (bbc8812)
Vite now encodes `//# sourceURL=` values for SSR-evaluated modules and decodes them again when mapping runner source maps. That closes a bug where module paths containing whitespace could break stack traces and source-map lookups in SSR runtime and server-side debugging.

**Limit forwarded console payload size and object pretty-printing** (e64a587)
Console forwarding now truncates oversized messages, and object/array formatting is capped in depth and width. This avoids huge forwarded logs and makes complex values more readable in devtools and tests.

### Other misc changes
- CI workflow updates and action version pin/comment cleanup (4 commits)
- Replaced `cross-spawn` with `tinyexec` in browser-opening code
- Removed an unnecessary preview-release install step
