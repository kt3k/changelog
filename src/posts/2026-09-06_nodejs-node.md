---
date: 2026-09-06
repo: nodejs/node
size: L
title: "Stream iter API gets big behavior cleanup"
excerpt: "Node’s experimental stream-iter APIs saw major semantics fixes: Web IDL validation, writer lifecycle changes, and safer pipe/pull behavior."
commits: 28
authors: [jasnell, codebytere, leah-1ee, Renegade334, hamidrezaghavami, nodejs-github-bot, soulee-dev, christianaurichzm]
commit_authors: {"7089049": jasnell, "695f01f": Renegade334, "1f53d7e": hamidrezaghavami, "8af7545": nodejs-github-bot, "7147a3e": soulee-dev, "7aba44d": jasnell, "5ada066": jasnell, "33f85fe": jasnell, "60b8f28": jasnell, "6e1789a": jasnell, "7fafadf": jasnell, "1ed73da": jasnell, "e6332d6": jasnell, "57e0f33": jasnell, "3c8f77f": jasnell, "7b61c62": jasnell}
---

### **Stream iter semantics tightened across writers and pipelines** (7aba44d, 6e1789a, 1ed73da, 5ada066, 33f85fe, 60b8f28, 7fafadf, 7089049, e6332d6, 57e0f33, 3c8f77f, 7b61c62)
The experimental `stream/iter` API picked up a substantial round of behavior fixes. Writer arguments now follow Web IDL conversion rules, `pull()`/`pipeTo()` normalize sources at call time, transforms preserve their receiver, and push/broadcast writers were adjusted so capacity, draining, end-of-stream, and async disposal behave more predictably.

### **`fs.mkdtemp()` now returns Buffer when given a Buffer prefix** (1f53d7e)
`mkdtemp()` and its promise variant now preserve Buffer input by returning a Buffer output instead of always coercing to string. That fixes a long-standing type inconsistency in the `fs` API and aligns the result with the caller’s prefix type.

### **`ffi` helpers now throw when required args are omitted** (7147a3e)
The memory helper methods in the `ffi` addon no longer quietly return `undefined` when a required argument is missing. That makes omitted-argument bugs observable instead of being mistaken for a legitimate zero-value read or write.

### **Undici updated to 8.10.2** (8af7545)
Node bundled a newer Undici release, bringing along a broad set of internal HTTP client and proxy changes. This can affect fetch and related network behavior even though the update is dependency-driven.

### **QUIC stop-sending callback guard removed** (695f01f)
Node simplified its ngtcp2 stop-sending callback handling in QUIC code. This is a targeted internal fix for the QUIC session path and likely reduces wrapper complexity around the callback field.

### Other misc changes
- Typings updates for internal bindings (`fs_event_wrap`, `stream_pipe`, `profiler`)
- Docs-only updates, including `node:modules` header wording and `stream_iter` API text
- Test stability fixes for benchmark timing, DNS timeout comparisons, WASI threads, watch restarts, proxy resets, EPIPE handling, and core-dump behavior
