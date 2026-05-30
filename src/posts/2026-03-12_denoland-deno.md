---
date: 2026-03-12
repo: denoland/deno
size: L
title: "Node compat, perf, and runtime fixes land"
excerpt: "CONNECT handling, crypto validation, worker memory, V8 wakeups, and npm/script performance improvements shipped today."
commits: 20
authors: [bartlomieju, dsherret, nathanwhit, seroperson]
commit_authors: {"1ea5ff0": bartlomieju, "8cf29d5": dsherret, "2353a5a": bartlomieju, "b31680f": bartlomieju, "7698bcc": bartlomieju, "5b9986d": bartlomieju}
---

### **HTTP CONNECT now emits node:http "connect" events** (1ea5ff0)
Deno’s Node `http.Server` polyfill now handles CONNECT requests correctly, so proxy libraries can intercept tunnel setup instead of silently dropping it. This fixes real-world timeouts for apps using browser proxying and other HTTPS tunneling flows.

### **Lifecycle scripts now run in parallel** (8cf29d5)
The npm installer was reworked to execute lifecycle scripts concurrently rather than serially. That should materially speed up installs, especially packages with many script hooks.

### **Worker teardown now releases memory sooner** (b31680f)
Web Worker shutdown now trims allocator memory on Linux after worker threads exit, reducing RSS retention after termination. This directly addresses cases where workers were dropping their isolates but the process still held onto heap pages.

### **V8 foreground tasks now reliably wake the event loop** (0895897)
The runtime now tracks isolate wakeups from V8 background threads so foreground tasks like module compilation and `Atomics.waitAsync` callbacks don’t stall until some unrelated I/O occurs. A safety-net wake path was also added to reduce race-related misses.

### **Node crypto key generation validation matches Node more closely** (5b9986d)
`generateKeyPair` now validates arguments synchronously and returns Node-style crypto errors for unsupported key options, unknown ciphers, unknown DH groups, and invalid digests. This tightens compat and fixes cases where bad inputs previously surfaced too late or with the wrong error shape.

### **Unhandled promise rejections now wrap non-Errors** (2353a5a)
Non-`Error` rejection reasons are now wrapped in `ERR_UNHANDLED_REJECTION` before reaching `uncaughtException`, matching Node behavior. That avoids crashes when downstream handlers expect `.message` and `.name` to exist.

### **Event handler throws now report the real error** (7698bcc)
Errors thrown from `load`, `unload`, `beforeunload`, and process exit handlers now surface the original exception instead of `
