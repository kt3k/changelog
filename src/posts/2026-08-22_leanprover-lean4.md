---
date: 2026-08-22
repo: leanprover/lean4
size: M
title: "Lake gets fail-fast builds"
excerpt: "Lake adds a fail-fast build mode, while Lean improves structure field hovers and VCGen accepts registered WP instances."
commits: 3
authors: [kmill, sgraf812, dennj]
commit_authors: {"47680c2": kmill, "e3b3b04": sgraf812, "fd0efc4": dennj}
---

### **Lake build can now fail fast** (fd0efc4)
`lake build` now has a `--fail-fast` mode that stops scheduling new jobs after the first required target failure, while letting already-running work drain. That can save a lot of time on large workspaces with an early error, and the new cancellation plumbing is careful to avoid misreporting canceled jobs as real failures.

### **Structure fields now carry better terminfo** (47680c2)
Lean now attaches terminfo to `structure` and `class` fields, which improves "go to definition" for dependent field usages and makes field search inside structure declarations more reliable. It also fixes missing terminfo/docstrings for private fields of public structures when using the module system.

### **VCGen accepts registered WP instances** (e3b3b04)
The VC generation pipeline now canonicalizes `WP` instances, so goals can use a registered `WP` instance instead of relying only on the low-priority instance synthesized from `WPMonad.toWP`. This removes a mismatch that could block spec application in monads that register a diamond `WP` instance.

### Other misc changes
- Adjusted Lean's constructor-as-variable linter to ignore structure-field constants.
- Updated `Std.WP` instance declarations to use ordinary `instance` definitions and `inferInstance`.
- Added regression tests for structure hovers, private fields, VCGen, and Lake fail-fast behavior.
