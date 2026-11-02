---
date: 2026-11-01
repo: denoland/deno
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: M
title: "Deno rolls back native TypeScript checking"
excerpt: "This week Deno reverted to the in-process TypeScript checker, restoring prior watch, doc, and diagnostics behavior."
commits: 1
---

### TypeScript checking rolled back to the old path
**Restore in-process TypeScript checker as default** — Deno reverted the native tsc migration and made `deno check` use the in-process checker again. That restores the previous behavior for `--watch` rechecking, `--doc` and `--doc-only` snippet validation, and the expected diagnostics/spec output while the broader migration is rolled back.

### Other misc changes
- Removed native tsc CI cache/download steps from generated workflows.
- Updated CLI/type-checker/tsconfig plumbing to route back through the old checker path.
- Refreshed integration/spec expectations across check, npm, watcher, and related tests.
