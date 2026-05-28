---
date: 2026-04-07
repo: nodejs/node
size: M
title: "Streams fix, Undici 8.0.2, and WPT improvements"
excerpt: "Node updated vendored deps and test tooling, and fixed duplexPair destruction propagation plus utimes timestamp handling."
commits: 14
authors: [nodejs-github-bot, mhdawson, aduh95, inoway46, richardlau, Renegade334, panva, aelhor, joyeecheung]
commit_authors: {"78efdf7": nodejs-github-bot, "efa05f2": inoway46, "006e7aa": panva, "68e5f87": aelhor}
---

### **duplexPair now propagates destruction to the other side** (68e5f87)
Destroying one half of a `duplexPair` now schedules cleanup of the peer on `process.nextTick()`, so the other side is closed too without changing the public API. This fixes a class of hangs/leaks while avoiding a breaking error propagation change.

### **Undici bumped to 8.0.2 with matching fetch/FormData guidance** (78efdf7)
The vendored Undici copy was refreshed to 8.0.2, bringing a large set of internal API, docs, and behavior updates. The new docs call out that `fetch` and `FormData` must come from the same implementation and explain the dispatcher symbol/wrapper behavior used by Node’s built-in fetch.

### **WPT harness now supports skipping individual subtests** (006e7aa)
The WPT runner was extended so a single failing subtest can be skipped without taking down the entire file. That makes large web-platform test suites easier to triage and maintain.

### **fs.utimes tests now account for negative timestamp normalization** (efa05f2)
The test suite now captures the expected mtime at call time for async and sync `utimes`/`lutimes`/`futimes` paths. This aligns assertions with Node’s normalization of negative numeric timestamps to “now,” preventing flaky failures.

### Other misc changes
- Dependency updates: minimatch 10.2.5, googletest, simdjson, nixpkgs-unstable
- WPT and test utility tweaks, including unexpected-pass output and per-subtest skipping support
- OpenSSL update workflow runner adjustments for slim/ubuntu compatibility
- Repository metadata update moving Michael Dawson to emeritus
