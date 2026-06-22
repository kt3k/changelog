---
date: 2026-06-21
repo: nodejs/node
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "Node lands sync socket APIs, crypto hardening, and TLS fixes"
excerpt: "New synchronous socket APIs, stricter crypto/WebCrypto behavior, and several TLS/HTTP security fixes headline a busy week."
commits: 90
---

### Synchronous networking APIs expand
**`dgram` gets `bindSync()` and `connectSync()`** — Node added synchronous UDP bind/connect paths that return immediately, throw setup errors synchronously, and defer events to the next tick. A new `net.BoundSocket` also enables synchronous port reservation and later adoption by `server.listen()` or `new net.Socket()`, giving users finer control over binding and outbound source addresses.

### Crypto and WebCrypto get stricter and more capable
**WebCrypto and `node:crypto` were hardened** — The week tightened several crypto surfaces: `CryptoKey` support in many `node:crypto` APIs is now EOL, resizable ArrayBuffer-backed inputs are rejected, SHAKE digests now require an explicit `outputLength`, and Diffie-Hellman now throws when no private key is present instead of returning an empty buffer. On the feature side, TLS gained `certificateCompression` support, while WebCrypto added non-byte-aligned lengths and named cSHAKE variants.

**OpenSSL-era APIs are being phased out** — Runtime deprecations landed for OpenSSL engine-based crypto/TLS options, and HMAC moved to EVP_MAC on OpenSSL 3. Node also started warning on repeated `Hmac.digest()` calls, aligning the API with finalized-state semantics.

### Security and correctness fixes across HTTP/TLS
**HTTP/TLS reuse and callback handling were tightened** — Idle keep-alive sockets now get destroyed when unexpected data appears, blocking response queue poisoning. TLS session reuse is now tied to the authenticated host, SNI context matching is case-insensitive, and synchronous exceptions from key TLS event handlers are routed safely through error handling.

**More input validation closes edge cases** — WebCrypto now bounds cipher output lengths to avoid overflow, raw key-format aliases are restricted more carefully, and DNS/net hostname handling rejects NUL bytes. The week also included permission-model hardening and safer handling of OpenSSL big-number failures.

### Streams, child_process, and QUIC get performance and reliability work
**Stream interop and backpressure behavior improved** — Node refined classic stream/WHATWG stream bridges, fixed `Writable.toWeb()` sizing for non-object streams, corrected `pipeTo()` writer handling, and improved broadcast iterator ordering under overlapping reads. Multiple allocation-path reductions also landed in Web Streams.

**Child process and QUIC hot paths were optimized** — `spawn()` now uses a lower-overhead binding path, advanced IPC serialization moved into C++, and new child_process benchmarks were added. QUIC received fixes for FIN-related data loss and backpressure deadlocks.

### Other misc changes
- `domain` now uses `AsyncLocalStorage`; `AsyncResource.domain` is removed and DEP0097 is End-of-Life
- `util.inspect()` fixes for `-0` and scientific notation
- SQLite open failure cleanup and `fs.rm()` Windows `EPERM` behavior fixes
- Debugger/init timing and several test/docs/tooling updates
