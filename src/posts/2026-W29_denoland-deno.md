---
date: 2026-07-19
repo: denoland/deno
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Deno lands native check, hardens runtime and packaging"
excerpt: "Native TypeScript checking, safer pack/check/upload paths, and a broad set of Node, WebTransport, HTTP/2, and N-API fixes shipped this week."
commits: 64
---

### **Native TypeScript checking becomes the default path**
Deno completed a major shift in `deno check`: it now downloads and runs a pinned native TypeScript compiler, remaps diagnostics into Deno’s format, and uses that native flow by default. The work also covered tsconfig materialization, dependency type syncing, and release/CI plumbing for the new compiler binaries.

### **Security and robustness hardening across runtime boundaries**
Several boundary checks were tightened this week: internal extension loaders are no longer exposed through `Deno[Deno.internal].core`, user code can’t import internal `ext:`/`node:`/`checkin:` modules after resolution, and native canvas handles now require FFI permission. The core error-conversion path was also made bounded and cycle-safe to avoid runaway formatting or malformed exception graphs.

### **Packaging, dependency management, and install flows got safer**
`deno pack` now handles long tar paths with GNU long-link entries and validates normalized paths to prevent traversal. `deno add` gained `--no-save` and `--save-optional`, while `deno add/remove` and `deno x` now consistently respect `minimumDependencyAge`. NPM BYONM path checks were fixed to normalize paths before allowing `node_modules` access, and cached-only installs avoid unnecessary metadata fetches for deprecated packages.

### **HTTP, WebTransport, and streaming paths were hardened and sped up**
HTTP/2 saw multiple fixes: header validation is stricter, session teardown is safer, and `deno serve` avoids a cancellation panic on the Hyper HTTP/2 path. WebTransport now validates certificate timing, bounds handshake buffering, and handles failed datagram setup and URL override edge cases cleanly. EventSource parsing was also made linear-time, and small socket reads in Node streams now avoid pinning oversized buffers.

### **Node compat and native addon correctness improved**
Node compatibility got a broad set of fixes, including raw `chacha20` support, safer `Duplex.toWeb({ type })` deprecation handling, and better CommonJS export analysis for odd filesystem cases. N-API threadsafe-function races were fixed in both abort and acquire paths, and callback state is now scoped per invocation to avoid nested re-entry corruption.

### **Other misc changes**
- `crypto.randomUUID()` now batches UUID generation to reduce native overhead.
- Prebuilt tool downloads retry transient failures with exponential backoff.
- SQLite, buffer/encoding, serde, worker bootstrap, and desktop runtime edge cases were hardened.
- Windows support improved for compile targets, subprocess pipe handles, stack sizing, and native window handling.
- Several release/tooling updates, test deflakes, and regression coverage additions landed across core, web, Node, canvas, and process code.
