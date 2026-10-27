---
date: 2026-10-26
repo: denoland/deno
size: L
title: "Rollback restores in-process TypeScript checking"
excerpt: "Deno reverts the native tsc default, bringing back the in-process checker for `deno check`, watch rechecks, and doc snippet validation."
commits: 1
authors: [bartlomieju]
commit_authors: {"e7b39eb": bartlomieju}
---

### **Restore in-process TypeScript checker as default** (e7b39eb)
Deno reverts the native tsc migration and switches `deno check` back to the in-process TypeScript checker. This matters because it restores prior behavior for `--watch` rechecking, `--doc`/`--doc-only` snippet validation, and the expected diagnostics/spec outputs while the broader migration is rolled back.

### Other misc changes
- Removed native tsc CI cache/download steps from generated workflows.
- Adjusted CLI/type-checker/tsconfig plumbing to route back through the old checker path.
- Updated integration/spec expectations across check, npm, watcher, and related tests.
