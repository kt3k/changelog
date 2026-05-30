---
date: 2026-05-29
repo: nodejs/node
size: L
title: "VFS lands, Buffer pooling grows"
excerpt: "Node adds mount-aware VFS dispatch, raises Buffer.poolSize, and tightens warning handling; npm also gets a fresh upgrade."
commits: 7
authors: [mcollina, npm-cli-bot, araujogui, DivyanshuX9, trivikr, legendecas]
commit_authors: {"30a7e28": npm-cli-bot, "6f29e1a": araujogui, "31965d6": DivyanshuX9, "569369f": mcollina, "dbec31c": mcollina, "40dc5a1": trivikr, "793eff8": legendecas}
---

### **Virtual filesystem now routes fs and fs/promises by mount** (569369f)
Node's VFS support now hooks the public `fs.*` and `fs/promises` APIs into mounted providers, with path-based routing back to the real filesystem when no mount applies. The change spans callbacks, promises, streams, `watch`, and `opendir`, so mounted file trees behave much more like first-class filesystem roots.

### **Buffer.poolSize default increases to 64 KiB** (dbec31c)
The default slab size was raised from 8 KiB to 64 KiB, which expands pooled allocation coverage up to roughly 32 KiB requests. That should reduce allocator churn and improve throughput for common mid-sized buffer workloads like HTTP parsing, stream chunks, and small file reads.

### **V8 warnings are deferred outside DisallowJavascriptExecutionScope** (31965d6)
Warnings emitted while JavaScript execution is temporarily forbidden are now queued with `SetImmediate` instead of being emitted immediately. This avoids crashes in contexts like REPL preview evaluation while preserving the warning emission path.

### **compose() now forwards tail data through a data listener** (40dc5a1)
Stream composition was refactored to push tail output via a normal `data` listener and backpressure-aware pause/resume flow instead of manual readable draining. The hot path should more closely match standard pipe behavior, and the benchmark was expanded to cover both creation and throughput.

### **Hex color styling gets caching and a faster path** (6f29e1a)
`util.styleText()` now caches computed ANSI sequences for hex colors in a bounded `SafeMap`, avoiding repeated conversion/allocation on repeated inputs. The benchmark was also updated to stress high-cardinality color usage, which helps validate the new cache under miss-heavy workloads.

### **npm is upgraded to 11.16.0** (30a7e28)
Node's vendored npm was bumped, pulling in new docs and command references for script approval features. This is a broad dependency update rather than a runtime change in Node itself.

### **Other misc changes**
- Added a PR label rule for source maps work (793eff8)
