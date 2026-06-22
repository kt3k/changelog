---
date: 2026-06-21
repo: leanprover/lean4
size: S
title: "Test discovery skips stray temp files"
excerpt: "Lean4 now ignores transient `_tmp_*` files during test globbing, preventing interrupted benchmark leftovers from appearing as phantom tests."
commits: 1
authors: [Kha]
commit_authors: {"d9a5896": Kha}
---

**Test globbing ignores transient `_tmp_*` files** (d9a5896)
Test discovery now filters out files matching `^_tmp_` when building the test pile, so leftover temporary artifacts from interrupted runs won't be picked up as fake tests. This makes the test list more robust and avoids confusing CI or local runs with phantom entries.

### Other misc changes
- None
