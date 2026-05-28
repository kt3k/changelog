---
date: 2026-04-24
repo: nodejs/node
size: L
title: "Node buffers, globbing, and a V8 bump"
excerpt: "A mix of real bug fixes and a substantial V8 update landed, plus a new fs glob option and HTTP cleanup."
commits: 40
authors: [targos, joyeecheung, richardlau, gahaas, isheludko, backes, StefanStojanovic, danmcd, mcollina, ronag, abmusse, luyahan, miladfarca, watilde, pimterry, ShogunPanda]
commit_authors: {"2428030": pimterry, "4744070": mcollina, "8176c2c": ronag, "f1e0b83": targos}
---

### **fs glob can now follow symlinks** (4744070)
`fs.glob`, `fs.promises.glob`, and `globSync` gained a new `followSymlinks` option for expanding `**` through directory symlinks. The implementation also guards against symlink cycles, which makes recursive globbing more capable without risking infinite traversal.

### **Buffer indexOf/lastIndexOf now handle end bounds correctly** (8176c2c)
This fixes multiple edge cases in Buffer search APIs: negative `end` values are now clamped safely, empty needles respect the search range, and a fast-path parameter ordering bug was corrected. It closes correctness gaps that could return wrong positions or overflow internally.

### **HTTP request destroy no longer leaks listeners on reused sockets** (2428030)
A leaked socket error listener is removed when a request is cleaned up and the socket is returned to the agent pool. That prevents listener accumulation on keep-alive connections and matches the updated docs for `req.destroy()` behavior.

### **V8 was updated to 14.6 with broad embedder fallout fixes** (f1e0b83)
Node pulled in V8 14.6.202.33, which is a major engine bump with ABI implications and a widened set of API changes. The same wave includes the NODE_MODULE_VERSION bump to 147 and a long tail of compatibility patches across V8’s public APIs, build files, platform code, and Node’s own C++ embedding layer.

### Other misc changes
- V8 integration and API-compatibility follow-ups: seeded array index hashing, wasm memory reservation API, interceptor/store semantics, deprecated API removals, platform fixes, and build updates.
- Test and CI-only adjustments: worker skips, expectation updates, build flags, and assorted V8 backports/cherry-picks.
- Small docs/meta changes: typo fix, HTTP docs clarification, and CODEOWNERS update.
