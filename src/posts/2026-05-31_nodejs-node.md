---
date: 2026-05-31
repo: nodejs/node
size: M
title: "QUIC API lands; numeric edge cases tightened"
excerpt: "Node adds QUIC endpoint listing, fixes pending broadcast iterator cleanup, and normalizes -0 across many APIs."
commits: 8
authors: [panva, jasnell, trivikr]
commit_authors: {"aa444b2": jasnell, "0fe48b6": jasnell, "040c51c": trivikr}
---

### **QUIC gets endpoint listing API** (0fe48b6)
Node now exposes `quic.listEndpoints([options])`, returning active `QuicEndpoint` instances by default or all endpoints when `active: false` is passed. The implementation is wired through the internal QUIC module and documented, giving users a new way to inspect endpoint state.

### **Stream broadcast iterators now settle on return** (040c51c)
When a broadcast consumer is returned, any pending `next()` call now resolves immediately with `{ done: true, value: undefined }` instead of staying pending. This fixes iterator cleanup behavior and prevents hung promises in broadcast stream consumers.

### **DTLS exports simplified** (aa444b2)
`lib/dtls.js` was cleaned up to export a plain object instead of the previous sealed, descriptor-based constant wrapper. This is a small internal API simplification with no user-facing behavior change.

### **Other misc changes**
- Normalized `-0` to `+0` in zlib CRC32 seeds, net `BlockList` prefixes, fs flags/watch intervals, DNS lookup/resolver inputs, and several crypto call paths.
- Added regression tests for the negative-zero cases across zlib, net, fs, DNS, and crypto.
- Minor DTLS cleanup refactor.
