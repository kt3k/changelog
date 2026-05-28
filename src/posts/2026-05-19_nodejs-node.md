---
date: 2026-05-19
repo: nodejs/node
size: M
title: "Node tightens crypto, streams, and source maps"
excerpt: "Crypto verify accepts more buffer-like inputs, streams fix write/termination semantics, and SourceMap payloads are now frozen."
commits: 15
---

**Crypto verify now accepts ArrayBuffer and SharedArrayBuffer inputs** (7acaa0f)
`verifyOneShot()` no longer rejects non-View buffer-backed inputs; both `data` and `signature` are now normalized through `getArrayBufferOrView()`. The docs and tests were updated accordingly, expanding the public API to accept `string`, `ArrayBuffer`, and `SharedArrayBuffer` where applicable.

**Streams: write and termination behavior were corrected** (f352556, 783b382)
Writable writes now reject string chunks passed with `encoding: 'buffer'`, matching the intended API instead of silently treating them as valid. Separately, `Readable.toWeb()` termination was aligned with `eos()`, which should reduce edge-case mismatches between Node streams and Web Streams.

**SourceMap payloads are now frozen and returned by reference** (b1387e6)
`SourceMap.payload` no longer clones on every access; it returns the same frozen payload object, and `lineLengths` is also frozen and reused. This cuts defensive copying and makes the immutability contract explicit for consumers.

### Other misc changes
- HTTP/crypto/module/tls docs typo cleanup for article usage before vowel-sound acronyms (0c7034f)
- Removed the bi-monthly contributor spotlight section from docs (4f4077a)
- Updated http2 `push`/`trailers` event docs with `rawHeaders` (5605f6b)
- Windows build config adds automated Rust toolchain setup (46e17c7)
- Watch-mode test helper now avoids repeated writes and uses stricter run detection (0b5b189)
- Test-only watch mode worker deflake (57ee682)
- Dependency/tooling bumps: undici 8.3.0, corepack 0.35.0, eslint group, gyp-next, nixpkgs (21a92e8, 55920df, 216718a, d2b6840, 2ebf533)
