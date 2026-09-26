---
date: 2026-09-25
repo: denoland/deno
size: M
title: "Coverage, mocks, and N-API get key fixes"
excerpt: "Deno fixes coverage around V8 code cache, restores mock.method() on reset, and improves N-API finalizer tracking plus a rand security patch."
commits: 5
authors: [piscisaureus, Hixie, wryanzimmerman, bartlomieju, r3wretrhy]
commit_authors: {"b157cd2": piscisaureus, "2200b3e": Hixie, "db5ac7b": wryanzimmerman, "6adda14": r3wretrhy}
---

### **Coverage now skips V8 code cache during collection** (2200b3e)
Deno disables the V8 code cache whenever coverage is being collected, preventing cached modules from reporting inflated top-level coverage. This fixes a subtle but important correctness issue in coverage output and adds regression tests for `run`, `test`, and `coverage` flows.

### **mock.reset() now restores mock.method() implementations** (6adda14)
`mock.reset()` previously cleared call history but left method mocks installed; it now restores mocked methods as well. That brings Deno's Node polyfill behavior in line with Node's `MockTracker.reset()` and closes a surprising gap in test cleanup semantics.

### **N-API finalizer tracking switched to ordered map** (db5ac7b)
Finalizers are now tracked in a `BTreeMap` instead of a `Vec`, making registration/removal more direct and avoiding linear scans when deregistering by ID. This is a small performance and maintenance improvement in the N-API finalizer path.

### **Dependency patch for vulnerable rand 0.9.x** (b157cd2)
`rand` was bumped from 0.9.2 to 0.9.3 in the lockfile to pick up a security fix for an unsound `ThreadRng` aliasing issue. The update reaches Deno through `hickory-resolver` and `opentelemetry_sdk`, which are linked into the runtime binary.

### Other misc changes
- Test registry update: node-gyp 12.1.0 for `@denotest/node-addon` and transitive npm fixtures (1 commit)
- Coverage/spec output updates for the new code-cache regression test
