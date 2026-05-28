---
date: 2026-04-27
repo: oven-sh/bun
size: L
title: "HTTP/3 lands; fetch gets HTTP/2 and security fixes"
excerpt: "Major networking work adds experimental HTTP/3 serve support and HTTP/2 fetch, plus several crash and smuggling fixes."
commits: 13
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"2755641": dylan-conway, "accbff6": Jarred-Sumner, "b424bb7": Jarred-Sumner, "db12b44": Jarred-Sumner, "3f051cb": robobun, "79522ab": robobun, "45f8b4a": robobun, "1925d74": robobun, "9a6bf8a": Jarred-Sumner, "f198191": Jarred-Sumner, "35825ad": robobun, "b989ff8": robobun}
---

**Experimental HTTP/3 serving via `Bun.serve({ h3: true })`** (b424bb7)
Bun can now listen for HTTP/3/QUIC on the same port as existing HTTP/1.1 and HTTP/2 traffic, with new `h3` and `h1` serve options to control which protocols are enabled. This is a major new networking path, but it’s explicitly marked highly experimental and comes with new QUIC/QPACK plumbing and vendored dependencies.

**Experimental HTTP/2 client support in `fetch()`** (accbff6)
`fetch()` can now negotiate HTTP/2 over TLS when the feature flag is enabled, and individual requests can opt in with `protocol: "http2"` or be pinned to HTTP/1.1 with `protocol: "http1.1"`. That unlocks multiplexed requests over one connection and adds a new public request-init API.

**Fix TOCTOU/OOB in `Buffer#copy` and `Buffer#fill` when coercions mutate backing storage** (79522ab)
`valueOf()`/`Symbol.toPrimitive` side effects could detach or resize buffers mid-call, leading to crashes or out-of-bounds reads during `copy()`/`fill()`. The fix reorders coercion and bounds checks to match Node’s semantics and closes a real DoS-style memory safety bug.

**Harden chunked-body parsing against TE.TE request smuggling** (45f8b4a)
The HTTP parser now strictly validates the CRLF terminator after a zero-chunk instead of consuming arbitrary bytes there. That blocks a request-smuggling desync where a proxy and Bun could interpret the same bytes differently.

**Fix `server.fetch()` crash on BigInt arguments** (1925d74)
Bun’s JSC type enum was missing `kJSTypeBigInt`, so passing a BigInt into `server.fetch()` could index past the end of an internal error-message table and panic or segfault. This adds the missing enum value and prevents a public API crash.

**Preserve socket handler state across `reload()`** (b989ff8)
Reloading sockets or listeners no longer resets `active_connections` to zero, which could previously underflow counters or free handler state while live sockets still referenced it. This fixes a serious lifecycle bug in socket hot-reload paths.

**Make `structuredClone()` fail safely for ~2GiB buffers** (35825ad)
Cloning very large `ArrayBuffer`/`SharedArrayBuffer`/typed-array inputs now returns `DataCloneError` instead of aborting the process. That turns a hard crash into a recoverable error for oversized serialization payloads.

### Other misc changes
- Fix timer warning paths so thrown exceptions are cleared instead of leaking into the VM (3f051cb)
- Keep HTTP/2 stream pointers stable across re-entrant callbacks by heap-allocating stream state (f198191)
- Prevent async module evaluation issues by dropping top-level await from `fetch-cli.ts` (9a6bf8a)
- Remove unreachable code flagged by lint in `_http_agent.ts` and `sql/postgres.ts` (2755641)
- Update `highway` dependency to 1.4.0 (7b10e27)
- Add regression coverage for module-loader async dependency handling (db12b44)
