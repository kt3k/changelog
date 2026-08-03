---
date: 2026-08-02
repo: leanprover/lean4
size: L
title: "Lake fixes and vector proof cleanup"
excerpt: "Lake now trims noisy exit-code and cache-transfer failures, library build errors are reported more precisely, and vector algebra proofs were de-automated."
commits: 5
authors: [sankalpsthakur, jcreinhold, tydeu, kim-em]
commit_authors: {"110db9c": sankalpsthakur, "cdd822a": jcreinhold, "0ccd6f7": tydeu, "f1053b6": kim-em}
---

### **Lake stops repeating the generic Lean exit-1 noise** (110db9c)
Lake now suppresses `error: Lean exited with code 1` when Lean has already emitted error diagnostics, which makes ordinary type-error failures much cleaner to read. It still reports non-1 exits, exit 1 with no diagnostics, and the anomalous case where Lean logs errors but exits successfully.

### **Lake cache transfers now handle failures more safely** (0ccd6f7)
Artifact downloads/uploads now distinguish curl exit codes from HTTP results, handle IO errors with explicit messages, and write downloads to sibling `.tmp` files before renaming them into place. That reduces the chance of silently corrupted cache entries breaking later builds.

### **Library-root file misses are reported directly** (cdd822a)
When a `lean_lib` root module can’t be read, Lake now keeps that failure in the collection result so the build job exposes the underlying missing-file error instead of only saying modules have bad imports. The summary message was widened accordingly to cover unreadable modules too.

### **Vector algebra proofs were rewritten without `grind`** (f1053b6)
A batch of vector algebra theorems in `Init.Data.Vector.Algebra` was converted from `grind`-based proofs to explicit extensional, componentwise arguments. This reduces automation dependence in core math-like infrastructure without changing the public API.

### Other misc changes
- Stage0 update (1 commit)
