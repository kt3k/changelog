---
date: 2026-07-26
repo: leanprover/lean4
size: L
title: "Lean init bugfix and benchmark refresh"
excerpt: "Fixes a private-import initialization segfault and overhauls Lake inundation benchmarks with precompile variants."
commits: 2
authors: [Kha, tydeu]
commit_authors: {"0bfc3ac": Kha, "3b7f377": tydeu}
---

### **Fix Lean runtime initialization for private imports** (0bfc3ac)
Lean-generated modules now call the right initialization entrypoint even when `Lean` is only imported privately, preventing segfaults from missing `lean_initialize` calls. The runtime init functions were also made idempotent so repeated module initialization is safe, and FFI users no longer need to call the initialization helpers themselves.

### **Overhaul Lake inundation benchmarks** (3b7f377)
The `inundation` benchmark suite was reorganized into multiple sub-libraries with configurable layers, width, and precompile mode. This trims benchmark size back into a reasonable runtime budget while adding variants that better exercise precompiled module builds.

### Other misc changes
- Added a regression test for private `Lean` imports in executable packages
- Updated the reverse-FFI example to rely on implicit runtime initialization
- Benchmark script and test harness refactors
