---
date: 2026-07-09
repo: nodejs/node
size: M
title: "Blob stream leak fixed; tests tightened on Windows"
excerpt: "A Blob.stream() GC leak was fixed, and Windows-specific test normalizations/flaky markers were updated for debugger, HTTP/2, and SEA."
commits: 4
authors: [PickBas, joyeecheung, semimikoh]
commit_authors: {"8fec65d": joyeecheung, "243905a": semimikoh}
---

### **Blob.stream() no longer leaks its source buffer** (243905a)
`Blob.prototype.stream()` used to keep a wakeup callback alive for the lifetime of the reader, which retained the blob data and backing store even after the stream was done. The fix registers the callback lazily, clears it on completion/cancel/error, and adds a GC regression test showing array buffer retention stays bounded.

### **Debugger probe now normalizes Windows crash exits** (8fec65d)
The debugger test helper now recognizes the inspector teardown crash on Windows as exit code `3221225477` in addition to the existing `SIGSEGV` case on Unix-like systems. This makes the flaky crash normalization work consistently across platforms instead of only handling Unix signal reports.

### Other misc changes
- Unmarked flaky `test-http2-large-file` on Windows.
- Unmarked flaky SEA snapshot tests on Windows.
