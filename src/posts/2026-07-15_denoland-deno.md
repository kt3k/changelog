---
date: 2026-07-15
repo: denoland/deno
size: L
title: "CLI add flags, HTTP and NPM fixes"
excerpt: "New `deno add` install modes land alongside HTTP/2, npm, and release-path fixes; bundle watch and TSFN races are also patched."
commits: 16
authors: [bartlomieju, nathanwhit, tomas-zijdemans, denobot, Giesch, cuishuang]
commit_authors: {"f8a17c8": nathanwhit, "34f9f47": denobot, "4c72e73": bartlomieju, "58d4d24": bartlomieju, "208e85f": tomas-zijdemans, "1aa5e38": bartlomieju, "70dba84": Giesch, "17f28bc": tomas-zijdemans, "49f5024": bartlomieju, "e724d7f": cuishuang, "4ef7cd5": nathanwhit, "d9cb677": nathanwhit, "edd52dc": bartlomieju, "5de9e18": bartlomieju, "f3e2e37": bartlomieju, "dff3cbe": nathanwhit}
---

### **`deno add` gains `--no-save` and `--save-optional`** (5de9e18)
`deno add` now supports installing packages without writing package metadata, or saving them under `optionalDependencies` via `-O/--save-optional`. This expands package-management workflows and updates the parser, docs, and end-to-end tests to cover the new modes.

### **HTTP/2 header handling is hardened** (d9cb677, 4ef7cd5)
The Node HTTP/2 bridge now validates serialized headers more strictly and only preserves supported nghttp2 flags, preventing malformed header data from slipping through. In a separate fix, session option parsing no longer misuses shared flag bits, keeping nghttp2 validation enabled for ordinary session options while still honoring the intended numeric options.

### **NPM BYONM path traversal and cached-only behavior fixed** (edd52dc, 49f5024)
The BYONM permission check now normalizes paths before deciding whether `node_modules` access is allowed, closing a traversal hole that could reach files outside the package tree. Cached-only installs also stop fetching registry metadata for deprecated packages, reducing unnecessary network access and tightening offline behavior.

### **Threadsafe-function acquire no longer resurrects freed state** (58d4d24)
`napi_acquire_threadsafe_function` now refuses to increment a TSFN that has already reached zero, closing a race that could double-free the underlying box. The new stress test exercises the acquire-vs-final-release window repeatedly to guard the fix.

### **Bundle watch preserves raw CSS imports** (dff3cbe)
Watch-mode bundle reloads now skip raw-import assets that are tracked as external module-graph entries, so changed CSS keeps its original import context instead of being reloaded like a normal root. That prevents watch rebuilds from poisoning the graph and makes CSS/TS change detection reliable.

### **Canvas window resizing stops overlapping a mutable borrow** (70dba84)
The window-surface resize setters were simplified to avoid holding a `SurfaceData` mutable borrow longer than necessary. The commit also adds WebGPU test harness support and a large set of window-surface tests around headless/windowing-system behavior.

### **`deno serve` HTTP/2 cancellation no longer panics** (4c72e73)
Cancelling a request before a native response is committed no longer breaks record recycling on the Hyper HTTP/2 path. The fix changes ownership so the completed record can be recycled safely, with regression coverage for repeated cancel-and-reply races.

### **EventSource line buffering is made linear-time** (17f28bc)
The fetch EventSource implementation removes a quadratic buffering pattern when parsing incoming lines. This should improve performance for long or fragmented streams.

### **Small-socket reads are right-sized in Node streams** (208e85f)
Node stream reads no longer always pin a 64KB slab for tiny socket reads. The change should reduce waste for small reads and improve socket memory behavior.

### **Out-of-range `minimumDependencyAge` values now error cleanly** (e724d7f)
Config parsing now rejects dates/durations that overflow instead of panicking or silently miscomputing a timestamp. This makes the `minimumDependencyAge` setting safer for extreme numeric inputs.

### **Windows extra-stdio pipe handles are no longer double-closed** (f3e2e37)
Process spawning on Windows fixes a handle lifetime bug around extra stdio pipes. This addresses a platform-specific crash/cleanup issue in child-process handling.

### **Watch test deflake and release metadata sync** (f8a17c8, 34f9f47, 1aa5e38)
A watcher test was made more reliable by waiting for both the HTTP listener and file watcher to be ready before rewriting the entrypoint. The release sync commit updates versioned manifests and workflows, and the release pipeline now promotes `aarch64-pc-windows-msvc`.

### Other misc changes
- Dependency/release manifest sync across Cargo/workflow files (1 commit)
- Release promotion workflow tweaks (1 commit)
- Test-only updates and added regression coverage for canvas, HTTP/2, NAPI, bundle watch, serve, and npm paths
- Minor internal refactors and small cleanup in HTTP/2, canvas, and process code
