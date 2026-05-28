---
date: 2026-04-18
repo: nodejs/node
size: M
title: "Node adds race error and stream/blob fixes"
excerpt: "New ESM race handling, Blob sequence parsing, test runner event IDs, and several WebStreams/runtime cleanup changes landed."
commits: 12
authors: [aduh95, Renegade334, panva, avivkeller, Ms2ger, MoLow, ShogunPanda]
commit_authors: {"1266013": aduh95, "adeb14a": aduh95, "1bc6394": Renegade334, "ad44dc4": Renegade334, "df5a925": Ms2ger, "31b9e60": MoLow}
---

### **ESM require() now throws a dedicated race-condition error** (adeb14a)
Node adds `ERR_REQUIRE_ESM_RACE_CONDITION` to distinguish a module that is being `require()`d before async loading has finished. The loader now throws this specific error in the race path, which should make the failure mode clearer and easier to diagnose.

### **Blob constructor now follows sequence conversion more closely** (df5a925)
The `Blob` constructor was reworked to use WebIDL sequence conversion instead of manually rejecting non-iterables and stringifying parts. This should bring argument handling closer to the spec, especially around coercion order and mixed part types.

### **`test_runner` events gain a stable `testId`** (31b9e60)
Test events now include a `testId`, and the API docs plus fixture coverage were updated accordingly. This gives consumers a more reliable way to correlate test lifecycle events across streams and tooling.

### **ReadableStream-from-iterable is simplified** (1266013)
`readableStreamFromIterable()` was refactored to use direct async iteration and to validate iterator methods explicitly. The change also tightens error handling around iterator results and cancellation while removing older helper machinery.

### **`isDataView()` switches to a JS-only implementation** (1bc6394)
Node moved `isDataView()` off the native implementation and onto the JS path. That reduces native surface area and keeps the type check logic in one place.

### **Inspector and error source locations use context-free V8 columns** (ad44dc4)
Source-location plumbing was updated to read column information without a context argument in the inspector and error formatting paths. This is a small runtime compatibility cleanup for newer V8 APIs.

### Other misc changes
- Re-enabled undici WPTs in the daily wpt.fyi job.
- Broadened stale bot automation and related contributor docs.
- Minor lint, docs, and tooling cleanup, including OpenSSL test-shared nix config and a strict-mode contextify test.
