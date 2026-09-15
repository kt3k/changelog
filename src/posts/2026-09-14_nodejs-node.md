---
date: 2026-09-14
repo: nodejs/node
size: L
title: "Perf hooks and HTTP fixes land"
excerpt: "Big perf_hooks additions and a semver-major HTTP header-limit change, plus targeted HTTP/2 and snapshot fixes."
commits: 9
authors: [jasnell, HoonDongKang, RafaelGSS, panva, sankalpsthakur, mcollina, inoway46, colinhacks]
commit_authors: {"312db1e": HoonDongKang, "c1e2478": jasnell, "c327212": jasnell, "0e32ee2": sankalpsthakur, "e5778f7": mcollina, "20024a6": colinhacks}
---

### **perf_hooks gets a new sliding-window histogram API** (c327212)
Node now exposes `createSlidingWindowHistogram()`, a bounded histogram that retains only the latest chunks and rotates lazily without timers. The change adds a substantial implementation in C++/JS, docs, benchmarks, typings, and regression tests, giving users a time- or count-based windowed alternative to the existing unbounded histogram.

### **HTTP responses over the header limit are now rejected** (e5778f7)
`ClientRequest` no longer silently truncates response headers beyond `maxHeadersCount`; such responses now fail with `HPE_HEADER_OVERFLOW`. This is a semver-major behavior change that keeps parser state aligned with the headers exposed to user code.

### **perf_hooks histogram quantile coverage expanded** (c1e2478)
The histogram QRDE tests were broadened to cover edge cases like `ERR_INVALID_THIS`, correction behavior around the exact-to-asymptotic threshold, and worker-thread use. This tightens confidence around a fairly intricate API.

### **HTTP/2 session-destroy race fixed** (0e32ee2)
Destroying an HTTP/2 session from a `stream` handler could leave later HEADERS/DATA in the same receive buffer in a bad state and trip `onread->IsFunction()` assertions. The fix rejects new streams while closing, tears down the C++ stream when needed, and adds a regression test for the race.

### **SEA snapshot data now avoids copying when possible** (20024a6)
Single-executable app snapshot loading now tracks whether V8 startup data is owned or borrowed, and uses the embedded resource directly when it can be kept alive for the process lifetime. That reduces unnecessary copying during snapshot loading and improves how SEA payloads are handled.

### **perf_hooks avoids reallocating uv metrics on every read** (312db1e)
`performance.nodeTiming.uvMetricsInfo` now reuses an aliased buffer instead of allocating a fresh V8 array each time. This trims per-access overhead in a hot introspection path and keeps the public data shape stable.

### Other misc changes
- Permission model docs/security guidance clarified for operator-selected output paths (2 commits)
- RSA/DSA wrong-passphrase test flake fixed
- test runner V8 serializer reuse fixed
- Additional perf_hooks/histogram tests added
