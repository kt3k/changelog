---
date: 2026-09-18
repo: oven-sh/bun
size: L
title: "Bun hardens HTTP, GC, CSS and web APIs"
excerpt: "Major fixes land for fetch framing, WebSocket upgrade parsing, stack traces, GC cadence, install failures, and several leak/flaky-test fixes."
commits: 13
authors: [robobun, dylan-conway, steipete, Jarred-Sumner]
commit_authors: {"ca41503": dylan-conway, "367d939": robobun, "08a2340": robobun, "511ddb3": dylan-conway, "0b59724": robobun, "898f9fe": steipete, "b2c1097": robobun, "83913e7": robobun, "643b957": robobun, "91d89f4": robobun, "663508d": robobun, "31f1070": Jarred-Sumner, "422179d": robobun}
---

### **Fetch now frames streaming request bodies safely** (83913e7)
Bun now decides a stream body's framing once and rejects caller-provided `Content-Length` / `Transfer-Encoding` it can't honor. That closes a request-smuggling footgun where raw stream bytes could be sent under a bad length or encoding, especially over keep-alive and HTTP/2/3.

### **WebSocket upgrades now consume early frames in the same read** (663508d)
`Bun.serve` now parses WebSocket frames that arrive alongside the upgrade request instead of dropping them after the 101 response. This fixes a real protocol edge case where early pings/data were previously lost or delayed.

### **HTMLRewriter no longer leaks handlers and self-reachable rewriters** (0b59724)
Handlers are now tracked through visited JS slots instead of being permanently GC-protected. That lets rewriters, handler functions, and responses be collected once nothing else retains them.

### **Node stack traces now use the thrown error's name** (ca41503)
The default `Error.prepareStackTrace` formatter now matches Node by heading stacks with the actual error name, not always `Error`. This matters for wrapped formatters and tools that forward Bun's default stack rendering.

### **Idle GC cadence is expanded and now avoids unnecessary page-out logic** (31f1070)
The default idle-collection schedule moves to 10s, 2m, and 10m of quiet, and the last full collection can now drop re-decodable bytecode. The controller also applies across JS threads, making idle memory recovery more predictable for Workers too.

### **Install/update failure handling is tightened** (422179d)
`bun update` now properly fails update requests when a package download fails, instead of silently erasing the alias and saving a broken lockfile. This brings alias updates in line with normal package updates.

### **TLS close_notify ordering is fixed for proxied WebSockets** (91d89f4)
Bun now delivers decrypted data before answering a peer's `close_notify`, matching Node's observable ordering. That fixes proxied `wss://` connections that were being reported as abnormal closures.

### **CSS view-transition selectors accept chained class-style parts** (08a2340)
The selector parser now accepts class-like chains and named parts in view-transition pseudo-elements. This expands support for newer CSS syntax in both parsing and CSS module handling.

### **`node:net` sockets can be garbage-collected after early destroy** (367d939)
Sockets destroyed before connect completes no longer pin their wrappers forever. This fixes retention leaks across DNS failures, aborts, and connect errors.

### **`bun install` migration no longer panics on tarball URLs with `/-/`** (643b957)
Yarn lockfile migration now handles tarball URLs that contain registry-style `/-/` path segments without crashing. That removes a hard failure in migration for some valid package URLs.

### **Miscellaneous test fixes and source-lint refreshes**
- Flaky module-graph worker/dispose test adjusted (511ddb3)
- Flaky module-graph isolation cases fixed (b2c1097)
- VM thread-door inventory refreshed for source-lints (898f9fe)
