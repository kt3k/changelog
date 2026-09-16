---
date: 2026-09-15
repo: nodejs/node
size: L
title: "Node adds throttle, debounce, and VFS fixes"
excerpt: "Big feature drop: util.throttle/debounce land, QUIC and FFI gain new behavior, and mounted VFS handling is expanded."
commits: 21
authors: [panva, mcollina, nodejs-github-bot, jasnell, avivkeller, abhi128nandan, pipobscure, johnfinnerty-nz, pimterry, greenheadHQ, sravani1510]
commit_authors: {"18a9ba5": avivkeller, "5c5bd22": panva, "efc612d": abhi128nandan, "ea51c14": pipobscure, "cfdb7e6": mcollina, "e13c138": mcollina, "dbfa70a": nodejs-github-bot, "fa10566": johnfinnerty-nz, "7203d9b": panva, "96e769e": panva, "fe40b31": panva, "67868c7": panva, "11ed325": pimterry, "26dbe11": greenheadHQ, "a4bb025": mcollina, "fe10572": nodejs-github-bot, "3c050e3": panva, "1f6fe2f": sravani1510, "c081d10": jasnell, "27cdfbe": jasnell}
---

### **util.throttle lands with queueing, strict mode, and cancellation** (c081d10)
Node now ships `util.throttle()`, a Promise-based rate limiter with queue/drop overflow modes, concurrency caps, abort support, and optional strict rolling-window enforcement. The new API also introduces `ERR_THROTTLED` and documents how to inspect or cancel pending work.

### **util.debounce becomes a built-in utility** (27cdfbe)
`util.debounce()` is added with leading/trailing behavior, cancel/flush controls, abort support, and Promise-based return values. This gives core a first-party debounce primitive instead of pushing developers to external packages.

### **QUIC now exposes truncated-read policy controls** (11ed325)
A new `sessionOptions.truncatedReads` option lets QUIC streams either error on truncated reads or ignore them when the stream ends without a FIN. The implementation also fixes stream truncation handling across stop-sending, abort, and timeout cases, which tightens async iterator behavior and avoids data-loss edge cases.

### **Mounted VFS paths now work for FFI libraries** (a4bb025)
`ffi.dlopen()` and `new DynamicLibrary()` can now load shared libraries from mounted virtual file systems by reading the bytes through the VFS and loading them from a private temporary image. This closes a major gap between addons and FFI, making virtual paths behave like real filesystem paths for native library loading.

### **VFS fs hooks are filled in for mounted paths** (ea51c14)
Several `node:fs` entry points now route mounted paths through the same hooks and semantics as real paths, including watch APIs and timestamp/mode operations. This fixes long-standing inconsistencies where mounted paths could throw unexpected errors or behave differently from ordinary filesystem paths.

### **HTTP/2 destroys settle in-flight write callbacks** (e13c138)
When an HTTP/2 stream is destroyed mid-write, Node now invokes the pending write callback and clears write state before teardown finishes. That prevents Writable cleanup from hanging and fixes close-while-writing cases that were timing out in tests.

### **FFI fast-call metadata Symbols are created lazily** (cfdb7e6)
The FFI fast-call metadata symbols move out of snapshot-time initialization and are now created lazily at runtime. This avoids perturbing isolate identity-hash state during snapshot generation, preventing subtle map-cache collisions in V8.

### **Other misc changes**
- Build/docs redesign updates and doc tool reshaping (18a9ba5)
- HTTP parser reuse test split for close scenarios (5c5bd22)
- `cpSync` timestamp preservation coverage (efc612d)
- `googletest` dependency update (dbfa70a)
- QUIC doc clarification for async write backpressure (fa10566)
- Workflow hardening and CI YAML cleanup across several commits (7203d9b, 96e769e, fe40b31, 67868c7, 3c050e3)
- Nixpkgs bump and IBM i test skip tweak (fe10572, 1f6fe2f)
- `stderr` Buffer assertion fix in exec encoding test (26dbe11)
