---
date: 2026-05-14
repo: denoland/deno
size: L
title: "Deno tightens Node parity and adds workspaces"
excerpt: "Workspace version bumps, synthetic ESM, and several Node/runtime fixes land alongside core module-loader refactors."
commits: 22
authors: [bartlomieju, divybot, lunadogbot, littledivy, shivamtiwari3, ktKongTong, crowlbot, nikicat, bittoby, fibibot]
commit_authors: {"4449827": bartlomieju, "8886065": bartlomieju, "98ae5fc": bartlomieju, "7f44ddd": lunadogbot, "7aeb859": crowlbot, "2badd65": nikicat, "49cf15a": bartlomieju, "2d3f3f1": bartlomieju, "f256361": divybot, "e6c548d": divybot, "12bac46": littledivy, "f85d472": divybot}
---

**`deno bump-version` now handles workspaces** (7aeb859)
`deno bump-version` grows from a single-package helper into a workspace-aware release tool. It can now bump every versioned member, rewrite root `jsr:` constraints, and support dry runs and conventional-commits-driven releases.

**Core module loading was refactored to pre-resolve async imports** (98ae5fc)
The module loader now waits for async child resolves before registering compiled modules, instead of using placeholder URLs and doing a second resolve later. That removes an extra round trip per async import and fixes cases where re-export chains or module registration hooks could lose the first resolve result.

**`Deno.Command.output()` now respects `AbortSignal`** (7f44ddd)
The process fast path had dropped the `signal` option, so aborted commands could keep running. This restores abort behavior for `.output()` and closes a correctness gap in child-process cancellation.

**Node worker threads now use synthetic ESM, including `postMessageToThread`** (f85d472, 2d3f3f1, 8886065)
`node:worker_threads`, `node:url`, `node:util`, and `node:zlib` are being moved onto a new synthetic-ESM mechanism that snapshots exports from the polyfill object. That makes Node builtin facades behave more like Node.js and unlocks cross-thread messaging plus more accurate post-bootstrap export values.

**CJS top-level throws now surface the right Node error semantics** (f256361, 49cf15a)
Synchronous CommonJS entry-module failures now go through `process._fatalException` with the correct origin, avoiding misclassification as unhandled rejections. Related `require()`-of-ESM errors now use proper `ERR_REQUIRE_ASYNC_MODULE` / `ERR_REQUIRE_CYCLE_MODULE` Node errors so compatibility tests can match on the codes.

**`vm` support expanded for synthetic modules and display errors** (12bac46, e6c548d)
The Node `vm` polyfill gains `vm.SyntheticModule` and `displayErrors` behavior, bringing it closer to Node’s API surface and error formatting. This unblocks compatibility tests that depend on synthetic module creation and stack decoration.

**Deno’s core loader got a major async-resolve pipeline overhaul** (4449827, 2badd65)
The loader now short-circuits async resolve results when they already refer to registered modules, and fetch responses are explicitly closed when abort races complete. These are important correctness fixes that prevent broken module loads and resource leaks.

### Other misc changes
- CJS re-export analysis for npm packages fixed
- `deno test --watch=<paths>` now watches extra paths
- Deno-side timer globals removed from shared lib declarations
- Node stream `destroy` named export aligned
- `uncaughtExceptionMonitor` origin fixed for sync top-level throws
- `util.setTraceSigInt` stub added
- Worker execArgv error handling corrected
- `ServerResponse` no longer emits `finish` after client abort
- WebSocket stream reset panic fixed
- `internal_binding/symbols.ts` switched to primordials
- ARM Linux XL runner label fixed in CI
