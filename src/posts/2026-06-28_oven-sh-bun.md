---
date: 2026-06-28
repo: oven-sh/bun
size: L
title: "Bun hardens core APIs and fixes WebSocket edge cases"
excerpt: "Major day of Node compat, HTTP/WebSocket correctness, and crash/UAF fixes across Bun’s runtime and networking stack."
commits: 33
authors: [robobun, dylan-conway]
commit_authors: {"b728334": robobun, "f762268": robobun, "3e8da81": robobun, "6ae3fe4": robobun, "7a0f2c0": robobun, "2540f6a": robobun, "412204d": robobun, "9985ba5": robobun, "3d98ac8": robobun, "4f29329": robobun, "2cf311c": robobun, "7dc9c6c": robobun, "e2a69b7": dylan-conway, "a1c39de": robobun, "18e6d8d": robobun, "fc1b448": robobun, "1d05580": robobun, "a6a4352": robobun, "e18e49d": robobun, "9f18300": robobun, "daa0d93": robobun, "12ce04f": robobun, "bbf1f93": robobun, "5034e26": robobun, "2fa625a": robobun, "8f6a7c6": robobun, "2c53f80": robobun, "4061d9a": robobun, "64bbcfb": robobun}
---

### **Node fs now matches Node’s encoding, AbortError, and dispose behavior** (3e8da81)
Bun’s `node:fs` path handling now applies the requested string encoding for `write`/`writeSync`/`filehandle.write`, rejects invalid string arguments earlier, and treats `DataView` like Node does. It also adds no-op disposal for already-closed `Dir` objects so `using`/`await using` composes correctly with explicit close calls.

### **Fetch/connect now surface DNS failures as ENOTFOUND** (a1c39de)
Resolver failures are no longer collapsed into a generic refused-connection error. This fixes error reporting for `fetch()` and `Bun.connect()`, and also updates cache invalidation so failed DNS lookups don’t linger as usable cache entries.

### **Bun.serve HTTP framing is corrected for null-body responses and HEAD** (8f6a7c6, 2c53f80, 4061d9a)
Bun now centralizes null-body status handling so 1xx/204/205/304 responses don’t emit body bytes or `Content-Length`, and file/static routes stop incorrectly streaming bodies for those cases. The server also serves `HEAD` from the `GET` handler in per-method route objects, and HTML routes now inline `import.meta.env` while fixing production ETag/Cache-Control behavior.

### **WebSocket publish() now reports backpressure correctly** (9f18300)
`server.publish()` / `ws.publish()` now return `0`, `-1`, or the byte count according to the worst subscriber state instead of always reporting success when any subscriber existed. That gives applications a real signal for dropped messages and backpressure in pub/sub flows.

### **WebSocket framing and compression handling got stricter** (7dc9c6c, 9985ba5)
RSV1 is now rejected on control and continuation frames instead of arming the compression state for the next message, which prevents protocol violations and mis-decompression. The permessage-deflate server path also fixes context-takeover clients that were being disconnected on their second compressed message.

### **Glob and structured-clone behavior now match web/Node expectations** (daa0d93, 7a0f2c0, 18e6d8d)
`Bun.Glob.scan()` now matches explicitly named dotfiles and follows literal path segments through symlinks, while `structuredClone(Object.prototype)` now clones to `{}` like Node and browsers. Transfer lists are also validated before serialization so invalid entries throw instead of being silently ignored.

### **Other high-impact runtime fixes**
- `Buffer.alloc()` / `buf.fill()` now byte-truncate overlong encodings and encode lone high surrogates as `U+FFFD` (f762268).
- `TextDecoder` gained missing Encoding Standard labels and decoder conformance fixes (6ae3fe4).
- `HTMLRewriter.transform()` now rejects when the upstream body fails, and its binding layer now distinguishes empty vs absent attributes and throws on invalid arguments (2540f6a, bbf1f93).
- `structuredClone(Object.prototype)` now succeeds by cloning `%Object.prototype%` as an empty object (7a0f2c0).
- Shell spawn/read paths got UAF and re-entrancy fixes under sync write failures and poll re-registration errors (3d98ac8, 2cf311c).
- `bun:ffi` callback termination handling was hardened to avoid re-throwing JSC’s `TerminationException` (12ce04f).
- DNS cache eviction now works when all connections to a host fail, and Postgres stops dispatching messages after a connection failure (4f29329, 412204d).

### Other misc changes
- Crash fix for UTF-8→UTF-16 allocation failures in string conversion on Windows (b728334)
- `child_process.kill()` / `spawnSync(detached)` / stdio inheritance edge cases aligned with Node (fc1b448, 2fa625a, e18e49d)
- `expect.toContain()` and `expect.any(Object)` Jest-compat fixes (5034e26, 64bbcfb)
- GitHub Actions annotation escaping for non-ASCII bytes (1d05580)
- WebCrypto `deriveBits()` length-0 and truncation fix (a6a4352)
- `Bun.serve` WebSocket RSV1 / HTML route / HEAD-response test coverage updates and related type tweaks (7dc9c6c, 9f18300, 8f6a7c6, 4061d9a)
- CI fix for bun-types tsgo entrypoint resolution (e2a69b7)
