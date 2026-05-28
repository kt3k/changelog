---
date: 2026-05-19
repo: oven-sh/bun
size: L
title: "Bun lands import defer and SQL fix"
excerpt: "Stage 3 deferred imports ship, MySQL MEDIUMINT decoding is fixed, and several runtime leaks and perf issues were cleaned up."
commits: 53
---

### **Implement static `import defer` support** (184d037)
Adds the TC39 Stage 3 static `import defer` syntax, including parser, bundler, printer, and runtime metadata changes. This lets Bun link a module up front but postpone evaluation until the namespace is actually touched.

### **Fix MySQL MEDIUMINT/INT24 binary decoding** (05a7a5c)
Bun’s SQL MySQL/MariaDB binary protocol reader was consuming the wrong number of bytes for `MEDIUMINT`, which could corrupt every following column or hang reads. This patch aligns the cursor handling with the wire format and adds a focused regression test.

### **Fix leaking adopted string bodies in fetch/Blob consumers** (4a8a093)
String-backed `Response`/`Request` body consumers were leaking the adopted WTF string ref when parsed via `.json()`, `.arrayBuffer()`, or `.bytes()`. The fix restores ownership handling so body strings are released correctly.

### **Fix dangling package-manager log pointers during resolve** (2017304)
When auto-install kicked in during resolution, Bun could leave `package_manager.log` pointing at stack memory after the resolve finished. The new guard restores the log state correctly and adds a regression test for the crashy autoinstall path.

### **Improve macro VM teardown and prevent flaky parser-worker leaks** (1154d7e)
Macro workers now free the thread-local source-code printer on teardown, and macro-mode entry/exit is made reentrant so nested macro activity doesn’t reset shared state too early. This addresses a flaky ASAN regression in bundler worker shutdown.

### **Reduce real memory leaks in the native/runtime hot paths** (1d227bf)
LSan suppressions were removed for leaks that were actually fixable, and the underlying ownership bugs were patched across bundler, web worker, and S3-related code. This is notable leak-hunting work rather than a cosmetic cleanup.

### **Fix `fs.readFile` growth bug on misreported sizes** (2f15816)
Files with inaccurate `fstat` sizes could send Bun into runaway buffer growth, causing huge RSS spikes and hangs on FIFOs and special files. Resetting the buffer length before reserve/growth keeps reads progressing normally.

### **Handle malformed `bun.lockb` package IDs as corruption** (08f4ab4)
A damaged lockfile could hard-panic Bun during install instead of recovering. The install path now treats out-of-range package IDs as corruption and falls back to re-resolving.

### Other misc changes
- Build/test infra tweaks: ASAN agent sizing, LSan settings, and timeout/orphan handling (2 commits)
- Multiple clone-reduction and `Copy`-derivation cleanups across bundler, JSC, CSS, install, shell, resolver, and runtime code (dozens of commits)
- Small bug fixes: shell `echo` newline handling, semver overflow in debug builds, `events.once()` rejection semantics, node base64 digest allocation, fetch status-text and host/header optimizations, and a few more low-level correctness fixes
