---
date: 2026-04-19
repo: nodejs/node
size: L
title: "FFI grows APIs; inspector gets probe mode"
excerpt: "Node adds non-interactive inspect probes and expands experimental FFI with new methods, error codes, and docs."
commits: 3
authors: [ShogunPanda, joyeecheung, panva]
commit_authors: {"14e16db": ShogunPanda, "a79e224": joyeecheung, "58a8e1d": panva}
---

### **Inspector gains non-interactive probe mode** (a79e224)
`node inspect` now supports a new `--probe` workflow that launches an app, sets source breakpoints, evaluates expressions at each hit, and emits a final text or JSON report. This is a meaningful debugging upgrade for run-to-completion apps and tooling, especially when you want printf-style inspection without editing code.

### **Experimental FFI adds new methods and error codes** (14e16db)
The experimental FFI surface grew several new APIs, including memory export helpers and support for resolving symbols from the current process image via `null` on non-Windows platforms. The commit also adds dedicated FFI error codes and a benchmark/test sweep, which should make the feature more usable and easier to validate.

### Other misc changes
- Marked `test-snapshot-reproducible` as flaky/skipped (58a8e1d).
