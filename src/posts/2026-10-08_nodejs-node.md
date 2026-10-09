---
date: 2026-10-08
repo: nodejs/node
size: M
title: "Permission flow and test runner tightened"
excerpt: "Child process permission flags now propagate from config files, with docs and regressions across HTTP, test runner, and benchmarks."
commits: 8
authors: [RafaelGSS, efekrskl, panva, lazerg]
commit_authors: {"882adc5": RafaelGSS, "24a10f6": efekrskl, "f9defa6": panva, "6d5e309": lazerg}
---

### **Config-file permission flags now inherit into child processes** (882adc5)
Child processes now copy permission model flags that were set via `--config-file`, not just those present in `process.execArgv`. That closes a gap where spawned Node processes could lose permissions like `allow-child-process`, `allow-worker`, or `allow-fs-read` when the parent was configured through a JSON config file.

### **Test runner reports load errors under no-isolation mode** (6d5e309)
The test runner now emits a placeholder failure when a test file throws while loading, even with `--test-isolation=none`. This keeps load-time errors visible and still preserves any tests that were registered before the exception.

### **Benchmark runner fixes an ack sequencing race** (f9defa6)
The bench CLI now clears `recordPending` before sending the acknowledgement back to the child, preventing a race where the next record could be rejected as out of sequence. The regression test exercises delayed send callbacks to verify the handshake stays valid.

### **HTTP docs sharpen keep-alive and retry guidance** (24a10f6)
The `request.reusedSocket` example was updated to better demonstrate the timeout race, including `keepAliveTimeoutBuffer` and a tighter interval. The surrounding text now more clearly explains when a reused socket can hit `ECONNRESET` and how to use `reusedSocket` for retry logic.

### Other misc changes
- Updated `process.permission` docs to mention `URL` and `Uint8Array` references, plus scope list corrections.
- Clarified `Agent` socket keep-alive behavior and documented `keepAliveTimeoutBuffer` in HTTP docs.
- Fixed the `url-searchparams-sort` benchmark to sort a fresh `URLSearchParams` copy each iteration.
