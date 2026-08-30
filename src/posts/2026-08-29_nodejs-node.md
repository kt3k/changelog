---
date: 2026-08-29
repo: nodejs/node
size: M
title: "Worker refs, V8 fix, and builtin module cleanup"
excerpt: "Node adds web worker ref/unref support, disables a risky V8 memory check by default, and tightens builtin-module behavior."
commits: 13
authors: [jasnell, aduh95, panva, greenheadHQ, avivkeller, codebytere, bitpshr, mcollina, sjungwon03]
commit_authors: {"045ff95": jasnell, "d288ad3": avivkeller, "c5eb9de": codebytere, "789c7fd": aduh95, "cf26333": jasnell, "80885fc": panva, "452c8c5": bitpshr, "d86ded9": aduh95, "2f469df": mcollina, "15b5b21": panva, "6cff903": greenheadHQ, "7b0de5e": sjungwon03, "03924f6": greenheadHQ}
---

### **Web Workers can now be ref'd and unref'd** (d288ad3)
Node.js Web Workers now implement the Refable protocol, so `process.ref(worker)` and `process.unref(worker)` can control whether a worker keeps the event loop alive. The docs and tests were updated accordingly, bringing Web Workers closer to `worker_threads` behavior.

### **Node disables V8's external-memory abort check by default** (452c8c5)
Node now passes `--external-memory-max-reasonable-size=0` unless the user explicitly sets a value, preventing V8 from aborting the process when large external allocations happen in a single step. This fixes a crashy failure mode for legitimate large buffers and preserves the flag when users opt in.

### **builtinModules now reflects enabled builtins** (7b0de5e)
`module.builtinModules` is now derived from the enabled builtin set instead of being post-filtered in CJS loader init. The update also adds coverage for scheme-only builtins and experimental builtins, clarifying which `node:` entries are actually present by default versus behind flags.

### **benchmark scatter.js gains an R-free analysis mode** (cf26333)
Added a `--analyze` option to `benchmark/scatter.js`, making it more self-contained like `compare.js`. This is a substantial benchmark-tooling expansion, with matching docs updates.

### **benchmark compare.js max-regressions detection fixed** (045ff95)
`benchmark/compare.js` got a sizable correctness fix for max-regression detection, which should make benchmark comparisons more reliable. This affects how regression results are interpreted, so it matters for performance triage.

### Other misc changes
- Build fix for V8 shared pointer-compression cage configuration (c5eb9de)
- First-time contributor workflow now queries contributor status (80885fc)
- Doc link fixes and TOC cleanup (d86ded9, 03924f6)
- Test adjustments for `node_run_list`, link-local dgram scope, and builtin/module expectations (789c7fd, 15b5b21, 2f469df)
- Typings: add `encodeIntoResults` to `EncodingBinding` (6cff903)
