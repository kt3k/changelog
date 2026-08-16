---
date: 2026-08-15
repo: nodejs/node
size: L
title: "Web Workers land, WPT expands, streams speed up"
excerpt: "Node adds experimental Web Worker support, broader WPT runner coverage, a SQLite diagnostic channel, and stream/blob performance fixes."
commits: 17
authors: [avivkeller, panva, mcollina, freida-code, pmarkert, Nixxy25, araujogui, devfep, martenrichter, trivikr, greenheadHQ]
commit_authors: {"2929417": mcollina, "8606604": avivkeller, "d099639": freida-code, "86c871e": pmarkert, "30bff4a": Nixxy25, "c73d0b1": avivkeller, "78cca36": panva, "b9afdd0": avivkeller, "c757550": panva, "5615b25": panva, "c7b962c": araujogui, "c2b2e3f": devfep, "9ad097b": martenrichter, "c55fa12": trivikr, "91aaf05": greenheadHQ, "ec1a8df": mcollina, "3e4d2e4": mcollina}
---

### **Experimental Web Worker API lands** (b9afdd0)
Node now exposes a mostly browser-compatible `Worker` API behind `--experimental-web-worker`, with new docs covering its CLI flag, globals, script-loading behavior, and deviations from the HTML Standard. This is the main feature of the day and unlocks a new worker model on top of `worker_threads`.

### **WPT runner gains multi-global and process isolation support** (78cca36, c757550, 5615b25, c73d0b1)
The Web Platform Tests harness was significantly reworked to handle multi-global tests, actual Web Worker execution, and an opt-in process-based runner for crashier cases. The repo also adds a large set of Web Worker / Cache Storage WPT fixtures, which materially broadens standards coverage.

### **SQLite gets a diagnostic channel** (c7b962c)
SQLite operations now emit through `diagnostics_channel`, with matching C++ plumbing, JS integration, docs, benchmarks, and tests. That gives observability tooling a new hook into database activity without changing the public SQLite API surface.

### **Web streams and blob internals get throughput fixes** (ec1a8df, 9ad097b, 2929417, 3e4d2e4)
Streams reduce promise churn in hot paths and replace several microtask schedules with shared resolved-promise callbacks, which should trim overhead in `pipeTo` and tee flows. Blob wakeups were also made safer with `setImmediate`, and a webstreams benchmark was corrected to actually apply `highWaterMark` settings.

### Other misc changes
- CLI: add no-op `--experimental-repl-await` flag support (8606604)
- Test cleanup and style churn: convert several `forEach()` loops to `for...of` / `for...in` across parallel tests (86c871e, 30bff4a, c2b2e3f, d099639)
- Test: wait for FFI background optimization (c55fa12)
- Docs: fix SQLite changeset constant descriptions (91aaf05)
