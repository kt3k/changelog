---
date: 2026-06-24
repo: nodejs/node
size: M
title: "perf_hooks gains per-iteration event loop sampling"
excerpt: "Node 26.4.0 lands new perf_hooks sampling mode plus mostly docs, tests, and release housekeeping."
commits: 8
authors: [parkhojeong, trivikr, pabloerhard, aduh95, richardlau, Rawal27]
commit_authors: {"c5635b8": pabloerhard, "cc37ad5": aduh95, "6f11fe7": richardlau, "bfb2fa7": trivikr}
---

### **perf_hooks: sample delay per event loop iteration** (c5635b8)
`monitorEventLoopDelay()` now accepts a `samplePerIteration` option that samples from libuv event-loop iterations instead of a timer interval. The API stays backward compatible by default, while the new mode is useful when you want iteration-based delay data without keeping the loop alive.

### **Node.js 26.4.0 release metadata and changelog update** (cc37ad5)
The version docs were bumped to 26.4.0 and the release changelog was rolled forward. This is release housekeeping, but it also surfaces the set of semver-minor changes shipped in the current line.

### **AIX official binary toolchain docs updated** (6f11fe7)
The build docs now reflect that official AIX binaries are produced with Clang 20.1 instead of GCC 12. This matters for contributors and release engineers targeting AIX, since it changes the expected toolchain environment.

### **hr-time WPT flaky status narrowed to macOS 15 x64** (bfb2fa7)
The hr-time WPT status was converted to a `.cjs` file so the flaky expectation only applies on macOS 15 x64. That tightens test gating and avoids masking the test on unrelated platforms.

### Other misc changes
- Typos fixed in test comments and embedding snapshots (2 commits)
- fs docs example import corrected
- HTTP timeout test made less sensitive to keep-alive teardown timing
