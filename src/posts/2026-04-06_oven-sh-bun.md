---
date: 2026-04-06
repo: oven-sh/bun
size: L
title: "Bun tightens CI gating and Windows packaging"
excerpt: "A new binary-size gate lands, PR error comparison gets smarter, Windows zips are fixed, and flaky webview tests are isolated on macOS CI."
commits: 4
authors: [dylan-conway]
commit_authors: {"1336813": dylan-conway, "5b3ca83": dylan-conway, "cd44594": dylan-conway, "f4258a4": dylan-conway}
---

### **New binary-size checks guard release builds** (5b3ca83)
Bun now runs a dedicated `binary-size` Buildkite step for release targets, comparing stripped binary sizes against the latest main build and a tagged release baseline. PRs fail if any target grows by more than 0.5 MB unless `[skip size check]` is used; main builds record the baseline instead.

### **Signed Windows artifacts are re-zipped with compliant ZIP layout** (cd44594)
The Windows signing pipeline switched from `Compress-Archive` to `cmake -E tar --format=zip` when repacking signed artifacts. That keeps the archive entry layout identical to the build output, avoiding backslash-path ZIP entries and the warnings/compatibility issues they cause on non-Windows extractors.

### **Error comparison now checks recently merged PRs, not main** (f4258a4)
`find-build` now labels pre-existing failures by comparing against the last few merged PRs' final builds instead of `main`, which no longer carries test annotations. This should make PR failure triage much more useful by filtering out issues that are already happening on the current fleet.

### **WebView rendering-dependent tests are skipped on macOS CI** (1336813)
The WebView test suite groups rAF- and animation-dependent cases behind a macOS-CI-only `itRendering` wrapper. This avoids hangs on headless CI runners where `CVDisplayLink` never fires, while keeping the tests available locally and on non-macOS paths.

### Other misc changes
- Build runtime tweak for Windows ARM64 CI builds
- Minor test assertion cleanup in WebView chrome tests
