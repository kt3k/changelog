---
date: 2026-05-14
repo: nodejs/node
size: M
title: "Stream share gets faster; docs and test upkeep"
excerpt: "A stream sharing optimization headlines the day, with a few docs, test, and build-file cleanups alongside it."
commits: 6
authors: [aduh95, MikeMcC399, RobinMalfait, trivikr]
commit_authors: {"841fc90": aduh95, "a73fafb": RobinMalfait, "2edd842": trivikr, "f56c4c5": aduh95, "843dc5f": MikeMcC399, "da860f9": MikeMcC399}
---

### **Stream sharing trims cursor scanning overhead** (2edd842)
The shared-stream iterator now caches the minimum cursor and how many consumers sit at that position, so trimming only recomputes the minimum when that last consumer moves or detaches. That reduces repeated scans across all consumers under fan-out workloads, and the new benchmark adds coverage for the shared iterator path.

### **Other misc changes**
- Fixed the test426 dependency updater script to use the shared version-comparison helper and emit a truncated `NEW_VERSION` value. (841fc90)
- Corrected a Module docs example to call `load` instead of `resolve`. (a73fafb)
- Moved FFI tests into `NATIVE_SUITES` and taught the test runner to ignore that suite. (f56c4c5)
- Updated BUILDING.md guidance for supported production tiers and the Visual Studio 2022 version reference. (da860f9, 843dc5f)
