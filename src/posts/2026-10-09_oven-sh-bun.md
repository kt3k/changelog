---
date: 2026-10-09
repo: oven-sh/bun
size: L
title: "Bun fixes async stream teardown and splitting bugs"
excerpt: "Major fixes for async iterable cleanup, bundler splitting order, and several Bun check false positives/crashes."
commits: 7
authors: [Jarred-Sumner, dylan-conway, robobun]
commit_authors: {"9e31db2": robobun, "4b5793d": dylan-conway, "7adb8ee": Jarred-Sumner, "e879366": dylan-conway, "b000af7": Jarred-Sumner, "e555359": Jarred-Sumner}
---

### **Async iterable streams now close with `return()`** (9e31db2)
Bun now always closes `new Response(asyncIterable)` consumers by calling `iterator.return()` instead of throwing into the iterator. This fixes hanging streams and leaked listeners when clients disconnect or writes fail, and it aligns the runtime with the documented teardown behavior.

### **Bundler splitting now handles shared chunks with differing evaluation order** (4b5793d)
`--splitting` now avoids putting incompatible entry points into the same shared chunk when their imported modules must run in different orders. This prevents load-time failures that could happen even though the bundle built successfully.

### **`bun check` fixes multiple false positives and a crash** (b000af7, e555359)
Type checking got several correctness fixes, including false unused-binding / rename diagnostics and a crash on plain JavaScript object literals assigning to `this[k]`. The checker also now shares declaration files across projects, which should significantly reduce repeated work on larger project-reference builds.

### **Bundler splitting regression was reverted and reworked** (e879366, 7adb8ee)
A previous chunk-splitting approach that grouped files by evaluation order was reverted and replaced with a new implementation path. The follow-up reintroduces the feature with a safer plan for choosing chunk layouts, while restoring the docs to match the final behavior.

### Other misc changes
- Test suite updates and type annotation cleanup across `test/` and package typings
- Internal refactors in binder / sema plumbing
- Minor docs and release-script adjustments
