---
date: 2026-03-03
repo: nodejs/node
size: M
title: "Node 25.8.0 lands with key fixes"
excerpt: "Node.js 25.8.0 ships plus source-map, async context, and build fixes; most remaining changes are dependency and doc updates."
commits: 12
authors: [nodejs-github-bot, legendecas, aduh95, joyeecheung, Flarna, avivkeller]
commit_authors: {"afc30b7": legendecas, "48c208f": aduh95, "d0798d1": joyeecheung, "3b9fe89": nodejs-github-bot, "4eac937": Flarna}
---

### **Node.js 25.8.0 released** (3b9fe89)
Version 25.8.0 is tagged as the current release, pulling in the cycle’s notable feature work around SQLite limits, diagnostics channels, permission auditing, and test runner worker IDs. The release also folds in a broad set of fixes across HTTP, streams, module resolution, and crypto.

### **Fix invalid source map URLs in dynamic imports** (afc30b7)
Source map lookup now safely rejects malformed or unsupported URLs instead of blindly constructing a `URL`, which avoids crashes or bad lookups during eval and dynamic import. A new regression test covers invalid protocols, bad file URLs, and bare invalid mappings.

### **Release async context frames on destroy to prevent ALS leaks** (4eac937)
`AsyncWrap::EmitDestroy()` now clears its stored context frame when the resource is destroyed, allowing GC to reclaim async-local-storage state sooner for reused resources like `HTTPParser`. The debug build also warns if `MakeCallback()` is reached without a context frame, helping catch use-after-destroy style bugs.

### **Stop depending on V8-only deps for `--without-bundled-v8` builds** (48c208f)
Build logic no longer pulls in V8-specific dependencies like Abseil and simdutf when Node is configured to use an external V8. This makes non-bundled-V8 builds cleaner and less fragile across toolchains.

### **Document `syncHooks.deregister()`** (d0798d1)
The `module` docs now include the missing `syncHooks.deregister()` entry, filling in an API gap for users of the synchronous hooks registration flow.

### Other misc changes
- ESLint/Babel tooling bump and config adjustments
- ADA dependency update
- Minichanges to docs and changelog metadata
- Renovate/dependency bumps in tooling and CI
- WPT WebCrypto snapshots refreshed
