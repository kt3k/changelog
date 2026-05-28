---
date: 2026-05-12
repo: nodejs/node
size: L
title: "macOS cert trust fix, test tags, wasm JS API"
excerpt: "Node fixed macOS system CA handling, added test-runner tags/filtering, and updated wasm Exception JS API support."
commits: 10
authors: [nodejs-github-bot, aduh95, deepak1556, Liedtke, geeksilva97, thisalihassan, inoway46, atlowChemi]
commit_authors: {"c363bec": deepak1556, "678b46a": Liedtke, "b06aee0": atlowChemi}
---

### **Fix macOS system certificate trust enumeration** (c363bec)
Node now correctly treats missing `kSecTrustSettingsResult` on macOS as `TrustRoot`, matching Apple’s default behavior. This fixes a false rejection path for self-signed/system-trusted certificates and also tightens the certificate filtering logic around expired roots and trust evaluation.

### **Add test runner tags and tag filtering** (b06aee0)
The test runner gained first-class `tags` on `test()`, `it()`, `suite()`, and `describe()`, plus a new `--experimental-test-tag-filter=<tag>` CLI flag and `testTagFilters` run option. Tags inherit through suites, are exposed to reporters and `TestContext`, and let users select tests by metadata instead of brittle name patterns.

### **Update WebAssembly.Exception JS API support** (678b46a)
Node cherry-picked V8 changes that add `WebAssembly.Exception.prototype.stack` and set `WebAssembly.Exception.length` to 2, aligning the API with the WebIDL spec. The update also adds the corresponding V8 plumbing and updates affected wasm-js expectations/tests.

### Other misc changes
- Updated WPT fixtures for wasm/jsapi to a newer upstream revision, including new string-constant coverage.
- Cherry-picked a libuv pedantic-warning cleanup.
- Removed dead code in `src/node_sqlite.cc`.
- Relaxed and then reverted a flaky `test-memory-usage` assertion.
- Made `different-registry-per-thread` more deterministic, then reverted that change.
- Bumped the Nixpkgs pin for tooling.
