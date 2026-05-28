---
date: 2026-04-14
repo: nodejs/node
size: L
title: "Node.js adds ffi module, tightens fs validation"
excerpt: "A new node:ffi module lands, SQLite is bumped to 3.53.0, and fs read APIs now validate position before early returns."
commits: 8
authors: [nodejs-github-bot, aduh95, geeksilva97, cjihrig]
commit_authors: {"ed05549": geeksilva97, "17d03b5": nodejs-github-bot, "54d7d14": aduh95, "d0fa608": cjihrig}
---

### **node:ffi lands as a new core module** (d0fa608)
Node.js now ships a `node:ffi` module backed by bundled libffi, with build and CI wiring added across Makefiles and GitHub workflows. This opens the door to calling C libraries from JS in a first-class way, which is a major new capability for the runtime.

### **fs read APIs now validate `position` before returning on zero-length reads** (ed05549)
`fs.read()`, `fs.readSync()`, and the promises variant now reject invalid `position` values even when `length === 0`, matching the expected argument-validation order. The added tests lock in the behavior so bad input no longer slips through on empty reads.

### **SQLite updated to 3.53.0** (17d03b5)
The embedded SQLite dependency was refreshed from 3.51.3 to 3.53.0, bringing in a large upstream code update. This is a significant dependency upgrade that can include behavior changes, fixes, and new SQLite features.

### **`spawnSync` now coerces string args once** (54d7d14)
`spawnSync` was refactored to convert non-string arguments to strings a single time instead of cloning and mutating the JS array. That reduces overhead and avoids extra object churn in synchronous process spawning.

### Other misc changes
- Updated `gyp-next` to 0.22.0 and taught it about Windows ARM64.
- Bumped `nbytes` to 0.1.4 with its test/build setup changes.
- Fixed macOS `--shared-ffi` compilation in Nix and updated the Nixpkgs pin.
