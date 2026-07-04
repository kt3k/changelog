---
date: 2026-07-03
repo: denoland/std
size: M
title: "CLI promptSelect fixes tiny-terminal rendering"
excerpt: "@std/cli bumps to 1.0.32 and fixes promptSelect so it still shows an option when terminal height collapses to zero."
commits: 2
authors: [denobot, crowlKats]
commit_authors: {"3b390d0": denobot, "41d6b67": crowlKats}
---

### **Prompt select now always renders at least one item** (41d6b67)
`promptSelect()` used to collapse `visibleLines` to 0 when the available terminal height was too small, which left users with only a scroll indicator and no selectable items. This clamps the visible count to at least 1, fixing the tiny-terminal/fit-to-remaining-height edge case.

### Other misc changes
- Release bookkeeping for 2026.07.03 (3b390d0)
- @std/cli version bump to 1.0.32 and import map update (3b390d0)
