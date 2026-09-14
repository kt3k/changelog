---
date: 2026-09-13
repo: nodejs/node
size: L
title: "Snapshot safety and test speedups"
excerpt: "Node tightened snapshot blob validation, fixed a multi-environment crash, and sped up several test and runner paths."
commits: 17
authors: [panva, jasnell, codebytere]
commit_authors: {"e69b8eb": jasnell, "6193e15": panva, "5f77f95": codebytere, "1105aec": codebytere}
---

### **Hardened snapshot blob parsing and empty-file handling** (5f77f95)
Node now rejects empty, foreign, or truncated `--snapshot-blob` inputs instead of asserting or reading past the buffer. The deserializer adds bounds checks and returns a clean failure path, closing a crash/UB class in startup snapshot handling.

### **Fixed aborts when multiple Environments share one IsolateData** (1105aec)
Several per-isolate templates were moved to cache safely across Environments instead of being recreated and CHECKing on a second load. This unblocks embedders that create more than one Environment from the same isolate data, including paths that hit `net`, `http2`, crypto keys, and related bindings.

### **Added CSV export to benchmark compare analysis** (e69b8eb)
`benchmark/compare.js --analyze` can now write its output to a CSV file with `--csv <filename>`. That makes benchmark comparisons easier to archive and post-process, and the new test coverage locks the behavior in.

### **WPT runner now schedules generated variants individually** (6193e15)
The test runner now discovers WPT tasks through their JavaScript drivers so generated variants can be scheduled, reported, and rerun as separate paths. This improves fidelity for WPT execution and required broad updates across the runner, Python tooling, and WPT configuration.

### Other misc changes
- Sequential test cleanup/runtime tweaks
- Test-suite timing reductions across crypto, HTTP, DNS, streams, and runner cases
- `tools/test.py` overhead reduction and sorted slow-test reporting
- ZIP64 stress test I/O reduction
- External-memory test rewritten to avoid large allocations
- Minor broadcast/timeout/server cleanup in tests
