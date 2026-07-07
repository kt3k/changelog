---
date: 2026-07-06
repo: denoland/deno
size: L
title: "Deno got faster streams and better Node parity"
excerpt: "Big performance work in Web Streams and Node I/O, plus new APIs and fixes for cache, fetch, TLS, fs, and install behavior."
commits: 33
authors: [bartlomieju, crowlbot, yyq1025, tomas-zijdemans, justjavac, haru0017, wilkmaciej, fibibot, littledivy, Hixie, nathanwhitbot, divybot, lowlighter]
commit_authors: {"8915825": crowlbot, "01d29aa": justjavac, "90760e7": tomas-zijdemans, "aa1380b": tomas-zijdemans, "08de6f9": crowlbot, "faf038e": crowlbot, "d6f01cf": crowlbot, "75d16d0": bartlomieju, "02b41b4": bartlomieju, "ed8c592": crowlbot, "f8f5443": bartlomieju, "ac8677d": haru0017, "9a466c7": crowlbot, "2e68b96": wilkmaciej, "003c72e": bartlomieju, "4b3cf68": fibibot, "88f2ff6": littledivy, "b37f1be": bartlomieju, "c1f2ce3": bartlomieju, "584a182": Hixie, "2886aec": crowlbot, "da93007": bartlomieju, "a885095": yyq1025, "56891e1": yyq1025, "4a08965": bartlomieju, "da1897d": nathanwhitbot, "f1717fc": yyq1025, "c812bd6": divybot, "34e593a": lowlighter, "fe22eef": bartlomieju, "d67bba7": bartlomieju}
---

### **Web Streams got multiple hot-path speedups**
`da93007`, `02b41b4`, `f8f5443`, `003c72e`, and `b37f1be` collectively cut per-chunk allocations, remove synchronous microtask hops, and hoist reusable handlers in `ext/web/06_streams.js`. These changes target the core body/stream machinery used by `fetch`, `Response` bodies, and stream piping, so they should improve throughput and reduce memory churn across a wide range of workloads.

### **Node TLS write paths were made dramatically cheaper**
`90760e7` removes accidental quadratic copying in `node:tls` by tracking progress through a pending cleartext buffer instead of reallocating the unwritten tail on each chunk. The same commit also switches decrypted/encrypted chunk materialization to zero-copy ArrayBuffer backing stores, which slashes memcpy overhead and peak latency on large socket writes.

### **Node net writes now avoid redundant buffer copies**
`aa1380b` makes async Buffer writes on the `stream_wrap` path zero-copy by queueing an iovec directly over the ArrayBuffer backing store. That lowers both write latency and peak RSS for large `socket.write(buffer)` calls in `node:net`.

### **`fetch` now reports transport failures in Node’s shape**
`4a08965` changes transport-level fetch errors to throw `TypeError: fetch failed` with the low-level detail preserved in `.cause`, instead of surfacing reqwest’s raw message directly. This aligns Deno with Node/undici and also improves error suggestion handling by following the cause chain.

### **`Deno.serve` stream errors and non-Uint8Array chunks are handled correctly**
`01d29aa` fixes response-body stream error propagation so the original stream error reaches the resource backing `Deno.serve` and `onError`, and adds regression coverage for invalid non-`Uint8Array` chunks. This closes a hang/error-reporting gap in server responses that could previously mask the real failure.

### **`Cache.keys()` is now implemented**
`ed8c592` adds the missing `Cache.keys()` API across the implementation, type definitions, and tests. It returns request keys in insertion order and supports optional request filtering, filling a notable Service Worker API gap.

### **`fs.glob()` can now follow symlinks**
`2886aec` adds a new `followSymlinks` option to Node-compatible `fs.glob()`, backed by realpath/stat helpers and caching. That brings the polyfill closer to Node’s behavior for symlink-heavy projects.

### **Heap snapshots can now be triggered near V8 heap limits**
`da1897d` implements `v8.setHeapSnapshotNearHeapLimit()` for `node:v8`, including on-disk snapshot naming and permission-aware file creation. This is a major debugging feature for out-of-memory situations and mirrors Node’s near-OOM snapshot behavior.

### **Node child processes now support inherited fd 3 pipes**
`4b3cf68` teaches spawned Deno Node children about extra inherited stdio descriptors so `fd`-based APIs can see them correctly. This fixes a real compatibility issue for code that relies on supplemental pipes during child-process startup.

### **`deno desktop` now respects `--exclude-unused-npm`**
`56891e1` wires the compile flag through desktop builds so unused npm packages no longer have to be embedded in managed snapshots. That should reduce desktop app bundle size when the flag is enabled.

### **OTEL attribute value length limiting is now honored**
`d6f01cf` implements the OpenTelemetry span-attribute length limit env vars, truncating long string values and string-array entries while preserving existing defaults. This brings telemetry behavior in line with the SDK config knobs.

### **Other misc changes**
- Refactors to migrate several serde_v8 conversion paths to `deno_core::convert` (`8915825`, `08de6f9`, `faf038e`)
- Coverage fixes for line/branch counting (`584a182`, `34e593a`)
- Install/lifecycle/jsr and package-copying fixes (`a885095`, `f1717fc`, `fe22eef`)
- LSP/runtime startup fix to avoid a CPU busy loop (`ac8677d`)
- WPT epoch update and docs additions (`75d16d0`, `88f2ff6`)
- Smaller fetch, fs, crypto, lint, and worker tweaks (`2e68b96`, `c1f2ce3`, `9a466c7`, `d67bba7`, `c812bd6`, and others)
