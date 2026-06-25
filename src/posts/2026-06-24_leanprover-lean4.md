---
date: 2026-06-24
repo: leanprover/lean4
size: M
title: "Lean 4 adds adaptation PR CI"
excerpt: "New downstream adaptation PR automation lands, alongside a faster parallel lint script and a regression test."
commits: 5
authors: [Garmelon, ayhon, TWal]
commit_authors: {"d29f6a4": Garmelon, "5eccb16": Garmelon, "c50c2ba": Garmelon, "2e00abb": ayhon, "0a8abcb": TWal}
---

### **Downstream adaptation PR automation added** (c50c2ba)
Lean now has a dedicated GitHub Actions flow for creating and updating downstream adaptation PRs, plus the matching release-side step that triggers it after PR toolchain releases are published. This wires Lean 4 into the downstream repo more directly, reducing manual coordination for adaptation testing.

### **Linting script is now parallel-safe and much faster** (5eccb16)
`tests/lint.py` was rewritten to scan only files tracked by git instead of walking the whole tree, which should cut runtime by about an order of magnitude. The test is also no longer forced to run serially, so it can execute alongside other tests without the old file-race failures.

### **Regression test added for implicit-reduction bug** (0a8abcb)
A new elaboration test covers issue #13512, checking that matching on the output of an implicit reducible function does not reduce it too early. This guards against a previous Lean behavior that could change `dsimp` and `grind` results.

### Other misc changes
- CI lint config updated for GitHub Actions workflow path exemptions (c50c2ba)
- Lint script compatibility fix for older Python CI after the parallelization change (d29f6a4)
- Added safety docstrings for two unsafe attribute helpers (2e00abb)
