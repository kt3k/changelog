---
date: 2026-06-07
repo: denoland/deno
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "Deno ships major runtime, compile, and compat upgrades"
excerpt: "Big week for Deno: HTTP/1 ownership, broader WebCrypto, stronger Node/npm compat, and safer compile/LSP behavior."
commits: 255
---

### **Runtime and web platform grow up in key areas**
Deno took ownership of HTTP/1.1 serving in `Deno.serve()`, moved fetch decompression/local handling in-house, and expanded WebCrypto with modern algorithms like ML-KEM/ML-DSA plus `SubtleCrypto.supports()`. The web platform also picked up spec fixes like missing `Request` properties, buffered `PerformanceObserver` replay, frozen `MessageEvent.ports`, and `SharedArrayBuffer` support in `BroadcastChannel`.

### **Compile/bundle workflows got materially better**
`deno compile --bundle` saw a string of fixes across worker bundling, npm reachability, CJS handling from host files, deeper dependency closure, and optional minification/watch support. These changes make standalone binaries more reliable for real npm apps and close several “works on disk, breaks in the VFS” edge cases.

### **Node/npm compatibility got a broad round of fixes**
Node-facing behavior improved across HTTP proxy support, child-process IPC, HTTP/2 tracing, addon/N-API compatibility, `Buffer` decoding, `node:v8`, and assorted filesystem/network quirks. npm and workspace handling also tightened up: tarball auth fallback, lifecycle script ordering, workspace prerelease resolution, global install context, `deno add` version range support, and `deno remove`/installer cleanup all got smarter.

### **LSP and editor experience became more stable and useful**
The language server became noticeably more resilient, recovering from parser panics and type-checker OOMs while reducing idle memory use. Completion/import behavior, notebook diagnostics, doc-lint surfacing, import-map diagnostics, and auto-import/workspace scoping were all refined, improving both correctness and editor signal quality.

### **Security and crash fixes landed too**
The week included an opt-in patch layer for vulnerable React Server Components builds, and `serde_v8` gained a recursion limit to prevent stack overflows on deeply nested input. Deno also hardened a number of crash-prone edge cases in native addons, SQLite callbacks, REPL timers, and process/resource lifetimes.

### Other misc changes
- Jupyter kernel was rewritten in JS and fixed for real ZMTP peers.
- Geometry/math internals were simplified by dropping external `nalgebra`.
- `deno clean`, `deno publish --dry-run`, `deno outdated`, `deno bump-version`, and `deno task` each picked up targeted CLI fixes.
- Several formatting, docs, tests, and dependency updates landed across the tree.
