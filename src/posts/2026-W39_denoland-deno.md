---
date: 2026-09-27
repo: denoland/deno
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: M
title: "Coverage, mock cleanup, and registry-aware type pinning"
excerpt: "Deno tightened coverage accuracy, fixed mock reset semantics, and made Node type downloads reproducible through the configured npm registry."
commits: 6
---

### **More reproducible Node type resolution**
`deno check` now pins `@types/node` instead of following `latest`, and it downloads through the project’s resolved npm registry rather than hardcoding npmjs.org. That makes diagnostics reproducible and ensures `.npmrc` / `NPM_CONFIG_REGISTRY` are respected.

### **Coverage output is more accurate**
Coverage collection now disables V8 code cache, avoiding inflated top-level coverage from cached modules. The fix is covered across `run`, `test`, and `coverage` flows, addressing a subtle correctness issue in reported metrics.

### **Mock reset now fully restores methods**
`mock.reset()` no longer leaves `mock.method()` patches installed after clearing call history. It now restores mocked methods too, matching Node’s `MockTracker.reset()` semantics and improving test cleanup reliability.

### **Security and runtime maintenance updates**
A lockfile bump updated `rand` to 0.9.3 to pick up a fix for an unsound `ThreadRng` aliasing issue pulled in via runtime dependencies. The N-API finalizer registry also switched from a linear `Vec` to an ordered `BTreeMap`, trimming lookup/removal overhead in that path.

### Other misc changes
- Regenerated built-in Node typings to stay aligned with the pinned `@types/node` version.
- Updated node-gyp and related test fixtures for coverage and npm test registry changes.
- Refreshed coverage/spec snapshots for the new code-cache regression tests.
