---
date: 2026-03-03
repo: oven-sh/bun
size: M
title: "Windows watcher crash fixed; CSS parsers cleaned up"
excerpt: "A Windows fs.watch segfault was fixed, alongside CSS parser cleanup for a subtle Zig error-handling leak pattern."
commits: 2
authors: [dylan-conway]
commit_authors: {"2dc1533": dylan-conway, "9f9b681": dylan-conway}
---

### **Windows fs.watch retry no longer segfaults** (2dc1533)
`fs.watch()` on Windows could leave behind a poisoned watcher entry when the first attempt failed and the caller retried the same path, leading to a crash on the next lookup. The fix cleans up the half-initialized watcher inline and adds a regression test that reproduces the failure mode with dangling junctions.

### **CSS parsers now free partially built state on parse errors** (9f9b681)
A bug pattern in `Result(T)`-returning CSS parsers was leaving allocated parser state alive because `errdefer` never ran on `return .{ .err = ... }`. This patch moves cleanup into the error paths for declaration parsing and `light-dark()` custom property parsing, preventing leaks and tightening the error handling.

### Other misc changes
- None.
