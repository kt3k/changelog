---
date: 2026-11-11
repo: oven-sh/bun
size: L
title: "AOT compiler overhaul lands, WebKit bumps"
excerpt: "Bun’s experimental AOT pipeline gets a major redesign with updated docs and diagnostics, alongside a WebKit upgrade and engine flag updates."
commits: 2
authors: [robobun, Jarred-Sumner]
commit_authors: {"f336318": robobun, "447ff87": Jarred-Sumner}
---

### **AOT compiler overhaul expands debugging, resolution, and build behavior** (447ff87)
Bun’s experimental `--aot` path was substantially reworked, with changes spanning compiler internals, module resolution, test/exposure handling, and diagnostics. The docs were also updated to reflect new runtime semantics for stack traces, `import()`/`require()` interactions, entry points, assets, and error reporting, which is important for anyone experimenting with executables or AOT builds.

### **Upgrade WebKit and adjust Bun’s JSC/feature wiring** (f336318)
Bun updates its embedded WebKit snapshot and synchronizes a number of JSC binding and build-flag changes. The patch also tweaks WebKit feature detection and warning flags, which helps keep Bun aligned with upstream engine changes and baseline verification.

### Other misc changes
- AOT-related docs and type definitions updated
- WebKit baseline allowlist expanded for AArch64 and other platforms
- Small binding and startup flag adjustments across JSC-related files
