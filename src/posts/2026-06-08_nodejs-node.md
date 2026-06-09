---
date: 2026-06-08
repo: nodejs/node
size: M
title: "HTTP2 memory fix, stream backpressure tweak"
excerpt: "Node fixes a maxSessionMemory regression in HTTP/2 and corrects sync pipe accounting, with a few smaller runtime and test-runner improvements."
commits: 7
authors: [trivikr, legendecas, rluvaton, watilde, mcollina]
commit_authors: {"696030d": trivikr, "ba82a41": mcollina, "45c7071": trivikr}
---

### **HTTP/2 now keeps header blocks charged while streams live** (ba82a41)
`maxSessionMemory` now continues counting header blocks after they’re handed to JS, instead of dropping the charge too early. That closes a regression where stalled streams could keep memory alive without it being reflected in session accounting, and the docs/tests were updated to match.

### **`pipeToSync()` no longer counts rejected writes as accepted bytes** (696030d)
The sync stream pipeline now distinguishes between a real accepted backpressure signal and `writeSync()`/`writevSync()` returning `false` without taking ownership of the data. This fixes byte accounting in `pipeToSync()` and prevents it from over-reporting progress for writers that reject a chunk.

### **`test_runner` watch mode handles `cwd` with isolation disabled correctly** (45c7071)
When spawning the watch child with `isolation: 'none'`, the runner now passes the current test files or glob patterns instead of reusing the parent process argv. That keeps discovery scoped to the configured working directory and avoids rerunning the wrong entrypoint.

### Other misc changes
- TypeScript stripping cleanup: removed dead source-map handling from `lib/internal/modules/typescript.js`.
- `addAbortListener()` perf tweak: cache and freeze the options object.
- Doc typo fixes in `dns`, `module`, and `util`.
- Dependabot bump for `@node-core/doc-kit` in `/tools/doc`.
