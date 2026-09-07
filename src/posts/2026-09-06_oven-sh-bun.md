---
date: 2026-09-06
repo: oven-sh/bun
size: L
title: "Bun hardens core APIs and speeds tests"
excerpt: "Major DNS, subprocess, shell, stream, and test-runner fixes land alongside a build-graph overhaul for vendored WebKit deps."
commits: 21
authors: [robobun, dylan-conway]
commit_authors: {"4593030": robobun, "d316760": dylan-conway, "ae7b8f4": dylan-conway, "16eb85a": robobun, "ee8f984": robobun, "988ce73": robobun, "46bae4c": robobun, "0d0b28b": robobun, "e49f300": robobun, "9711c25": robobun, "09927e3": robobun, "bbeaa60": robobun, "30cda57": robobun, "e854103": robobun, "4a47e20": robobun, "3e36377": robobun, "7cc48e5": robobun, "b88d936": robobun, "4bedd52": robobun, "07f629a": robobun, "0131d75": robobun}
---

### **Build JSC and ICU from source in Bun's own graph** (ae7b8f4)
Bun now compiles JavaScriptCore, WTF, bmalloc, and ICU from source inside its normal Ninja build instead of downloading prebuilt WebKit tarballs by default. That makes CI and local builds more reproducible and keeps vendored dependency changes in the same build graph; `--webkit=prebuilt` remains available as an opt-in.

### **Subprocess stdio errors now surface instead of disappearing** (e49f300)
Failures while reading or writing subprocess stdio no longer get dropped on the floor. The runtime now tracks errored buffered pipes and propagates those errors through the JS/WebCore stream layers, which should prevent silent truncation, stuck `proc.exited` waits, and missing `'error'`/`cancel()` behavior.

### **Bun.file() stream reads now settle on error** (b88d936)
`Bun.file().stream()` no longer hangs forever when a read fails with no pending pull. The reader now preserves a deferred read error and releases the poll/FD state correctly, so errored file streams can reject or finish instead of wedging the event loop.

### **Parallel test aborts now use the right signal exit code and kill spawned descendants** (46bae4c)
`bun test --parallel` now records the actual terminating signal and exits like a shell would, instead of always mapping aborts to 130. It also kills the process group of a crashed worker's children, closing a leak where test-spawned processes could survive after the worker died.

### **Shell promise failures now reject instead of throwing from `.then()`** (0d0b28b)
If the shell interpreter cannot start, the failure is now delivered through the promise chain rather than as a synchronous throw out of `then()`. That fixes a sharp edge where `.nothrow().then(...)` could still blow up before handlers ran.

### **DNS getaddrinfo failures now report `EAI_AGAIN`** (07f629a)
Temporary name-resolution failures now map to the Node-compatible `EAI_AGAIN` status and errno instead of Bun's previous timeout code. This matters for retry logic in tooling and fetch stacks that specifically key off `EAI_AGAIN`.

### **`Bun.indexOfLine` now finds newlines after invalid UTF-8 leads** (988ce73)
The line scanner now correctly keeps searching past a bare UTF-8 lead byte instead of skipping over a following newline. That fixes hidden-newline cases in `Bun.indexOfLine` and console iteration over malformed input.

### **`bun test --bail` regression coverage runs faster and checks the full report** (9711c25)
The regression test for `--bail` now runs its child cases concurrently and asserts the complete report output. That keeps the coverage while cutting unnecessary serial wait time on slow CI lanes.

### **`http.request` regression test now runs in-process** (16eb85a)
The Docker-style request/response regression test was rewritten to run the raw server and client inside the test process. This removes child-process overhead and makes the flaky slow path much cheaper to exercise.

### **Cache-hit sourcemaps are now validated before use** (0131d75)
Bun now checks a cached sourcemap section header before trusting it on a cache hit. That closes an out-of-bounds risk when a damaged cache entry is later used for stack remapping.

### Other misc changes
- Baseline verifier x86 decoder resync fix and allowlist cleanup (d316760)
- Node compatibility docs corrections and missing globals list update (ee8f984)
- `util.inspect` bootstrap set freeze to match Node's 47 objects (4593030)
- Test fixture/runtime cleanup and speedups across URL, timers, websocket, DNS, fetch TLS, IPC, and shell tests (09927e3, bbeaa60, 30cda57, 4a47e20, 4bedd52, 7cc48e5, 3e36377)
- Path scratch buffer pooling and related internal refactors (e854103)
