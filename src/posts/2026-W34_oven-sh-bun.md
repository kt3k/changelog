---
date: 2026-08-23
repo: oven-sh/bun
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "Bun adds Argon2, hardens fetch/install, and speeds buffers"
excerpt: "This week Bun shipped Argon2 crypto, better install/fetch correctness, faster Buffer paths, and a raft of crash and compatibility fixes."
commits: 289
---

### **Major runtime compatibility and safety wins**
Bun added real `crypto.argon2`/`argon2Sync` support, tightened Node-API behavior for addons, improved `Module._resolveFilename` override arguments, and aligned `node:http`, `node:net`, `node:tls`, and `fetch()` with Node semantics in several edge cases. It also fixed a number of crash classes across AggregateError printing, JSX factory parsing, watch reloads, WebView shutdown, named pipes, and `Bun.serve` request abort handling.

### **Install and package-manager reliability improved**
`bun install` got multiple correctness fixes: cut-off downloads now fail instead of masquerading as successful, tarball credentials are handled as `Authorization: Basic`, `file:` tarballs resolve relative to their declaring package, and isolated-store path names are bounded. `bun pm ls` also stopped duplicating shared workspace packages, while other package-manager and build plumbing saw smaller cleanup and compatibility tweaks.

### **Networking, fetch, and Valkey/Redis got sturdier**
Fetch behavior was hardened so unread bodies are parked instead of buffered indefinitely, null-body responses stay truly null, and short numeric timeouts no longer fall into the 4s sweep tick bug. Valkey/Redis work expanded typed command coverage, made reply decoding more precise, and fixed retry, socket-lifecycle, and subscription cleanup races; nearby networking fixes also reduced spurious kqueue wakeups and improved HTTP/TLS keepalive and close behavior.

### **Performance work landed in URL, Buffer, and compile paths**
URL accessors now reuse canonical strings and cache wrapper results, punycode handling is cheaper for common literal cases, and Buffer hot paths got a major boost: `read*`/`write*` accessors are now JIT-inlined intrinsics, `swap16/32/64` regained SIMD-backed speed, and multi-byte search fast paths were restored. Standalone builds also improved by embedding `text` imports more efficiently, and the bundler stopped emitting dead dynamic-import chunks.

### **Other misc changes**
- Process and diagnostics fixes, including corrected `heapUsed` accounting, safer `process.memoryUsage()`, and more robust inspector/debug protocol plumbing
- Windows startup and CLI improvements, plus several path-length, argv, and DLL-loading fixes
- SQL, YAML, crypto, stream, and async-iterator bug fixes
- Test, CI, docs, dead-code removal, and other maintenance updates
