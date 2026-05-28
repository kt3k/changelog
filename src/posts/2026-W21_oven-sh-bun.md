---
date: 2026-05-24
repo: oven-sh/bun
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "Bun hardens parsers, security boundaries, and core I/O"
excerpt: "A week of engine upgrades and major hardening work: new import defer, safer VM/session boundaries, and many crash, leak, and hang fixes."
commits: 153
---

### **Engine and language support expanded**
- Bun picked up two substantial WebKit/JSC refreshes, requiring binding and builtin updates across the runtime.
- Static `import defer` landed end-to-end, with parser, bundler, printer, and runtime metadata support.
- ICU runtime support was updated for per-item compressed data, backing a smaller repacked Intl data format.

### **Security and sandbox hardening**
- `vm.createContext(DONT_CONTEXTIFY)` now uses the sandbox realm’s own `Object.prototype`, closing a host-intrinsics escape.
- CSRF tokens can now be bound to a session/principal, tightening replay protection without changing token format.
- Trusted dependency checks now verify the exact package name, reducing collision risk in install-time trust decisions.
- A broad validation sweep tightened HTTP, websockets, SQL, path templating, CSS nesting, and package/install boundaries.

### **Crash, panic, and memory-safety fixes across core APIs**
- Multiple allocator, lifetime, and ownership bugs were fixed in fetch/blob consumers, `Blob.name`, `FileSink`, `fs.readFile`, `ReadableStream`, and `bun_sys::File`/`Dir`.
- Bun also fixed several parser/runtime crash paths, including malformed JSX entities, class static block parsing, TypeScript `declare`/`using` edge cases, `expect.extend()`, patch header truncation, and malformed lockfile/package metadata.
- Native crash handling now prefers frame-pointer walking, improving reliability of stack traces in release and signal-handler contexts.

### **Performance and hang fixes**
- Bundler parse/link throughput was improved by reducing main-thread serialization overhead.
- Markdown rendering, CSS parsing/minification, and several transpiler paths were de-quadraticized or guarded against stack overflows and exponential backtracking.
- `ReadableStream` reuses backing storage instead of reallocating per pull, and `fs.readFile` avoids runaway growth on misreported sizes.

### **Networking, SQL, and test/runtime correctness**
- Static `import defer` and TLA metadata fixes improved preload and isolated test ordering.
- MySQL/MariaDB binary decoding for `MEDIUMINT`/`INT24` was corrected.
- HTTP/2 header block reassembly and GOAWAY framing were fixed, and crypto/WebCrypto input validation was tightened.
- Shell globbing, signal handling, and YAML/TOML parsing all received correctness fixes.

### Other misc changes
- Clippy deny-lint rollout and large workspace cleanup
- Regression tests added or updated throughout
- Misc docs, type, and internal refactors
