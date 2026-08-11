---
date: 2026-08-10
repo: oven-sh/bun
size: M
title: "Warning bootstrap fix, scanner flake cleanup"
excerpt: "Bun now installs the default warning printer at process creation like Node, while test infra and WebKit were bumped/fixed around it."
commits: 3
authors: [dylan-conway, cirospaciari]
commit_authors: {"23d233b": cirospaciari, "827475e": dylan-conway, "e84f710": dylan-conway}
---

### **Process warnings now register at startup, matching Node** (23d233b)
Bun now installs the default `'warning'` listener when `process` is created instead of lazily on the first `emitWarning()`. That closes a Node-compat gap: `process.removeAllListeners('warning')` at startup now really suppresses the built-in printer, which matters for CLIs and test runners that opt out of warning output.

### **Security scanner matrix flake fixed by disabling manifest cache writes** (827475e)
The security-scanner install matrix test was made deterministic by turning off the manifest cache for both setup and test installs. The underlying issue was asynchronous cache writes from the setup install racing the test’s requested-package snapshot, producing sporadic extra entries like `left-pad`.

### **WebKit bumped to pick up a darwin-x64 napi fix** (e84f710)
Bun’s pinned WebKit revision was updated to a newer commit that fixes a conservative scan issue affecting `napi.test.ts` on macOS x64. This is an engine dependency bump, but it unblocks a real platform-specific test failure.

### Other misc changes
- CI macOS test lanes temporarily disabled because the macOS agents are offline.
- Warning/test harness internals adjusted to support the new startup-time warning printer.
- Snapshot updates for the security-scanner matrix tests.
