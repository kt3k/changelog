---
date: 2026-05-13
repo: denoland/std
size: M
title: "Path docs clarified; RollingCounter grows"
excerpt: "RollingCounter gets new unstable APIs and stronger snapshots, YAML parse types tighten, and path docs now spell out file: URL limits."
commits: 3
authors: [tomas-zijdemans, ChrisJr404]
commit_authors: {"f221cfa": tomas-zijdemans, "46ea5f7": tomas-zijdemans}
---

### **RollingCounter adds `at()`, `toArray()`, and stricter snapshots** (f221cfa)
`RollingCounter` now matches the rest of the unstable data-structure APIs more closely: its snapshot shape is readonly, it implements iteration explicitly, and it gains `at()` and `toArray()` alongside updated complexity docs. The restore path is also hardened with clearer `TypeError`/`RangeError` checks, which makes invalid snapshots fail more predictably.

### **YAML parse APIs now report `SyntaxError` more precisely** (46ea5f7)
`parse()` and `parseAll()` now type their warning callback as `SyntaxError`, and `parseAll()` returns `unknown[]` instead of `unknown`, aligning the signature with what it actually produces. The docs and tests were updated to reflect that both invalid YAML and multi-document input can throw, tightening the public contract.

### Other misc changes
- Path docs clarified URL handling for `basename`, `dirname`, and `extname`.
- Added `@throws` notes and non-`file:` URL guidance in posix/windows path docs.
