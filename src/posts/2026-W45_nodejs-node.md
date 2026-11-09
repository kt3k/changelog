---
date: 2026-11-08
repo: nodejs/node
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: L
title: "Node adds X.509 introspection, FFI pointers, and perf wins"
excerpt: "A week of core API expansion and runtime tuning: new certificate and FFI capabilities, faster crypto/DNS/HTTP paths, and several Web/streams fixes."
commits: 83
---

### Major API additions
**X.509 certificates get deeper inspection and serialization** — New getters expose version, subject, issuer, extensions, TBSCertificate bytes, and signature details, and `X509Certificate` now round-trips through `v8.serialize()`/`deserialize()`.

**FFI becomes more capable and safer** — `DynamicLibrary.toFunction(pointer, signature)` now wraps raw native pointers as callable JS functions, while FFI wrappers can also be collected cleanly and `pointer` lookup no longer risks prototype shadowing.

### Performance and runtime improvements
**Crypto, DNS, HTTP, and parsing paths speed up** — Node now caches sync digests and reuses HMAC contexts, coalesces identical concurrent `dns.lookup()` calls, batches HTTP parser body delivery per execute call, and optimizes querystring/URLSearchParams encoding and lookup paths.

**Iterator and module-loading internals were tightened** — Core iterator-result objects are now built in the spec/V8-preferred order across streams, fs, URL, and watchers, and ESM format detection avoids repeatedly reparsing `package.json` data.

### Web, streams, and HTTP behavior fixes
**Streams and Web APIs handle edge cases more cleanly** — WritableStream writes during close now fail with a proper `TypeError`, `pipeTo()` avoids a teardown race, Node stream adapters preserve async context, and Blob/File construction now follows Web IDL conversion rules more closely.

**HTTP/2 and HTTP drain handling were corrected** — Node fixed repeated `content-encoding` handling, push-response error attachment, session memory accounting for queued uploads, and a drain regression when flushing coalesced multibyte writes.

### Security and correctness hardening
**Crypto and SQLite error handling became stricter** — OpenSSL errors are now cleared around sensitive crypto operations, and SQLite UDFs reject oversized string/blob returns correctly instead of truncating them.

**Watch mode and filesystem watching are more reliable** — Watch dependency tracking no longer loses earlier dependencies, and `fs.watchFile()` callbacks now reach real directory mounts properly.

### Other misc changes
- QUIC preserves buffered data after destroy and reports truncation/errors afterward.
- DNS, HTTP/2, and Undici got smaller correctness/doc updates, including retry/cache behavior and header/docs clarifications.
- V8, perfetto, simdjson, and amaro were refreshed; build/CI/docs received routine maintenance and test deflakes.
