---
date: 2026-03-15
repo: oven-sh/bun
period: weekly
slug: 2026-W11
period_label: "Mar 9–15, 2026"
size: L
title: "Bun overhauls build pipeline and lands a wave of runtime fixes"
excerpt: "A TypeScript build system rewrite headlined a week of crash fixes, Node-compatibility work, and test/security improvements."
commits: 36
---

### **Major build system rewrite**
Bun replaced its CMake-based build pipeline with a TypeScript-driven ninja generator, touching dependency handling, configuration, CI, and compile/link steps. This is the week’s biggest infrastructure shift and should reshape how the project is built and maintained going forward.

### **Runtime stability and compatibility improvements**
A cluster of fixes closed real crashers and behavior mismatches across core APIs: crypto bindings now validate receivers and detached buffers instead of segfaulting, `spawnSync` no longer drains microtasks from its isolated loop, `StatWatcher` was reworked to avoid GC/finalization crashes, and dynamic `import()` now propagates loader selection from import attributes. Bun also tightened HTTP/TLS, WebSocket, HTTP/2, Postgres, and UDP behavior to better match Node and avoid hangs or protocol corruption.

### **Windows and platform-specific fixes**
Windows got a notable round of runtime and build fixes, including static CRT enforcement for vendored sub-builds, corrected numeric `fs.open` flag translation, and a restored HTTP/TLS compile path. On macOS, UDP socket handling now enables `SO_REUSEPORT` where available and reports bind failures more cleanly.

### **Testing, docs, and tooling improvements**
Test infrastructure gained path-based discovery ignores, a new static baseline CPU instruction verifier, and more robust CI/test coverage for flaky stdio passthrough, signal handling, WebSocket protocol stability, and filesystem timestamp precision. Docs were expanded for Bun.TOML and the new test ignore flags, and the install security scanner was moved to IPC-based input to handle large payloads more safely.

### Other misc changes
- `file://` watcher path stripping fixed and watcher path resolution simplified
- `Bun.JSONL.parseChunk()` string offsets corrected
- `fs.stat` sub-millisecond precision preserved
- HTTP 304 handling fixed behind proxy tunnels
- Misc test, fixture, and README updates
