---
date: 2026-06-12
repo: nodejs/node
size: L
title: "Package maps land; Buffer.copy gets faster"
excerpt: "Node adds experimental package-map resolution and speeds up Buffer.copy via new V8 byte-copy APIs."
commits: 7
authors: [ronag, watilde, arcanis, legendecas, aduh95]
commit_authors: {"4383f67": ronag, "d66c3a6": ronag, "20fda56": watilde, "8c43981": watilde, "2f2b810": arcanis, "11390b5": legendecas, "144f795": aduh95}
---

**Experimental package maps for module resolution** (2f2b810)
Node now supports `--experimental-package-map`, letting bare specifier resolution consult a JSON package map to control which packages may import which dependencies. The change adds new docs, error codes, CLI flag plumbing, resolver logic, and extensive tests, so it’s a significant new module-resolution feature.

**Buffer.prototype.copy now uses V8 byte-copy APIs** (4383f67)
Buffer copies are routed through V8’s new `CopyArrayBufferBytes` APIs instead of manually materializing views and `memmove`-ing bytes in Node. This should improve partial-copy performance and also makes copies correctly return 0 when the target backing store is detached or immutable.

### Other misc changes
- Added V8 `CopyArrayBufferBytes` APIs and bumped the embedder patch version (d66c3a6).
- Removed a redundant AIX shared-library intermediate target from the build (11390b5).
- Hardened a few GitHub Actions shell invocations and PR-url linting (144f795).
- Fixed two documentation typos (20fda56, 8c43981).
