---
date: 2026-06-13
repo: denoland/deno
size: L
title: "Deno gets parameterized tests and WebCrypto in Rust"
excerpt: "Major test, crypto, networking, and resolver changes landed, plus several fixes for fetch, serve, fs events, and LSP behavior."
commits: 20
authors: [bartlomieju, divybot, nathanwhitbot, crowlbot, petamoriken]
commit_authors: {"8297980": bartlomieju, "d7a4b01": bartlomieju, "f82cc27": bartlomieju, "c5fee2e": divybot, "e8c6f4a": bartlomieju, "69de4f4": crowlbot, "fb90ee0": bartlomieju, "197dfca": bartlomieju, "b7446ed": bartlomieju, "99542ca": bartlomieju, "7b3cd9d": bartlomieju}
---

### **Add `Deno.test.each` for parameterized tests** (d7a4b01)
Deno now supports a Jest/Vitest-style `Deno.test.each`, registering one real test per case so each input gets its own reporting, filtering, and editor run integration. The implementation also handles name templating, `.only.each`, `.ignore.each`, and array/object/primitive case argument handling.

### **Port WebCrypto from JS to Rust** (c5fee2e)
WebCrypto moved out of the massive JS shim and into native Rust-backed cppgc classes, leaving JS as a thin bootstrap layer for prototypes, singleton setup, and a small spec-driven `deriveBits` wrapper. This is a major internal refactor with a big performance and maintainability payoff for crypto-heavy workloads.

### **Stabilize bare Node built-in resolution** (e8c6f4a)
Bare specifiers like `import "fs"` and `import "path"` now resolve without `--unstable-bare-node-builtins`, and npm packages can no longer shadow Node built-ins. That removes a long-standing instability gate and brings Deno’s Node compatibility in line with Node’s own resolution priority.

### **Support `navigator.userAgentData`** (69de4f4)
Deno now exposes the User-Agent Client Hints API in both window and worker scopes, including the `NavigatorUAData` interface and high-entropy value lookup. This fills a compatibility gap for code that inspects browser-like UA metadata.

### **Require network अनुमति for Unix socket operations** (7b3cd9d)
Unix domain socket connect/listen operations now require `--allow-net` in addition to filesystem access, closing a local IPC escape hatch that could reach services like Docker or dbus with only read/write permissions on the socket path. The permission model and CLI docs were updated to support scoped grants like `--allow-net=unix:/var/run/docker.sock`.

### **Support `catalog:` in `deno.json` imports** (8297980)
`catalog:` references now work in `deno.json` `imports` and `scopes`, not just `package.json`. That unblocks catalog-based dependency resolution for both `deno run` and `deno install`, including materializing packages and CLI bins correctly.

### **Keep compressed response headers after transparent decompression** (197dfca)
Fetch now preserves `content-encoding`, `content-length`, and `transfer-encoding` on decompressed responses, matching the fetch spec and browser/undici behavior. The change also adjusts cache and server serialization so only the wire headers are stripped when re-emitting decoded bodies.

### **Fix `Deno.watchFs` event loss under load** (99542ca)
Filesystem watcher events are no longer silently dropped when the backend queue overflows; instead, the consumer is told to rescan. This makes watch mode far more reliable during bursts like mass file writes or archive extraction.

### **Make `deno serve --parallel --watch` stop old workers** (fb90ee0)
Watcher restarts now cancel the previous worker generation instead of leaving old threads and the detached main worker alive. That prevents stale code from continuing to serve requests after edits and avoids eventual isolate-mismatch crashes.

### **Fix async op promise-id wraparound** (f82cc27)
The core async promise-id counter no longer breaks after integer wraparound, which previously could send lookups to the wrong ring buffer and crash the process with missing-promise errors. This is a correctness fix for long-running or very high-op-count workloads.

### **Fix LSP requests for files opened from `node_modules`** (b7446ed)
Files opened via managed `node_modules` paths now get associated with a TypeScript project correctly, so hover, diagnostics, code actions, and refactors work instead of failing or returning nothing. That unblocks common editor workflows when jumping into dependency sources.

### Other misc changes
- SQL formatter switched to `lax-sql` for unstable SQL formatting.
- `links` field in `deno.json` stabilized via schema cleanup.
- WebCrypto and formatter-related internals updated to match the Rust port.
- `deno serve` deprecation warning added for legacy request abort behavior.
- Unix socket and watcher-related docs/tests/expectations updated.
- WPT runner and deno_dom dependency updates.
