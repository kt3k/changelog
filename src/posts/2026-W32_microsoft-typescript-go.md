---
date: 2026-08-09
repo: microsoft/typescript-go
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: M
title: "Safer emit, smarter variance, and tighter LSP scoping"
excerpt: "This week fixed declaration-emit symlink confusion, improved circular variance handling, and tightened workspace symbol and watcher behavior in the LSP."
commits: 4
---

### **Compiler correctness improves for emit and type variance**
The compiler picked up two notable correctness fixes this week. Declaration emit now avoids treating physical dependencies as symlinked packages when no original path exists, preventing unrelated JSDoc imports from being reused under the wrong package path. The checker also now computes variance with a stack keyed by associated type symbols, which lets it safely handle circular generic relationships instead of getting stuck behind a single global in-progress flag.

### **LSP behavior is more precise and more robust**
The extension/server flow for `workspace/symbol` now carries the active document URI so results are scoped to the current project rather than unrelated folders. In parallel, `WatchFiles` got a shutdown-race fix: if the watcher is closed while reconciliation is in progress, it now exits cleanly instead of panicking. Both changes landed with focused regression coverage.

### Other misc changes
- Added and updated regression tests, fourslash coverage, and baseline outputs for the new behaviors.
- Regenerated LSP protocol types and user preferences helpers for the workspace symbol parameter change.
