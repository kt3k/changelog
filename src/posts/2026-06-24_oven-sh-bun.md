---
date: 2026-06-24
repo: oven-sh/bun
size: L
title: "Bun tightens streams, buffer, and HTTP fixes"
excerpt: "Major stream refactor, Node-compat buffer error handling, and a panic/UAF fix in node:http landed today."
commits: 6
authors: [Jarred-Sumner, cirospaciari, alii, robobun]
commit_authors: {"942c222": Jarred-Sumner, "15bc359": alii, "a830e9d": robobun, "6a574c4": Jarred-Sumner, "f91c27b": cirospaciari, "dd13155": cirospaciari}
---

### **ReadableStream internals get refactored to avoid closure leaks** (a830e9d)
Bun extracts several long-lived ReadableStream callbacks into top-level builtins and binds their state explicitly, so stored pull/cancel/start handlers no longer capture an entire setup activation. This should reduce retained memory and makes stream controller lifetimes closer to the spec’s intended shape.

### **Node:http drain callback no longer panics when onWritable is cleared** (942c222)
The server response path now checks for a cleared `onwritable` slot before scheduling drain callbacks, and it stops resetting the cached slot to `undefined` in a way that could contribute to stale state. A new regression test covers the crash scenario where drain fires after the slot has already been cleared.

### **Buffer error behavior is brought closer to Node** (dd13155)
This update syncs the vendored `node:buffer` suite to Node v26.3.0 and includes compatibility fixes in the Buffer/error-code paths. Notably, out-of-range reads now preserve Node’s `Infinity` handling and large numeric/bigint values are formatted with numeric separators in range errors, improving test parity and developer-facing error messages.

### Other misc changes
- Streams typing/docs example updated to typecheck under `number | Promise<number>` backpressure returns (15bc359)
- Small internal cast/instance checks in `bindings.cpp` and `process` argument validation (6a574c4)
- CLAUDE.md guidance updated to keep code comments to 3 lines max (f91c27b)
