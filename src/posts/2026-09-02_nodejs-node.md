---
date: 2026-09-02
repo: nodejs/node
size: L
title: "Zip VFS, QUIC 0-RTT, and FIPS controls"
excerpt: "Big day for Node.js: new ZIP-backed VFS, QUIC handshake simplification, recursive fs speedups, and expanded crypto FIPS controls."
commits: 32
authors: [jasnell, panva, codebytere, aduh95, IlyasShabi, avivkeller, legendecas, RomainLanz, greenheadHQ, npm-cli-bot, pimterry, pipobscure, umuoy1, watilde, piyushrajyadav]
commit_authors: {"1309975": panva, "2247054": pipobscure, "927dfad": avivkeller, "26bd28c": codebytere, "09f5aae": pimterry, "d5d203a": panva}
---

### **Zip-backed virtual filesystem lands** (2247054)
Node now has a `vfs.ZipProvider` that exposes ZIP archives as a virtual filesystem tree, backed by `zlib.ZipBuffer` or `zlib.ZipFile`. It supports sync and async filesystem operations, writable archive members, and explicit/implicit directory handling, opening up a new way to treat archives as mounted filesystems.

### **QUIC session handling gets simpler and faster for 0-RTT** (09f5aae)
QUIC now reuses TLS pause machinery to drop a lot of bespoke event deferral, which cleans up the session lifecycle and makes 0-RTT behavior clearer. The change also includes new benchmark coverage and should help future QUIC attach work.

### **`fs.readdir` recursive traversal gets a major performance pass** (927dfad)
Recursive directory reads were reworked across JS and C++ paths to improve performance, with new benchmarks and expanded tests covering buffers, permissions, and tree traversal. This is a substantial internal optimization for a commonly used API, especially for tooling that scans large directory trees.

### **FIPS gets stricter controls and observable indicator events** (1309975, d5d203a)
`--force-fips` now accepts `provider` or `strict`, where strict mode rejects non-approved operations reported by OpenSSL's FIPS indicator callback. Node also added the `crypto.fips.indicator` diagnostics channel plus a new `--enable-fips-indicator-events` flag so users can observe these indicator events without changing enforcement.

### **Embedded bootstraps can now supply builtin code caches** (26bd28c)
Node added an embedder-facing builtin code cache API for environments that are created from scratch rather than deserialized from a snapshot. This helps custom embedders avoid recompiling builtins repeatedly and can improve worker startup costs in those setups.

### **Performance and correctness fixes across core APIs**
Several other changes fill in missing API surface and fix edge cases in core modules, including resource timing attributes, lazy source-map decoding, and stream iterator semantics. There are also smaller but meaningful fixes in SQLite backup completion, Web Locks livelock avoidance, URLPattern/WebIDL alignment, and V8 heap profiling support.

### Other misc changes
- `npm` upgraded to 11.19.1.
- WPT WebIDL/interface fixtures refreshed.
- Node-api, net, sqlite, diagnostics_channel, and test/benchmark maintenance updates.
- Nix/tooling tweaks, including Ruff path handling and nghttp2 pin removal.
- Minor docs and internal refactors across several modules.
