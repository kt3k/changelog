---
date: 2026-06-13
repo: biomejs/biome
size: M
title: "Biome fixes migrate comma bug"
excerpt: "A malformed trailing comma could break strict JSON migrations when the renamed rule was last in its group; this patch fixes it and adds coverage."
commits: 1
authors: [tom-groves]
commit_authors: {"5f837df": tom-groves}
---

### **Fix malformed migrate output for renamed rules** (5f837df)
`biome migrate` now preserves separator state correctly when a renamed rule is the last item in a group, preventing an invalid trailing comma from being emitted. That matters because the bad output could abort migrations of strict-JSON `biome.json` files with a parse error.

### Other misc changes
- Added a regression test and snapshot for `renamedRuleLastInGroup`.
- Changelog entry for the patch release.
