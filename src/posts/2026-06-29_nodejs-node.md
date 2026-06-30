---
date: 2026-06-29
repo: nodejs/node
size: M
title: "Tracing refactor, path fix, and vm bugfix"
excerpt: "A tracing-agent refactor lands alongside a vm property copy fix and a Windows path normalization correction."
commits: 11
authors: [nodejs-github-bot, legendecas, aduh95, trivikr, joyeecheung, watilde, samuel871211]
commit_authors: {"787912e": legendecas, "d95cbc2": legendecas, "b0a4f16": watilde}
---

### **Tracing agent abstraction refactors legacy/perfetto support** (d95cbc2)
Node’s tracing internals were reworked to route environment and inspector integration through a shared agent abstraction, with legacy handling split into dedicated `agent_legacy` sources. This is a substantial internal refactor that lays groundwork for supporting both the old tracing path and Perfetto more cleanly.

### **Fix vm `PropertyDescriptor` copying during defineProperty** (787912e)
`vm` now preserves partial `PropertyDescriptor` updates correctly instead of accidentally turning missing values into `undefined` when defining properties in a contextified sandbox. This fixes a long-standing bug that could corrupt property definitions, and the new regression test covers enumerable/configurable/value combinations.

### **Fix false positives for reserved names in `path.win32.normalize()`** (b0a4f16)
Windows path normalization no longer treats strings like `CONx` or `NULs` as reserved device names unless a colon is actually present. That avoids incorrectly rewriting ordinary filenames to `.
ame`, while preserving the reserved-name behavior for true device-path cases like `CON:`.

### Other misc changes
- Added a GitHub Actions benchmark runner workflow.
- Updated the release-proposal commit-message lint to validate version numbers.
- Tweaked test runner execArgv filtering for child tests.
- Improved LCOV reporter snapshot diagnostics.
- Updated HTTP/2 close() docs.
- Marked strategic-initiative status updates.
- Refreshed WPT fixtures for urlpattern.
- Updated collaborator emeritus metadata.
