---
date: 2026-06-06
repo: denoland/deno
size: L
title: "Deno adds WebCrypto, Node, and CLI fixes"
excerpt: "Major updates across WebCrypto, BroadcastChannel, child_process, and bundling, plus several bug fixes and new APIs."
commits: 33
authors: [bartlomieju, divybot, fibibot, nathanwhitbot, ry, littledivy]
commit_authors: {"9839d3a": bartlomieju, "a5b709e": bartlomieju, "591ff87": bartlomieju, "84b80f0": bartlomieju, "181c8e5": bartlomieju, "0e8fe8c": divybot, "e867d08": divybot, "0e6757e": littledivy, "25cfe2b": divybot}
---

### **WebCrypto now tracks modern algorithms and detached buffers** (0e6757e)
Deno’s WebCrypto implementation was brought closer to the modern-algorithms spec, with support and validation updates across post-quantum and newer digest/encapsulation paths. The patch also fixes buffer-copy behavior around detached inputs so algorithms observe mutations correctly, which matters for spec conformance and hard-to-debug edge cases.

### **BroadcastChannel now supports SharedArrayBuffer payloads** (0e8fe8c)
BroadcastChannel can now serialize, transmit, and deserialize `SharedArrayBuffer`-backed messages instead of failing with clone errors for additional receivers. This closes a real interoperability gap and makes Node worker-thread style messaging work more reliably.

### **Node child_process IPC handles now work with net.Server and net.Socket variants** (25cfe2b)
`ChildProcess.send()` now handles unlistened servers and socket/server wraps more like Node, including pipe-backed handles and the null-handle case. That unlocks more IPC patterns, especially for server and socket passing across processes.

### **`deno compile --bundle` can now resolve worker npm imports outside package scope** (591ff87)
Bundling worker sources now falls back to npm snapshot resolution for bare specifiers that originate outside the entrypoint’s package tree. This fixes a class of compile failures in dual-tree layouts where worker code lives beside, rather than under, the main package scope.

### **`deno clean` keeps going on locked caches and explains who holds them** (a5b709e)
On Windows, `deno clean` no longer aborts as soon as it hits a cache database held open by another process. Instead it reports the locked files and, when possible, identifies the process holding them so users can unblock cleanup.

### **`deno serve --watch` now applies import maps to the main module** (9839d3a)
Watch mode now resolves the entrypoint through the same import-map-aware path as non-watch mode. This fixes bare-specifier entrypoints that previously failed only under `--watch`.

### **`deno add` now accepts npm-style version ranges** (84b80f0)
The CLI now accepts comparator, range, and OR-range syntax like npm does, instead of rejecting them with specifier-grammar errors. That makes `deno add` usable with a much wider set of package version constraints.

### **`deno bump-version -c` chooses the manifest that actually has a version** (e867d08)
When `deno.json` and `package.json` live side by side, the bump-version command now prefers the file that contains real version metadata. This fixes the common dual-publish workflow where `deno.json` is only tooling config.

### **`deno bundle` now preserves Node-style CJS interop on browser targets** (181c8e5)
Browser-targeted bundles now handle dual CJS/ESM packages the same way Node does, avoiding init-time crashes from default-import interop mismatches. This unblocks packages like `tslib` that rely on Node’s CJS semantics.

### **Other misc changes**
- Fixed interactive `deno update` to show the version requirement instead of the resolved version.
- Hidden invalid Windows env keys from `Deno.env.toObject()`.
- Fixed redundant slashes in file specifiers causing runaway import cycles.
- Added support for `priority` in `RequestInit`.
- Surfaced unresolved imports in `.d.ts` entrypoints during `deno check`.
- Stripped trailing `\r` from CLI args so CRLF shebangs work.
- Improved JSR manifest verification errors.
- Clearer error when a closed resource-backed stream is still being consumed.
- Collected re-exported names for `deno test --doc` injection.
- Fixed UTF-8 replacement behavior in Node `Buffer` decoding.
- Suppressed peer dependency warnings for overridden packages.
- Various smaller install, resolver, fs performance, TLS, and test/compatibility fixes.
