---
date: 2026-11-26
repo: oven-sh/bun
size: M
title: "Bun.diff gains mixed-encoding support"
excerpt: "Bun.diff can now compare Latin-1 and UTF-16 strings without copying, improving patching and diff accuracy for mixed text inputs."
commits: 1
authors: [alii]
commit_authors: {"e13b16b": alii}
---

### **Bun.diff now handles Latin-1 vs UTF-16 directly** (e13b16b)
Bun’s diff engine can compare a Latin-1 string against a UTF-16 string without first copying one side into a new buffer. That should reduce overhead for mixed-encoding text diffs and make `Bun.diff` more robust when inputs don’t share the same internal representation.

The runtime API was also adjusted to accept more flexible apply options, and the test suite was expanded to cover the new mixed-encoding behavior.

### Other misc changes
- Updated diff object bindings and internal text-diff helpers for the new code-unit handling
- Expanded `bun.diff` tests for mixed Latin-1/UTF-16 cases
